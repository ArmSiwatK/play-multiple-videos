import React from 'react';
import './Instruction.css';

const Instruction = () => {
    return (
        <div className="instruction-container">
            <h1>How to use:</h1>
            <ul>
                <li>Click the big button at the top to go to YouTube.</li>
                <li>Use the notepad provided to note down URLs or any other information.</li>
                <li>
                    The YouTube player accepts any YouTube link that contains a video ID,
                    except for Shorts.
                </li>
                <li>
                    Alternatively, you can use the File Player to play video or audio files
                    stored on your device.
                </li>
                <li>
                    Add or remove players using the three buttons.
                </li>
            </ul>
        </div>
    );
};

export default Instruction;