/*
This Component represents the site's home page where the grid lives
This Component Ties the Search Feature, a feature toggle button, and the grid
*/

import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import SchoolsInfo from "../components/SchoolsInfo/index";
import SATInfo from "../components/SATInfo/index";
import Search from "../components/Search/index";
import { SearchContext } from "../shared/contexts/NYCSchoolsContext";
import { featureFlag } from "../config";

const NYCSchoolsHome = () => {
  const [name, setName] = useState<string>("");
  const [selectedGrid, setSelectedGrid] = useState("schools");

  // toggles between grid views
  const onClickHandler = () => {
    if (selectedGrid == "schools") {
      setSelectedGrid("SATs");
    } else {
      setSelectedGrid("schools");
    }
    setName("");
  };

  return (
    <SearchContext.Provider
      value={{ searchTerm: name, setSearchTerm: setName }}
    >
      <div>
        <div className="flex flex-row items-center justify-between mt-3 mb-3">
          <div>
            <Search />
          </div>
          <div className={""}>
            {featureFlag.NYCSchoolsTable.toggleFeatureIsOn && (
              <Button variant="outlined" onClick={onClickHandler}>
                Toggle Table
              </Button>
            )}
          </div>
        </div>

        {selectedGrid == "schools" ? <SchoolsInfo /> : <SATInfo />}
      </div>
    </SearchContext.Provider>
  );
};
export default NYCSchoolsHome;
