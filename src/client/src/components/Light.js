import React from "react";

export default function Light(props) {
  const TOP = "TOP";
  const BOTTOM = "BOTTOM";
  var light = props.light;

  return (
    <li className="lightItem">
      <p>{props.light.name}</p>
      <div>
        <label>Bottom:</label>
        <input
          type="range"
          name="participants"
          min="0"
          max="100"
          value={(props.light.bottom / 255 * 100)}
          onChange={(e) => props.changePower(e, light, BOTTOM)}
        />
      </div>
      <p>{Math.round(props.light.bottom / 255 * 100)}%</p>
      <div>
        <label>Top:</label>
        <input
          type="range"
          name="participants"
          min="0"
          max="100"
          value={props.light.top / 255 * 100}
          onChange={(e) => props.changePower(e, light, TOP)}
        />
      </div>
      <p>{Math.round(props.light.top / 255 * 100)}%</p>
    </li>
  );
}
