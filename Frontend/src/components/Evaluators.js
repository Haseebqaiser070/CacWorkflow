import React, { useState, useEffect } from "react";
import "./css/styles.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import Autocomplete from "@mui/material/Autocomplete";
import { AiFillDelete, AiFillEdit, AiFillFilePdf } from "react-icons/ai";
import {
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { muiAbtn, muibtn } from "./style";
import CustomNoRowsOverlay from "./AuxillaryComponents/CustomNoRowsOverlay";

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

export default function Evaluators() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setobj([
      {
        Faculty: "",
        Folders: "",
      },
    ]);
    setUser("");
    setUserFolders([[]]);
    setup(false);
  };
  const [up, setup] = useState(false);
  const [User, setUser] = useState("");
  const [Rows, setRows] = useState([]);
  const [FacUsers, setFacUsers] = useState([]);

  const [obj, setobj] = useState([
    {
      Faculty: "",
      Folders: "",
    },
  ]);
  const [UserFolders, setUserFolders] = useState([[]]);

  const getUsers = async () => {
    const res = await axios.get("http://localhost:4000/User/show/Faculty");
    setFacUsers(res.data);
  };
  const getUserFolds = async (index, fac) => {
    const res = await axios.get(
      `http://localhost:4000/UserAssigedFolders/showAllbyid/${fac._id}`
    );
    const clone = [...UserFolders];
    console.log("res.data", res.data);
    clone[index] = res.data;
    setUserFolders([...clone]);
  };
  console.log(Rows);
  useEffect(() => {
    getUsers();
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.get(
      "http://localhost:4000/User/show/Evaluator"
    );
    setRows(response.data);
  };

  const getobjs = async (id) => {
    console.log("id", id);
    const response = await axios.get(
      `http://localhost:4000/EvalFolders/showAllbyid/${id}`
    );
    console.log("response", response);
    const col = response.data?.map((i) => {
      return {
        Faculty: i.Folder?.User,
        Folders: i.Folder,
      };
    });
    setobj([...col]);
    console.log("col", col);
    const col2 = await Promise.all(
      col.map(async (i) => {
        console.log("i", i);
        const res = await axios.get(
          `http://localhost:4000/UserAssigedFolders/showAllbyid/${i.Faculty?._id}`
        );
        return [...res.data];
      })
    );
    console.log("col2", col2);
    setUserFolders([...col2]);
    setup(true);
    setOpen(true);
  };
  const Submitform = async (e) => {
    e.preventDefault();
    console.log("obj", obj);
    let verify = true;
    obj.forEach((i) => {
      console.log("i", i);
      if (i.Faculty == "" || i.Folders == "") {
        verify = false;
      }
    });
    if (verify) {
      try {
        if (!up) {
          await axios.post("http://localhost:4000/EvalFolders/add", {
            obj,
            User,
          });
        } else {
          await axios.post("http://localhost:4000/EvalFolders/add2", {
            obj,
            User,
          });
        }
        getData();
        handleClose();
      } catch (err) {
        if (err.response?.data === "Already Assigned") {
          alert(
            "Already Assigned a Teacher to this Section, Course and Program"
          );
        }
      }
    } else {
      alert("Empty Field");
    }
  };

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCloseDialog2 = async () => {
    await axios.post("http://localhost:4000/EvalFolders/finishAll");
    getData();
    setOpenDialog(false);
  };
  const columns = [
    {
      field: "Name",
      headerName: "Name",
      width: "280",
    },
    {
      field: "Email",
      headerName: "Email",
      width: "350",
    },

    {
      field: "actions",
      headerName: "Actions",
      width: "350",
      editable: false,
      renderCell: ({ row }) => (
        <>
          {row.EvaluateFolders.length < 1 ? (
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={muiAbtn}
              onClick={() => {
                setUser(row);
                setOpen(true);
              }}
            >
              <AiFillEdit style={{ marginRight: 10 }} />
              Assign Course
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={muiAbtn}
              onClick={() => {
                setUser(row);
                getobjs(row._id);
              }}
            >
              <AiFillEdit style={{ marginRight: 10 }} />
              Edit Course
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={muiAbtn}
            onClick={async () => {
              await axios.post(
                `http://localhost:4000/EvalFolders/finish/${row._id}`
              );
              getData();
            }}
          >
            <AiFillDelete style={{ marginRight: "6px" }} />
            Cancel
          </Button>
        </>
      ),
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
          <b>EVALUATORS</b>
        </h1>
        <div className="d-flex justify-content-end mb-4">
          <Button
            style={muibtn}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              navigate("/Admin/EvaluatorCourseReport");
            }}
          >
            <AiFillFilePdf style={{ marginRight: 10 }} />
            Generate Report
          </Button>
          <Button
            variant="contained"
            className="ms-4"
            color="primary"
            size="medium"
            style={muibtn}
            onClick={handleClickOpen}
          >
            <AiFillDelete style={{ marginRight: "6px" }} />
            Cancel all folders Assignment
          </Button>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure to cancel all courses assigned to evaluators?"}
            </DialogTitle>

            <DialogActions>
              <Button onClick={handleCloseDialog2}>Yes</Button>
              <Button onClick={handleCloseDialog} autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>
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

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={style} onSubmit={Submitform}>
            {obj.map((e, index) => {
              return (
                <>
                  <h4 className="mb-4">ASSIGN COURSE FOLDER {index + 1}</h4>
                  {obj.length > 1 && (
                    <FormControl>
                      <Button
                        className="mb-3"
                        variant="contained"
                        color="primary"
                        size="medium"
                        style={muibtn}
                        onClick={() => {
                          const clone = [...obj];
                          console.log("ondex", index);
                          if (clone.length == index + 1) {
                            console.log("last rm");
                            clone[index] = {
                              Faculty: "",
                              Folders: "",
                            };
                          } else if (clone.length != index + 1) {
                            console.log("not last rm");
                            clone[index] = clone[index + 1];
                          }
                          const a = clone.splice(index, 1);
                          setobj([...clone]);

                          var clone2 = [...UserFolders];
                          if (clone2.length == index + 1) {
                            console.log("last rm");
                            clone2[index] = [];
                          } else if (clone2.length != index + 1) {
                            clone2[index] = clone2[index + 1];
                          }
                          const b = clone2.splice(index, 1);
                          setUserFolders([...clone2]);
                        }}
                      >
                        remove
                      </Button>
                    </FormControl>
                  )}

                  <div className="form-floating ">
                    <FormControl classname="mt-4" fullWidth size="small">
                      <InputLabel id="taskType">Assign Folder</InputLabel>
                      <Select
                        className="mb-4"
                        labelId="taskType"
                        id="taskType"
                        label="Assign Teacher"
                        value={obj[index].Faculty}
                        onChange={(e) => {
                          const clone = [...obj];
                          clone[index].Faculty = e.target.value;
                          setobj([...clone]);
                          getUserFolds(index, e.target.value);
                        }}
                        autoWidth
                      >
                        {up && (
                          <MenuItem
                            value={obj[index]?.Faculty}
                            selected
                            disabled
                          >
                            {obj[index]?.Faculty?.Name}
                          </MenuItem>
                        )}
                        {FacUsers.map((p) => {
                          return <MenuItem value={p}>{p.Name}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>

                    <FormControl classname="mt-4" fullWidth size="small">
                      <InputLabel id="taskType">Assign Folder</InputLabel>
                      <Select
                        className="mb-4"
                        labelId="taskType"
                        id="taskType"
                        value={obj[index].Folders}
                        label="Assign Course"
                        onChange={(e) => {
                          const clone = [...obj];
                          clone[index].Folders = e.target.value;
                          setobj([...clone]);
                        }}
                        autoWidth
                      >
                        {up && (
                          <MenuItem
                            value={obj[index]?.Folders}
                            selected
                            disabled
                          >
                            {obj[index]?.Folders?.Course?.Code}{" "}
                            {obj[index]?.Folders?.Course?.Name}{" "}
                            {obj[index]?.Folders?.LabTheory == "Lab" &&
                              "(" + obj[index]?.Folders?.LabTheory + ")"}
                          </MenuItem>
                        )}
                        {UserFolders.length > 0 &&
                          UserFolders[index]?.map((a) => {
                            return (
                              <MenuItem value={a}>
                                {a?.Course?.Code} {a?.Course?.Name}{" "}
                                {a?.LabTheory == "Lab" &&
                                  "(" + a?.LabTheory + ")"}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </div>
                </>
              );
            })}
            <div className="d-flex justify-content-center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                width="100"
                style={{
                  backgroundColor: "#4b2980",
                  marginTop: 10,
                  marginRight: 20,
                }}
                onClick={() => {
                  setobj([
                    ...obj,
                    {
                      Faculty: "",
                      Folders: "",
                    },
                  ]);
                  setUserFolders([...UserFolders, []]);
                }}
              >
                Add another Course
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                width="100"
                type="submit"
                style={{ backgroundColor: "#4b2980", marginTop: 10 }}
              >
                Assign Course
              </Button>
            </div>
          </Box>
        </Modal>
      </Card>
    </div>
  );
}
