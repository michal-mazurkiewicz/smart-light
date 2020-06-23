import React, { Component } from "react";
import '../styles/controller.css'
class Controller extends Component{

    state = {
        power: 0
    }



    render(){
       return(
            <div className="container">
              <h2>Pick Color:</h2>
              <div>
                <input className="colorPicker" type="color"></input>
              </div>
              <div>
                <input type="range" id="volume" min="0" max="255" step="1" />
                <label for="volume">Power</label>
              </div>
            </div>
          );
    }
}

export default Controller;
