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
    if (stateObj.anime.length == 0) {
      APICall(setStateObj);
    }

    if (stateObj.stateStatus === "creatingOwner") {
      axios
        .post(`${serverType}/users`, {
          username: username,
          token: stateObj.tempToken,
        })
        .then((res) => {
          setStateObj((prevState) => ({
            ...prevState,
            user: res.data,
            stateStatus: "getAnime",
          }));
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

    if (stateObj.stateStatus === "foundPage") {
      const params = {
        room_token: stateObj.user.room_token,
        user_id: stateObj.user.id,
      };
      // axios
      //   .get(`${serverType}/anime_list`, {params})
      //   .then((res) => {
      //     setStateObj((prevState) => ({
      //       ...prevState,
      //       anime: res.data,
      //     }));
      //   })
      navigate("/found")
    }

    if (stateObj.stateStatus === "initial") {
      navigate("/");
    }
  }, [navigate, serverType, setStateObj, stateObj.stateStatus, username, stateObj.tempToken, stateObj.user.id, stateObj.user.room_token, stateObj.anime.data]);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <HomePage
            stateObj={stateObj}
            serverType={serverType}
            axios={axios}
            anime={stateObj.anime}
            setStateObj={setStateObj}
          />
        }
      />
      <Route path="joinRoom">
        <Route
          path=":token"
          element={
            <JoinRoom
              setStateObj={setStateObj}
              username={username}
              stateObj={stateObj}
            />
          }
        />
      </Route>
      <Route
        exact
        path="/card"
        element={
          <CardPage
            stateObj={stateObj}
            serverType={serverType}
            axios={axios}
            anime={stateObj.anime}
            setStateObj={setStateObj}
          />
        }
      />
      <Route path="/waiting" element={<WaitingPage />} />
      <Route path="/failed" element={<FailedPage />} />
      <Route exact path="/found" element={<FoundPage anime={stateObj.anime} />} />
    </Routes>
  );
}

export default AllRoutes;
