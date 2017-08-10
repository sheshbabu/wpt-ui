import React from "react";
import Paper from "material-ui/Paper";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import DatePicker from "material-ui/DatePicker";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
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
            onChange={props.onStartDateChange}
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
            onChange={props.onEndDateChange}
            autoOk
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <MetricsSelectField
            fields={props.fields}
            floatingLabelText="Metrics 1"
            onChange={props.onMetric1Change}
            selectedField={props.metric1}
          />
          <MetricsSelectField
            fields={props.fields}
            floatingLabelText="Metrics 2"
            onChange={props.onMetric2Change}
            selectedField={props.metric2}
          />
        </ToolbarGroup>
      </Toolbar>
    </Paper>
  );
}

function MetricsSelectField(props) {
  const items = props.fields.map((field, index) => {
    return (
      <MenuItem key={index} value={index} primaryText={field.displayName} />
    );
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
      style={{ width: 200 }}
      selectedMenuItemStyle={{ color: blue600 }}
      underlineShow={false}
      onChange={props.onChange}
    >
      {items}
    </SelectField>
  );
}
