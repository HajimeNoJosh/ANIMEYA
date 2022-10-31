import { Title, Card } from "../components/export.js";

function CardPage(props) {
  return props.anime.data ? (
    <div className="page card_page">
      <Title title="Animeya"></Title>
      <Card anime={props.anime.data.Page.media}></Card>
    </div>
  ) : (
    <div>loading...</div>
  );
}

export default CardPage;
