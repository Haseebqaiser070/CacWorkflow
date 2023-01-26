import React, { useState, useEffect } from "react";
import "./css/styles.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import {
  Autocomplete,
  Card,
  LinearProgress,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";

import CloseIcon from "@mui/icons-material/Close";

import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import { muibtn } from "./style";
import CustomNoRowsOverlay from "./AuxillaryComponents/CustomNoRowsOverlay";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
};

export default function SO_Level() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setGA("");
    setSO("");
    setUpid("");
  };

  const [GA, setGA] = useState("");
  const [SO, setSO] = useState("");

  const [SORow, setSORow] = useState("");

  const [Upid, setUpid] = useState("");

  axios.defaults.withCredentials = true;

  function ActionButton1({ row }) {
    return (
      <>
        <Tooltip title="Edit" placement="top-start">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ backgroundColor: "#4b2980", marginLeft: 16, padding: 10 }}
            onClick={() => {
              setGA(row.GA);
              setSO(row.SO);
              setUpid(row._id);
              handleOpen();
            }}
          >
            <AiFillEdit />
          </Button>
        </Tooltip>
        <Tooltip title="Delete" placement="top-start">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ backgroundColor: "#4b2980", marginLeft: 16, padding: 10 }}
            onClick={async () => {
              await axios.delete(`http://localhost:4000/SOBTL/SO/${row._id}`);
              getSORows();
            }}
          >
            <AiFillDelete />
          </Button>
        </Tooltip>
      </>
    );
  }

  useEffect(() => {
    getSORows();
  }, []);

  const getSORows = async () => {
    const ress = await axios.get("http://localhost:4000/SOBTL/showSO");
    const dataa = await ress.data;
    setSORow([...dataa]);
  };

  const ADDSO = async (e) => {
    e.preventDefault();

    if (SO != "" && GA != "" && Upid == "") {
      const Number = SORow.length + 1;
      const res = await axios.post("http://localhost:4000/SOBTL/addSO", {
        Number,
        GA,
        SO,
      });
      getSORows();
      setSO("");
      setGA("");
    } else if (SO != "" && GA != "" && Upid != "") {
      const res = await axios.put(`http://localhost:4000/SOBTL/SO/${Upid}`, {
        GA,
        SO,
      });
      getSORows();
      setSO("");
      setGA("");
      setUpid("");
      setOpen(false);
    } else {
      alert("missing fields");
    }
  };

  const SOcolumns = [
    {
      field: "Number",
      headerName: "Sr#",
      width: "70",
    },

    {
      field: "SO",
      headerName: "SO Description",
      width: "730",
    },

    {
      field: "Action",
      headerName: "Action",
      width: "200",
      editable: false,
      renderCell: ActionButton1,
    },
  ];

  return (
    <>
      <div
        style={{
          width: "100%",
          padding: 40,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Card style={{ padding: 30, borderRadius: 10 }}>
          <h1 className="py-4 my-2">
            <b>ALL STUDENT OUTCOMES</b>
          </h1>
          <div className="d-flex justify-content-end mb-4 pb-2">
            <Button
              variant="contained"
              color="primary"
              size="medium"
              style={muibtn}
              onClick={handleOpen}
            >
              <AddIcon style={{ marginRight: "6px" }} />
              ADD NEW SO
            </Button>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={ADDSO}>
                <Box mb={3} style={{ display: "flex", justifyContent: "end" }}>
                  <CloseIcon
                    onClick={handleClose}
                    style={{ cursor: "pointer", color: "gray" }}
                  />
                </Box>
                <h4 className="mb-4">ADD NEW STUDENT OUTCOME</h4>
                <div>
                  <FormControl fullWidth size="medium">
                    <TextField
                      className="mb-4"
                      id="outlined-basic"
                      label="Graduate Outcome"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={GA}
                      onChange={(e) => setGA(e.target.value)}
                    />
                  </FormControl>
                </div>
                <div>
                  <FormControl fullWidth size="medium">
                    <TextField
                      multiline={true}
                      rows={4}
                      className="mb-4"
                      id="outlined-basic"
                      label="SO Description"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={SO}
                      onChange={(e) => setSO(e.target.value)}
                    />
                  </FormControl>
                </div>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="small"
                  type="submit"
                  style={muibtn}
                >
                  <AddIcon style={{ marginRight: 10 }} />
                  {Upid == "" ? <>Add SO</> : <>Update SO</>}
                </Button>
              </form>
            </Box>
          </Modal>

          <div>
            <DataGrid
              components={{
                NoRowsOverlay: CustomNoRowsOverlay,
                LoadingOverlay: LinearProgress,
              }}
              style={{ height: "60vh", width: "100%" }}
              columns={SOcolumns}
              rows={SORow}
              getRowId={(Rows) => Rows._id}
              disableSelectionOnClick
            />
          </div>
        </Card>
      </div>
    </>
  );
}
