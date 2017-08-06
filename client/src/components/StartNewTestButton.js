import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import PlayArrow from "material-ui/svg-icons/av/play-arrow";
import { blue600 } from "material-ui/styles/colors";

export default function StartNewTestButton() {
  const buttonStyle = {
    margin: "6px 6px 12px 12px"
  };
  const iconStyle = {
    marginTop: "-2px"
  };
  return (
    <RaisedButton
      style={buttonStyle}
      label="Start New Test"
      labelPosition="before"
      labelColor="white"
      backgroundColor={blue600}
      icon={<PlayArrow color="white" style={iconStyle} />}
    />
  );
}
