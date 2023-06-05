import React, { useState, useEffect, useRef } from 'react';
import { extractVideoId, isValidUrl } from './YouTubePlayerUtils';
import './YouTubePlayer.css';

const YouTubePlayer = ({ videoUrl, onVideoUrlChange, onClose }) => {

    /*
    < --------------- States and References --------------- >
    */

    const [videoLink, setVideoLink] = useState('');
    const [player, setPlayer] = useState(null);

    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);

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
        onVideoUrlChange(videoLink);
        loadPlayer(videoId);
    };

    const handleCloseClick = () => {
        setVideoLink('');
        onVideoUrlChange('');
        closePlayer();
    };

    const handleRemovePlayer = () => {
        handleCloseClick();
        onClose();
    };

    const handleButtonClick = () => {
        if (player) {
            handleCloseClick();
        } else {
            handleRemovePlayer();
        }
    };

    const loadPlayer = (videoId) => {
        setPlayer(new window.YT.Player(playerRef.current, {
            height: '240',
            width: '426',
            videoId,
            events: { onReady: onPlayerReady },
        }));
    };

    const onPlayerReady = (event) => {
        event.target.playVideo();
    };

    const closePlayer = () => {
        if (player) {
            player.destroy();
            setPlayer(null);
        }
    };

    /*
    < --------------- useEffect Hook --------------- >
    */

    useEffect(() => {
        if (videoUrl && isValidUrl(videoUrl)) {
            const videoId = extractVideoId(videoUrl);
            setVideoLink(videoUrl || '');
            loadPlayer(videoId);
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
                <button onClick={handleButtonClick} className="youtube-player-button" id="button-close">
                    {player ? 'Clear' : 'Close'}
                </button>
            </div>
            <div className={`youtube-player-video-wrapper${!player ? ' hidden' : ''}`} ref={playerContainerRef}>
                <div id="player" ref={playerRef}></div>
            </div>
        </div>
    );
};

export default YouTubePlayer;