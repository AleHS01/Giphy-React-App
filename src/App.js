import "./App.css";
import React, { useEffect, useState } from "react";
import GifCard from "./components/GifCard";
import axios from "axios";

function App() {
  const giphyApiKey = "tla48KisoBfXSlcpuWaFNzvKs85sjMp0";
  const trendingURl = `http://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}`;
  const randomURL = `http://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}`;

  // useState variables
  const [searchGifsList, setSearchGifsListState] = useState([]);
  const [trandingGifsList, setTrandingGifsListState] = useState([]);
  const [randomGifsList, setRandomGifsListState] = useState([]);

  const trendingGiphy = async () => {
    try {
      const list = await axios.get(trendingURl);

      setTrandingGifsListState(list.data.data);
      console.log(list.data.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <button onClick={trendingGiphy}>Click Me</button>
      <div className="gifs-containter">
        {trandingGifsList.map((trandingGif) => {
          return (
            <GifCard
              gifUrl={trandingGif.url}
              title={trandingGif.title}
              videoSrc={trandingGif.images.preview.mp4}
              //imageSrc={trandingGif.images.preview_gif.url}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
