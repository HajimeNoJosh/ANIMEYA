import { Title, Subtitle, Input, Button } from "../components/export.js";

function JoinRoom(props) {
  const onClick = () => {
    props.setStateObj((prevState) => ({
      ...prevState,
      stateStatus: "getAnime",
    }));
  };

  return (
    <div className="page join_room_page">
      <Title title="Animeya"></Title>
      <Subtitle subtitle={"Welcome " + props.username}></Subtitle>
      <Input></Input>
      <Button title="Copy Link"></Button>
      <Button onClick={onClick} title="Start"></Button>
    </div>
  );
}

export default JoinRoom;
