// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getDatabase, ref, update, get } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTjtmlU7cFDWm0NakIouvfX6jkTXEOl30",
    authDomain: "authwithbreastselfexamination.firebaseapp.com",
    projectId: "authwithbreastselfexamination",
    storageBucket: "authwithbreastselfexamination.appspot.com",
    messagingSenderId: "593001136016",
    appId: "1:593001136016:web:e6e51db5f2b45c3825fd15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Function to update slide status in Firebase
function markSlidesCompleted() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid;
            const userRef = ref(db, 'users/' + userId);
            update(userRef, {
                slidesCompleted: true
            }).then(() => {
                console.log("Slides status updated successfully in Firebase.");
                fetchSlideStatus(); // Refresh the slide status after updating
            }).catch((error) => {
                console.error("Error updating status:", error);
            });
        } else {
            console.log("No user is logged in.");
        }
    });
}

// Function to fetch and display slide status from Firebase
function fetchSlideStatus() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid;
            const userRef = ref(db, 'users/' + userId);

            get(userRef).then((snapshot) => {
                const data = snapshot.val();
                const slidesStatusElement = document.getElementById('slidestatus');
                if (data && data.slidesCompleted) {
                    slidesStatusElement.textContent = "Slides Completed!";
                } else {
                    slidesStatusElement.textContent = "Slides Not Completed";
                }
            }).catch((error) => {
                console.error("Error fetching status:", error);
            });
        } else {
            console.log("No user is logged in.");
            document.getElementById('slidestatus').textContent = "Slides Not Completed (No User)";
        }
    });
}

// Initialize the page by fetching the slide status
fetchSlideStatus();

// Add event listener to button
document.getElementById('markSlidesComplete').addEventListener('click', markSlidesCompleted);
