import React, { useState, useEffect, useRef } from 'react';
import { extractVideoId, isValidUrl } from './YouTubePlayerUtils';
import './YouTubePlayer.css';

const YouTubePlayer = ({ videoUrl, onVideoUrlChange, onClose, isPlayingAll }) => {

    /*
    < --------------- States and References --------------- >
    */

    const [videoLink, setVideoLink] = useState('');
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);

    /*
    < --------------- Functions: Event Handler --------------- >
    */

    const handleInputChange = (event) => {
        setVideoLink(event.target.value);
    };

    const handleEnterClick = () => {
        if (!videoLink || !isValidUrl(videoLink)) return;
        const videoId = extractVideoId(videoLink);
        onVideoUrlChange(videoLink);
        setVideoUrl(videoLink);
        setVideoLink('');
        loadPlayer(videoId);
    };

    const handleCloseClick = () => {
        setVideoLink('');
        onVideoUrlChange('');
        setIsPlaying(false);
        closePlayer();
    };

    const handleRemovePlayer = () => {
        handleCloseClick();
        onClose();
    };

    const handleButtonClick = () => {
        player ? handleCloseClick() : handleRemovePlayer();
    };

    /*
    < --------------- Functions: YouTube Player --------------- >
    */

    const loadPlayer = (videoId) => {
        setPlayer(
            new window.YT.Player(playerRef.current, {
                height: '240',
                width: '426',
                videoId,
                events: {
                    onStateChange: onPlayerStateChange,
                },
            })
        );
    };

    const closePlayer = () => {
        if (player) {
            player.destroy();
            setPlayer(null);
        }
    };

    const onPlayerStateChange = (event) => {
        setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
    };

    const togglePlay = () => {
        if (!player || !player.pauseVideo || !player.playVideo) return;
        isPlaying ? player.pauseVideo() : player.playVideo();
        setIsPlaying(!isPlaying);
    };

    /*
    < --------------- useEffect Hook --------------- >
    */

    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            if (videoUrl && isValidUrl(videoUrl)) {
                const videoId = extractVideoId(videoUrl);
                setVideoLink(videoUrl || '');
                loadPlayer(videoId);
            }
        };
    }, []);

    useEffect(() => {
        if (videoUrl && isValidUrl(videoUrl)) {
            const videoId = extractVideoId(videoUrl);
            setVideoLink(videoUrl || '');
            loadPlayer(videoId);
        }
    }, [videoUrl]);

    useEffect(() => {
        if (isPlayingAll !== isPlaying) {
            togglePlay();
        }
    }, [isPlayingAll]);

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
                <button onClick={handleEnterClick} className="red-button">
                    View
                </button>
                <button onClick={handleButtonClick} className="black-button" id="button-close">
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