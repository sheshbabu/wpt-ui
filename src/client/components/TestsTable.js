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
import { blue600 } from "material-ui/styles/colors";

export default function TestsTable(props) {
  return (
    <Paper style={{ width: 900, marginTop: 20, marginBottom: 20 }} zDepth={1}>
      <Table bodyStyle={{ overflow: "visible" }} multiSelectable>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            {getColumnHeaders(props.fields)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {getRows(props.tests, props.fields)}
        </TableBody>
      </Table>
    </Paper>
  );
}

function getColumnHeaders(fields) {
  return fields.map((field, index) => {
    let runType = null;
    if (field.runType) {
      runType = (
        <div style={{ fontSize: 10, marginTop: 5 }}>
          {field.runType}
        </div>
      );
    }
    return (
      <TableHeaderColumn key={index} style={{ width: field.tableColumnWidth }}>
        <div style={{ color: "#666" }}>
          {field.displayName}
        </div>
        {runType}
      </TableHeaderColumn>
    );
  });
}

function getRows(tests, fields) {
  return tests.map((test, rowIndex) => {
    const columns = fields.map((field, index) => {
      let value = test[field.columnName];
      let subText = null;
      const valueType = field.valueType || "";

      if (valueType === "time") {
        value = formatTime(value);
      } else if (valueType === "date") {
        value = moment(value).format("YYYY MMM DD");
      } else if (valueType === "bytes") {
        value = formatBytes(value);
      } else if (valueType === "url") {
        value = (
          <a href={value} style={{ color: blue600 }} target="_blank">
            {value}
          </a>
        );
      }

      if (field.columnName === "test_id" && test.status === "pending") {
        subText = (
          <div style={{ fontSize: 10, marginTop: 5, color: "#9e9e9e" }}>
            In Progress
          </div>
        );
      }

      return (
        <TableRowColumn key={index} style={{ width: field.tableColumnWidth }}>
          {value}
          {subText}
        </TableRowColumn>
      );
    });
    return (
      <TableRow
        key={test.test_id}
        style={{ background: rowIndex % 2 ? "#fafafa" : "white" }}
      >
        {columns}
      </TableRow>
    );
  });
}

function formatTime(value) {
  value = parseInt(value, 10);
  return (value = value >= 1000 ? value / 1000 + "s" : value + "ms");
}

function formatBytes(value) {
  value = parseInt(value, 10);
  if (value >= 1024 * 1024) {
    return (value / (1024 * 1024)).toFixed(2) + "MB";
  } else if (value >= 1024) {
    return (value / 1024).toFixed(2) + "KB";
  } else {
    return value + "B";
  }
}
