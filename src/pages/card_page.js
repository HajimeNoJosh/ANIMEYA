import { Title, Subtitle, Card, Button } from "../components/export.js";

function CardPage(props) {
  return (
    <div className="page card_page">
      <Title title="Animeya"></Title>
      <Card></Card>
      <Subtitle subtitle="One Piece"></Subtitle>
      <div className="gap">
        <Button title="Dislike"></Button>
        <Button title="Like"></Button>
      </div>
    </div>
  );
}

export default CardPage;
