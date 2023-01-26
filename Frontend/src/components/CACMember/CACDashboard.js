import React, { useState, useEffect } from "react";
import "../css/styles.css";
import logo from "./comsats_logo.png";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Card } from "@mui/material";
import CustomNoRowsOverlay from "../AuxillaryComponents/CustomNoRowsOverlay";
import { LinearProgress } from "@mui/material";
export default function CACDashboard() {
  const [Rows, setRows] = useState([]);
  const [rr, setrr] = useState("");
  const [meetings, setmeetings] = useState([]);
  useEffect(() => {
    getUser();
    getmeetings();
  }, []);
  const getmeetings = async () => {
    const res = await axios.get("http://localhost:4000/Meeting/all");
    const user = JSON.parse(localStorage.getItem("user"));
    var row = [];
    var tasks = [],
      members = [];
    res.data.map((val, id) => {
      console.log("sas", val._id);
      console.log("sas", user);

      if (val.teacher_id.find((item) => item._id == user) != undefined) {
        val.taskType.map((i) => {
          tasks.push(i.taskType);
        });
        val.teacher_id.map((i) => {
          members.push(i.Name);
        });

        row.push({
          _id: val._id,
          id: id,
          task: tasks,
          Cacmembers: members,
          meetingDate: val.dateTime,
          report: val,
        });
      }

      // (tasks = []), (members = []);
    });
    console.log("meetings", row);
    setmeetings(row);
  };
  const getUser = async () => {
    const res = await axios.get(`http://localhost:4000/Task/getUser`, {
      withCredentials: true,
    });
    setRows(res.data);
    setrr("rr");
  };
  const columns = [
    {
      field: "taskType",
      headerName: "Task",
      width: "200",
    },

    {
      field: "Deadline",
      headerName: "Deadline",
      width: "150",
    },
    {
      field: "Status",
      headerName: "Status",
      width: "150",
      headerClassName: "gridHeader",
    },
    {
      field: "Program",
      headerName: "Program",
      width: "200",
    },
    {
      field: "Course",
      headerName: "Course", 
      valueGetter: (params) => params?.row?.Course?.Name,     
      width: "200",
    },
    {
      field: "Comment",
      headerName: "Comment",
      width: "200",
    },
  ];

  const [date, setdate] = useState(new Date(Date.now()));

  useEffect(() => {
    deadlines();
  }, [rr]);

  const deadlines = () => {
    var clone = Rows.map((i) => {
      var dd = new Date(i.Deadline);
      if (date <= dd) {
        i.Deadline =
          dd.getDate() +
          "/" +
          (dd.getMonth() + 1) +
          "/" +
          dd.getFullYear() +
          "(" +
          dd.getHours() +
          ":" +
          dd.getMinutes() +
          ")";
        return i;
      } else if (date > dd) {
        i.Deadline = "Deadline Passed";
        return i;
      }
    });
    setRows(clone);
  };

  return (
    <div style={{ width: "100%", padding: 30, backgroundColor: "#f5f5f5" }}>
      <h1 className="pb-4 my-2">
        <b>DASHBOARD</b>
      </h1>

      <div style={{ padding: 20 }}>
        <div>
          <Card style={{ padding: 25, marginBottom: 15 }}>
            <h4 style={{ fontSize: "18px" }} className="mb-4">
              Upcoming Meetings
            </h4>
            <div className="table-responsive my-4">
              <table className="table table-hover">
                <thead style={{ backgroundColor: "#00447f", color: "#fff" }}>
                  <th className="col-8 ">Meeting Subject</th>
                  <th className="col-4">Date</th>
                </thead>
                <tbody style={{ backgroundColor: "#f5f5f5" }}>
                  {meetings.map((item) => (
                    <tr>
                      <td>{item.task}</td>
                      <td>{item.meetingDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <div>
          <Card style={{ padding: 25 }}>
            <h4 style={{ fontSize: "18px" }} className="mb-4">
              All Ongoing Tasks
            </h4>
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
                pageSize={10}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
