import React, { Fragment, Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import { connect } from "react-redux";
import * as actions from "../actions";
import Landing from "./Landing";
import Devices from "./Devices";
import Controller from "./Controller";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Landing} />
          <Route path="/devices" component={Devices}></Route>
          <Route path="/controller" component={Controller}/>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
