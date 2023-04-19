import { Title, Subtitle } from "../components/export.js";
import BuildCalendar from "./build_calendar.js";

function HomePage(props) {
  return props.stateObj.stateStatus === "finished_fetching_anime" ? (
    <div className="page card_page">
      <Title title="Animeya"></Title>
      <Subtitle subtitle="Your premier way to get this seasons anime!" />
      <BuildCalendar anime={props.anime} />
    </div>
  ) : (
    <div className="page">
      <img src="loading.gif" alt="loading" />
    </div>
  );
}

export default HomePage;
