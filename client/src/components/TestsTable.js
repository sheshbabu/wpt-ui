import React from "react";
import Paper from "material-ui/Paper";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

const columns = [
  "Test Id",
  "First Paint (FV)",
  "Start Render (FV)",
  "Last Visual Change (FV)",
  "Visual Complete (FV)",
  "Load Time (FV)",
  "Fully Loaded (FV)",
  "Speed Index (FV)",
  "Requests Made (FV)",
  "Bytes Downloaded (FV)"
];

export default function TestsTable(props) {
  return (
    <Paper style={{ width: 900, marginTop: 20, marginBottom: 20 }} zDepth={1}>
      <Table bodyStyle={{ overflow: "visible" }}>
        <TableHeader>
          <TableRow>
            {getColumnHeaders()}
          </TableRow>
        </TableHeader>
        <TableBody>
          {getRows(props.tests)}
        </TableBody>
      </Table>
    </Paper>
  );
}

function getColumnHeaders() {
  return columns.map(column => {
    return (
      <TableHeaderColumn key={column} style={{ width: 100 }}>
        {column}
      </TableHeaderColumn>
    );
  });
}

function getRows(tests) {
  return tests.map(test => {
    return (
      <TableRow key={test.test_id}>
        <TableRowColumn style={{ width: 100 }}>
          {test.test_id}
        </TableRowColumn>
        <TableRowColumn style={{ width: 100 }}>
          {test.fv_first_paint}
        </TableRowColumn>
        <TableRowColumn style={{ width: 100 }}>
          {test.fv_start_render}
        </TableRowColumn>
        <TableRowColumn style={{ width: 100 }}>
          {test.fv_last_visual_change}
        </TableRowColumn>
        <TableRowColumn style={{ width: 100 }}>
          {test.fv_visual_complete}
        </TableRowColumn>
        <TableRowColumn style={{ width: 100 }}>
          {test.fv_load_time}
        </TableRowColumn>
        <TableRowColumn style={{ width: 100 }}>
          {test.fv_fully_loaded}
        </TableRowColumn>
        <TableRowColumn style={{ width: 100 }}>
          {test.fv_speed_index}
        </TableRowColumn>
        <TableRowColumn style={{ width: 100 }}>
          {test.fv_requests_made}
        </TableRowColumn>
        <TableRowColumn style={{ width: 100 }}>
          {test.fv_bytes_downloaded}
        </TableRowColumn>
      </TableRow>
    );
  });
}
