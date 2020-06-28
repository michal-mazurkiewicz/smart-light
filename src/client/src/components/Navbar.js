import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Navbar extends Component {
  renderContent() {
    const { authUser } = this.props;
    switch (authUser) {
      case null:
        return;
      case false:
        return <ul id="nav-mobile" className="left hide-on-med-and-down"></ul>;
      default:
        return (
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <Link to={"/controller"}>Controller</Link>
            </li>
            <li>
              <Link to={"/devices"}>Devices</Link>
            </li>
            <li>
              <span>Hello, {authUser.name}</span>
            </li>
            <li>
              <a href="/auth/logout">Logout</a>
            </li>
          </ul>
        );
    }
  }

  render() {
    return (
      <nav className="light-blue darken-3">
        <div className="nav-wrapper">
          <Link
            to={this.props.authUser ? "/dashboard" : "/"}
            className="brand-logo right"
          >
            Smart Light
          </Link>
          {this.renderContent()}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authUser: state.authUser };
}

export default connect(mapStateToProps)(Navbar);
