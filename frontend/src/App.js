import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'

function App() {
  const [myState, setMyState] = useState({ apiRespones: "" });

  useEffect(() => {
    fetch("http://localhost:9000/gro")
    .then(res => res.text())
    .then(res => setMyState({ apiRespones: res }))
    .catch(err => err);
  }, []) 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>{myState.apiRespones}</p>
    </div>
  );
}

export default App;
