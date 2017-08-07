import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import PlayArrow from "material-ui/svg-icons/av/play-arrow";
import CompareArrows from "material-ui/svg-icons/action/compare-arrows";
import { blue600 } from "material-ui/styles/colors";

export default function NavBarRightButtons() {
  return (
    <div>
      <FlatButton
        style={{
          margin: "6px 6px 12px 12px",
          color: blue600
        }}
        label="Compare Tests"
        labelPosition="before"
        icon={<CompareArrows color={blue600} />}
      />
      <RaisedButton
        style={{
          margin: "6px 6px 12px 12px"
        }}
        label="Start New Test"
        labelPosition="before"
        labelColor="white"
        backgroundColor={blue600}
        icon={
          <PlayArrow
            color="white"
            style={{
              marginTop: "-2px"
            }}
          />
        }
      />
    </div>
  );
}
