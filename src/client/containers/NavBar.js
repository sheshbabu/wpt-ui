import React from "react";
import AppBar from "material-ui/AppBar";
import { deepPurple600 } from "material-ui/styles/colors";
import StartNewTestButton from "../components/StartNewTestButton";

export default function NavBar() {
  const style = {
    backgroundColor: "white"
  };
  return (
    <AppBar
      title="WebPageTest UI"
      titleStyle={{ color: deepPurple600 }}
      iconElementRight={
        <StartNewTestButton onStartNewTestClick={handleStartNewTestClick} />
      }
      style={style}
    />
  );
}

function handleStartNewTestClick() {
  fetch("/api/tests", { method: "POST" });
}
