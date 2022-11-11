import { Title, Subtitle, Button } from "../components/export.js";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

function JoinRoom({ setStateObj, username, stateObj }) {
  const { token } = useParams();

  const onClick = () => {
    setStateObj((prevState) => ({
      ...prevState,
      stateStatus: "getAnime",
    }));
  };

  useEffect(() => {
    setStateObj((prevState) => ({
      ...prevState,
      tempToken: token,
    }));
  }, [token, setStateObj]);

  return (
    <div className="page join_room_page">
      <Title title="Animeya"></Title>
      <Subtitle
        subtitle={"Welcome " + username + "! Invite your friends:"}
      ></Subtitle>
      http://localhost:3001/joinRoom/{stateObj.user.room_token}
      <Button title="Copy Link"></Button>
      <Button onClick={onClick} title="Start"></Button>
    </div>
  );
}

export default JoinRoom;
