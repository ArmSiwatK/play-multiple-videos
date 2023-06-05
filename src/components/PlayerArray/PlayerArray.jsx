import React, { useState, useEffect } from 'react';
import YouTubePlayer from '../YouTubePlayer/YouTubePlayer';
import './PlayerArray.css';

const PlayerArray = ({ videoUrl }) => {

    /*
    < --------------- State --------------- >
    */

    const [videoUrls, setVideoUrls] = useState(['', '']);
    const [isPlayingAll, setIsPlayingAll] = useState(false);

    /*
    < --------------- Functions --------------- >
    */

    const handleAddPlayer = () => {
        setVideoUrls((prevUrls) => [...prevUrls, '']);
    };

    const handleRemovePlayerAtIndex = (index) => {
        setVideoUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    };

    const handleRemoveAllPlayers = () => {
        setVideoUrls([]);
    };

    const handleVideoUrlChange = (index, url) => {
        setVideoUrls((prevUrls) => {
            const updatedUrls = [...prevUrls];
            updatedUrls[index] = url;
            return updatedUrls;
        });
    };

    const togglePlayAll = () => {
        setIsPlayingAll((prevIsPlayingAll) => !prevIsPlayingAll);
    };

    /*
    < --------------- useEffect Hook --------------- >
    */

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

    /*
    < --------------- JSX Structure --------------- >
    */

    return (
        <div className="player-array-container">
            <div className="player-array-players">
                {videoUrls.map((url, index) => (
                    <div key={`player-${index + 1}`} className="player-array-player">
                        <YouTubePlayer
                            videoUrl={url}
                            onVideoUrlChange={(url) => handleVideoUrlChange(index, url)}
                            onClose={() => handleRemovePlayerAtIndex(index)}
                            isPlayingAll={isPlayingAll}
                        />
                    </div>
                ))}
            </div>
            <div className="player-array-buttons">
                <button id="player-add-button" onClick={handleAddPlayer}>
                    Add YouTube Player
                </button>
                <button onClick={togglePlayAll}>
                    {isPlayingAll ? 'Pause All' : 'Play All'}
                </button>
                <button onClick={handleRemoveAllPlayers}>Remove All Players</button>
            </div>
        </div>
    );
};

export default PlayerArray;