import React, { Component } from "react";
import '../styles/dashboard.css'

class Navbar extends Component {
  render() {
    return (
      <nav className="navBar">
        <div className="nav-wrapper">
        <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li>Smart Light</li>
            <li>
              <a href="/">Dashboard</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
