import React, { useState, useEffect } from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Popup from "../AuxillaryComponents/PopupFunction";
import axios from "axios";
import Button from "@mui/material/Button";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Card,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import CustomNoRowsOverlay from "../AuxillaryComponents/CustomNoRowsOverlay";
import { muiAbtn, muibtn } from "../style";
import { Box } from "@mui/system";

export default function AllCourses() {
  const [Course, setCourse] = useState([]);
  const [id, setid] = useState("");

  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [report, setreport] = React.useState("");

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(async () => {
    await getCourse();
  }, []);

  const getCourse = async () => {
    try {
      const response = await axios.get("http://localhost:4000/ProgramCourses/showAll");
      setCourse(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:4000/ProgramCourses/${id}`);
//     getCourse();
//     handleCloseDialog();
//   };
//   const handleUpdate = (id) => {
//     navigate(`/admin/EditCourse/${id}`, { replace: true });

//     /* 
//     const response = await axios.get(`http://localhost:4000/Course/${id}`);
//     const updating = await response.data;
//     */
//   };

  const columns = [
    {
      field: "Code",
      headerName: "Course Code",
      width: 150,
    },
    {
      field: "Name",
      headerName: "Course Name",
      width: 350,
    },
    {
        field: "Program",
        headerName: "Program",
        width: 350,
      },
    {
      field: "CreditHours",
      headerName: "Credit Hour",
      valueGetter: (params) => {
        return (
          params?.row?.Credit +
          "(" +
          params?.row?.LectureHoursWeek +
          "," +
          params?.row?.LabHoursWeek +
          ")"
        );
      },
      width: 150,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 350,
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
            navigate(`/Admin/ProgramCourseView/${row._id}`, {
              replace: true,
            });
          }}
        >
          <AiFillEye style={{ marginRight: 10 }} />
          View
        </Button>

      </>
    );
  }

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
          <b>ALL COURSES</b>
        </h1>        
        <DataGrid
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
            LoadingOverlay: LinearProgress,
          }}
          style={{ height: "60vh", width: "100%" }}
          columns={columns}
          rows={Course}
          getRowId={(Rows) => Rows._id}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Card>
    </div>
  );
}
