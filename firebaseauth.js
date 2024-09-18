// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
    getFirestore,
    setDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your Firebase configuration
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
const db = getFirestore(app);

// Function to show messages
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Handle Sign Up
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = 'homepage.html';
                })
                .catch((error) => {
                    console.error("Error writing document", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            } else {
                showMessage('Unable to create user', 'signUpMessage');
            }
        });
});

// Handle Sign In
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('Login is successful', 'signInMessage');
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            } else {
                showMessage('Account does not Exist', 'signInMessage');
            }
        });
});

// Handle Logout
function logoutUser() {
    signOut(auth)
        .then(() => {
            console.log('User logged out successfully.');
            localStorage.removeItem('loggedInUserId');
            window.location.href = 'login.html'; // Redirect to login page after logout
        })
        .catch((error) => {
            console.error('Error logging out:', error.message);
        });
}

// Check user session state and handle changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in:', user);
        // Add logic here to update the UI or redirect based on user's state
    } else {
        console.log('User is signed out.');
        // Redirect to login page or update UI accordingly if needed
    }
});

// Example usage: Call logoutUser() on a logout button click event
// document.getElementById('logoutButton').addEventListener('click', logoutUser);
