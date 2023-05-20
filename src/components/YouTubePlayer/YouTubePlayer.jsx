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
        <div className="youtube-player-container">
            <div className="youtube-player-row">
                <input
                    type="text"
                    value={videoLink}
                    onChange={handleInputChange}
                    placeholder="Enter YouTube link"
                    className="youtube-player-input"
                />
                <button onClick={handleEnterClick} className="youtube-player-button">
                    Enter
                </button>
            </div>
            <div className="youtube-player-video-wrapper">
                <iframe
                    id="videoPlayer"
                    src=""
                    allowFullScreen
                    title="YouTube Video Player"
                    className="youtube-player-video"
                ></iframe>
            </div>
        </div>
    );
};

export default YouTubePlayer;