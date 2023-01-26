import Button from "@mui/material/Button";
import { AiFillPrinter } from "react-icons/ai";

import React, { useEffect, useState, useRef } from "react";
import "./pdfstyles.css";

import { useLocation } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import comsatslogo from "../CACMember/comsats_logo.png";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function OngoingTasks() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [Rep, setRep] = useState([]);
  const [taskType, settaskType] = useState("");
  const [Program, setProgram] = useState("");
  const [Person, setPerson] = useState("");  
  const [Programs, setPrograms] = useState([]);
  const [status, setstaus] = useState("");

  const [CAC, setCAC] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    get();
    getPrograms();
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.get("http://localhost:4000/User/show/CAC");
    setCAC(response.data);
  };
  const get = async () => {
    const res = await axios.get("http://localhost:4000/Task/ShowallReport");
    console.log(res.data);
    setRep(res.data);
  };
  const getPrograms = async () => {
    const res = await axios.get("http://localhost:4000/Program/show");
    setPrograms(res.data);
  };
  return (
    <>
      <div style={{ padding: 30 }}>
        <div className="d-flex justify-content-end">
          <div className="row ">
            <div className="col">
              <Box sx={{ minWidth: 180 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="taskType">Filter By Programs</InputLabel>
                  <Select
                    value={Program}
                    label="Filter By Programs"
                    onChange={(e) => setProgram(e.target.value)}
                  >
                    <MenuItem value={"For All"}>For All</MenuItem>
                    {Programs.map((a) => {
                      return (
                        <MenuItem value={a.Degree + " " + a.Program}>
                          {a.Degree} {a.Program}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="col">
              <Box sx={{ minWidth: 180 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="taskType">Filter By Tasks</InputLabel>
                  <Select
                    value={taskType}
                    label="Filter By Tasks"
                    onChange={(e) => settaskType(e.target.value)}
                  >
                    <MenuItem value={"Create Catalog Description"}>
                      Create Catalog Description
                    </MenuItem>
                    <MenuItem value={"Update Catalog Description"}>
                      Update Catalog Description
                    </MenuItem>
                    <MenuItem value={"Create SOS"}>Create SOS</MenuItem>
                    <MenuItem value={"Update SOS"}>Update SOS</MenuItem>
                    <MenuItem value={"Create CDF"}>Create CDF</MenuItem>
                    <MenuItem value={"Update CDF"}>Update CDF</MenuItem>
                    <MenuItem value={"Create Syllabus"}>
                      Create Syllabus
                    </MenuItem>
                    <MenuItem value={"Update Syllabus"}>
                      Update Syllabus
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="col">
              <Box sx={{ minWidth: 220 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="taskType">Filter By Faculty</InputLabel>
                  <Select
                    value={Person}
                    label="Filter By Faculty"
                    onChange={(e) => setPerson(e.target.value)}
                  >                   
                  {CAC.map((a) => {
                      return (
                        <MenuItem value={a}>
                          {a.Name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="col">
              <Box sx={{ minWidth: 180 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="taskType">Filter By Status</InputLabel>
                  <Select
                    value={status}
                    label="Filter By Status"
                    onChange={(e) => setstaus(e.target.value)}
                  >
                    <MenuItem value={"Assigned"}>Assigned</MenuItem>
                    <MenuItem value={"Revision"}>Revision</MenuItem>
                    <MenuItem value={"Late"}>Late</MenuItem>
                    <MenuItem value={"Finished"}>Finished</MenuItem>                  
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="col">
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={handlePrint}
              >
                <AiFillPrinter style={{ marginRight: 10 }} />
                Print
              </Button>
            </div>
          </div>
        </div>
        <div ref={componentRef} className="main">
          <div>
            <div
              className="d-flex row justify-content-center mb-4"
              style={{ margin: 30 }}
            >
              <div className="col-12">
                <h1>COMSATS University Islamabad</h1>
                <h1>Department of Computer Science</h1>
                <h2>All Ongoing Tasks</h2>
              </div>
            </div>
            {Rep.map((e) => {
              if((Program==""||e.Program==Program)&&(taskType==""||e.taskType==taskType)&&
              (Person==""||e.AssignMember.some(item => item.Name == Person.Name))
              &&(status==""||e.Task.some(item => item.Status == status))
              ){
              return (
                <>
                  <div style={{ marginBottom: "40px" }}>
                    <div>
                      <h3
                        style={{
                          backgroundColor: "#000",
                          color: "#fff",
                          padding: 5,
                          textAlign: "left",
                        }}
                        className="head my-4"
                      >
                        {e.taskType}
                      </h3>
                      <div className="row ">
                        <div className="col">
                          <p>
                            <b>Program: </b> {e.Program}
                          </p>
                        </div>
                        {/* <div className="col">
                    <p style={{ color: "red", textAlign: "right" }}>
                      <b>Status: </b> Assigned
                    </p>
                  </div> */}
                      </div>

                      <p>
                        <b> Members Allocated: </b>{" "}
                        {e.AssignMember.map((i) => {
                          return <p>{i.Name}</p>;
                        })}
                      </p>
                    </div>
                    <div
                      style={{
                        backgroundColor: "#f6f6f6",
                        padding: "5px 25px 5px 25px",
                      }}
                    >
                      {e.Task.map((q, index) => {
                        return (
                          <div>
                            <h2
                              style={{
                                textAlign: "left",
                                marginTop: 35,
                                marginBottom: 15,
                              }}
                            >
                              {index + 1}. {q.User.map((i) => i.Name)},
                            </h2>
                            <div className="row">
                              {q.taskType == "Create SOS" ||
                              q.taskType == "Update SOS" ? (
                                <div className="col">
                                  <p>
                                    <b>Program: </b> {e.Program}
                                  </p>
                                </div>
                              ) : (
                                <div className="col">
                                  <p>
                                    <b>Course Assigned: </b> {q.Course.Name}
                                  </p>
                                </div>
                              )}

                              <div className="col">
                                <p style={{ textAlign: "right" }}>
                                  <b>Status: </b> {q.Status}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              );}
            })}
          </div>
        </div>
      </div>
    </>
  );
}
