import React from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import { useInput } from "hooks/useInput";
import styles from "styles/SearchBox.module.scss";

const SearchBox: React.FC = () => {
  const { value: searchInput, bind: bindSearch } = useInput("");

  const handleSearch = async (): Promise<void> => {
    const input = searchInput.trim();
    if (!input) return;

    const searchUrl = `http://localhost:3000/api/search?query=${input}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    console.log({ data });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <InputGroup className={styles.searchBox}>
      <FormControl
        {...bindSearch}
        placeholder="enter city, country or zip code"
        onKeyPress={(e) => handleKeyPress(e)}
      />
      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchBox;
