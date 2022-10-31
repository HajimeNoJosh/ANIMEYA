import { Subtitle, Button } from "../components/export.js";

function Card(props) {
  let currentIndex = 0;
  let currentAnimeId = props.anime[currentIndex].id;

  const votedAnime = (type) => {
    currentIndex++;
    let el = document.getElementById(`anime-card-${currentAnimeId}`);
    el.classList.add("hidden");

    currentAnimeId = props.anime[currentIndex].id;
    el = document.getElementById(`anime-card-${currentAnimeId}`);
    el.classList.remove("hidden");
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
            onClick={() => votedAnime("dislike")}
            title="Dislike"
          ></Button>
          <Button onClick={() => votedAnime("like")} title="Like"></Button>
        </div>
      </div>
    );
  });
}

export default Card;
