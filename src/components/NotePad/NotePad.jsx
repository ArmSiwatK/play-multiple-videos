import React, { useState } from 'react';
import "./NotePad.css";

const NotePad = () => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div className="notepad-container">
            <textarea
                className="notepad-textarea"
                value={text}
                onChange={handleChange}
                rows={10}
                cols={50}
                placeholder="Start typing..."
            />
        </div>
    );
};

export default NotePad;