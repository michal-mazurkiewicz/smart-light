import React, { Component } from "react";
import { connect } from "react-redux";

class Navbar extends Component {
  renderContent() {
    const { authUser } = this.props;
    switch (authUser) {
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

function mapStateToProps(state) {
  return {authUser: state.authUser };
}

export default connect(mapStateToProps)(Navbar);
