import { Title, Subtitle, Input, Button } from "../components/export.js";
import { useNavigate } from "react-router-dom";

function HomePage(props) {
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    props.setStateObj((prevState) => ({
      ...prevState,
      stateStatus: "creating owner",
    }));
    navigate("/join_room");
  };

  const handleChange = (event) => {
    props.setUsername(event.target.value);
  };

  return (
    <div className="page sign_up_page">
      <Title title="Animeya"></Title>
      <Subtitle subtitle="Make all your dreams come true"></Subtitle>
      <Title title="Sign Up"></Title>
      <form onSubmit={handleSubmit}>
        <Input value={props.username} handleChange={handleChange}></Input>
        <Button needs_link={true} title="Sign Up"></Button>
      </form>
    </div>
  );
}

export default HomePage;
