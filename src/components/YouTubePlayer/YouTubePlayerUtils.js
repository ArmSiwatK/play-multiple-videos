export const extractVideoId = (url) => {
    const urlObject = new URL(url);
    const searchParams = new URLSearchParams(urlObject.search);
    const videoId = searchParams.get('v');
    return videoId;
};

export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};