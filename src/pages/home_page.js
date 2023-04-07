import { Title, Subtitle, Calendar } from "../components/export.js";

function HomePage(props) {

  return props.anime.length > 0 ? (
    <div className="page card_page">
      <Title title="Animeya"></Title>
      <Subtitle subtitle="Your premier way to get this seasons anime!" />
      <Calendar anime={props.anime} />
    </div>
  ) : (
    <div className="page">
      <img src="loading.gif" alt="loading" />
    </div>
  );
}

export default HomePage;
