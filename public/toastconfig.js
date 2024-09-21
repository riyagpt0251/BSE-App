document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('simulationVideo');
    const progressBar = document.getElementById('progressBar');
    const toast = document.getElementById('toast');

    // Update the progress bar based on video time
    video.addEventListener('timeupdate', function () {
        const percentage = (video.currentTime / video.duration) * 100;
        progressBar.style.width = percentage + '%';
    });

    // Function to show toast and update dashboard progress
    function showToastAndUpdateProgress(message) {
        // Show toast with message
        toast.innerText = message;
        toast.classList.add('show');

        // Update dashboard progress
        updateDashboardProgress(message);

        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            window.location.href = 'dashboard.html'; // Redirect to the dashboard
        }, 3000);
    }

    // Function to update the dashboard progress
    function updateDashboardProgress(message) {
        // Storing progress message using localStorage
        const progress = localStorage.getItem('userProgress') || '';
        localStorage.setItem('userProgress', progress + message + '\n');
    }

    // Show toast and redirect to the next page when the video ends
    video.addEventListener('ended', function () {
        showToastAndUpdateProgress('Video completed!');
    });

    // Flyout functionality
    const flyout = document.getElementById('flyout');
    const openFlyoutButton = document.getElementById('openFlyout');
    const closeFlyoutButton = document.getElementById('closeFlyout');

    openFlyoutButton.addEventListener('click', () => {
        flyout.style.display = 'block';
    });

    closeFlyoutButton.addEventListener('click', () => {
        flyout.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('[data-collapse-toggle="navbar-default"]');
    const menu = document.getElementById('navbar-default');

    menuButton.addEventListener('click', function () {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('hidden');
    });
});