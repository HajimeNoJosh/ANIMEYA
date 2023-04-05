import { Fragment } from "react";
import { Subtitle, Button } from "../components/export.js";

function Card(props) {
  let currentIndex = 0;
  let currentAnimeId = props.anime[currentIndex].id;
  let air_dates = props.anime[currentIndex].airingSchedule.nodes;
  let currentMalId = props.anime[currentIndex].idMal

  const votedAnime = (type) => {
    console.log(air_dates)
    currentIndex++;
    if (typeof props.anime[currentIndex] === "undefined") {
      props.setStateObj((prevState) => ({
        ...prevState,
        stateStatus: "foundPage",
      }));
    } else {
      let el = document.getElementById(`anime-card-${currentAnimeId}`);
      el.classList.add("hidden");
  
      currentAnimeId = props.anime[currentIndex].id;
      el = document.getElementById(`anime-card-${currentAnimeId}`);
      el.classList.remove("hidden");
      const params = {
        room_token: props.stateObj.user.room_token,
        swipe_type: type,
        anime_id: currentAnimeId,
        user_id: props.stateObj.user.id,
        mal_id: currentMalId,
        air_dates: air_dates
      };
      currentMalId = props.anime[currentIndex].idMal;
      air_dates = props.anime[currentIndex].airingSchedule.nodes;
      
      props.axios.post(`${props.serverType}/swipes`, params).then((res) => {
      });
    }
  };

  return props.anime.map((anime, i) => {
    return (
      <div
        key={i}
        id={`anime-card-${anime.id}`}
        className={i === 0 ? "card-page--card" : "card-page--card hidden"}
      >
        <img
          src={anime.coverImage.extraLarge}
          alt="Filler"
          width="225"
          height="337"
          className="App"
        ></img>
        <Subtitle subtitle={anime.title.english}></Subtitle>
        <div className="gap">
          <Button
            onClick={() => votedAnime("not_interested")}
            title="Not watching this season"
          ></Button>
          <Button onClick={() => votedAnime("want_to_watch")} title="Want to watch this sesaon"></Button>
        </div> : <Fragment></Fragment>
      </div>
    );
  });
}

export default Card;
