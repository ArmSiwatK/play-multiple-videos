import React, { useState } from 'react';
import Background from './components/Background/Background';
import YouTubeSearch from './components/YouTubeSearch/YouTubeSearch';
import PlayerArray from './components/PlayerArray/PlayerArray';
import Instructions from './components/Instructions/Instructions';
import './styles/App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');

  const handleVideoUrlCopy = (url) => {
    setVideoUrl(url);
  };

  return (
    <>
      <Background />
      <YouTubeSearch onVideoUrlCopy={handleVideoUrlCopy} />
      <PlayerArray videoUrl={videoUrl} />
      <Instructions />
      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
        <button class="gradient-button" id="youtube-link-button">Go to YouTube</button>
      </a>
    </>
  );
}

export default App;