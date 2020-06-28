import React, { Component } from "react";
import '../styles/controller.css'
function Controller(){



       return(
            <div className="container">
              <h2>Pick Color:</h2>
              <div>
                <input className="colorPicker" type="color"></input>
              </div>
              <div>
                <input type="range" id="volume" min="0" max="255" step="1" />
                <label >Power</label>
              </div>
            </div>
          );
}

export default Controller;
