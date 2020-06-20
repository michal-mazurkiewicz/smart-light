import React, { Fragment } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import "../App.css";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar/>
        <Route path="/dashboard" component={Dashboard} />
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
