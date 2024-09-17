import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
        import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
        import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

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

        // Elements
        const videoPlayer = document.getElementById('simulationVideo');
        const progressBar = document.getElementById('progressBar');
        const toast = document.getElementById('toast');

        let progressInterval;
        let isVideoComplete = false;

        // Function to show the toast
        function showToast(message) {
            toast.textContent = message;
            toast.style.display = 'block';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 3000);
        }

        // Function to capture video progress and update Firebase
        function captureVideoProgress(snapshotProgress) {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                const videoRef = ref(database, 'users/' + userId);

                const progressData = {
                    videoProgress: snapshotProgress,  // Store video progress percentage
                    lastUpdated: new Date().toISOString(),
                    videoWatched: isVideoComplete ? true : false,
                };

                // Update user's video progress
                update(videoRef, progressData).then(() => {
                    console.log('Progress updated:', snapshotProgress + '%');
                    if (isVideoComplete) {
                        showToast('Video watched and progress updated!');
                    }
                }).catch((error) => {
                    console.error('Error updating video progress:', error.message);
                });
            }
        }

        // Function to track the video progress
        function trackProgress() {
            const currentTime = videoPlayer.currentTime;
            const duration = videoPlayer.duration;
            const progressPercentage = (currentTime / duration) * 100;

            // Update the progress bar visually
            progressBar.style.width = progressPercentage + '%';

            // Capture progress snapshot every 5 seconds
            captureVideoProgress(Math.floor(progressPercentage));
        }

        // Monitor video progress every 5 seconds
        videoPlayer.addEventListener('play', () => {
            progressInterval = setInterval(trackProgress, 5000);  // Capture progress every 5 seconds
        });

        // Stop tracking progress when video is paused
        videoPlayer.addEventListener('pause', () => {
            clearInterval(progressInterval);
        });

        // Complete the simulation when the video ends
        videoPlayer.addEventListener('ended', () => {
            clearInterval(progressInterval);
            isVideoComplete = true;
            progressBar.style.width = '100%';  // Mark the progress bar as 100% complete
            captureVideoProgress(100);  // Capture final snapshot
            showToast('Video watched and progress updated!');
        });