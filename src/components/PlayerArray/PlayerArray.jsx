import React, { useState, useEffect } from 'react';
import YouTubePlayer from '../YouTubePlayer/YouTubePlayer';
import './PlayerArray.css';

const PlayerArray = ({ videoUrl }) => {
    const [players, setPlayers] = useState(['youtube', 'youtube']);
    const [videoUrls, setVideoUrls] = useState(['', '']);



    const handleAddPlayer = () => {
        setPlayers((prevPlayers) => [...prevPlayers, 'youtube']);
        setVideoUrls((prevUrls) => [...prevUrls, '']);
    };

    const handleRemovePlayerAtIndex = (index) => {
        setPlayers((prevPlayers) => prevPlayers.filter((_, i) => i !== index));
        setVideoUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    };

    const handleRemoveAllPlayers = () => {
        setPlayers([]);
        setVideoUrls([]);
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
                {players.map((_, index) => (
                    <div key={`player-${index + 1}`} className="player-array-player">
                        <YouTubePlayer
                            videoUrl={videoUrls[index]}
                            onVideoUrlChange={(url) => handleVideoUrlChange(index, url)}
                            onClose={() => handleRemovePlayerAtIndex(index)}
                        />
                    </div>
                ))}
            </div>
            <div className="player-array-buttons">
                <button onClick={handleAddPlayer}>Add YouTube Player</button>
                <button onClick={handleRemoveAllPlayers}>Remove All Players</button>
            </div>
        </div>
    );
};

export default PlayerArray;