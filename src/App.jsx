import React, { useState } from 'react';
import Background from './components/Background/Background';
import YouTubeSearch from './components/YouTubeSearch/YouTubeSearch';
import NotePad from './components/NotePad/NotePad';
import PlayerArray from './components/PlayerArray/PlayerArray';
import Instruction from './components/Instruction/Instruction';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');

  const handleVideoUrlCopy = (url) => {
    setVideoUrl(url);
  };

  return (
    <>
      <Background />
      <YouTubeSearch onVideoUrlCopy={handleVideoUrlCopy} />
      <NotePad />
      <PlayerArray videoUrl={videoUrl} />
      <Instruction />
      <a
        href="https://www.youtube.com"
        className="youtube-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        Go to YouTube
      </a>
    </>
  );
}

export default App;