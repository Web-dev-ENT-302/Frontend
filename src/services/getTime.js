
export const getRelativeTime = (timestamp) => {
    // Convert timestamp to Date object
    const date = new Date(timestamp);
    const now = new Date();

    // Calculate the difference in milliseconds
    const diffMs = now.getTime() - date.getTime();

    // Handle future dates
    if (diffMs < 0) {
        return "just now";
    }

    // Convert to different time units
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    // Return appropriate relative time string
    if (diffSeconds < 30) {
        return "just now";
    } else if (diffSeconds < 60) {
        return `${diffSeconds} seconds ago`;
    } else if (diffMinutes === 1) {
        return "1 min ago";
    } else if (diffMinutes < 60) {
        return `${diffMinutes} mins ago`;
    } else if (diffHours === 1) {
        return "1 hour ago";
    } else if (diffHours < 24) {
        return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
        return "1 day ago";
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else if (diffWeeks === 1) {
        return "1 week ago";
    } else if (diffWeeks < 4) {
        return `${diffWeeks} weeks ago`;
    } else if (diffMonths === 1) {
        return "1 month ago";
    } else if (diffMonths < 12) {
        return `${diffMonths} months ago`;
    } else if (diffYears === 1) {
        return "1 year ago";
    } else {
        return `${diffYears} years ago`;
    }
};


export default getRelativeTime;
