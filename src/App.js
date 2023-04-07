import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./sass/main.scss";

import AllRoutes from "./pages/routes";

const base_url = window.location.origin;
const serverType = base_url.includes("localhost")
  ? "http://localhost:3000"
  : "https://animeya.herokuapp.com";

function App() {
  const [username, setUsername] = useState("");
  const [stateObj, setStateObj] = useState({
    stateStatus: "initial",
    tempToken: "",
    user: {},
    anime: [],
  });

  return (
    <Router>
      <div className="app">
        <AllRoutes
          username={username}
          setUsername={setUsername}
          stateObj={stateObj}
          setStateObj={setStateObj}
          serverType={serverType}
        ></AllRoutes>
      </div>
    </Router>
  );
}

export default App;
