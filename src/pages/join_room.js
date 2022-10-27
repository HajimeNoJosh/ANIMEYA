import { Title, Subtitle, Input, Button } from "../components/export.js";

function JoinRoom(props) {
  return (
    <div className="page join_room_page">
      <Title title="Animeya"></Title>
      <Subtitle subtitle={"share link: " + props.token}></Subtitle>
      <Input></Input>
      <Button title="Copy Link"></Button>
      <Button title="Start"></Button>
    </div>
  );
}

export default JoinRoom;
