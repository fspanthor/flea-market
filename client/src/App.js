import React, { useState, useEffect } from "react";

function App() {
  const [state, setState] = useState(0);

  const env = process.env.NODE_ENV;
  const prodUrl = "https://flea-market-wars.herokuapp.com/";

  const serverAddress =
    env === "production" ? prodUrl : "http://localhost:5000/";

  const getHandler = () => {
    fetch(serverAddress, { credentials: "include" }).then((response) =>
      console.log(response)
    );
  };
  const postHandler = () => {
    fetch(serverAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count: state }),
      credentials: "include",
    }).then((res) => res.json().then((data) => setState(data)));
  };

  const setPrices = () => {
    fetch(serverAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        function: "SET_PRICES",
        //params: { variable1: "test", variable2: "test2" },
      }),
      credentials: "include",
    }).then((res) => res.json().then((data) => console.log(data)));
  };

  useEffect(() => {
    console.log(state);
  });

  return (
    <div className="App">
      <button onClick={postHandler}>post</button>
      <button onClick={getHandler}>get</button>
      <button onClick={setPrices}>set prices</button>
    </div>
  );
}

export default App;
