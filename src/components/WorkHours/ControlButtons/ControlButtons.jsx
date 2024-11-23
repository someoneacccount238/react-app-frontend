import React from "react";
import "./ControlButtons.css";

export default function ControlButtons(props) {
  const StartButton = (
    <div className="btn btn-one btn-start" onClick={props.handleStart}>
      {props.name}
    </div>
  );

  return (
    <div className="Control-Buttons">
      <div>{StartButton}</div>
    </div>
  );
}
