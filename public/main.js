// Import Firebase Firestore
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Firebase configuration
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
const db = getFirestore(app);

function trackElement() {
  // Reference to Firestore
  const eventRef = doc(db, 'user_events', 'some-event-id');
  setDoc(eventRef, {
    event_name: 'view_element',
    event_category: 'engagement',
    event_label: 'Google Slide',
    timestamp: new Date()
  }).then(() => {
    // Show toast message
    showToast("You have viewed the slide!");
    // Update local storage with the progress
    const progress = localStorage.getItem('userProgress') || '';
    const newProgress = progress + 'Viewed Google Slide at ' + new Date() + '\n';
    localStorage.setItem('userProgress', newProgress);
  }).catch(error => {
    console.error("Error adding document: ", error);
  });
}

// Function to show toast notification
function showToast(message) {
  const toastContainer = document.createElement('div');
  toastContainer.className = 'fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg';
  toastContainer.innerText = message;
  document.body.appendChild(toastContainer);

  setTimeout(() => {
    document.body.removeChild(toastContainer);
  }, 3000); // Toast message duration
}

// Add event listener to the button
document.getElementById("viewSlide").addEventListener("click", trackElement);
