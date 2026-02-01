import { DAILY_LIMIT_SECONDS } from './rules.js';

document.addEventListener('DOMContentLoaded', () => {
    updateUI();

    // Update UI every second while popup is open
    setInterval(updateUI, 1000);

    const toggle = document.getElementById('toggleExtension');
    toggle.addEventListener('change', (e) => {
        chrome.storage.local.set({ extensionEnabled: e.target.checked }, () => {
            updateUI();
            // Reload active tab to apply changes immediately
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]) chrome.tabs.reload(tabs[0].id);
            });
        });
    });
});

function updateUI() {
    chrome.storage.local.get(['twitterDailyUsage', 'extensionEnabled'], (data) => {
        const usage = data.twitterDailyUsage || 0;
        const enabled = data.extensionEnabled !== false; // Default true

        // Update Toggle
        document.getElementById('toggleExtension').checked = enabled;

        // Calculate time left
        const remaining = Math.max(0, DAILY_LIMIT_SECONDS - usage);
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;

        // Update Time Display
        document.getElementById('timeLeft').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Update Progress Bar
        const percentage = (remaining / DAILY_LIMIT_SECONDS) * 100;
        const fill = document.getElementById('progressFill');
        fill.style.width = `${percentage}%`;

        if (percentage < 10) {
            fill.style.backgroundColor = '#e74c3c'; // Red when running low
        } else {
            fill.style.backgroundColor = '#3498db';
        }
    });
}
