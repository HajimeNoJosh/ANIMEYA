import React, { useEffect } from "react";
import { Title, Subtitle, Input, Button } from "../components/export.js";
import { useNavigate } from "react-router-dom";

function JoinRoom(props) {
  let navigate = useNavigate();

  useEffect(() => {
    if (props.stateObj.stateStatus === "initial") {
      navigate("/");
    }
  }, [navigate, props.stateObj.stateStatus]);

  return (
    <div className="page join_room_page">
      <Title title="Animeya"></Title>
      <Subtitle subtitle={"Welcome " + props.username}></Subtitle>
      <Input></Input>
      <Button title="Copy Link"></Button>
      <Button title="Start"></Button>
    </div>
  );
}

export default JoinRoom;
