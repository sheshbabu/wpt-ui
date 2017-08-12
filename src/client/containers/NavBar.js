import React from "react";
import AppBar from "material-ui/AppBar";
import { deepPurple600 } from "material-ui/styles/colors";
import NavBarRightButtons from "../components/NavBarRightButtons";

export default function NavBar() {
  const style = {
    backgroundColor: "white"
  };
  return (
    <AppBar
      title="WebPageTest UI"
      titleStyle={{ color: deepPurple600 }}
      iconElementRight={
        <NavBarRightButtons onStartNewTestClick={handleStartNewTestClick} />
      }
      style={style}
    />
  );
}

function handleStartNewTestClick() {
  fetch("/api/tests", { method: "POST" });
}
