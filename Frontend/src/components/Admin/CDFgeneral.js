import React, { useState, useEffect } from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Popup from "../AuxillaryComponents/PopupFunction";
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
import { muiAbtn } from "../style";
import CustomNoRowsOverlay from "../AuxillaryComponents/CustomNoRowsOverlay";

export default function AllCDFs() {
  const [CDFs, setCDFs] = useState([]);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    getCDF();
  }, []);

  const getCDF = async () => {
    try {
      const response = await axios.get("http://localhost:4000/CDF/showAllgen");
      setCDFs(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:4000/CDF/${id}`);
//     getCDF();
//     handleCloseDialog();
//   };

  const columns = [
    {
      field: "Code",
      headerName: "Code",
      width: "150",
    },
    {
      field: "Name",
      headerName: "Course Title",
      width: "330",
    },    
    {
      field: "Action",
      headerName: "Action",
      width: "300",
      editable: false,
      renderCell: ActionButton,
    },
  ];
  function ActionButton({ row }) {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={() => {
            navigate(`/Admin/genCDFsView/${row.Code}/${row._id}`, {
              replace: true,
            });
          }}
        >
          <AiFillEye style={{ marginRight: 10 }} />
          View
        </Button>

        {/* <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={handleClickOpen}
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
            {"Are you sure to delete the CDF?"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={() => handleDelete(row._id)}>Yes</Button>
            <Button onClick={handleCloseDialog} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog> */}
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
          <b>ALL COURSE DESCRIPTION FORMS</b>
        </h1>
        <DataGrid
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
            LoadingOverlay: LinearProgress,
          }}
          style={{ height: 500, width: "100%" }}
          columns={columns}
          rows={CDFs}
          getRowId={(Rows) => Rows._id}
          disableSelectionOnClick
        />
      </Card>
    </div>
  );
}
