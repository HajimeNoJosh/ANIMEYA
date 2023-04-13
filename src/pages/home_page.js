import { Fragment } from "react";
import { Title, Subtitle, Calendar, MobileCalendar } from "../components/export.js";

function HomePage(props) {
  const isMobile = true //window.innerWidth < 900; // Example threshold for mobile screens

  return props.stateObj.finished_fetching_anime ? (
    <div className="page card_page">
      {isMobile ? (
        // Render mobile component
        <Fragment>
          <Title title="Animeya"></Title>
          <Subtitle subtitle="Your premier way to get this seasons anime!" />
          <MobileCalendar anime={props.anime} />
        </Fragment>
      ) : (
        // Render web component
        <Fragment>
          <Title title="Animeya"></Title>
          <Subtitle subtitle="Your premier way to get this seasons anime!" />
          <Calendar anime={props.anime} />
        </Fragment>
      )}
    </div>
  ) : (
    <div className="page">
      <img src="loading.gif" alt="loading" />
    </div>
  );
}

export default HomePage;
