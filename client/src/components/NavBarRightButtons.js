import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import PlayArrow from "material-ui/svg-icons/av/play-arrow";
import CompareArrows from "material-ui/svg-icons/action/compare-arrows";

export default function NavBarRightButtons(props) {
  return (
    <div>
      <CompareTestsButton />
      <StartNewTestButton onClick={props.onStartNewTestClick} />
    </div>
  );
}

function CompareTestsButton() {
  return (
    <FlatButton
      primary
      style={{
        margin: "6px 6px 12px 12px"
      }}
      label="Compare Tests"
      labelPosition="before"
      icon={<CompareArrows />}
    />
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
