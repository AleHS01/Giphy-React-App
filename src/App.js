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
      console.log(list.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  // const RandomGiphy = async () => {
  //   try {
  //     const list = await axios.get(randomURL);

  //     setRandomGifsListState(list.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const SearchGiphy = async () => {
  //   try {
  //     const list = await axios.get(trendingGiphy);

  //     setSearchGifsListState(list.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <button onClick={trendingGiphy}>Click Me</button>
      <GifCard
        gifUrl="https://giphy.com/gifs/nba-champions-nba-finals-denver-nuggets-KJnvO0Pyt8eTp7I3JR"
        title="Free Cute Dog Photos"
        videoSrc="https://media1.giphy.com/media/KJnvO0Pyt8eTp7I3JR/giphy-loop.mp4?cid=9d5540847d8hwkdyq3a3p08wnfqqlzlnkjjj2548tw9fae0b&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g"
      />
    </div>
  );
}

export default App;
