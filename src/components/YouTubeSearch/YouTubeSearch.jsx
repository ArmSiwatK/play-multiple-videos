import React, { useState } from 'react';
import './YouTubeSearch.css';

const YouTubeSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const [maxResults, setMaxResults] = useState();

    const maxTitleLength = 60;



    const handleSearch = async () => {
        try {
            const response = await fetch('https://backend-play-multiple-videos.onrender.com/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchTerm, maxResults }),
            });

            if (response.ok) {
                const { items } = await response.json();
                setSearchResults(items);
                setShowResults(true);
            } else {
                throw new Error('Search request failed');
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

    const handleMaxResultsChange = (e) => {
        const input = e.target.value;
        if (input === '' || (parseInt(input) >= 1 && parseInt(input) <= 20)) {
            setMaxResults(input);
        }
    };

    const truncateTitle = (title) => {
        if (title.length <= maxTitleLength) {
            return title;
        } else {
            return `${title.substring(0, maxTitleLength)}...`;
        }
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
                    className="search-query-input"
                />
                <button onClick={handleSearch} className="button-search">
                    Search
                </button>
                <button onClick={handleClearResults} className="button-clear">
                    Clear
                </button>
                <input
                    type="number"
                    value={maxResults}
                    onChange={handleMaxResultsChange}
                    placeholder="Max Results"
                    className="results-number-input"
                />
            </div>

            {showResults && (
                <ul>
                    {searchResults.map((video) => (
                        <li key={video.id.videoId}>
                            <div className="card" onClick={() => handleCardClick(video.id.videoId)}>
                                <img src={video.snippet.thumbnails.default.url} alt="Video Thumbnail" />
                                <h3>{truncateTitle(video.snippet.title)}</h3>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default YouTubeSearch;