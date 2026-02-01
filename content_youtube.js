// content_youtube.js

// Defensive cleanup in case DOM changes or CSS isn't enough for some dynamic elements
function cleanupYouTube() {
    const selectors = [
        '#comments',
        'ytd-comments',
        '#secondary', // Sidebar
        // 'ytd-rich-grid-renderer', // Home grid - ALLOWED NOW
        '.ytp-endscreen-content' // End screen
    ];

    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.display = 'none';
        });
    });
}

// Run on load
window.addEventListener('load', () => {
    cleanupYouTube();
    checkAndInjectBanner();
});

// Run on DOM changes (YouTube is a SPA)
const observer = new MutationObserver((mutations) => {
    // Debounce or just run simple check
    cleanupYouTube();
    checkAndInjectBanner();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Also run periodically just in case
setInterval(() => {
    cleanupYouTube();
    checkAndInjectBanner();
}, 2000);

function checkAndInjectBanner() {
    // Check if we are on the home page
    const isHome = window.location.pathname === '/' || window.location.pathname === '';
    const bannerId = 'social-focus-banner';
    let banner = document.getElementById(bannerId);

    if (isHome) {
        if (!banner) {
            banner = document.createElement('div');
            banner.id = bannerId;
            banner.innerText = "Estas utilizando Social Focus - Bloqueador de Distracciones - Comentarios y Recomendaciones ilimitadas. Enfocate.";

            // Insert at the top of the page content
            const contentContainer = document.querySelector('#masthead-container') || document.body;
            if (contentContainer) {
                // Try to insert after masthead (navbar) so it doesn't cover it or get covered
                // Or prepend to body if masthead not found (fallback)
                if (document.querySelector('ytd-app')) {
                    const app = document.querySelector('ytd-app');
                    app.insertBefore(banner, app.firstChild);
                } else {
                    document.body.prepend(banner);
                }
            }
        }
        banner.style.display = 'block';
    } else {
        if (banner) {
            banner.style.display = 'none';
        }
    }
}
