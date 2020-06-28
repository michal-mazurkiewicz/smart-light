import React, { Component } from "react";
import M from "materialize-css";
import "../styles/landing.css"
import { connect } from "react-redux";


class Landing extends Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".carousel");
      M.Carousel.init(elems, {});
    });
  }

  render() {
    return (
      <div class="landingContainer">
        <h2>Welcome in Smart Light!</h2>
        <h5>Intelligent Lights House</h5>
        <div class="carousel">
          <div class="carousel-item">
            <img src="https://nettigo.pl/system/images/1966/original.jpg?1482274285" />
          </div>
          <div class="carousel-item" >
            <img src="https://files.seeedstudio.com/wiki/Grove-DMX512/img/DMX512_01.jpg" />
          </div>
          <div class="carousel-item" >
            <img src="https://botland.com.pl/58777-large_default/czujnik-natezenia-swiatla-bh1750.jpg" />
          </div>
        </div>
        {this.props.authUser ? "" :<a href="/auth/google"><div className="signin"></div></a> }

       </div>
    );
  }
}

function mapStateToProps(state) {
  return { authUser: state.authUser };
}

export default connect(mapStateToProps)(Landing);
