import React, { useState, useEffect } from 'react';
import { extractVideoId, isValidUrl } from './YouTubePlayerUtils';
import './YouTubePlayer.css';

const YouTubePlayer = ({ videoUrl, onVideoUrlChange, onClose }) => {

    /*
    < --------------- States --------------- >
    */

    const [videoLink, setVideoLink] = useState('');
    const [embedUrl, setEmbedUrl] = useState('');
    const [isVideoVisible, setIsVideoVisible] = useState(false);

    /*
    < --------------- Functions --------------- >
    */

    const handleInputChange = (event) => {
        setVideoLink(event.target.value);
    };

    const handleEnterClick = () => {
        if (!videoLink || !isValidUrl(videoLink)) {
            return;
        }

        const videoId = extractVideoId(videoLink);
        const newEmbedUrl = `https://www.youtube.com/embed/${videoId}`;

        setEmbedUrl(newEmbedUrl);
        setIsVideoVisible(true);
        onVideoUrlChange(videoLink);
    };

    const handleCloseClick = () => {
        setVideoLink('');
        setEmbedUrl('');
        setIsVideoVisible(false);
        onVideoUrlChange('');
    };

    const handleRemovePlayer = () => {
        handleCloseClick();
        onClose();
    };

    /*
    < --------------- useEffect Hook --------------- >
    */

    useEffect(() => {
        if (videoUrl && isValidUrl(videoUrl)) {
            const videoId = extractVideoId(videoUrl);
            const newEmbedUrl = `https://www.youtube.com/embed/${videoId}`;

            setEmbedUrl(newEmbedUrl);
            setIsVideoVisible(true);
            setVideoLink(videoUrl || '');
        }
    }, [videoUrl]);

    /*
    < --------------- JSX Structure --------------- >
    */

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
                    View
                </button>
                <button
                    onClick={isVideoVisible ? handleCloseClick : handleRemovePlayer}
                    className="youtube-player-button"
                    id="button-close"
                >
                    {isVideoVisible ? "Clear" : "Close"}
                </button>
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