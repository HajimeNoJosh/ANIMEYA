import { Title, Subtitle, Paragraph } from "../components/export.js";

function WaitingPage(props) {
  return (
    <div className="page waiting_page">
      <Title title="Animeya"></Title>
      <Subtitle subtitle="Please Wait"></Subtitle>
      <Paragraph text="Please wait until the members of your party have finished liking or disliking their anime"></Paragraph>
    </div>
  );
}

export default WaitingPage;
