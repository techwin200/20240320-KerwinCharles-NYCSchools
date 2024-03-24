/*
This Comppnent serves to render the High School Information for our application. With more time I would have 
tried to make one single grid more dynamic rather than having separate grids.
*/

import React, { useEffect, useState, useContext } from "react";
import { getSchoolsInfo } from "../../shared/hooks/useNYCSchools";
import { NYCSchool } from "../../shared/models/NYCSchool";
import { AgGridReact } from "ag-grid-react";
import {
  SearchContext,
  NYCSchoolsInfoContext,
} from "../../shared/contexts/NYCSchoolsContext";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const TableTitle = "NYC High Schools Directory - 2017";
const SchoolsInfo = () => {
  const { searchTerm } = useContext(SearchContext);
  const { setTableTitle } = useContext(NYCSchoolsInfoContext);
  const [schoolsInfo, setSchoolsInfo] = useState<NYCSchool[]>();
  const [filteredSchoolsInfo, setFilteredSchoolsInfo] = useState<NYCSchool[]>();
  const [schoolsInfoColDefs, setSchoolInfoColDefs] = useState<
    {
      field: keyof NYCSchool;
      headerName: string;
      suppressSizeToFit: boolean;
    }[]
  >();

  useEffect(() => {
    getSchoolsInfo().then((data: NYCSchool[]) => {
      if (data) {
        setSchoolsInfo(data);
        setFilteredSchoolsInfo(data);
      }
    });
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      schoolsInfo && setFilteredSchoolsInfo(schoolsInfo);
    }
    filterSchoolsInfoBySearchTerm(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setTableTitle(TableTitle);
    setSchoolInfoColDefs([
      {
        headerName: "SCHOOL NAME",
        field: "school_name",
        suppressSizeToFit: false,
      },
      {
        headerName: "PRIMARY ADDRESS",
        field: "primary_address_line_1",
        suppressSizeToFit: false,
      },
      { headerName: "CITY", field: "city", suppressSizeToFit: false },
      {
        headerName: "STATE CODE",
        field: "state_code",
        suppressSizeToFit: false,
      },
      { headerName: "ZIP", field: "zip", suppressSizeToFit: false },
      {
        headerName: "NEIGHBORHOOD",
        field: "neighborhood",
        suppressSizeToFit: false,
      },
      { headerName: "BOROUGH", field: "borough", suppressSizeToFit: false },
      { headerName: "EMAIL", field: "school_email", suppressSizeToFit: false },
      {
        headerName: "PHONE NUMBER",
        field: "phone_number",
        suppressSizeToFit: false,
      },
      {
        headerName: "TOTAL STUDENTS",
        field: "total_students",
        suppressSizeToFit: false,
      },
    ]);
  }, []);

  const filterSchoolsInfoBySearchTerm = (searchValue: string) => {
    if (!schoolsInfo) {
      return;
    }

    const filteredSchoolsInfo = schoolsInfo.filter((school) => {
      if (
        school.school_name.toLowerCase().indexOf(searchValue.toLowerCase()) !==
        -1
      ) {
        return true;
      }
    });
    setFilteredSchoolsInfo(filteredSchoolsInfo);
  };

  return (
    <div>
      <div
        className="ag-theme-quartz-dark" // applying the grid theme
        style={{ height: "calc(100vh - 120px)" }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          pagination={true}
          rowData={filteredSchoolsInfo}
          columnDefs={schoolsInfoColDefs}
        />
      </div>
    </div>
  );
};

export default SchoolsInfo;
