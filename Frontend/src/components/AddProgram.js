import React, { useState, useEffect } from "react";
import "./css/styles.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { AiFillDelete, AiFillEdit, AiFillFilePdf } from "react-icons/ai";
import {
  Autocomplete,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  LinearProgress,
  MenuItem,
  Modal,
  Switch,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import PositionedSnackbar from "./AuxillaryComponents/DeleteSnack";
import { muiAbtn, muibtn } from "./style";
import FolderNavigation from "./Evaluator/Navigation";
import CustomNoRowsOverlay from "./AuxillaryComponents/CustomNoRowsOverlay";
import { useNavigate } from "react-router-dom";

export default function AddProgram() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [report, setreport] = useState("");
  const [pres, setpres] = useState([]);

  const navigate = useNavigate();

  const [up, setup] = useState("");
  useEffect(() => {
    getRows();
  }, []);
  const getRows = async () => {
    const res = await axios.get("http://localhost:4000/Program/show");
    const res2 = await axios.get("http://localhost:4000/Program/showprefix");
    setpres(res2.data);
    setRows(res.data);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setup("");
    setOpen(false);
    setDegree("");
    setProgram("");
    setChecked(false);
  };
  const [id, setid] = useState("");

  const [Degree, setDegree] = useState("");
  const [Program, setProgram] = useState("");
  const [Checked, setChecked] = useState(false);

  const Update = async (ii) => {
    const res = await axios.get(`http://localhost:4000/Program/${ii}`);
    setDegree(res.data.Degree);
    setProgram(res.data.Program);
    if (
      res.data.Degree != "BS" &&
      res.data.Degree != "MS" &&
      res.data.Degree != "PhD"
    ) {
      setChecked(true);
    }
    setOpen(true);
  };

  const handleChange = () => {
    if (Checked == true) {
      setChecked(false);
    } else {
      setChecked(true);
    }
    setDegree("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("here");
    var not = ["of", "the", "and", "&", "for", "in", "like"];
    var Prog = Program.split(" ");
    var Prog2 = Prog.map((i) => {
      if (!not.includes(i.toLowerCase())) {
        return i.charAt(0).toUpperCase() + i.slice(1);
      } else {
        return i.toLowerCase();
      }
    });
    var Progm = Prog2.join(" ");
    var check = false;
    rows.forEach((i) => {
      if (
        i.Degree.toLowerCase() == Degree.toLowerCase() &&
        Program.toLowerCase() == i.Program.toLowerCase()
      ) {
        check = true;
      }
    });
    if (up != "") {
      if (
        Degree.toLowerCase() == up.Degree.toLowerCase() &&
        Program.toLowerCase() == up.Program.toLowerCase()
      ) {
        check = false;
      }
    }
    if (check) {
      alert("This Program alreadt Exists");
    } else if (up == "" && Degree != "" && Program != "") {
      const res = await axios.post("http://localhost:4000/Program/add", {
        Degree,
        Program: Progm,
      });
      if (res.data == "Already Exists") alert("Already Exists");
      else {
        setDegree("");
        setProgram("");
        getRows();
      }
    } else if (up != "" && Degree != "" && Program != "") {
      const res = await axios.put(`http://localhost:4000/Program/${id}`, {
        Degree,
        Program: Progm,
      });
      if (res.data == "Already Exists") alert("Already Exists");
      else {
        setDegree("");
        setProgram("");
        setup("");
        getRows();
      }
    } else {
      alert("Empty Field");
    }
  };

  const [openDialog, setOpenDialog] = React.useState(false);
  const [rowid, setrowid] = React.useState("");

  const handleClickOpen = (row) => {
    setrowid(row)
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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

  const columns = [
    {
      field: "Degree",
      headerName: "Degree Level",
      width: "200",
    },
    {
      field: "Program",
      headerName: "Program Name",
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

  function ActionButton({ row }) {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={() => {
            setup(row);
            setid(row._id);
            Update(row._id);
          }}
        >
          <AiFillEdit style={{ marginRight: 10 }} />
          Edit
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={()=>{
            setrowid(row._id)
            setOpenDialog(true);}
          }
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
            {"Are you sure to delete the program?"}
          </DialogTitle>

          <DialogActions>
            <Button
              onClick={async () => {
                await axios.delete(`http://localhost:4000/Program/${rowid}`);
                getRows();
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
    <>
      <div
        style={{
          width: "100%",
          padding: 40,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Card style={{ padding: 30, borderRadius: 10 }}>
          <h1 className="mb-4 py-4">
            <b>DEGREE PROGRAM</b>
          </h1>
          <div className="d-flex justify-content-end mb-4">
            <Box sx={{ minWidth: 220 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="taskType">Filter by Degree</InputLabel>
                <Select
                  value={report}
                  label="Filter by Degree"
                  onChange={(e) => setreport(e.target.value)}
                >
                  {pres.map((i) => {
                    return <MenuItem value={i}>{i}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Box>
            <Button
              style={{ backgroundColor: "#4b2980" }}
              variant="contained"
              color="primary"
              className="ms-4"
              size="medium"
              onClick={() => {
                if (report == "") alert("select an option");
                else navigate(`/Admin/AddProgram/report/${report}`);
              }}
            >
              <AiFillFilePdf style={{ marginRight: 10 }} />
              Generate Report
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              className="ms-4"
              style={{ backgroundColor: "#4b2980" }}
              onClick={handleOpen}
            >
              <AddIcon style={{ marginRight: 10 }} />
              Add New Program
            </Button>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={handleSubmit}>
                <Box mb={3} style={{ display: "flex", justifyContent: "end" }}>
                  <CloseIcon
                    onClick={handleClose}
                    style={{ cursor: "pointer", color: "gray" }}
                  />
                </Box>
                <h4 className="mb-4">ADD NEW PROGRAM</h4>
                <div className="col">
                  <FormControlLabel
                    className="mb-4"
                    control={
                      <Switch checked={Checked} onChange={handleChange} />
                    }
                    label="Add other degree level other than available options?"
                    labelPlacement="start"
                  />
                </div>
                {Checked == true ? (
                  <div className="col">
                    <FormControl fullWidth size="small">
                      <TextField
                        className="mb-4"
                        id="outlined-basic"
                        label="Add Degree Level"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={Degree}
                        onChange={(e) => setDegree(e.target.value)}
                      />
                    </FormControl>
                  </div>
                ) : !up ? (
                  <FormControl fullWidth size="small">
                    <InputLabel id="taskType">Select Degree</InputLabel>
                    <Select
                      fullWidth
                      className="mb-4"
                      labelId="selectdegree"
                      id="selectdegree"
                      value={Degree}
                      label="Select Degree"
                      onChange={(e) => setDegree(e.target.value)}
                    >
                      <MenuItem value={"BS"}>BS</MenuItem>
                      <MenuItem value={"MS"}>MS</MenuItem>
                      <MenuItem value={"PhD"}>PhD</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <FormControl fullWidth size="small">
                    <InputLabel id="taskType">Select Degree</InputLabel>
                    <Select
                      className="mb-4"
                      labelId="selectdegree"
                      id="selectdegree"
                      value={Degree}
                      label="Select Degree"
                      onChange={(e) => setDegree(e.target.value)}
                      autoWidth
                    >
                      <MenuItem selected hidden value={Degree}>
                        {Degree}
                      </MenuItem>
                      <MenuItem value={"BS"}>BS</MenuItem>
                      <MenuItem value={"MS"}>MS</MenuItem>
                      <MenuItem value={"p.hd"}>P.hd</MenuItem>
                    </Select>
                  </FormControl>
                )}
                <div className="col">
                  <FormControl fullWidth size="small">
                    <TextField
                      className="mb-4"
                      id="outlined-basic"
                      label="Program Name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={Program}
                      onChange={(e) => setProgram(e.target.value)}
                    />
                  </FormControl>
                </div>
                <Button
                  fullWidth
                  className="mt-2 muibtn"
                  variant="contained"
                  color="primary"
                  size="small"
                  type="submit"
                  style={muibtn}
                >
                  <AddIcon style={{ marginRight: 10 }} />
                  ADD NEW PROGRAM
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
              style={{ height: "70vh", width: "100%" }}
              columns={columns}
              rows={rows}
              getRowId={(Rows) => Rows._id}
              // pageSize={5}
              // rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </div>
        </Card>
      </div>
    </>
  );
}