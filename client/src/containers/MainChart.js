import React from "react";
import moment from "moment";
import BarChart from "../components/BarChart";
import Paper from "material-ui/Paper";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import { blue600 } from "material-ui/styles/colors";
import DatePicker from "material-ui/DatePicker";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

const chartProps = {
  width: 900,
  height: 300,
  labels: [
    moment("2017-08-06 12:00:00.801277+08").format("YYYY MMM DD"),
    moment("2017-09-07 12:00:00.801277+08").format("YYYY MMM DD"),
    moment("2017-09-07 12:00:00.801277+08").format("YYYY MMM DD"),
    moment("2017-09-20 12:00:00.801277+08").format("YYYY MMM DD"),
    moment("2017-10-30 12:00:00.801277+08").format("YYYY MMM DD")
  ],
  datasets: [
    {
      label: "FirstView TTFB",
      data: [300, 350, 350, 320, 300]
    },
    {
      label: "FirstView First Paint",
      data: [1000, 1200, 1200, 1150, 1000]
    }
  ]
};

export default function MainChart() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 20
      }}
    >
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
      <BarChart {...chartProps} />
      <Paper style={{ width: 900, marginTop: 20, marginBottom: 20 }} zDepth={1}>
        <Table bodyStyle={{ overflow: "visible" }}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={{ width: 100 }}>
                Test Id
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: 100 }}>
                First Paint (FV)
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: 100 }}>
                Load Time (FV)
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: 100 }}>
                Start Render (FV)
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: 100 }}>
                Last Visual Change (FV)
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: 100 }}>
                Visual Complete (FV)
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: 100 }}>
                Fully Loaded (FV)
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: 100 }}>
                Speed Index (FV)
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: 100 }}>
                Requests Made (FV)
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: 100 }}>
                Bytes Downloaded (FV)
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableRowColumn style={{ width: 100 }}>1xx</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>300 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1300 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1300 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1300 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1300 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1300 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1300 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1300 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1300 ms</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn style={{ width: 100 }}>2xx</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>350 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1350 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1350 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1350 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1350 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1350 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1350 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1350 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1350 ms</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn style={{ width: 100 }}>3xx</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>400 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1400 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1400 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1400 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1400 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1400 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1400 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1400 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1400 ms</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn style={{ width: 100 }}>4xx</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>350 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1350 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1350 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1350 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1350 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1350 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1350 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1350 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1350 ms</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn style={{ width: 100 }}>5xx</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>300 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1300 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1300 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1300 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1300 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1300 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1300 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1300 ms</TableRowColumn>
              <TableRowColumn style={{ width: 100 }}>1300 ms</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
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
