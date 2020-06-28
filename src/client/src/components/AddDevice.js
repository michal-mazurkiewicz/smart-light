import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

const AddDevice = () => {
  const [state, setState] = useState({
    type: "Sensor",
    ipAddress: "",
    name: "",
    channel: "",
  });

  const onTypeChange = (e) => {
    if (state.type === "Sensor") {
      setState({ ...state, type: "Light" });
    } else {
      setState({ ...state, type: "Sensor" });
    }
    console.log(state.type);
  };
  const onNameChange = (e) => {
    setState({ ...state, name: e.target.value });
  };

  const onIpAddressChange = (e) => {
    setState({ ...state, ipAddress: e.target.value });
  };
  const validateIPaddress = (e) => {
    e.preventDefault();
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        state.ipAddress
      )
    ) {
      return true;
    }
    alert("You have entered an invalid IP address!");
    return false;
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Add Device: {state.type}</h2>
      <form>
        <div className="switch">
          <label>
            Sensor
            <input type="checkbox" onChange={(e) => onTypeChange(e)} />
            <span className="lever"></span>
            Light
          </label>
        </div>
        <input
          placeholder="Add Device Name"
          onChange={(e) => onNameChange(e)}
        ></input>
        <input
          placeholder="Add Device IP"
          onChange={(e) => onIpAddressChange(e)}
        ></input>
        {state.type === "Light" ? (
          <input
            placeholder="Add DMX Channel"
            onChange={(e) => onIpAddressChange(e)}
          ></input>
        ) : (
          <span></span>
        )}
        <button
          className="btn waves-effect waves-light"
          type="submit"
          onClick={(e) => validateIPaddress(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDevice;
