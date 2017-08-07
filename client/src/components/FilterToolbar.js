import React from "react";
import Paper from "material-ui/Paper";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import DatePicker from "material-ui/DatePicker";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import { blue600 } from "material-ui/styles/colors";

export default function FilterToolbar(props) {
  return (
    <Paper style={{ width: 900, marginBottom: 20 }} zDepth={1}>
      <Toolbar style={{ backgroundColor: "white" }}>
        <ToolbarGroup>
          <DatePicker
            floatingLabelText="Start Date"
            floatingLabelFixed={true}
            hintText="Select"
            container="inline"
            mode="landscape"
            style={{ width: 200 }}
            inputStyle={{ marginTop: 12 }}
            textFieldStyle={{ marginTop: -1 }}
            underlineShow={false}
            autoOk
          />
          <DatePicker
            floatingLabelText="End Date"
            floatingLabelFixed={true}
            hintText="Select"
            container="inline"
            mode="landscape"
            style={{ width: 200 }}
            inputStyle={{ marginTop: 12 }}
            textFieldStyle={{ marginTop: -1 }}
            underlineShow={false}
            autoOk
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <MetricsSelectField />
          <MetricsSelectField />
        </ToolbarGroup>
      </Toolbar>
    </Paper>
  );
}

function MetricsSelectField() {
  return (
    <SelectField
      floatingLabelText="Metric 1"
      value={1}
      style={{ width: 200 }}
      selectedMenuItemStyle={{ color: blue600 }}
      underlineShow={false}
    >
      <Subheader>First View</Subheader>
      <MenuItem value={1} primaryText="Time To First Byte" />
      <MenuItem primaryText="First Paint" />
      <MenuItem primaryText="Start Render" />
      <MenuItem primaryText="Last Visual Change" />
      <MenuItem primaryText="Visual Complete" />
      <MenuItem primaryText="Load Time" />
      <MenuItem primaryText="Fully Loaded" />
      <MenuItem primaryText="Speed Index" />
      <MenuItem primaryText="Requests Made" />
      <MenuItem value={4} primaryText="Bytes Downloaded" />
      <Divider />
      <Subheader>Repeat View</Subheader>
      <MenuItem primaryText="Time To First Byte" />
      <MenuItem primaryText="First Paint" />
      <MenuItem primaryText="Start Render" />
      <MenuItem primaryText="Last Visual Change" />
      <MenuItem primaryText="Visual Complete" />
      <MenuItem primaryText="Load Time" />
      <MenuItem primaryText="Fully Loaded" />
      <MenuItem primaryText="Speed Index" />
      <MenuItem primaryText="Requests Made" />
      <MenuItem primaryText="Bytes Downloaded" />
    </SelectField>
  );
}
