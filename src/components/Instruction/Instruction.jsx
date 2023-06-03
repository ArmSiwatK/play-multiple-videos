import React from 'react';
import './Instruction.css';

const Instruction = () => {
    return (
        <div className="instruction-container">
            <h1>How to use:</h1>
            <ul>
                <li>Search for YouTube videos. Click on one to assign them to an empty YouTube player, or manually copy and paste the links yourself.</li>
                <li>Use the notepad provided to note down URLs or any other information.</li>
                <li>
                    The YouTube player accepts any YouTube link that contains a video ID,
                    except for Shorts.
                </li>
                <li>
                    Add or remove players using the control buttons.
                </li>
                <li>If searching doesn't work, it likely means my YouTube Data API has reached its daily limit. Go to YouTube yourself for the time being and try again tomorrow.</li>
                <li>Here, a button for your convenience.</li>
            </ul>
        </div>
    );
};

export default Instruction;