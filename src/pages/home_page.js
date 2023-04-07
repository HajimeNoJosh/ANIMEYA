import { Title, Card, Calendar } from "../components/export.js";

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

  return props.anime.length > 0 ? (
    <div className="page card_page">
      <Title title="Animeya"></Title>
      <Calendar anime={props.anime} />
    </div>
  ) : (
    <div className="page">
      <img src="loading.gif" alt="loading" />
    </div>
  );
}

export default HomePage;
