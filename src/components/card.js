function Card(props) {
  return (
    <img
      src={
        props.anime.data
          ? props.anime.data.Page.media[0].coverImage.extraLarge
          : "https://www.webfx.com/wp-content/uploads/2021/10/generic-image-placeholder.png"
      }
      alt="Filler"
      width="225"
      height="337"
      className="App"
    ></img>
  );
}

export default Card;
