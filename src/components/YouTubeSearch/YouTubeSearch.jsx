import React, { useState } from 'react';

const YouTubeSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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
            } else {
                console.error('Search request failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter search term"
            />
            <button onClick={handleSearch}>Search</button>

            <ul>
                {searchResults.map((video) => (
                    <li key={video.id.videoId}>
                        <h3>{video.snippet.title}</h3>
                        <p>{video.snippet.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default YouTubeSearch;