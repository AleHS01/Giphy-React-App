import "./App.css";
import React, { useEffect, useState } from "react";
import GifCard from "./components/GifCard";
import SearchField from "./components/SearchField";
import GifCardPlaceholder from "./components/GifCardPlaceholder";
import axios from "axios";

function App() {
  const giphyApiKey = "tla48KisoBfXSlcpuWaFNzvKs85sjMp0";
  const trendingURl = `http://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}`;
  const randomURL = `http://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}`;

  // useState variables
  const [searchGifsList, setSearchGifsListState] = useState([]);
  const [trandingGifsList, setTrandingGifsListState] = useState([]);
  const [randomGif, setRandomGifState] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const trendingGiphy = async () => {
    setIsLoading(true);
    try {
      const list = await axios.get(trendingURl);
      setTrandingGifsListState(list.data.data);

      setRandomGifState({});
      setSearchGifsListState([]);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const randomGiphy = async () => {
    setIsLoading(true);
    try {
      const gif = await axios.get(randomURL);

      setRandomGifState(gif.data.data);
      setSearchGifsListState([]);
      setTrandingGifsListState([]);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const searchGif = async (termToSearch) => {
    setSearchTerm(termToSearch); //this is just to be save in case the user wants to filter results by language, and the api can be call again
    const formattedTermToSearch = encodeURIComponent(termToSearch);
    const searchUrl = `http://api.giphy.com/v1/gifs/search?q=${formattedTermToSearch}&lang=${selectedLanguage}&api_key=${giphyApiKey}`;

    setIsLoading(true);
    try {
      const list = await axios.get(searchUrl);
      console.log(list);
      setSearchGifsListState(list.data.data);
      setTrandingGifsListState([]);
      setRandomGifState({});
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    trendingGiphy();
  }, []);

  const handleDropdownCategory = (event) => {
    setSelectedCategory(event.target.value);
    searchGif(event.target.value);
  };

  const handleDropdownLanguage = (event) => {
    setSelectedLanguage(event.target.value);
    searchGif(searchTerm);
  };

  if (isLoading) {
    const GifPlaceHolders = [];
    for (let i = 0; i < 54; i++) {
      GifPlaceHolders.push(<GifCardPlaceholder />);
    }

    return (
      <div className="App">
        <button onClick={trendingGiphy}>Trending</button>
        <button onClick={randomGiphy}>Random</button>
        <SearchField searchGif={searchGif} />
        <select value={selectedCategory} onChange={handleDropdownCategory}>
          <option value="what are you doing here">Select A Category</option>
          <option value="love">Love</option>
          <option value="funny">Funny</option>
          <option value="food">Food</option>
          <option value="animals">Animal</option>
          <option value="sport">Sport</option>
          <option value="gaming">Gaming</option>
          <option value="memes">Memes</option>
          <option value="travel">Travel</option>
          <option value="cartoons">Cartoons</option>
          <option value="science">Science</option>
          <option value="dance">Dance</option>
          <option value="phrases">Phrases</option>
        </select>
        <select value={selectedLanguage} onChange={handleDropdownLanguage}>
          {/* <option value="en">Filter by Language</option> */}
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="pt">Portuguese</option>
          <option value="ar">Arabic</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="zh-CN">Chinese</option>
          <option value="hi">Hindi</option>
        </select>
        <div className="gifs-containter">{GifPlaceHolders}</div>
      </div>
    );
  }

  return (
    <div className="App">
      <button onClick={trendingGiphy}>Trending</button>
      <button onClick={randomGiphy}>Random</button>
      <SearchField searchGif={searchGif} />
      <select value={selectedCategory} onChange={handleDropdownCategory}>
        <option value="what are you doing here">Select A Category</option>
        <option value="love">Love</option>
        <option value="funny">Funny</option>
        <option value="food">Food</option>
        <option value="animals">Animal</option>
        <option value="sport">Sport</option>
        <option value="gaming">Gaming</option>
        <option value="memes">Memes</option>
        <option value="travel">Travel</option>
        <option value="cartoons">Cartoons</option>
        <option value="science">Science</option>
        <option value="dance">Dance</option>
        <option value="phrases">Phrases</option>
      </select>
      <select value={selectedLanguage} onChange={handleDropdownLanguage}>
        {/* <option value="en">Filter by Language</option> */}
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="pt">Portuguese</option>
        <option value="ar">Arabic</option>
        <option value="it">Italian</option>
        <option value="ja">Japanese</option>
        <option value="zh-CN">Chinese</option>
        <option value="hi">Hindi</option>
      </select>
      {/* {renderGifInUI()} */}

      {/* Rendering a list of  trending Gif if we get null or undefined nothings happends 
      else if we get an object or anything else we can render the component with the data from the api and the list*/}

      {trandingGifsList.length > 0 && (
        <div className="gifs-containter">
          {trandingGifsList.map((trandingGif) => {
            return (
              <GifCard
                key={trandingGifsList.id}
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
                key={searchGifs.id}
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
