import React from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import PlayArrow from "material-ui/svg-icons/av/play-arrow";
import { blue600 } from "material-ui/styles/colors";

const color = blue600;

export default function NavBar() {
  const style = {
    backgroundColor: color
  };
  return (
    <AppBar
      title="WebPageTest UI"
      iconElementRight={<StartNewTestButton />}
      style={style}
    />
  );
}

function StartNewTestButton() {
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
      labelColor={color}
      icon={<PlayArrow color={color} style={iconStyle} />}
    />
  );
}
