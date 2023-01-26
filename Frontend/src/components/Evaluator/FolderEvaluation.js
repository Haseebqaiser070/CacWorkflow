import React, { useState } from "react";
import "../css/styles.css";
import Button from "@mui/material/Button";
import { Box, Card, LinearProgress, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import CustomNoRowsOverlay from "../AuxillaryComponents/CustomNoRowsOverlay";

export default function FolderEvaluation() {
  //   const [rows, setRows] = useState([]);
  const columns = [
    {
      field: "TeacherName",
      headerName: "Teacher Name",
      flex: 1,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      editable: false,
      renderCell: () => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => setOpen(true)}
          >
            <AiFillEye style={{ marginRight: 10 }} />
            View Folder
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
          >
            <AiFillEdit style={{ marginRight: 10 }} />
            Evaluate
          </Button>
        </>
      ),
    },
  ];

  const rows = [
    { id: 1, subject: "Snow" },
    { id: 2, subject: "Snow" },
    { id: 3, subject: "Snow" },
  ];
  return (
    <div style={{ height: 700, width: "100%", padding: 20 }}>
      <h1 style={{ marginBottom: 30 }}>Evaluate Folders</h1>

      <div style={{ marginTop: 30 }}>
        <DataGrid
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
            LoadingOverlay: LinearProgress,
          }}
          style={{ height: 400, width: "100%" }}
          columns={columns}
          rows={rows}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}
