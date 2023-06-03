import React, { useState, useEffect } from 'react';
import YouTubePlayer from '../YouTubePlayer/YouTubePlayer';
import FilePlayer from '../FilePlayer/FilePlayer';
import './PlayerArray.css';

const PlayerArray = ({ videoUrl }) => {
    const [players, setPlayers] = useState(['youtube', 'youtube']);
    const [videoUrls, setVideoUrls] = useState(['', '']);



    const handleAddYouTubePlayer = () => {
        setPlayers((prevPlayers) => [...prevPlayers, 'youtube']);
        setVideoUrls((prevUrls) => [...prevUrls, '']);
    };

    const handleAddFilePlayer = () => {
        setPlayers((prevPlayers) => [...prevPlayers, 'file']);
        setVideoUrls((prevUrls) => [...prevUrls, null]);
    };

    const handleRemovePlayer = () => {
        setPlayers((prevPlayers) => prevPlayers.slice(0, prevPlayers.length - 1));
        setVideoUrls((prevUrls) => prevUrls.slice(0, prevUrls.length - 1));
    };

    const handleRemoveAllPlayers = () => {
        for (let i = 0; i < players.length; i++) {
            handleRemovePlayer();
        }
    };

    const handleVideoUrlChange = (index, url) => {
        setVideoUrls((prevUrls) => {
            const updatedUrls = [...prevUrls];
            updatedUrls[index] = url;
            return updatedUrls;
        });
    };



    useEffect(() => {
        const emptyIndex = videoUrls.findIndex((url) => url === '');
        if (emptyIndex !== -1) {
            setVideoUrls((prevUrls) => {
                const updatedUrls = [...prevUrls];
                updatedUrls[emptyIndex] = videoUrl;
                return updatedUrls;
            });
        }
    }, [videoUrl]);



    return (
        <div className="player-array-container">
            <div className="player-array-players">
                {players.map((playerType, index) => (
                    <div key={`player-${index + 1}`} className="player-array-player">
                        {playerType === 'youtube' ? (
                            <YouTubePlayer videoUrl={videoUrls[index]} onVideoUrlChange={(url) => handleVideoUrlChange(index, url)} />
                        ) : (
                            <FilePlayer />
                        )}
                    </div>
                ))}
            </div>
            <div className="player-array-buttons">
                <button onClick={handleAddYouTubePlayer}>Add YouTube Player</button>
                <button onClick={handleAddFilePlayer}>Add File Player</button>
                <button onClick={handleRemovePlayer}>Remove Player</button>
                <button onClick={handleRemoveAllPlayers}>Remove All Players</button>
            </div>
        </div>
    );
};

export default PlayerArray;