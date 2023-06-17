import React, { Component } from "react";

const GifCard = (props) => {
  console.log(props.videoSrc);
  return (
    <a className="gif-card" href={props.gifUrl} target="_blank">
      <div className="video-container">
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
