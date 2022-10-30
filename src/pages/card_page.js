import { Title, Subtitle, Card, Button } from "../components/export.js";

function CardPage(props) {
  return (
    <div className="page card_page">
      <Title title="Animeya"></Title>
      <Card anime={props.anime}></Card>
      <Subtitle
        subtitle={
          props.anime.data
            ? props.anime.data.Page.media[0].title.english
            : "https://www.webfx.com/wp-content/uploads/2021/10/generic-image-placeholder.png"
        }
      ></Subtitle>
      <div className="gap">
        <Button title="Dislike"></Button>
        <Button title="Like"></Button>
      </div>
    </div>
  );
}

export default CardPage;
