import React from "react";

const AddDevice = () => {
  return (
    <div>
      <h2>Add Device</h2>
      <form>
        <select>
          <option value="" disabled selected>
            Choose type of Device
          </option>
          <option value="sensor">Sensor</option>
          <option value="light">Light</option>
        </select>
        <label>Select Device Type</label>
      </form>
    </div>
  );
};

export default AddDevice;
