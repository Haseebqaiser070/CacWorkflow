import React, { useState, useEffect } from "react";
import "../css/styles.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "../AuxillaryComponents/CustomNoRowsOverlay";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

function ActionButtons(props) {
  const navigate = useNavigate();
  const { row } = props;
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        // onClick={}
      >
        <AiFillEdit style={{ marginRight: 10 }} />
        View
      </Button>
    </div>
  );
}

export default function CacAllTasks() {
  const [Rows, setRows] = useState([]);
  const columns = [
    {
      field: "tittle",
      headerName: "Tittle",
      flex: 1,
    },

    {
      field: "deadline",
      headerName: "Deadline",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      editable: false,
      renderCell: ActionButtons,
    },
  ];

  return (
    <div
      className="container"
      style={{ height: 700, width: "100%", padding: 20 }}
    >
      <div className="py-4">
        <h1>
          <b>All Tasks Assigned</b>
        </h1>
      </div>
      <div>
        <DataGrid
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
            LoadingOverlay: LinearProgress,
          }}
          style={{ height: 400, width: "100%" }}
          columns={columns}
          getRowId={(Rows) => Rows._id}
          rows={Rows}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}
