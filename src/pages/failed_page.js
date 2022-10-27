import {
  Title,
  Subtitle,
  Paragraph,
  Button,
  Card,
} from "../components/export.js";

function FailedPage(props) {
  return (
    <div className="page failed_page">
      <Title title="Animeya"></Title>
      <Subtitle subtitle="Match Failed"></Subtitle>
      <Paragraph text="Sorry no one could agree on any anime"></Paragraph>
      <Button title="Restart"></Button>
      <Paragraph text="OR"></Paragraph>
      <Paragraph text="Check out these anime that people did like!"></Paragraph>
      <div>
        <Card></Card>
        <Subtitle subtitle="One Piece"></Subtitle>
        <Paragraph text="1 like"></Paragraph>
      </div>
    </div>
  );
}

export default FailedPage;
