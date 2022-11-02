import { Title, Card } from "../components/export.js";

function CardPage(props) {
  return props.anime.data ? (
    <div className="page card_page">
      <Title title="Animeya"></Title>
      <Card
        stateObj={props.stateObj}
        serverType={props.serverType}
        axios={props.axios}
        anime={props.anime.data.Page.media}
      ></Card>
    </div>
  ) : (
    <div className="page">
      <img src="loading.gif" alt="loading" />
    </div>
  );
}

export default CardPage;
