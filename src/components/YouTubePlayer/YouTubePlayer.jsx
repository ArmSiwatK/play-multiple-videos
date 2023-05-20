import React, { useState } from 'react';
import "./YouTubePlayer.css";

const YouTubePlayer = () => {
    const [videoLink, setVideoLink] = useState('');



    const handleInputChange = (event) => {
        setVideoLink(event.target.value);
    };

    const extractVideoId = (url) => {
        const urlObject = new URL(url);
        const searchParams = new URLSearchParams(urlObject.search);
        const videoId = searchParams.get('v');
        return videoId;
    };

    const handleEnterClick = () => {
        // Extract the video ID from the YouTube URL
        const videoId = extractVideoId(videoLink);

        // Construct the YouTube embed URL
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;

        // Set the embed URL as the source for the video player
        document.getElementById('videoPlayer').src = embedUrl;
    };



    return (
        <div>
            <input
                type="text"
                value={videoLink}
                onChange={handleInputChange}
                placeholder="Enter YouTube link"
            />
            <button onClick={handleEnterClick}>Enter</button>
            <div className="videoWrapper">
                <iframe
                    id="videoPlayer"
                    src=""
                    allowFullScreen
                    title="YouTube Video Player"
                ></iframe>
            </div>
        </div>
    );
};

export default YouTubePlayer;