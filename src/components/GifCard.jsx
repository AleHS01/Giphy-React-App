const GifCard = (props) => {
  console.log(props.videoSrc);
  return (
    <a
      className="gif-card"
      href={props.gifUrl}
      target="_blank"
      rel="noreferrer"
    >
      <div className="video-container">
        <img
          src={props.imageSrc}
          alt={props.title}
          className="gif-card-image"
        />
        <video
          autoPlay
          loop
          muted
          className="gif-card-video"
          src={props.videoSrc}
        ></video>
      </div>
      <h3 className="gif-card-title">{props.title}</h3>
    </a>
  );
};

export default GifCard;
