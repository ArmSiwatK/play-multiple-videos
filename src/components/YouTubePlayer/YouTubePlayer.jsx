import React, { useState } from 'react';
import './YouTubePlayer.css';

const YouTubePlayer = () => {
    const [videoLink, setVideoLink] = useState('');
    const [embedUrl, setEmbedUrl] = useState('');
    const [isVideoVisible, setIsVideoVisible] = useState(false);



    const handleInputChange = (event) => {
        setVideoLink(event.target.value);
    };

    const extractVideoId = (url) => {
        const urlObject = new URL(url);
        const searchParams = new URLSearchParams(urlObject.search);
        const videoId = searchParams.get('v');
        return videoId;
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleEnterClick = () => {
        if (!videoLink || !isValidUrl(videoLink)) {
            return;
        }

        const videoId = extractVideoId(videoLink);
        const newEmbedUrl = `https://www.youtube.com/embed/${videoId}`;

        setEmbedUrl(newEmbedUrl);
        setIsVideoVisible(true);
    };

    const handleCloseClick = () => {
        setVideoLink('');
        setEmbedUrl('');
        setIsVideoVisible(false);
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
                {isVideoVisible && (
                    <button onClick={handleCloseClick} className="youtube-player-button">
                        Close
                    </button>
                )}
            </div>
            {embedUrl && (
                <div className="youtube-player-video-wrapper">
                    <iframe
                        id="videoPlayer"
                        src={embedUrl}
                        allowFullScreen
                        title="YouTube Video Player"
                        className="youtube-player-video"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default YouTubePlayer;