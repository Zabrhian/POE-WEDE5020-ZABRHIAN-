document.addEventListener("DOMContentLoaded", function () {
    // Create search input dynamically in header if it doesn't already exist
    const headerInner = document.querySelector('.header-inner');
    if (!headerInner) return;

    const searchContainer = document.createElement('div');
    searchContainer.className = 'site-search-wrapper';
    searchContainer.innerHTML = `
        <input type="text" id="live-search" placeholder="Search..." style="padding: 0.4rem 0.8rem; border-radius: 4px; border: 1px solid var(--border); font-size: 0.9rem;">
    `;
    
    // Append search input to the header
    headerInner.appendChild(searchContainer);

    const searchInput = document.getElementById('live-search');
    
    searchInput.addEventListener('input', function (e) {
        const term = e.target.value.toLowerCase().trim();
        
        // If on the services page, filter service cards live!
        const serviceCards = document.querySelectorAll('.service-card');
        if (serviceCards.length > 0) {
            serviceCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(term)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        } else if (term.length > 2) {
            // Basic keyword redirection example for general search
            if (term.includes('contact') || term.includes('phone')) {
                // Optional: trigger action or guide user
            }
        }
    });
});