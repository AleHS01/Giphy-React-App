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
  const [randomGif, setRandomGifState] = useState({});

  const trendingGiphy = async () => {
    try {
      const list = await axios.get(trendingURl);

      setTrandingGifsListState(list.data.data);

      setRandomGifState({});
      setSearchGifsListState([]);
    } catch (error) {
      console.error(error);
    }
  };

  const randomGiphy = async () => {
    try {
      const gif = await axios.get(randomURL);

      setRandomGifState(gif.data.data);

      setSearchGifsListState([]);
      setTrandingGifsListState([]);
    } catch (error) {
      console.error(error);
    }
  };

  const searchGif = async (termToSearch) => {
    const formattedTermToSearch = encodeURIComponent(termToSearch);

    const searchUrl = `http://api.giphy.com/v1/gifs/search?q=${formattedTermToSearch}&api_key=${giphyApiKey}`;

    try {
      const list = await axios.get(searchUrl);

      setSearchGifsListState(list.data.data);
      setTrandingGifsListState([]);
      setRandomGifState({});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    trendingGiphy();
  }, []);

  return (
    <div className="App">
      <button onClick={trendingGiphy}>Trending</button>
      {/* <button onClick={searchGif}>Search</button> */}
      <button onClick={randomGiphy}>Random</button>
      <SearchField searchGif={searchGif} />
      {/* {renderGifInUI()} */}

      {/* Rendering a list of  trending Gif if we get null or undefined nothings happends 
      else if we get an object or anything else we can render the component with the data from the api and the list*/}

      {trandingGifsList.length > 0 && (
        <div className="gifs-containter">
          {trandingGifsList.map((trandingGif) => {
            return (
              <GifCard
                gifUrl={trandingGif.url}
                title={trandingGif.title}
                videoSrc={trandingGif.images.preview.mp4}
                imageSrc={trandingGif.images["480w_still"].url}
              />
            );
          })}
        </div>
      )}

      {/* Rendering a list of  search Gif if we get null or undefined nothings happends 
      else if we get an object or anything else we can render the component with the data from the api and the list*/}
      {searchGifsList.length > 0 && (
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
      )}

      {/* Rendering single Random Gif if we get null or undefined nothings happends 
      else if we get a string or anything else we can render the component with the data from the api */}
      {randomGif.url && (
        <div className="gifs-containter">
          <GifCard
            imageSrc={randomGif.images["480w_still"].url}
            gifUrl={randomGif.url}
            title={randomGif.title}
            videoSrc={randomGif.images.preview.mp4}
            //imageSrc={trandingGif.images.preview_gif.url}
          />
        </div>
      )}
    </div>
  );
}

export default App;
