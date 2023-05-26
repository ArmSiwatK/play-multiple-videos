import React, { useState } from 'react';
import './YouTubeSearch.css';

const YouTubeSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(true);



    const handleSearch = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchTerm }),
            });

            if (response.ok) {
                const data = await response.json();
                setSearchResults(data.items);
                setShowResults(true);
            } else {
                console.error('Search request failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleCardClick = async (videoId) => {
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

        try {
            await navigator.clipboard.writeText(videoUrl);
            console.log('Video URL copied to clipboard:', videoUrl);
        } catch (error) {
            console.error('Failed to copy video URL:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleClearResults = () => {
        setSearchResults([]);
        setShowResults(false);
    };



    return (
        <div className="container">
            <div className="input-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter search term"
                />
                <button onClick={handleSearch} className="button-search">Search</button>
                <button onClick={handleClearResults} className="button-clear">Clear</button>
            </div>

            {showResults && (
                <ul>
                    {searchResults.map((video) => (
                        <li key={video.id.videoId}>
                            <div
                                className="card"
                                onClick={() => handleCardClick(video.id.videoId)}
                            >
                                <img
                                    src={video.snippet.thumbnails.default.url}
                                    alt="Video Thumbnail"
                                />
                                <h3>{video.snippet.title}</h3>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default YouTubeSearch;