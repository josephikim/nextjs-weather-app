import React from "react";
import { useRouter } from "next/router";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import { useInput } from "hooks/useInput";
import styles from "styles/SearchBox.module.scss";

const SearchBox: React.FC = () => {
  const router = useRouter();
  const { value: searchInput, bind: bindSearch } = useInput("");

  const handleSearch = (): void => {
    const query = searchInput.trim();
    if (!query) return;

    const path = `/search/location/${query}`;
    router.push(path);
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
