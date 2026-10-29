document.addEventListener("DOMContentLoaded", function () {
    // 1. Highlight current active navigation link automatically
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.site-nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Simple check to match path names
        if (currentLocation.includes(linkPath) && linkPath !== "../index.html" && linkPath !== "index.html") {
            link.style.backgroundColor = "var(--accent)";
            link.style.color = "var(--primary-dark)";
        }
    });

    // 2. Dynamic Copyright Year Updater (Ensures 2026/future years stay current)
    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) {
        const currentYear = new Date().getFullYear();
        footerBottom.innerHTML = `&copy; ${currentYear} Tkayys Photography. All rights reserved.`;
    }
});