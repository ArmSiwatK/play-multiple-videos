import React, { useState, useEffect } from 'react';
import YouTubePlayer from '../YouTubePlayer/YouTubePlayer';
import FilePlayer from '../FilePlayer/FilePlayer';
import './PlayerArray.css';

const PlayerArray = ({ videoUrl }) => {
    const [players, setPlayers] = useState(['youtube', 'youtube']);
    const [videoUrls, setVideoUrls] = useState(['', '']);

    const handleAddPlayer = (playerType) => {
        setPlayers((prevPlayers) => [...prevPlayers, playerType]);
        setVideoUrls((prevUrls) => [...prevUrls, playerType === 'youtube' ? '' : null]);
    };

    const handleRemovePlayerAtIndex = (index) => {
        setPlayers((prevPlayers) => {
            const updatedPlayers = [...prevPlayers];
            updatedPlayers.splice(index, 1);
            return updatedPlayers;
        });
        setVideoUrls((prevUrls) => {
            const updatedUrls = [...prevUrls];
            updatedUrls.splice(index, 1);
            return updatedUrls;
        });
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
                {players.map((playerType, index) => (
                    <div key={`player-${index + 1}`} className="player-array-player">
                        {playerType === 'youtube' ? (
                            <YouTubePlayer
                                videoUrl={videoUrls[index]}
                                onVideoUrlChange={(url) => handleVideoUrlChange(index, url)}
                                onClose={() => handleRemovePlayerAtIndex(index)}
                            />
                        ) : (
                            <FilePlayer />
                        )}
                    </div>
                ))}
            </div>
            <div className="player-array-buttons">
                <button onClick={() => handleAddPlayer('youtube')}>Add YouTube Player</button>
                <button onClick={() => handleAddPlayer('file')}>Add File Player</button>
                <button onClick={handleRemoveAllPlayers}>Remove All Players</button>
            </div>
        </div>
    );
};

export default PlayerArray;