import React, { useState, useEffect } from "react";
import "./css/styles.css";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import {
  Autocomplete,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import axios from "axios";

import CloseIcon from "@mui/icons-material/Close";
import { muibtn } from "./style";

export default function CreateTasks(props) {
  axios.defaults.withCredentials = true;
  const [RepoCourse, setRepoCourse] = useState([]);
  const [comment, setComment] = useState("");

  const [obj, setobj] = useState([
    {
      taskType: props.pre.taskType,
      User: [],
      Deadline: "",
      Status: "Assigned",
      Course: "",
      Program: props.pre.Program,
      Comment:""
    },
  ]);
  useEffect(() => {
    if (props.pre.taskType == "Create Catalog Description") {
      getCreateCat();
    }     
    else if (props.pre.taskType == "Update Catalog Description") {
      getUpdateCat();
    }    
    else if (props.pre.taskType == "Create CDF"){
      getCreateCDF()
    } 
    else if (props.pre.taskType == "Update CDF") {
      getUpdateCDF();
    }
    else if (props.pre.taskType == "Create Syllabus"){
      getCreateSyllabus();
    } 
    else if (props.pre.taskType == "Update Syllabus") {
      getUpdateSyllabus();
    }
  }, []);
  const getCreateSyllabus = async () => {
    const response = await axios.get(
      "http://localhost:4000/RepoCourse/showcreateSyllabus"
    );
    setRepoCourse(response.data);
  };
  const getUpdateSyllabus = async () => {
    const response = await axios.get(
      "http://localhost:4000/RepoCourse/showupdateSyllabus"
    );
    setRepoCourse(response.data);
  };

  const getUpdateCat = async () => {
    const res = await axios.get(
      "http://localhost:4000/RepoCourse/showupdatecat"
    );
    setRepoCourse(res.data);
  };
  const getCreateCDF = async () => {
    const res = await axios.get(
      "http://localhost:4000/RepoCourse/showcreateCDF"
    );
    setRepoCourse(res.data);
  };
  const getUpdateCDF = async () => {
    const res = await axios.get("http://localhost:4000/RepoCourse/showupdateCDF");
    setRepoCourse(res.data);
  };

  const getCreateCat = async () => {
    const response = await axios.get("http://localhost:4000/RepoCourse/showcreatecat");
    setRepoCourse(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(obj);
    let verify = true;
    
    obj.forEach((e) => {
      console.log("e", e);
      var ab =new Date(e.Deadline)
      var cc =new Date(Date.now())
      console.log("e", e);
      if (
        e.User.length<1 ||
        ab<cc  ||
        e.Status == "" 
      ) {
        verify = false;
      }
    });
    if (verify) {
      console.log("23s");
      const res = await axios.post("http://localhost:4000/Task/add", {
        obj,
        id: props.pre._id,
      });
      setobj([]);
      props.func();
    } else {
      alert("Empty or inccorrect Field");
    }
  };
  return (
    <div className="container">
      <Box component="form" onSubmit={handleSubmit}>
        <h2>ASSIGN TASK</h2>

        <div className="col">
          <TextField
            className="my-4"
            id="outlined-basic"
            label="Task Type"
            variant="outlined"
            value={props.pre.taskType}
            size="small"
            fullWidth
          />
        </div>
        {obj.map((e, index) => {
          return (
            <>
              <div className="row my-2">
                <div className="col-9">
                  <h3 style={{ textAlign: "start" }}>
                    <b>TASK {index + 1} </b>
                  </h3>
                </div>
                <div className="col-3">
                  {obj.length > 1 && (
                    <FormControl>
                      <Button
                        style={{
                          backgroundColor: "red",
                          borderRadius: "100px",
                        }}
                        variant="contained"
                        // className="my-4"
                        color="primary"
                        size="small"
                        onClick={() => {
                          const clone = [...obj];
                          console.log("ondex", index);
                          if (clone.length == index + 1) {
                            console.log("last rm");
                            clone[index] = {
                              taskType: props.pre.taskType,
                              User: [], 
                              Deadline: "",
                              Status: "Assigned",
                              Course: "",
                              Program: props.pre.Program,
                              Comment:""
                            };
                          } else if (clone.length != index + 1) {
                            console.log("not last rm");
                            clone[index] = clone[index + 1];
                          }
                          const a = clone.splice(index, 1);
                          console.log("aaaaaaaaaaaaa", a, "cloneeeeeee", clone);
                          setobj([...clone]);
                        }}
                      >
                        <CloseIcon />
                      </Button>
                    </FormControl>
                  )}
                </div>
              </div>
              <div>
                <FormControl fullWidth size="small">
                  <Autocomplete
                    className="mb-4"
                    multiple
                    id="tags-standard"
                    value={obj[index].User}
                    options={props.pre.AssignMember}
                    getOptionLabel={(option) => option.Name}
                    defaultValue={null}
                    onChange={(e, val) => {                      
                      const clone = [...obj];
                      clone[index].User = [...val];
                      setobj([...clone]);
                      }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select Users"
                        placeholder="Select Users"
                        size="small"
                      />
                    )}
                  />
                </FormControl>
              </div>
              {/* <div>
                <FormControl fullWidth size="small">
                  <InputLabel id="taskType">Assign Teacher</InputLabel>
                  <Select
                    className="mb-4"
                    labelId="taskType"
                    id="taskType"
                    value={obj[index].User}
                    label="Assign Teacher"
                    onChange={(e) => {
                      const clone = [...obj];
                      clone[index].User = e.target.value;
                      setobj([...clone]);
                    }}
                    autoWidth
                  >
                    {props.pre.AssignMember.map((a) => {
                      return <MenuItem value={a}>{a.Name}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </div> */}

              {props.pre.taskType == "Create Catalog Description" ||
              props.pre.taskType == "Create CDF" ||
              props.pre.taskType == "Create Syllabus" ||
              props.pre.taskType == "Update Catalog Description" ||
              props.pre.taskType == "Update CDF" ||
              props.pre.taskType == "Update Syllabus" ? (
                <div>
                  <FormControl fullWidth size="small">
                    <InputLabel id="taskType">Assign Course</InputLabel>
                    <Select
                      className="mb-4"
                      labelId="courseAssign"
                      id="courseAssign"
                      value={obj[index].Course}
                      label="Assign Teacher"
                      onChange={(e) => {
                        const clone = [...obj];
                        clone[index].Course = e.target.value;
                        setobj([...clone]);
                      }}
                      autoWidth
                    >
                      {RepoCourse.map((a) => {
                        return (
                          <MenuItem value={a}>
                            {a.Code + "  " + a.Name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              ) : props.pre.taskType == "Create SOS" ? (
                <div className="col">
                  <FormControl fullWidth size="small">
                    <InputLabel id="taskType">Assign Course</InputLabel>
                    <Select
                      className="mb-4"
                      labelId="courseAssign"
                      id="courseAssign"
                      value={obj[index].Program}
                      label="Assign Teacher"
                      autoWidth
                    >
                      <MenuItem value={props.pre.Program}>
                        {props.pre.Program}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              ) : props.pre.taskType == "Update SOS" ? (
                <div>
                  <div>
                    <FormControl fullWidth size="small">
                      <InputLabel id="taskType">Assign Course</InputLabel>
                      <Select
                        className="mb-4"
                        labelId="courseAssign"
                        id="courseAssign"
                        value={obj[index].Program}
                        label="Assign Teacher"
                        autoWidth
                      >
                        <MenuItem value={props.pre.Program}>
                          {props.pre.Program}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div>
                <label>Deadline</label>
                <input
                  className="mb-4"
                  // inputProps={{min = new Date.toISOString.slice(0,16)}}
                  value={obj[index].Deadline}
                  onChange={(e) => {
                    const clone = [...obj];
                    clone[index].Deadline = e.target.value;
                    setobj([...clone]);
                  }}
                  style={{ width: "100%" }}
                  type="datetime-local"
                  placeholder="Deadline"
                ></input>
              </div>
              <div>
                <FormControl fullWidth size="medium">
                  <TextField
                    multiline={true}
                    rows={2}
                    className="mb-4"
                    id="outlined-basic"
                    label="Comments"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={obj[index].Comment}
                    onChange={(e) => {
                      const clone = [...obj];
                      clone[index].Comment = e.target.value;
                      setobj([...clone]);
                    }}
                  />
                </FormControl>
              </div>
            </>
          );
        })}
        <div className="row">
          <div className="col">
            <Button
              variant="contained"
              color="primary"
              size="medium"
              style={muibtn}
              onClick={() => {
                setobj([
                  ...obj,
                  {
                    taskType: props.pre.taskType,
                    User: [],
                    Deadline: "",
                    Status: "Assigned",
                    Course: "",
                    Program: props.pre.Program,
                    Comment:""
                  },
                ]);
              }}
            >
              Add
            </Button>
          </div>
          <div className="col">
            <Button
              style={muibtn}
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              onClick={() => {
                TaskDetails;
              }}
            >
              Create Task
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}
