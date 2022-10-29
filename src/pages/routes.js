import React, { useEffect } from "react";
import { APICall } from "../services/api.js";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";

import HomePage from "../pages/home_page";
import JoinRoom from "../pages/join_room";
import CardPage from "../pages/card_page";
import WaitingPage from "../pages/waiting_page";
import FailedPage from "../pages/failed_page";
import FoundPage from "../pages/found_page";

function AllRoutes({
  username,
  setUsername,
  stateObj,
  setStateObj,
  serverType,
}) {
  let navigate = useNavigate();

  useEffect(() => {
    if (stateObj.stateStatus === "creatingOwner") {
      axios.post(`${serverType}/owner`, { username }).then((res) => {
        setStateObj((prevState) => ({
          ...prevState,
          user: res.data,
          stateStatus: "joiningRoom",
        }));
        navigate("/joinRoom");
      });
    }

    if (stateObj.stateStatus === "getAnime") {
      APICall(setStateObj);
      setStateObj((prevState) => ({
        ...prevState,
        stateStatus: "showCards",
      }));
      navigate("/card");
    }

    if (stateObj.stateStatus === "initial") {
      navigate("/");
    }
  }, [stateObj.stateStatus, username]);

  return (
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
        path="/joinRoom"
        element={
          <JoinRoom
            setStateObj={setStateObj}
            username={username}
            stateObj={stateObj}
          />
        }
      />
      <Route path="/card" element={<CardPage />} />
      <Route path="/waiting" element={<WaitingPage />} />
      <Route path="/failed" element={<FailedPage />} />
      <Route path="/found" element={<FoundPage />} />
    </Routes>
  );
}

export default AllRoutes;
