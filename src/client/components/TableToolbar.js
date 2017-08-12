import React from "react";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import CompareArrows from "material-ui/svg-icons/action/compare-arrows";
import InfoOutline from "material-ui/svg-icons/action/info-outline";
import PlayArrow from "material-ui/svg-icons/av/play-arrow";

export default function TableToolbar(props) {
  return (
    <Paper style={{ width: 900, marginTop: 20 }} zDepth={1}>
      <Toolbar style={{ backgroundColor: "white" }}>
        <ToolbarGroup>
          <StartNewTestButton {...props} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ViewTestDetailsButton {...props} />
          <CompareTestsButton {...props} />
        </ToolbarGroup>
      </Toolbar>
    </Paper>
  );
}

function StartNewTestButton(props) {
  return (
    <FlatButton
      primary
      style={{ marginLeft: -11 }}
      onTouchTap={props.onStartNewTestClick}
      label="Start New Test"
      labelPosition="after"
      icon={
        <PlayArrow
          style={{
            marginTop: "-2px"
          }}
        />
      }
    />
  );
}

function CompareTestsButton(props) {
  const isDisabled = props.selectedTests.length !== 2;

  return (
    <FlatButton
      primary
      style={{ marginRight: -10 }}
      disabled={isDisabled}
      label="Compare Tests"
      labelPosition="after"
      icon={<CompareArrows />}
    />
  );
}

function ViewTestDetailsButton(props) {
  const isDisabled = props.selectedTests.length !== 1;

  return (
    <FlatButton
      primary
      disabled={isDisabled}
      label="View Details"
      labelPosition="after"
      icon={<InfoOutline />}
    />
  );
}
