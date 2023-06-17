import { useState } from "react";

const SearchField = (props) => {
  const [termToSearch, setTermToSearch] = useState("");

  const handleTermChange = (input) => {
    console.log(input.target.value);
    setTermToSearch(input.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    props.searchGif(termToSearch);
    //setTermToSearch("");
  };

  return (
    <form action="" onSubmit={handleSearch}>
      <input type="text" onChange={handleTermChange} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchField;
