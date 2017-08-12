import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import PlayArrow from "material-ui/svg-icons/av/play-arrow";

export default function NavBarRightButtons(props) {
  return (
    <div>
      <StartNewTestButton onClick={props.onStartNewTestClick} />
    </div>
  );
}

function StartNewTestButton(props) {
  return (
    <RaisedButton
      style={{
        margin: "6px 6px 12px 12px"
      }}
      primary
      onTouchTap={props.onClick}
      label="Start New Test"
      labelPosition="before"
      labelColor="white"
      icon={
        <PlayArrow
          color="white"
          style={{
            marginTop: "-2px"
          }}
        />
      }
    />
  );
}
