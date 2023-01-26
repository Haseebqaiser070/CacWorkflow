import React, { useState, useEffect } from "react";
import "./css/styles.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { AiFillEye, AiFillEdit, AiOutlineCloudDownload } from "react-icons/ai";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import CreateTasks from "./CreateTasks";
import CustomNoRowsOverlay from "./AuxillaryComponents/CustomNoRowsOverlay";
import { LinearProgress } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  //   border: "2px solid #000",

  boxShadow: 24,
  p: 4,
};

export default function Tasks() {
  const [open, setOpen] = useState(false);
  const [Rows, setRows] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.get("http://localhost:4000/Task/show");
    setRows(response.data);
  };

  function Actionbuttons(props) {
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
          Edit
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={async () => {
            await axios.delete(`http://localhost:4000/Task/${row._id}`);
            getData();
          }}
        >
          <AiFillEdit style={{ marginRight: 10 }} />
          Delete
        </Button>
      </div>
    );
  }

  const columns = [
    {
      field: "taskType",
      headerName: "Task",
      flex: 1,
    },
    {
      field: "User",
      headerName: "Assigned To",
      valueGetter: (params) => params?.row?.User?.Name,
      flex: 1,
    },
    {
      field: "Deadline",
      headerName: "Deadline",
      flex: 1,
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "Course",
      headerName: "Course",
      valueGetter: (params) => params?.row?.Course?.Name,
      flex: 1,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 2,
      editable: false,
      renderCell: Actionbuttons,
    },
  ];

  return (
    <div
      className="container"
      style={{
        width: "100%",
        padding: 20,
        overflow: "auto",
        height: "90vh",
      }}
    >
      <h1 className="py-4">
        <b>All Tasks</b>
      </h1>

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
