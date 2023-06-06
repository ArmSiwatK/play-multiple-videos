import React from 'react';
import './Instructions.css';

const Instruction = () => {
    return (
        <div className="instruction-container">
            <h1>How to use:</h1>
            <ul>
                <li>Search for YouTube videos. Click on one to assign them to an empty YouTube player, or manually copy and paste the links yourself.</li>
                <li>The YouTube player accepts any YouTube link that contains a video ID.</li>
                <li>Add or remove players using the control buttons.</li>
                <li>Searching the first time around will always be slow. Patience.</li>
                <li>If you don't see a loading icon when you search, it most likely means my YouTube Data API has reached its daily limit. Go to YouTube yourself for the time being and try again tomorrow.</li>
                <li>Here, a button for your convenience.</li>
            </ul>
        </div>
    );
};

export default Instruction;