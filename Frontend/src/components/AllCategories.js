import React, { useState, useEffect } from "react";
import "./css/styles.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { AiFillEye, AiFillEdit } from "react-icons/ai";

import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";
import { Card, getTableRowUtilityClass, LinearProgress } from "@mui/material";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { muiAbtn, muibtn } from "./style";
import PositionedSnackbar from "./AuxillaryComponents/DeleteSnack";
import CustomNoRowsOverlay from "./AuxillaryComponents/CustomNoRowsOverlay";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",

  boxShadow: 24,
  p: 4,
};

export default function AllCategories() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const handleClose = () => {
    // setDegree("Degree Program");
    setCategoryName("");
    setup("")
    setgid("")
    // setEnteredCourse([]);
    setOpen(false);
  };

  // const [EnteredCourse, setEnteredCourse] = useState([]);
  // const [Courses, setCourse] = useState([]);
  const [CategoryName, setCategoryName] = useState("");
  // const [Programdb, setProgramdb] = useState([]);
  // const [Degree, setDegree] = useState("Degree Program");
  const [Rows, setRows] = useState([]);
  // const [Category, setCategory] = useState([]);

  // const getPrograms = async () => {
  //   const res = await axios.get("http://localhost:4000/Program/show");
  //   setProgramdb(res.data);
  // };
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [up, setup] = useState("");
  const [gid, setgid] = useState("");

  function ActionButton(props) {
    const { row } = props;
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
           onClick={()=>{
            setup(row)
            setgid(row._id)
            setCategoryName(row.CategoryName)
            setOpen(true)          
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
          onClick={handleClickOpen}
        >
          <AiFillEdit style={{ marginRight: 10 }} />
          Delete
        </Button>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure to delete the category?"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={() => handleDelete(row._id)}>Yes</Button>
            <Button onClick={handleCloseDialog} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/Category/${id}`);
    getRows();
    handleCloseDialog();
  };
  // const Update = async (id) => {
  //   const res = await axios.get(`http://localhost:4000/Category/${id}`);
  //   const data = res.data;
  // };

  useEffect(() => {
    getRows();
  }, []);
  // const getData = async () => {
  //   const res = await axios.get("http://localhost:4000/Course/show");
  //   const data = await res.data;
  //   setCourse([...data]);
  // };
  const getRows = async () => {
    const res = await axios.get("http://localhost:4000/Category/show");
    const data = await res.data;
    console.log(data);
    setRows([...data]);
  };

  const columns = [
    // {
    //   field: "Degree",
    //   headerName: "Program",
    //   flex: 1,
    //   valueGetter: (params) => {
    //     return params?.row?.Degree?.Degree + " " + params?.row?.Degree?.Program;
    //   },
    // },
    {
      field: "CategoryName",
      headerName: "Category",
      flex: 2,
    },

    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      editable: false,
      renderCell: ActionButton,
    },
  ];
  const onSubmit = async (e) => {
    e.preventDefault();
    var not = ["of","the","and","&","for","in","like"]
    var dig=CategoryName.split(" ")
    var dig2 = dig.map((i)=>{
      if(!not.includes(i.toLowerCase())){
        return i.charAt(0).toUpperCase()+i.slice(1)
      }
      else{
        return i.toLowerCase()
      }
    })
    var naam = dig2.join(" ")
    var check = false;    
    Rows.forEach((i) => {
      if (i.CategoryName.toLowerCase() == CategoryName.toLowerCase()) {
        check = true;
      }      
    });
    if(up!=""){
      if (CategoryName.toLowerCase() == up.CategoryName.toLowerCase()) {
        check = false;         
      }
    }    
    if (check) {      
      alert("Category Already Exists");      
    }
    else if (CategoryName != ""&&up=="") {
      await axios.post("http://localhost:4000/Category/add", {
        CategoryName:naam,
      });
      // setDegree("Degree Program");
      setCategoryName("");
      // setEnteredCourse([]);
      getRows();
      setup("")
      setOpen(false)                
    } 
    else if (CategoryName != ""&&up!="") {
      await axios.put(`http://localhost:4000/Category/${gid}`, {
        CategoryName:naam,
      });
      // setDegree("Degree Program");
      setCategoryName("");
      // setEnteredCourse([]);
      getRows();
      setup("")
      setOpen(false)                
    }     
    else {
      alert("empty values");
    }
  };

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
          <b>COURSE CATEGORIES</b>
        </h1>

        <div className="d-flex justify-content-end mb-4">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleOpen}
            style={muibtn}
          >
            <AiFillEdit style={{ marginRight: 10 }} />
            Add Categories
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="container">
                <Box mb={2} style={{ display: "flex", justifyContent: "end" }}>
                  <CloseIcon
                    onClick={handleClose}
                    style={{ cursor: "pointer", color: "gray" }}
                  />
                </Box>
                <div className="row card justify-content-center">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                      Add Category
                    </h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      {/* <div className="form-floating mb-3">
                      <select
                        class="form-select"
                        onChange={(e) => setDegree(e.target.value)}
                      >
                        <option value={Degree} selected disabled hidden>
                          {Degree}
                        </option>
                        {Programdb.map((p) => {
                          return (
                            <option value={p._id}>
                              {p.Degree} {p.Program}
                            </option>
                          );
                        })}
                      </select>
                    </div> */}

                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          id="inputName"
                          type="text"
                          value={CategoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                          required
                        />
                        <label htmlFor="Email" className="form-label">
                          Category Name
                        </label>
                      </div>
                      <Button
                        style={{ marginRight: 15 }}
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                      >
                        Add Category
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
        <div>
          <DataGrid
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
              LoadingOverlay: LinearProgress,
            }}
            style={{ height: "50vh", width: "100%" }}
            columns={columns}
            getRowId={(Rows) => Rows._id}
            rows={Rows}
            disableSelectionOnClick
          />
        </div>
      </Card>
    </div>
  );
}
