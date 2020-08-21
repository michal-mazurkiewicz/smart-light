import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";



function App () {

    return (
      <BrowserRouter>
          <Route path="/" component={Dashboard} />
      </BrowserRouter>
    );

}

export default App;
