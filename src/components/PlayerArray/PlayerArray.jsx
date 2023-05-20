import React from 'react';
import YouTubePlayer from '../YouTubePlayer/YouTubePlayer';
import FilePlayer from '../FilePlayer/FilePlayer';
import './PlayerArray.css';

const PlayerArray = () => {
    const [players, setPlayers] = React.useState(['youtube', 'file']);

    const handleAddYouTubePlayer = () => {
        setPlayers(prevPlayers => [...prevPlayers, 'youtube']);
    };

    const handleAddFilePlayer = () => {
        setPlayers(prevPlayers => [...prevPlayers, 'file']);
    };

    const handleRemovePlayer = () => {
        setPlayers(prevPlayers => prevPlayers.slice(0, prevPlayers.length - 1));
    };

    return (
        <div className="player-array-container">
            <div className="player-array-players">
                {players.map((playerType, index) => (
                    <div key={`player-${index + 1}`} className="player-array-player">
                        {playerType === 'youtube' ? <YouTubePlayer /> : <FilePlayer />}
                    </div>
                ))}
            </div>
            <div className="player-array-buttons">
                <button onClick={handleAddYouTubePlayer}>Add YouTube Player</button>
                <button onClick={handleAddFilePlayer}>Add File Player</button>
                <button onClick={handleRemovePlayer}>Remove Player</button>
            </div>
        </div>
    );
};

export default PlayerArray;