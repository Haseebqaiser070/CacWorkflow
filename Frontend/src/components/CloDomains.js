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

export default function CloDomains() {
  axios.defaults.withCredentials = true;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDomain("");
    setUpid("");
  };
  const [Domain, setDomain] = useState("");

  const [DomainRow, setDomainRow] = useState("");

  const [Upid, setUpid] = useState("");

  const update = async (ii) => {
    const res = await axios.get(`http://localhost:4000/SOBTL/Domain/${ii}`);
    setDomain(res.data.Domain);
    setOpen(true);
  };

  function ActionButton({ row }) {
    return (
      <>
        <Tooltip title="Edit" placement="top-start">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ backgroundColor: "#4b2980", marginLeft: 16, padding: 10 }}
            onClick={() => {
              setUpid(row._id);
              update(row._id);
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
              await axios.delete(
                `http://localhost:4000/SOBTL/Domain/${row._id}`
              );
              getDomainRows();
            }}
          >
            <AiFillDelete />
          </Button>
        </Tooltip>
      </>
    );
  }
  const sub = async (e) => {
    e.preventDefault();
    console.log("hi");
    if (
      Domain != "" &&
      Upid == "" &&
      !DomainRow.some((e) => e.Domain == Domain)
    ) {
      console.log("hii");
      const res = await axios.post("http://localhost:4000/SOBTL/addDomain", {
        Domain,
      });
      console.log("hi1");
      getDomainRows();
      setDomain("");
    } else if (
      Domain != "" &&
      Upid != "" &&
      !DomainRow.some((e) => e.Domain == Domain)
    ) {
      console.log("hiiiiii");
      const res = await axios.put(
        `http://localhost:4000/SOBTL/Domain/${Upid}`,
        {
          Domain,
        }
      );
      console.log("hi2");
      getDomainRows();
      setDomain("");
      setUpid("");
      setOpen(false);
    } else if (DomainRow.some((e) => e.Domain == Domain)) {
      alert("Already Added This Domain");
    } else {
      alert("missing fields");
    }
  };

  useEffect(() => {
    getDomainRows();
  }, []);

  const getDomainRows = async () => {
    const res = await axios.get("http://localhost:4000/SOBTL/showDomain");
    const data = await res.data;
    setDomainRow([...data]);
  };

  const columns = [
    {
      field: "Domain",
      headerName: "CLO Domain",
      width: "700",
    },

    {
      field: "Action",
      headerName: "Action",
      width: "200",
      editable: false,
      renderCell: ActionButton,
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
          <b>ALL DOMAINS</b>
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
            ADD NEW DOMAIN
          </Button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={sub}>
              <Box mb={3} style={{ display: "flex", justifyContent: "end" }}>
                <CloseIcon
                  onClick={handleClose}
                  style={{ cursor: "pointer", color: "gray" }}
                />
              </Box>
              <h4 className="mb-4">ADD NEW DOMAIN</h4>
              <div>
                <FormControl fullWidth size="medium">
                  <TextField
                    className="mb-4"
                    id="outlined-basic"
                    label="CLO Domain"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={Domain}
                    onChange={(e) => setDomain(e.target.value)}
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
                {Upid == "" ? <>Add Domain</> : <>Update Domain</>}
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
            style={{ height: "50vh", width: "100%" }}
            columns={columns}
            rows={DomainRow}
            getRowId={(Rows) => Rows._id}
            pageSize={4}
            rowsPerPageOptions={[4]}
            disableSelectionOnClick
          />
        </div>
      </Card>
    </div>
  );
}
