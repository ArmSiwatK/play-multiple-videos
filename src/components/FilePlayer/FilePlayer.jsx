import React, { useState, useRef } from 'react';
import './FilePlayer.css';

const FilePlayer = () => {
    const [file, setFile] = useState(null);
    const [isMediaVisible, setIsMediaVisible] = useState(false);
    const fileInputRef = useRef(null);



    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
        setIsMediaVisible(true);
    };

    const handleCloseClick = () => {
        setFile(null);
        setIsMediaVisible(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleBrowseClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };



    return (
        <div className="file-player-container">
            <div className="file-player-row">
                <div className="file-player-input-wrapper">
                    {file ? (
                        <span className="file-player-file-selected">File selected.</span>
                    ) : (
                        <>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="file-player-input"
                                ref={fileInputRef}
                            />
                            <button onClick={handleBrowseClick} className="file-player-button">
                                Browse
                            </button>
                        </>
                    )}
                </div>
                {isMediaVisible && (
                    <>
                        <button onClick={handleBrowseClick} className="file-player-button">
                            Browse
                        </button>
                        <button onClick={handleCloseClick} className="file-player-button" id="button-close">
                            Close
                        </button>
                    </>
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