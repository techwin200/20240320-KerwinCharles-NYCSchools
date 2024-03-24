import React, { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import "./index.css"; // Importing Tailwind
import { NYCSchoolsInfoContext } from "./shared/contexts/NYCSchoolsContext";
import { ErrorBoundary } from "react-error-boundary";

const FallBack = () => {
  return <div>There Was An Error</div>;
};

const App = () => {
  const [tableTitle, setTableTitle] = useState<string>("");

  return (
    <div className="mr-50 ml-50 mb-0 pb-0">
      <NYCSchoolsInfoContext.Provider value={{ tableTitle, setTableTitle }}>
        <Header />

        <ErrorBoundary FallbackComponent={FallBack}>
          <div className="m-3">
            <Outlet />
          </div>
        </ErrorBoundary>
      </NYCSchoolsInfoContext.Provider>
    </div>
  );
};

export default App;
