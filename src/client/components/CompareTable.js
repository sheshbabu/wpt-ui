import React from "react";
import moment from "moment";
import Paper from "material-ui/Paper";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import { red500, green500 } from "material-ui/styles/colors";
import TableCellSubText from "./TableCellSubText";

export default function CompareTable(props) {
  return (
    <Paper style={{ width: 900, marginBottom: 20 }} zDepth={1}>
      <Table bodyStyle={{ overflow: "visible" }} selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          {getColumnHeaders(props)}
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {getRows(props)}
        </TableBody>
      </Table>
    </Paper>
  );
}

function getColumnHeaders(props) {
  return (
    <TableRow>
      <TableHeaderColumn style={{ width: "25%" }}>
        <div style={{ color: "#666" }}>Metrics</div>
      </TableHeaderColumn>
      <TableHeaderColumn style={{ width: "25%" }}>
        <div style={{ color: "#666" }}>
          {props.oldTest.test_id}
        </div>
        <TableCellSubText
          text={moment(props.oldTest.created_at).format(
            "YYYY MMM DD, h:mm:ss a"
          )}
        />
      </TableHeaderColumn>
      <TableHeaderColumn style={{ width: "25%" }}>
        <div style={{ color: "#666" }}>
          {props.newTest.test_id}
        </div>
        <TableCellSubText
          text={moment(props.newTest.created_at).format(
            "YYYY MMM DD, h:mm:ss a"
          )}
        />
      </TableHeaderColumn>
      <TableHeaderColumn style={{ width: "25%" }}>
        <div style={{ color: "#666" }}>Diff</div>
      </TableHeaderColumn>
    </TableRow>
  );
}

function getRows(props) {
  return props.fields.map((field, rowIndex) => {
    let oldTestValue = props.oldTest[field.columnName];
    let newTestValue = props.newTest[field.columnName];
    let diff = newTestValue - oldTestValue;
    const diffColor = diff <= 0 ? green500 : red500;

    if (field.valueType === "time") {
      oldTestValue = formatTime(oldTestValue);
      newTestValue = formatTime(newTestValue);
      diff = formatTime(diff);
    } else if (field.valueType === "bytes") {
      oldTestValue = formatBytes(oldTestValue);
      newTestValue = formatBytes(newTestValue);
      diff = formatBytes(diff);
    }

    return (
      <TableRow style={{ background: rowIndex % 2 ? "#fafafa" : "white" }}>
        <TableRowColumn style={{ width: "25%" }}>
          {field.displayName}
          <TableCellSubText text={field.runType} />
        </TableRowColumn>
        <TableRowColumn style={{ width: "25%" }}>
          {oldTestValue}
        </TableRowColumn>
        <TableRowColumn style={{ width: "25%" }}>
          {newTestValue}
        </TableRowColumn>
        <TableRowColumn style={{ width: "25%", color: diffColor }}>
          {diff}
        </TableRowColumn>
      </TableRow>
    );
  });
}

function formatTime(value) {
  value = parseInt(value, 10);

  return (value = Math.abs(value) >= 1000 ? value / 1000 + "s" : value + "ms");
}

function formatBytes(value) {
  value = parseInt(value, 10);

  if (Math.abs(value) >= 1024 * 1024) {
    return (value / (1024 * 1024)).toFixed(2) + "MB";
  } else if (Math.abs(value) >= 1024) {
    return (value / 1024).toFixed(2) + "KB";
  } else {
    return value + "B";
  }
}
