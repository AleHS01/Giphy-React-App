import "./App.css";
import React, { useEffect, useState } from "react";
import GifCard from "./components/GifCard";
import SearchField from "./components/SearchField";
import GifCardPlaceholder from "./components/GifCardPlaceholder";
import Paginantion from "./components/Paginantion";
import axios from "axios";

function App() {
  const giphyApiKey = "tla48KisoBfXSlcpuWaFNzvKs85sjMp0";
  const trendingURl = `https://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}&limit=50`;
  const randomURL = `https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}`;

  // useState variables
  const [searchGifsList, setSearchGifsListState] = useState([]);
  const [trandingGifsList, setTrandingGifsListState] = useState([]);
  const [randomGif, setRandomGifState] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gifPerPage, setGifPerPage] = useState(28);
  const [currentItems, setCurrentItems] = useState([]);
  const trendingGiphy = async () => {
    setIsLoading(true);
    try {
      let offset = 0;
      let gifs = [];

      while (gifs.length < 112) {
        const response = await axios.get(`${trendingURl}&offset=${offset}`);
        const data = response.data.data;
        gifs = gifs.concat(data);
        offset += 50;

        if (data.length < 50) {
          // Break the loop if there are no more GIFs
          break;
        }
      }

      setTrandingGifsListState(gifs.slice(0, 112));
      setRandomGifState({});
      setSearchGifsListState([]);
      setSelectedCategory("");
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const randomGiphy = async () => {
    setIsLoading(true);
    try {
      const gif = await axios.get(randomURL);

      setRandomGifState(gif.data.data);
      setSearchGifsListState([]);
      setTrandingGifsListState([]);
      setCurrentItems([]);
      setSelectedCategory("");
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
    const searchUrl = `https://api.giphy.com/v1/gifs/search?q=${formattedTermToSearch}&lang=${selectedLanguage}&api_key=${giphyApiKey}&limit=50`;

    setIsLoading(true);
    try {
      let offset = 0;
      let gifs = [];

      while (gifs.length < 112) {
        const response = await axios.get(`${searchUrl}&offset=${offset}`);
        const data = response.data.data;
        gifs = gifs.concat(data);
        offset += 50;

        if (data.length < 50) {
          // Break the loop if there are no more GIFs
          break;
        }
      }

      setSearchGifsListState(gifs.slice(0, 112));
      setTrandingGifsListState([]);
      setRandomGifState({});
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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

  const totalItemsCount = () => {
    if (trandingGifsList.length > 0) {
      return trandingGifsList.length;
    } else if (searchGifsList.length > 0) {
      return searchGifsList.length;
    } else {
      return 0;
    }
  };

  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const lastGifIndex = currentPage * gifPerPage;
    const firstGifIndex = lastGifIndex - gifPerPage;

    if (trandingGifsList.length > 0 && searchGifsList.length === 0) {
      setCurrentItems(trandingGifsList.slice(firstGifIndex, lastGifIndex));
    } else if (searchGifsList.length > 0 && trandingGifsList.length === 0) {
      setCurrentItems(searchGifsList.slice(firstGifIndex, lastGifIndex));
    } else {
      setCurrentItems([]);
    }
  }, [currentPage, gifPerPage, searchGifsList, trandingGifsList]);

  if (isLoading) {
    const GifPlaceHolders = [];
    if (randomGif.url) {
      GifPlaceHolders.push(<GifCardPlaceholder />);
    } else {
      for (let i = 0; i < 52; i++) {
        GifPlaceHolders.push(<GifCardPlaceholder />);
      }
    }

    return (
      <div className="App">
        <header>
          <button onClick={trendingGiphy}>Trending GIFS</button>
          <button onClick={randomGiphy}>Random GIF</button>
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
        </header>
        <div className="note">
          <p>
            For website performance when you hover over an individual gif, the
            preview start playing.
          </p>
        </div>
        <Paginantion
          currentPage={currentPage}
          gifPerPage={gifPerPage}
          totalItems={totalItemsCount()}
          pageSelected={pageSelected}
        />
        <div className="gifs-containter">{GifPlaceHolders}</div>
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <button onClick={trendingGiphy}>Trending GIFS</button>
        <button onClick={randomGiphy}>Random GIF</button>
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
      </header>
      <div className="note">
        <p>
          For website performance when you hover over an individual gif, the
          preview start playing.
        </p>
      </div>
      <Paginantion
        currentPage={currentPage}
        gifPerPage={gifPerPage}
        totalItems={totalItemsCount()}
        pageSelected={pageSelected}
      />
      {currentItems.length > 0 && (
        <div className="gifs-containter">
          {currentItems.map((gif, index) => {
            return (
              <GifCard
                key={`${gif.id}_${index}`}
                gifUrl={gif.url}
                title={gif.title}
                videoSrc={gif.images.preview.mp4}
                imageSrc={gif.images["480w_still"].url}
              />
            );
          })}
        </div>
      )}
      {randomGif.url && (
        <div className="gifs-containter">
          <GifCard
            imageSrc={randomGif.images["480w_still"].url}
            gifUrl={randomGif.url}
            title={randomGif.title}
            videoSrc={randomGif.images.preview.mp4}
          />
        </div>
      )}
    </div>
  );
}

export default App;
