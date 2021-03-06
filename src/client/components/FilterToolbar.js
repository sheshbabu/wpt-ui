import React from "react";
import Paper from "material-ui/Paper";
import moment from "moment";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import DatePicker from "material-ui/DatePicker";
import SelectField from "material-ui/SelectField";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import MenuItem from "material-ui/MenuItem";

export default function FilterToolbar(props) {
  return (
    <Paper style={{ width: 900, marginBottom: 20 }} zDepth={1}>
      <Toolbar style={{ backgroundColor: "white" }}>
        <ToolbarGroup>
          <MetricsSelectField
            fields={props.fields}
            floatingLabelText="Metric 1"
            onChange={props.onMetric1Change}
            selectedField={props.metric1}
          />
          <MetricsSelectField
            fields={props.fields}
            floatingLabelText="Metric 2"
            onChange={props.onMetric2Change}
            selectedField={props.metric2}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <DateField
            floatingLabelText="Start Date"
            onChange={props.onStartDateChange}
            value={props.startDate}
          />
          <DateField
            floatingLabelText="End Date"
            onChange={props.onEndDateChange}
            value={props.endDate}
          />
        </ToolbarGroup>
      </Toolbar>
    </Paper>
  );
}

function MetricsSelectField(props) {
  const firstViewItems = [];
  const repeatViewItems = [];
  props.fields.forEach((field, index) => {
    const item = (
      <MenuItem key={index} value={index} primaryText={field.displayName} />
    );
    if (field.runType === "First View") {
      firstViewItems.push(item);
    } else {
      repeatViewItems.push(item);
    }
  });
  let selectedIndex = 0;
  props.fields.forEach((field, index) => {
    if (field.columnName === props.selectedField) {
      selectedIndex = index;
    }
  });
  return (
    <SelectField
      floatingLabelText={props.floatingLabelText}
      value={selectedIndex}
      style={{ width: 270 }}
      underlineShow={false}
      onChange={props.onChange}
    >
      <Subheader>First View</Subheader>
      {firstViewItems}
      <Divider />
      <Subheader>Repeat View</Subheader>
      {repeatViewItems}
    </SelectField>
  );
}

function DateField(props) {
  const value = props.value ? moment(props.value).toDate() : null;
  return (
    <DatePicker
      floatingLabelText={props.floatingLabelText}
      floatingLabelFixed
      value={value}
      hintText="Select"
      container="inline"
      mode="landscape"
      inputStyle={{ marginTop: 12, cursor: "pointer" }}
      textFieldStyle={{ width: 170, marginTop: -1 }}
      underlineShow={false}
      onChange={props.onChange}
      autoOk
    />
  );
}
