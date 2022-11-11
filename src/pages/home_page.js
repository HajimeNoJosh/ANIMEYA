import { Title, Subtitle, Input, Button } from "../components/export.js";

function HomePage(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    props.setStateObj((prevState) => ({
      ...prevState,
      stateStatus: "creatingOwner",
    }));
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
        <Input
          required={true}
          value={props.username}
          handleChange={handleChange}
        ></Input>
        <Button title="Sign Up"></Button>
      </form>
    </div>
  );
}

export default HomePage;
