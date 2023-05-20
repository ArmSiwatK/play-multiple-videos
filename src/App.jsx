import React from 'react';
import NotePad from './components/NotePad/NotePad';
import PlayerArray from './components/PlayerArray/PlayerArray';
import Background from './components/Background/Background';
import './App.css'

function App() {
  return (
    <>
      <Background />
      <NotePad />
      <PlayerArray />
    </>
  )
}

export default App
