import React from 'react';
import Background from './components/Background/Background';
import YouTubeSearch from './components/YouTubeSearch/YouTubeSearch';
import PlayerArray from './components/PlayerArray/PlayerArray';
import Instruction from './components/Instruction/Instruction';
import './App.css'

function App() {
  return (
    <>
      <Background />
      <YouTubeSearch />
      <PlayerArray />
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
  )
}

export default App