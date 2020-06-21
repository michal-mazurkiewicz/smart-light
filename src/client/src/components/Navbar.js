import React, { Component } from "react";
import { connect } from "react-redux";

class Navbar extends Component {
  renderContent() {
    switch (this.props.authUser) {
      case null:
        return;
      case false:
        return (
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li>
              <a href="/auth/google">Login with Google</a>
            </li>
          </ul>
        );
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
              <a href="/settings">Settings</a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
            <li>
              <a href="/auth/logout">Logout</a>
            </li>
          </ul>
        );
    }
  }

  render() {
    console.log(this.props.authUser);
    console.log("" ? true : false);
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo right">
            Smart Light
          </a>
          {this.renderContent()}
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ authUser }) {
  return { authUser };
}

export default connect(mapStateToProps)(Navbar);
