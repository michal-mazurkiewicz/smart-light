import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
export default function ModeSwitch(props) {
  return (
    <>
      <h5>Controls: {props.mode === "MANUAL" ? "Manual" : "Auto"}</h5>
      <div>
        <label style={{paddingRight:"10px"}}>Manual </label>
        <BootstrapSwitchButton
          onlabel=" "
          offlabel=" "
          onstyle="info"
          width="200px"
          checked={props.mode === "MANUAL" ? false : true}
          onChange={() => props.changeMode()}
        />
        <label style={{paddingLeft:"10px"}}>Auto</label>
      </div>
    </>
  );
}
