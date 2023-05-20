import React from 'react';
import YouTubePlayer from '../YouTubePlayer/YouTubePlayer';
import './PlayerArray.css';

const PlayerArray = () => {
    const initialPlayerCount = 2;
    const [playerCount, setPlayerCount] = React.useState(initialPlayerCount);

    const handleAddPlayer = () => {
        setPlayerCount(prevCount => prevCount + 1);
    };

    const handleRemovePlayer = () => {
        setPlayerCount(prevCount => Math.max(prevCount - 1, 0));
    };

    return (
        <div className="player-array-container">
            <div className="player-array-buttons">
                <button onClick={handleAddPlayer}>Add Player</button>
                <button onClick={handleRemovePlayer}>Remove Player</button>
            </div>
            <div className="player-array-players">
                {Array.from({ length: playerCount }, (_, index) => (
                    <div key={`player-${index + 1}`} className="player-array-player">
                        <YouTubePlayer />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayerArray;