import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [state, setState] = useState(0);

  const getHandler = () => {
    fetch("http://localhost:5000/").then((response) => console.log(response));
  };
  const postHandler = () => {
    fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count: state }),
    }).then((res) => res.json().then((data) => setState(data)));
  };

  useEffect(() => {
    console.log(state);
  });

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
        <button onClick={postHandler}>post</button>
        <button onClick={getHandler}>get</button>
      </header>
    </div>
  );
}

export default App;
