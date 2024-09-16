import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
        import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
        import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

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
        const auth = getAuth(app);
        const database = getDatabase(app);

        document.addEventListener('DOMContentLoaded', () => {
            const video = document.getElementById('simulationVideo');
            const toast = document.getElementById('toast');

            video.addEventListener('ended', () => {
                // Show the toast
                toast.style.display = 'block';

                // Hide the toast after 3 seconds
                setTimeout(() => {
                    toast.style.display = 'none';
                }, 3000);

                // Update Firebase
                updateFirebase();
            });

            function updateFirebase() {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        const userId = user.uid;
                        const videoRef = ref(database, 'users/' + userId + '/videoStatus');
                        set(videoRef, {
                            videoWatched: true,
                            watchedAt: new Date().toISOString()
                        }).then(() => {
                            console.log('Video status updated in Firebase.');
                        }).catch((error) => {
                            console.error('Error updating video status:', error.message);
                        });
                    } else {
                        console.log('User not logged in.');
                    }
                });
            }
        });