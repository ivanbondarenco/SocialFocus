export const BLOCKED_DOMAINS = [
    "facebook.com",
    "instagram.com",
    "tiktok.com",
    "reddit.com",
    "snapchat.com",
    "linkedin.com"
];

export const LIMITED_DOMAINS = [
    "twitter.com",
    "x.com"
];

// Educational domains are technically whitelisted by not being in the blocked list,
// but we keep them here for reference or future "white-list only" mode.
export const EDUCATIONAL_DOMAINS = [
    "coursera.org",
    "udemy.com",
    "edx.org",
    "khanacademy.org",
    "platzi.com",
    "udacity.com",
    "codecademy.com"
];

export const DAILY_LIMIT_SECONDS = 20 * 60; // 20 minutes
