import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import "./sass/main.scss";
import {
  Title,
  Subtitle,
  Button,
  Card,
  Paragraph,
} from "./components/export.js";
import HomePage from "./pages/home_page";
import JoinRoom from "./pages/join_room";
import CardPage from "./pages/card_page";
import WaitingPage from "./pages/waiting_page";
import FailedPage from "./pages/failed_page";
import FoundPage from "./pages/found_page";

const base_url = window.location.origin;
const serverType = base_url.includes("localhost")
  ? "http://localhost:3000"
  : "https://animeya.herokuapp.com";

function App() {
  const [username, setUsername] = useState("");
  const [stateObj, setStateObj] = useState({
    stateStatus: "initial",
    user: {},
    anime: {},
  });

  useEffect(() => {
    if (stateObj.stateStatus === "creating owner") {
      axios.post(`${serverType}/owner`, { username }).then((res) => {
        setStateObj((prevState) => ({
          ...prevState,
          stateStatus: "joining room",
        }));
        setStateObj((prevState) => ({ ...prevState, user: res.data }));
      });
    }
  }, [stateObj.stateStatus, username]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                username={username}
                setUsername={setUsername}
                setStateObj={setStateObj}
              />
            }
          />
          <Route
            path="/join_room"
            element={<JoinRoom token={stateObj.user.token} />}
          />
          <Route path="/card" element={<CardPage />} />
          <Route path="/waiting" element={<WaitingPage />} />
          <Route path="/failed" element={<FailedPage />} />
          <Route path="/found" element={<FoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
