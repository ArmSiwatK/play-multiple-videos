import React, { useState } from 'react';
import './YouTubeSearch.css';

const YouTubeSearch = ({ onVideoUrlCopy }) => {

    /*
    < --------------- States and Variable --------------- >
    */

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(true);
    const [maxResults, setMaxResults] = useState();

    const [previousSearchTerm, setPreviousSearchTerm] = useState('');
    const [previousMaxResults, setPreviousMaxResults] = useState('');

    const maxTitleLength = 60;

    /*
    < --------------- Functions --------------- >
    */

    const handleSearch = async () => {
        try {
            if (searchTerm === previousSearchTerm && maxResults === previousMaxResults) {
                return;
            }

            handleClearResults();
            setIsLoading(true);

            setPreviousSearchTerm(searchTerm);
            setPreviousMaxResults(maxResults);

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ searchTerm, maxResults }),
            });

            if (response.ok) {
                const { items } = await response.json();
                setSearchResults(items);
            } else {
                throw new Error('Search request failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setIsLoading(false);
            setShowResults(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleMaxResultsChange = (e) => {
        const input = e.target.value;
        if (input === '' || (parseInt(input) >= 1 && parseInt(input) <= 20)) {
            setMaxResults(input);
        }
    };

    const handleCardClick = async (videoId) => {
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        onVideoUrlCopy(videoUrl);
    };

    const handleClearResults = () => {
        setSearchTerm('');
        setSearchResults([]);
        setShowResults(false);
        setPreviousSearchTerm('');
        setPreviousMaxResults('');
    };

    const truncateTitle = (title) => (title.length <= maxTitleLength ? title : `${title.substring(0, maxTitleLength)}...`);

    /*
    < --------------- JSX Structure --------------- >
    */

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

            {isLoading && (
                <div className="search-loading-icon">
                    <div className="search-spinner"></div>
                </div>
            )}

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