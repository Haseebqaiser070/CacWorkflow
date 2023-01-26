import React, { useState, useEffect } from "react";
import "../css/styles.css";
import logo from "./comsats_logo.png";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Card } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FacultyDashboard() {
  const [Rows, setRows] = useState([]);
  const columns = [
    {
      field: "quiz1",
      headerName: "Quiz 1",
      flex: 1,
    },
    {
      field: "quiz2",
      headerName: "Quiz 2",
      flex: 1,
    },
    {
      field: "quiz3",
      headerName: "Quiz 3",
      flex: 1,
    },
    {
      field: "quiz4",
      headerName: "Quiz 4",
      flex: 1,
    },
    {
      field: "midterm",
      headerName: "Mid Term",
      flex: 1,
    },
    {
      field: "terminal",
      headerName: "Terminal",
      flex: 1,
    },
  ];

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [Courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);
  const getCourses = async () => {
    const res = await axios.get(
      "http://localhost:4000/UserAssigedFolders/showUserCourses"
    );
    console.log(res.data);
    setCourses([...res.data]);
  };

  return (
    <div style={{ width: "100%", padding: 30 }}>
      <div className="row mt-4 mb-4">
        <div>
          <Card style={{ padding: 25, marginBottom: 25 }}>
            <h4 style={{ fontSize: "18px" }} className="mb-4">
              Courses assigned
            </h4>
            <div className="table-responsive my-4">
              <table
                className="table table-hover"
                style={{ textAlign: "center" }}
              >
                <thead style={{ backgroundColor: "#023866", color: "#fff" }}>
                  <th className="col-4">Program</th>
                  <th className="col-3">Course</th>
                  <th className="col-4">Action</th>
                </thead>
                <tbody style={{ backgroundColor: "#f5f5f5" }}>
                  {Courses.length > 0 ? (
                    Courses.map((i) => {
                      return (
                        <tr>
                          <td>{i.Program}</td>
                          <td>{i.Name}</td>
                          <td>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              style={{ backgroundColor: "#4b2980" }}
                              onClick={() => {
                                navigate(
                                  `/Faculty/Courses/${i.Program}/${i.Code}`,
                                  {
                                    replace: true,
                                  }
                                );
                              }}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <h4>Nothing to show</h4>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        <div>
          <Card style={{ padding: 25, marginBottom: 25 }}>
            <h4 style={{ fontSize: "18px" }} className="mb-4">
              CDF of Courses
            </h4>
            <div className="table-responsive my-4">
              <table
                className="table table-hover"
                style={{ textAlign: "center" }}
              >
                <thead style={{ backgroundColor: "#023866", color: "#fff" }}>
                  <th className="col-4">Program</th>
                  <th className="col-3">Course</th>
                  <th className="col-4">Action</th>
                </thead>
                <tbody style={{ backgroundColor: "#f5f5f5" }}>
                  {Courses.length > 0 ? (
                    Courses.map((i) => {
                      return (
                        <tr>
                          <td>{i.Program}</td>
                          <td>{i.Name}</td>
                          <td>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              style={{ backgroundColor: "#4b2980" }}
                              onClick={() => {
                                navigate(
                                  `/Faculty/CDF/${i.Program}/${i.Code}`,
                                  {
                                    replace: true,
                                  }
                                );
                              }}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <h4>Nothing to show</h4>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <div>
          <Card style={{ padding: 25, marginBottom: 25 }}>
            <h4 style={{ fontSize: "18px" }} className="mb-4">
              Syllabus of Courses
            </h4>
            <div className="table-responsive my-4">
              <table
                className="table table-hover"
                style={{ textAlign: "center" }}
              >
                <thead style={{ backgroundColor: "#023866", color: "#fff" }}>
                  <th className="col-4">Program</th>
                  <th className="col-3">Course</th>
                  <th className="col-4">Action</th>
                </thead>
                <tbody style={{ backgroundColor: "#f5f5f5" }}>
                  {Courses.length > 0 ? (
                    Courses.map((i) => {
                      return (
                        <tr>
                          <td>{i.Program}</td>
                          <td>{i.Name}</td>
                          <td>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              style={{ backgroundColor: "#4b2980" }}
                              onClick={() => {
                                navigate(
                                  `/Faculty/Syllabus/${i.Program}/${i.Code}`,
                                  {
                                    replace: true,
                                  }
                                );
                              }}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <h4>Nothing to show</h4>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <div>
          <Card style={{ padding: 25 }}>
            <h4 style={{ fontSize: "18px" }} className="mb-4">
              OBE Guide Book
            </h4>
            <div className="table-responsive my-4">
              <table
                className="table table-hover"
                style={{ textAlign: "center" }}
              >
                <thead style={{ backgroundColor: "#023866", color: "#fff" }}>
                  <th className="col-8">OBE Guide Book</th>
                  <th className="col-4">Action</th>
                </thead>
                <tbody style={{ backgroundColor: "#f5f5f5" }}>
                  <tr>
                    <td>OBE Guide Book</td>
                    <td>
                      {" "}
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ backgroundColor: "#4b2980" }}

                        // onClick={handleOpen1}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
