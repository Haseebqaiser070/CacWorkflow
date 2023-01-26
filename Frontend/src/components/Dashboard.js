import { Button, Card } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./css/styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { muibtn } from "./style";
export default function Dashboard() {
  const [meetings, setmeetings] = useState([]);
  const [assignTasks, setassignTask] = useState([]);
  const [Returned, setReturned] = useState([]);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    getmeetings();
    getassigned();
    getReturned();
  }, []);

  const getassigned = async () => {
    const res = await axios.get("http://localhost:4000/Task/show/Assigned");
    console.log(res.data);
    var clone = [];
    var count = 0;
    res.data.forEach((e) => {
      if (count < 5) {
        clone.push(e);
        count = count + 1;
      }
    });
    setassignTask(clone);
  };
  const getReturned = async () => {
    const res = await axios.get("http://localhost:4000/Task/show/Returned");
    var clone = [];
    var count = 0;
    res.data.forEach((e) => {
      if (count < 5) {
        clone.push(e);
        count = count + 1;
      }
    });
    setReturned(clone);
  };

  const getmeetings = async () => {
    const res = await axios.get("http://localhost:4000/Meeting/all");
    var row = [];
    var tasks = [],
      members = [];
    res.data.map((val, id) => {
      val.taskType.map((i) => {
        tasks.push(i.taskType);
      });
      val.teacher_id.map((i) => {
        members.push(i.Name);
      });

      row[id] = {
        _id: val._id,
        id: id,
        task: tasks,
        Cacmembers: members,
        meetingDate: val.dateTime,
        report: val,
      };

      (tasks = []), (members = []);
    });
    console.log("meetings", res.data);
    setmeetings(row);
  };

  return (
    <div
      style={{
        width: "100%",
        padding: 30,
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1 className="pb-4 my-2">
        <b>DASHBOARD</b>
      </h1>

      <div>
        <Card style={{ padding: 25 }}>
          <h4 style={{ fontSize: "18px" }} className="mb-4">
            Upcoming Meetings
          </h4>
          <div className="table-responsive my-4">
            <table
              className="table table-hover"
              style={{ textAlign: "center" }}
            >
              <thead style={{ backgroundColor: "#023866", color: "#fff" }}>
                <th className="col-4">Meeting Subject</th>
                <th className="col-3">Date</th>
                <th className="col-4">Members</th>
              </thead>
              <tbody style={{ backgroundColor: "#f5f5f5" }}>
                {meetings.length > 0 ? (
                  meetings.map((item, id) => (
                    <tr>
                      <td>{item.task}</td>
                      <td>{item.meetingDate}</td>
                      <td>{item.Cacmembers}</td>
                    </tr>
                  ))
                ) : (
                  <h4>Nothing to show</h4>
                )}
              </tbody>
            </table>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={muibtn}
              onClick={() => {
                navigate(`/Admin/CreateNewMeeting`, { replace: true });
              }}
            >
              View All
            </Button>
          </div>
        </Card>
      </div>

      <div className="row" style={{ marginTop: 30 }}>
        <div className="col">
          <Card style={{ padding: 25 }}>
            <h4 style={{ fontSize: "18px" }} className="mb-4">
              Task Assigned
            </h4>
            <div className="table-responsive my-4">
              <table
                className="table table-hover"
                style={{ textAlign: "center" }}
              >
                <thead style={{ backgroundColor: "#023866", color: "#fff" }}>
                  <th className="col-4">Task Type</th>
                  <th className="col-3">Date</th>
                  <th className="col-4">Members</th>
                </thead>
                <tbody style={{ backgroundColor: "#f5f5f5" }}>
                  {assignTasks.length > 0 ? (
                    assignTasks.map((i) => {
                      return (
                        <tr>
                          <td>{i.taskType}</td>
                          <td>{i.Deadline}</td>
                          <td>{i.User.map((i) => i.Name)},</td>
                        </tr>
                      );
                    })
                  ) : (
                    <h4>Nothing to show</h4>
                  )}
                </tbody>
              </table>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={muibtn}
                onClick={() => {
                  navigate(`/Admin/InitializeTask`, { replace: true });
                }}
              >
                View All
              </Button>
            </div>
          </Card>
        </div>
        <div className="col">
          <Card style={{ padding: 25 }}>
            <h4 style={{ fontSize: "18px" }} className="mb-4">
              Returned Tasks
            </h4>
            <div className="table-responsive my-4">
              <table
                className="table table-hover"
                style={{ textAlign: "center" }}
              >
                <thead style={{ backgroundColor: "#023866", color: "#fff" }}>
                  <th className="col-4">Task Type</th>
                  <th className="col-3">Date</th>
                  <th className="col-4">Members</th>
                </thead>
                <tbody style={{ backgroundColor: "#f5f5f5" }}>
                  {Returned.length > 0 ? (
                    Returned.map((i) => {
                      return (
                        <tr>
                          <td>{i.taskType}</td>
                          <td>{i.Deadline}</td>
                          <td>{i.User.map((i) => i.Name)},</td>
                        </tr>
                      );
                    })
                  ) : (
                    <h4>Nothing to show</h4>
                  )}
                </tbody>
              </table>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={muibtn}
                onClick={() => {
                  navigate(`/Admin/ReturnedTasks`, { replace: true });
                }}
              >
                View All
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
