/*
This Search Component allows the user to search the grid for a High School name.
the grid will return results for search terms
*/

import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import { SearchContext } from "../../shared/contexts/NYCSchoolsContext";

const Search = () => {
  const searchContext = useContext(SearchContext);
  const [schoolName, setSchoolName] = useState<string>("");
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSchoolName(event.target.value);
  };

  // used to refresh the text field on table toggle
  useEffect(() => {
    if (searchContext.searchTerm == "") {
      setSchoolName("");
    }
  }, [searchContext.searchTerm]);

  // updates the context with the school name, providing global use for use in other components
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchContext.setSearchTerm(schoolName);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [schoolName]);

  return (
    <div className={""}>
      <TextField
        data-testid="search-field"
        variant="filled"
        placeholder="Search School Name"
        value={schoolName}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default Search;
