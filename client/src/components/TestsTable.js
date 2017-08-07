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
  );
}
