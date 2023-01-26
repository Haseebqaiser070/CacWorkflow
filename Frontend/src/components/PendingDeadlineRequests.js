import React, { useState, useEffect } from "react";
import "./css/styles.css";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Card, LinearProgress, Modal } from "@mui/material";
import { AiOutlineFieldTime } from "react-icons/ai";
import { Box } from "@mui/system";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import CustomNoRowsOverlay from "./AuxillaryComponents/CustomNoRowsOverlay";

const modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#fff",
  //   border: "2px solid #000",

  boxShadow: 24,
  p: 4,
};
function incrementDeadline(rowid) {
  const navigate = useNavigate();
  console.log("rowid", rowid);
  const [open, setOpen] = useState(false);
  const [date, setdate] = useState(new Date());

  const [round, setround] = useState("");
  const [type, settype] = useState("");
  useEffect(() => {
    if (rowid.row.Request.includes("Round1")) {
      setround("Round1");
    } else {
      setround("Round2");
    }
    if (rowid.row.Request.includes("Lab")) {
      settype("Lab");
    } else {
      settype("Theory");
    }
  }, []);
  const handleClose = () => setOpen(false);
  const updatedate = async () => {
    const res = await axios.put(`http://localhost:4000/Content/updatedate`, {
      date: date,
      round: round,
      type: type,
      _id: rowid.row._id,
    });
    console.log("res", res);
    Navigate(-1);
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={() => setOpen(true)}
      >
        <AiOutlineFieldTime style={{ marginRight: 10 }} />
        Increase Due Date
      </Button>

      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalstyle}>
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: "block" }} for="title">
              <b>Select Date & Time</b>
            </label>
            <input
              name="time"
              onChange={(e) => setdate(e.target.value)}
              style={{ width: "100%" }}
              type="datetime-local"
              value={date}
            ></input>

            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginTop: 16 }}
              onClick={() => updatedate()}
            >
              <AiOutlineFieldTime style={{ marginRight: 10 }} />
              Increase Due Date
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default function PendingDeadlineRequests() {
  const [posts, setPosts] = useState({});
  const [Rows, setRows] = useState({});
  const getdeadlines = async () => {
    const res = await axios.get(`http://localhost:4000/Content/showLabReq`);
    console.log("res", res);
    setPosts(res.data);
    var row = [];
    var index = 0;
    var arr = res.data.Lab.concat(res.data.Theory);
    console.log("hello", arr);
    arr.map((val, id) => {
      console.log("idss", id);
      if (val.pending == true) {
        row[index] = {
          _id: val._id,
          id: index,
          FacultyMemberName: val.Request_id.Name,
          Request: val.Round + " ( " + val.Type + " )",
          CurrentDeadline: val.Deadline,
        };
        index = index + 1;
      }
    });
    console.log("uajh", row);
    setRows(row);
  };
  useEffect(() => {
    getdeadlines();
  }, []);
  const columns = [
    {
      field: "FacultyMemberName",
      headerName: "Faculty Member",
      flex: 1,
    },

    {
      field: "Request",
      headerName: "Request",
      flex: 1,
    },
    {
      field: "CurrentDeadline",
      headerName: "Current Deadline",
      flex: 1,
    },
    {
      field: "incrementDeadline",
      headerName: "Increase Deadline",
      flex: 1,
      editable: false,
      renderCell: incrementDeadline,
    },
  ];
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
          <b>PENDING DEADLINE REQUESTS</b>
        </h1>
        <div>
          <DataGrid
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
              LoadingOverlay: LinearProgress,
            }}
            style={{ height: "70vh", width: "100%" }}
            columns={columns}
            getRowId={(Rows) => Rows.id}
            rows={Rows}
            pageSize={10}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </Card>
    </div>
  );
}
