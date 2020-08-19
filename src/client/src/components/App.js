import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";


class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <Route path="/" component={Dashboard} />
      </BrowserRouter>
    );
  }
}

export default App;
