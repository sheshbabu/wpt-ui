import React from "react";
import AppBar from "material-ui/AppBar";
import { blue600 } from "material-ui/styles/colors";
import StartNewTestButton from "../components/StartNewTestButton";

export default function NavBar() {
  const style = {
    backgroundColor: "white"
  };
  return (
    <AppBar
      title="WebPageTest UI"
      titleStyle={{ color: blue600 }}
      iconElementRight={<StartNewTestButton />}
      style={style}
    />
  );
}
