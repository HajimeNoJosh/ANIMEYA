import { Title } from "../components/export.js";

function FoundPage(props) {
  return props.anime ? (
    <div className="page card_page">
      <Title title="Animeya"></Title>
    </div>
  ) : (
    <div className="page">
      <img src="loading.gif" alt="loading" />
    </div>
  );
}

export default FoundPage;
