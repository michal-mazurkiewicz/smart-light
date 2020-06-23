import React, { Component } from "react";
import M from "materialize-css";
import "../styles/landing.css"

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
            <img src="https://cdn.shopify.com/s/files/1/0112/3434/5056/products/flexilightpro-2_1200x1200.jpg?v=1578259738" />
          </div>
          <div class="carousel-item" >
            <img src="https://lh3.googleusercontent.com/proxy/lRaDy1qDqsrSCwOhDiaCUrYymtzRHuJ9MyXoODpjM-Wwrscm1WmnNyP_NtXJUVeVvPOGIvqoQtYsKGRXNmOB0nA3ksZU1Oej3qqeQTRuK58i6sISJpmCw1bcTHD1emGUyk-b88rREeIfw6Pl" />
          </div>
        </div>
        <a href="/auth/google"><div className="signin"></div></a>
       </div>
    );
  }
}

export default Landing;
