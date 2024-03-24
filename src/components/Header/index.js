/* 
The Header Component is where the grid title lives.
*/

import React, { useContext } from "react";
import { NYCSchoolsInfoContext } from "../../shared/contexts/NYCSchoolsContext";

const Header = () => {
  const { tableTitle } = useContext(NYCSchoolsInfoContext);

  return (
    <div className="grid justify-items-center">
      <h1>{tableTitle}</h1>
      <div className=""></div>
      <div className=""></div>
    </div>
  );
};

export default Header;
