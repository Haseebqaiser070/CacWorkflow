import React, { useState, useEffect } from "react";
import "./css/styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Popup from "./AuxillaryComponents/PopupFunction";
import axios from "axios";
import Button from "@mui/material/Button";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import {
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  LinearProgress,
} from "@mui/material";
import { muiAbtn } from "./style";
import CustomNoRowsOverlay from "./AuxillaryComponents/CustomNoRowsOverlay";

export default function AllSOS() {
  const [SOSs, setSOSs] = useState([]);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [rowid, setrowid] = React.useState("");

  const handleClickOpen = (row) => {
    setrowid(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    getSOS();
  }, []);

  const getSOS = async () => {
    try {
      const response = await axios.get("http://localhost:4000/SOS/show");
      setSOSs(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/SOS/${id}`);
    getSOS();
    handleCloseDialog();
  };

  const columns = [
    {
      field: "Year",
      headerName: "Year",
      width: "200",
    },
    {
      field: "Program",
      headerName: "Program",
      width: "500",
    },
    {
      field: "Action",
      headerName: "Action",
      width: "300",
      editable: false,
      renderCell: ActionButton,
    },
  ];
  const Switch = async (id) => {
    await axios.get(`http://localhost:4000/SOS/Switch/${id}`);
    getSOS();
  };
  function ActionButton({ row }) {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={() => {
            navigate(`/Admin/SOSView/${row._id}`, {
              replace: true,
            });
          }}
        >
          <AiFillEye style={{ marginRight: 10 }} />
          View
        </Button>

        {row.showOutside == true ? (
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={muiAbtn}
            onClick={() => {
              Switch(row._id);
            }}
          >
            <AiFillEye style={{ marginRight: 10 }} />
            Show on
          </Button>
        ) : (
          <Button
            variant="contained"
            color="error"
            size="small"
            style={muiAbtn}
            onClick={() => {
              Switch(row._id);
            }}
          >
            <AiFillEye style={{ marginRight: 10 }} />
            Show off
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={() => {
            setrowid(row._id);
            setOpenDialog(true);
          }}
        >
          <AiFillDelete style={{ marginRight: 10 }} />
          Delete
        </Button>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure to delete the SOS?"}
          </DialogTitle>

          <DialogActions>
            <Button
              onClick={() => {
                handleDelete(row._id);
                getSOS();
                handleCloseDialog();
              }}
            >
              Yes
            </Button>
            <Button onClick={handleCloseDialog} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        padding: 40,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card style={{ padding: 30, borderRadius: 10 }}>
        <h1 className="mb-4 py-4">
          <b>ALL SCHEME OF STUDIES</b>
        </h1>
        <DataGrid
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
            LoadingOverlay: LinearProgress,
          }}
          style={{ height: 500, width: "100%" }}
          columns={columns}
          rows={SOSs}
          getRowId={(Rows) => Rows._id}
          pageSize={10}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Card>
    </div>
  );
}
