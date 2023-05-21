import React from 'react';
import Background from './components/Background/Background';
import NotePad from './components/NotePad/NotePad';
import PlayerArray from './components/PlayerArray/PlayerArray';
import Instruction from './components/Instruction/Instruction';
import './App.css'

function App() {
  return (
    <>
      <Background />
      <a
        href="https://www.youtube.com"
        className="youtube-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        Go to YouTube
      </a>
      <NotePad />
      <PlayerArray />
      <Instruction />
    </>
  )
}

export default App
