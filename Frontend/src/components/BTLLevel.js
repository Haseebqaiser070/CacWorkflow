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

export default function BTLLevel() {
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setOpen1(false);
    setBTL("");
    setUpid("");
  };
  const [BTLRow, setBTLRow] = useState("");
  const [Upid, setUpid] = useState("");
  const [BTL, setBTL] = useState("");

  axios.defaults.withCredentials = true;

  function ActionButton2({ row }) {
    return (
      <>
        <Tooltip title="Edit" placement="top-start">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ backgroundColor: "#4b2980", marginLeft: 16, padding: 10 }}
            onClick={() => {
              setBTL(row.BTL);
              setUpid(row._id);
              handleOpen1();
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
              await axios.delete(`http://localhost:4000/SOBTL/BTL/${row._id}`);
              getBTLRows();
            }}
          >
            <AiFillDelete />
          </Button>
        </Tooltip>
      </>
    );
  }

  useEffect(() => {
    getBTLRows();
  }, []);

  const getBTLRows = async () => {
    const res = await axios.get("http://localhost:4000/SOBTL/showBTL");
    const data = await res.data;
    setBTLRow([...data]);
  };

  const addBTL = async (e) => {
    e.preventDefault();

    if (BTL != "" && Upid == "") {
      const Number = BTLRow.length + 1;
      const res = await axios.post("http://localhost:4000/SOBTL/addBTL", {
        Number,
        BTL,
      });
      getBTLRows();
      setBTL("");
    } else if (BTL != "" && Upid != "") {
      const res = await axios.put(`http://localhost:4000/SOBTL/BTL/${Upid}`, {
        BTL,
      });
      getBTLRows();
      setBTL("");
      setUpid("");
      setOpen1(false);
    } else {
      alert("missing fields");
    }
  };

  const BTLcolumns = [
    {
      field: "Number",
      headerName: "Sr#",
      width: "100",
    },

    {
      field: "BTL",
      headerName: "BTL LEVEL",
      width: "700",
    },

    {
      field: "Action",
      headerName: "Action",
      width: "200",
      editable: false,
      renderCell: ActionButton2,
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
        <h1 className="py-4 my-2">
          <b>ALL BTL LEVELS</b>
        </h1>

        <div className="d-flex justify-content-end mb-4 pb-2">
          <Button
            variant="contained"
            color="primary"
            size="medium"
            style={muibtn}
            onClick={handleOpen1}
          >
            <AddIcon style={{ marginRight: "6px" }} />
            ADD NEW BTL Level
          </Button>
        </div>
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={addBTL}>
              <Box mb={3} style={{ display: "flex", justifyContent: "end" }}>
                <CloseIcon
                  onClick={handleClose1}
                  style={{ cursor: "pointer", color: "gray" }}
                />
              </Box>
              <h4 className="mb-4">ADD NEW BTL LEVEL</h4>
              <div>
                <FormControl fullWidth size="medium">
                  <TextField
                    className="mb-4"
                    id="outlined-basic"
                    label="BTL Level"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={BTL}
                    onChange={(e) => setBTL(e.target.value)}
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
                <AiFillEdit style={{ marginRight: 10 }} />
                {Upid == "" ? <>Add BTL LEVEL</> : <>Update BTL LEVEL</>}
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
            columns={BTLcolumns}
            rows={BTLRow}
            getRowId={(Rows) => Rows._id}
            // pageSize={4}
            // rowsPerPageOptions={[4]}
            disableSelectionOnClick
          />
        </div>
      </Card>
    </div>
  );
}
