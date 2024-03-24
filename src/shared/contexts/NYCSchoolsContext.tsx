/*
Abstract Context making data available to many components withing having to pass
directly from parent to nested children
*/

import { createContext } from "react";

export const SearchContext = createContext({
  searchTerm: "",
  setSearchTerm: (name: string) => {
    () => name;
  },
});

export const NYCSchoolsInfoContext = createContext({
  tableTitle: "",
  setTableTitle: (title: string) => {
    () => title;
  },
});
