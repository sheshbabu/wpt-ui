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

export default function TestsTable(props) {
  return (
    <Paper style={{ width: 900, marginTop: 20, marginBottom: 20 }} zDepth={1}>
      <Table bodyStyle={{ overflow: "visible" }} multiSelectable>
        <TableHeader>
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
    return (
      <TableHeaderColumn key={index} style={{ width: 170 }}>
        {field.displayName}
      </TableHeaderColumn>
    );
  });
}

function getRows(tests, fields) {
  return tests.map(test => {
    const columns = fields.map((field, index) => {
      return (
        <TableRowColumn key={index} style={{ width: 170 }}>
          {test[field.columnName]}
        </TableRowColumn>
      );
    });
    return (
      <TableRow key={test.test_id}>
        {columns}
      </TableRow>
    );
  });
}
