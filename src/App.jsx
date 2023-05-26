import React from 'react';
import Background from './components/Background/Background';
import YouTubeSearch from './components/YouTubeSearch/YouTubeSearch';
import NotePad from './components/NotePad/NotePad';
import PlayerArray from './components/PlayerArray/PlayerArray';
import Instruction from './components/Instruction/Instruction';
import './App.css'

function App() {
  return (
    <>
      <Background />
      <YouTubeSearch />
      <NotePad />
      <PlayerArray />
      <Instruction />
    </>
  )
}

export default App
