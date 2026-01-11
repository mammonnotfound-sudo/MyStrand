document.addEventListener('DOMContentLoaded', function() {
    // This script will be included on all pages that have the shared navigation.

    // --- GATEKeeper & WELCOME MESSAGE ---
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const navbarUser = document.getElementById('navbarUser');

    if (loggedInUser && navbarUser) {
        navbarUser.textContent = `Welcome, ${loggedInUser}`;
    } else if (!loggedInUser && !window.location.pathname.endsWith('login.html') && !window.location.pathname.endsWith('main.html')) {
        // If not logged in and not on a public page, redirect.
        // This is a safety net. Each page should have its own primary gatekeeper.
        window.location.href = 'login.html';
        return;
    }

    // --- LOGOUT LOGIC ---
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            sessionStorage.removeItem('loggedInUser');
            alert("You have been logged out.");
            window.location.href = 'main.html';
        });
    }
    
    // --- SIDEBAR NAVIGATION LOGIC ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar-nav');
    const closeBtn = document.getElementById('close-btn');

    if (menuToggle && sidebar && closeBtn) {
        const openSidebar = () => sidebar.classList.add('active');
        const closeSidebar = () => sidebar.classList.remove('active');

        menuToggle.addEventListener('click', openSidebar);
        closeBtn.addEventListener('click', closeSidebar);
    }
});