import "./App.css";
import React, { useEffect, useState } from "react";
import GifCard from "./components/GifCard";
import SearchField from "./components/SearchField";
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
      console.log(list.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchGif = async (termToSearch) => {
    const formattedTermToSearch = encodeURIComponent(termToSearch);

    // const searchUrl = `http://api.giphy.com/v1/gifs/search?q=${formattedTermToSearch}&limit=52&api_key=${giphyApiKey}`;
    const searchUrl = `http://api.giphy.com/v1/gifs/search?q=${formattedTermToSearch}&api_key=${giphyApiKey}`;

    try {
      const list = await axios.get(searchUrl);
      console.log(list.data.data);
      setSearchGifsListState(list.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <button onClick={trendingGiphy}>Trending</button>
      <button onClick={searchGif}>Search</button>
      {/* <div className="gifs-containter">
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
      </div> */}
      <SearchField searchGif={searchGif} />
      <div className="gifs-containter">
        {searchGifsList.map((searchGifs) => {
          return (
            <GifCard
              imageSrc={searchGifs.images["480w_still"].url}
              gifUrl={searchGifs.url}
              title={searchGifs.title}
              videoSrc={searchGifs.images.preview.mp4}
              //imageSrc={trandingGif.images.preview_gif.url}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
