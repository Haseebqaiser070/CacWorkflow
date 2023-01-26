import React, { useEffect, useState } from "react";
import "../css/styles.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineClockCircle, AiOutlineUsergroupAdd } from "react-icons/ai";
import { Card, MenuItem, Modal } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/system";

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

export default function FacultyMeeting({ persist }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rows, setRows] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [rowId, setRowId] = useState();
  const [teacherId, setTeacherId] = useState();
  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => setOpen1(false);
  const userid = JSON.parse(localStorage.getItem("user"));

  const columns = [
    {
      field: "MeetingTitle",
      headerName: "Meeting Title",
      flex: 1,
    },
    {
      field: "MeetingTime",
      headerName: "Meeting Time",
      flex: 1,
    },
  ];

  useEffect(() => {
    const getmeetings = async () => {
      const res = await axios.get("http://localhost:4000/Meeting/all");
      var row = [];
      var tasks = " ",
        members = [];
      res.data.map((val, id) => {
        val.teacher_id.map((i) => {
          members.push(i._id);
        });
        if (members.find((i) => i == userid) != null) {
          val.taskType.map((i) => {
            tasks = tasks + i.taskType + " ";
          });

          row[id] = {
            _id: val._id,
            id: id,
            MeetingTitle: tasks,
            MeetingTime: val.dateTime,
            report: val,
          };

          tasks = " ";
        }
      });
      setMeetings(row);
    };

    getmeetings();
  }, []);
  return (
    <div
      className="container"
      style={{ height: 700, width: "100%", padding: 20 }}
    >
      <h1 className="mb-4 py-4">
        <b>ALL MEETINGS SCHEDULED</b>
      </h1>

      <div>
        {meetings.map((item) => (
          <div>
            <Card
              style={{
                backgroundColor: "#4b2980",

                color: "#fff",
                padding: 25,
                borderRadius: "10px",
                marginBottom: 5,
              }}
            >
              <p style={{ textAlign: "center", fontSize: "13px" }}>
                {item.MeetingTime}
              </p>
              <h3>{item.MeetingTitle}</h3>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
