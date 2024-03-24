/*
This Comppnent serves to render the SAT Data for our application. With more time I would have 
tried to make one single grid more dynamic rather than having separate grids.
*/

import React, { useState, useEffect, useContext } from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import { SATInfo } from "../../shared/models/SATInfo";
import { getSATInfo } from "../../shared/hooks/useNYCSchools";
import { cleanupSATInfoUtility } from "../../shared/utils/cleanupSATInfoUtility";
import {
  SearchContext,
  NYCSchoolsInfoContext,
} from "../../shared/contexts/NYCSchoolsContext";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const TableTitle = "NYC High Schools SAT Information - 2012";
const SATInfo = () => {
  const { searchTerm } = useContext(SearchContext);
  const { setTableTitle } = useContext(NYCSchoolsInfoContext);
  const [SATResults, setSATResults] = useState<SATInfo[]>();
  const [filteredSATResults, setFilteredSATResults] = useState<SATInfo[]>();
  const [SATResultsColDefs, setSATResultsColDefs] =
    useState<
      { field: keyof SATInfo; headerName: string; suppressSizeToFit: boolean }[]
    >();

  useEffect(() => {
    // api call to get the SAT info
    getSATInfo().then((data: SATInfo[]) => {
      if (data) {
        const results = cleanupSATInfoUtility(data);
        setSATResults(results); // sets the default results
        setFilteredSATResults(results); // initializes the default results
      }
    });
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      SATResults && setFilteredSATResults(SATResults);
    }
    filterSchoolsInfoBySearchTerm(searchTerm);
  }, [searchTerm]);

  // filters the data according to the search term entered by the user
  const filterSchoolsInfoBySearchTerm = (searchValue: string) => {
    if (!SATResults) {
      return;
    }

    const filteredSATResults = SATResults.filter((results) => {
      // returns any matched substring if it exists
      if (
        results.SCHOOL_NAME?.toLowerCase().indexOf(
          searchValue.toLowerCase(),
        ) !== -1
      ) {
        return true;
      }
    });
    setFilteredSATResults(filteredSATResults);
  };

  useEffect(() => {
    setTableTitle(TableTitle); // sets the table title acording to the current grid view

    // column definitions required for the grid
    setSATResultsColDefs([
      {
        headerName: "SCHOOL NAME",
        field: "SCHOOL_NAME",
        suppressSizeToFit: false,
      },
      {
        headerName: "NUM OF TEST TAKERS",
        field: "NUM_OF_SAT_TEST_TAKERS",
        suppressSizeToFit: false,
      },
      {
        headerName: "CRITICAL READING AVG SCORE",
        field: "SAT_CRITICAL_READING_AVG_SCORE",
        suppressSizeToFit: false,
      },
      {
        headerName: "MATH AVG SCORE",
        field: "SAT_MATH_AVG_SCORE",
        suppressSizeToFit: false,
      },
      {
        headerName: "WRITING AVG SCORE",
        field: "SAT_WRITING_AVG_SCORE",
        suppressSizeToFit: false,
      },
    ]);
  }, []);

  return (
    <div>
      <div
        className="ag-theme-quartz-dark" // applying the grid theme
        style={{ height: "calc(100vh - 120px)" }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          pagination={true}
          rowData={filteredSATResults}
          columnDefs={SATResultsColDefs}
        />
      </div>
    </div>
  );
};
export default SATInfo;
