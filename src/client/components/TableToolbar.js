import React from "react";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import CompareArrows from "material-ui/svg-icons/action/compare-arrows";

export default function TableToolbar(props) {
  return (
    <Paper style={{ width: 900, marginTop: 20 }} zDepth={1}>
      <Toolbar style={{ backgroundColor: "white" }}>
        <ToolbarGroup>
          <CompareTestsButton {...props} />
        </ToolbarGroup>
      </Toolbar>
    </Paper>
  );
}

function CompareTestsButton(props) {
  const isDisabled = props.selectedTests.length !== 2;
  return (
    <FlatButton
      primary
      disabled={isDisabled}
      style={{ marginLeft: -15 }}
      label="Compare Tests"
      labelPosition="before"
      icon={<CompareArrows />}
    />
  );
}
