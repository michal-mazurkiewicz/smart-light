import React, { Fragment, Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";


class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Route path="/" component={Dashboard} />
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
