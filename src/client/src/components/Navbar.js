import React, { Component } from "react";


class Navbar extends Component {
  render() {
    return (
      <nav className="light-blue darken-3">
        <div className="nav-wrapper">
        <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li>Smart Light</li>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
