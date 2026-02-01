import { BLOCKED_DOMAINS, LIMITED_DOMAINS, DAILY_LIMIT_SECONDS } from './rules.js';

let activeTabId = null;
let intervalId = null;

// Initialize storage
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        twitterDailyUsage: 0,
        lastResetDate: new Date().toDateString(),
        extensionEnabled: true
    });
});

// Check daily reset
function checkDailyReset() {
    chrome.storage.local.get(['lastResetDate'], (data) => {
        const today = new Date().toDateString();
        if (data.lastResetDate !== today) {
            chrome.storage.local.set({
                twitterDailyUsage: 0,
                lastResetDate: today
            });
            console.log('Daily usage reset.');
        }
    });
}
// Run check periodically (e.g., every minute or on interaction)
setInterval(checkDailyReset, 60000);

// Monitor tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        checkAndBlock(tabId, tab.url);
    }
});

// Monitor active tab switching
chrome.tabs.onActivated.addListener((activeInfo) => {
    activeTabId = activeInfo.tabId;
    chrome.tabs.get(activeTabId, (tab) => {
        if (tab && tab.url) {
            checkAndBlock(activeTabId, tab.url);
            handleTimeTracking(tab.url);
        }
    });
});

function checkAndBlock(tabId, url) {
    chrome.storage.local.get(['extensionEnabled', 'twitterDailyUsage'], (data) => {
        if (!data.extensionEnabled) {
            console.log('Social Focus: Extension disabled by user.');
            return;
        }

        const domain = new URL(url).hostname.replace('www.', '');
        console.log(`Social Focus Checking: ${domain}`);

        // Check Blocked Domains
        if (BLOCKED_DOMAINS.some(d => domain.includes(d))) {
            console.log(`Social Focus: Blocking ${domain}`);
            chrome.tabs.update(tabId, { url: chrome.runtime.getURL("blocked.html") });
        } else {
            console.log(`Social Focus: ${domain} not in blocked list`, BLOCKED_DOMAINS);
        }

        // Check Limited Domains (X/Twitter)
        if (LIMITED_DOMAINS.some(d => domain.includes(d))) {
            if (data.twitterDailyUsage >= DAILY_LIMIT_SECONDS) {
                chrome.tabs.update(tabId, { url: chrome.runtime.getURL("blocked.html") });
            }
        }
    });
}

function handleTimeTracking(url) {
    // Clear existing interval
    if (intervalId) clearInterval(intervalId);

    const domain = new URL(url).hostname.replace('www.', '');

    // If it's a limited domain
    if (LIMITED_DOMAINS.some(d => domain.includes(d))) {
        intervalId = setInterval(() => {
            chrome.storage.local.get(['twitterDailyUsage', 'extensionEnabled'], (data) => {
                if (!data.extensionEnabled) return;

                if (activeTabId) {
                    // Check if tab is still active and focused (requires windows permission for focus, but activeTab covers most)
                    // Simple check: is this still the tracked domain?
                    chrome.tabs.get(activeTabId, (currentTab) => {
                        if (chrome.runtime.lastError || !currentTab || !currentTab.url.includes(domain)) {
                            clearInterval(intervalId);
                            return;
                        }

                        let newUsage = (data.twitterDailyUsage || 0) + 1;
                        chrome.storage.local.set({ twitterDailyUsage: newUsage });

                        if (newUsage >= DAILY_LIMIT_SECONDS) {
                            chrome.tabs.update(activeTabId, { url: chrome.runtime.getURL("blocked.html") });
                            clearInterval(intervalId);
                        }
                    });
                }
            });
        }, 1000);
    }
}
