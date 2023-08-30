"use client";

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useFormContext } from "react-hook-form";

const SummarySection: React.FC = () => {

  const {
    getValues,
  } = useFormContext();

  const formValues = getValues();
  const output = Object.entries(formValues).map(([key, value]) => ({
    key,
    value,
  }));
  const [display, setDisplay] = React.useState(false);

  const showEditInput = () => {
    setDisplay(!display);
  };

  return (
    <TableContainer component={Paper}>
      <h2>Summary</h2>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Referrer</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {output.map(({ key, value }) => (
            <TableRow
              key={key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              <TableCell align="right">{value.toString()}</TableCell>
              {/* <TableCell align="right" onClick={showEditInput}>
                {!display ? "Edit" : ""}
              </TableCell>
              <TableCell align="right">
                {display && (
                  <InputComponent
                    key={key}
                    defaultValue={""}
                    name={key}
                    helperText={`Please enter a fingy}`}
                    displayName={key}
                  />
                )}
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default SummarySection;
