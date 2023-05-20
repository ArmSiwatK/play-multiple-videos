import React, { useState } from 'react';
import './FilePlayer.css';

const FilePlayer = () => {
    const [file, setFile] = useState(null);
    const [isMediaVisible, setIsMediaVisible] = useState(false);

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
    };

    const handleEnterClick = () => {
        if (!file) {
            return;
        }

        setIsMediaVisible(true);
    };

    const handleCloseClick = () => {
        setFile(null);
        setIsMediaVisible(false);
    };

    return (
        <div className="file-player-container">
            <div className="file-player-row">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="file-player-input"
                />
                <button onClick={handleEnterClick} className="file-player-button">
                    View
                </button>
                {isMediaVisible && (
                    <button onClick={handleCloseClick} className="file-player-button" id="button-close">
                        Close
                    </button>
                )}
            </div>
            {isMediaVisible && (
                <div className="file-player-media-wrapper">
                    {file.type.startsWith('audio/') ? (
                        <audio controls src={URL.createObjectURL(file)} className="file-player-media"></audio>
                    ) : (
                        <video controls src={URL.createObjectURL(file)} className="file-player-media"></video>
                    )}
                </div>
            )}
        </div>
    );
};

export default FilePlayer;