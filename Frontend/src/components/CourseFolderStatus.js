import React, { useState, useEffect } from "react";
import "./css/styles.css";
import axios from "axios";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { AiFillEye, AiFillEdit, AiOutlineCloudDownload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function FacultyFolderStatus() {
  const [Rows, setRows] = useState([]);

  const columns = [
    {
      field: "Faculty Member Name",
      headerName: "Faculty Member Name",
      flex: 1,
    },
    {
      field: "Course Name",
      headerName: "Course Name",
      flex: 1,
    },
    {
      field: "Evaluator Name",
      headerName: "Evaluator Name",
      flex: 1,
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
    },
  ];
  //const rows = [
  //{ id: 1, year: "2014-2018", program: "Computer Science" },
  //{ id: 2, year: "2014-2018", program: "Cyber Security" },
  //{ id: 3, year: "2014-2018", program: "Artificial Intilligence" },
  //];

  return (
    <div>
      <h1 className="py-4 my-4">
        <b>Faculty Folder Status</b>
      </h1>
      <DataGrid
        style={{ height: 400, width: "100%" }}
        columns={columns}
        getRowId={(Rows) => Rows._id}
        rows={Rows}
        pageSize={10}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}
