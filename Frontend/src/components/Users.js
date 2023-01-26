import React, { useState, useEffect } from "react";
import "./css/styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  Modal,
  Switch,
} from "@mui/material";
import UserCards from "./AuxillaryComponents/UserCards";
import { muiAbtn } from "./style";

const modalstyle = {
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
const label = { inputProps: { "aria-label": "User Status" } };

export default function Users() {
  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => setOpen1(false);
  const [FirstName, setFirstName] = useState("");
  const [SecondName, setSecondName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [Roles, setRoles] = useState([]);
  const [User, setUser] = useState([]);
  const [Uid, setUid] = useState([]);

  const [AssignCources, setAssignCourse] = useState([]);
  const [Courses, setCourse] = useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [rowid, setrowid] = React.useState("");

  const handleClickOpen = (row) => {
    setrowid(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  axios.defaults.withCredentials = true;
  useEffect(() => {
    getData();
    getCources();
  }, []);
  const BeforeUp = (us) => {
    setUid(us._id);
    setFirstName(us.Name.split(" ")[0]);
    setSecondName(us.Name.split(" ")[1]);
    setEmail(us.Email);
    setRoles(us.Roles);
    setPhone(us.Phone);
    setPassword("oldPassword");
    setOpen1(true);
  };
  const getData = async () => {
    const response = await axios.get("http://localhost:4000/User/show");
    setUser(response.data);
    console.log(response.data);
  };
  const getCources = async () => {
    const res = await axios.get("http://localhost:4000/Course/show");
    const data = await res.data;
    setCourse([{ Name: "none" }, ...data]);
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/User/${id}`);
    getData();
    handleCloseDialog();
  };
  const Update = async (e) => {
    e.preventDefault();
    const Name = FirstName + " " + SecondName;
    await axios.put(`http://localhost:4000/User/update2/${Uid}`, {
      Name,
      Email,
      Password,
      Phone,
      Roles,
    });
    setUid("");
    setFirstName("");
    setSecondName("");
    setEmail("");
    setRoles([]);
    setPhone("");
    setPassword("");
    getData();
    setOpen1(false);
  };
  const activation = async (us) => {
    us.Activated = !us.Activated;
    await axios.put(`http://localhost:4000/User/${us._id}`, us);
    getData();
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
        <h1>
          <b>ALL USERS</b>
        </h1>
        <div style={{ padding: 10 }}>
          <UserCards pre={User} />
        </div>
        <div className="table-responsive">
          <table className="table" id="list">
            <thead>
              <tr className="d-flex">
                <th className="col-2">User Name</th>
                <th className="col-3">Email</th>
                <th className="col-3">Assign Role & Courses</th>
                <th className="col-1">Status</th>
                <th className="col-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {User.map((Usermember) => {
                return (
                  <tr className="d-flex" scope="row" key={Usermember._id}>
                    <td className="col-2">{Usermember.Name}</td>
                    <td className="col-3">{Usermember.Email}</td>
                    <td className="col-3">
                      <div className="row">
                        <div className="col">
                          {Usermember.Roles.map((i) => i + " ")}
                        </div>
                      </div>
                    </td>

                    <td className="col-1">
                      <Switch
                        {...label}
                        checked={Usermember.Activated}
                        onChange={() => activation(Usermember)}
                      />
                    </td>

                    <td className="col-3">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={muiAbtn}
                        onClick={() => BeforeUp(Usermember)}
                      >
                        <AiFillEdit style={{ marginRight: 10 }} />
                        Edit
                      </Button>

                      <Modal
                        open={open1}
                        onClose={handleClose1}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={modalstyle}>
                          <div className="container">
                            <div className="row ">
                              <div className="col-lg-12">
                                <div className=" border-0  mt-3">
                                  <div>
                                    <h3 className="text-center font-weight-bold my-4">
                                      Edit User
                                    </h3>
                                  </div>
                                  <div>
                                    <form onSubmit={Update}>
                                      <div className="row mb-3">
                                        <div className="col-md-6">
                                          <div className="form-floating mb-3 mb-md-0">
                                            <input
                                              className="form-control"
                                              id="inputFirstNameName"
                                              type="text"
                                              placeholder="Enter your first name "
                                              value={FirstName}
                                              onChange={(e) =>
                                                setFirstName(e.target.value)
                                              }
                                            />
                                            <label for="inputFirstName">
                                              First Name
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-floating">
                                            <input
                                              className="form-control"
                                              id="inputLastName"
                                              type="text"
                                              placeholder="Enter your last name"
                                              value={SecondName}
                                              onChange={(e) =>
                                                setSecondName(e.target.value)
                                              }
                                            />
                                            <label for="inputLastName">
                                              Last Name
                                            </label>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="row mb-3">
                                        <div className="col-md-6">
                                          <div className="form-floating mb-3 mb-md-0">
                                            <input
                                              className="form-control"
                                              id="inputPhoneNo"
                                              type="number"
                                              placeholder="Enter your phone nmber"
                                              value={Phone}
                                              onChange={(e) =>
                                                setPhone(e.target.value)
                                              }
                                            />
                                            <label for="inputLastName">
                                              Phone Number
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            options={userRole}
                                            getOptionLabel={(option) => option}
                                            defaultValue={[...Roles]}
                                            onChange={(e, val) => setRoles(val)}
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                variant="outlined"
                                                label="Select User Roles"
                                                placeholder="User Roles"
                                              />
                                            )}
                                          />
                                        </div>
                                        <div className="col-md-12">
                                          <div className="form-floating mb-3 mt-3 mb-md-0">
                                            <input
                                              className="form-control"
                                              id="inputEmail"
                                              type="email"
                                              placeholder="name@example.com"
                                              value={Email}
                                              onChange={(e) =>
                                                setEmail(e.target.value)
                                              }
                                            />
                                            <label for="inputEmail">
                                              Email address
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-12">
                                          <div className="form-floating mb-3 mb-md-0 mt-3">
                                            <input
                                              className="form-control"
                                              id="inputPasswordConfirm"
                                              type="password"
                                              placeholder="Enter password"
                                              value={Password}
                                              onChange={(e) =>
                                                setPassword(e.target.value)
                                              }
                                            />
                                            <label for="inputPasswordConfirm">
                                              Password
                                            </label>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="row mb-3"></div>
                                      <div className="mt-4 mb-0">
                                        <div className="d-grid">
                                          <input
                                            type="submit"
                                            name="Edit User"
                                            value="Submit"
                                            className="btn btn-primary ms-auto me-0 me-md-3 my-2 my-md-0"
                                          />
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Box>
                      </Modal>

                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={muiAbtn}
                        onClick={() => {
                          setrowid(Usermember._id);
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
                          {"Are you sure to delete the user?"}
                        </DialogTitle>

                        <DialogActions>
                          <Button
                            onClick={() => {
                              handleDelete(rowid);
                              getData();
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
const userRole = ["Admin", "CAC", "Faculty", "Evaluator"];
