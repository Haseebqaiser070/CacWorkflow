import React, { useState, useEffect } from "react";
import "./css/styles.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { muiAbtn, muibtn } from "./style";
import CustomNoRowsOverlay from "./AuxillaryComponents/CustomNoRowsOverlay";
import { Card, LinearProgress, Tooltip } from "@mui/material";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AllCourseFolder() {
  const navigate = useNavigate();
  const [Rows, setRows] = useState([]);
  const [Posts, setPosts] = useState([]);
  const userid = JSON.parse(localStorage.getItem("user"));
  React.useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      field: "Program",
      headerName: "Program",
      width: "200",
    },
    {
      field: "Course",
      headerName: "Course",
      valueGetter: (params) => params?.row?.Course?.Name,     
      width: "350",
    },
    {
      field: "Faculty",
      headerName: "Faculty",
      width: "180",
    },
    {
      field: "Evaluator",
      headerName: "Evaluator",
      width: "180",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: "450",
  
      editable: false,
      renderCell: HandleButton,
    },
  ];
  function HandleButton({row}) {
    const navigate = useNavigate();
    const senddata = (row) => {
      console.log("helllo", row);
      navigate("/Admin/Returned", { state: row });
    };
    const senddata1 = (roww) => {
      console.log("helllo", roww);
      navigate("/Admin/ReturnedEvaluation", { state: row });
    };
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={() => {
            senddata(row);
            //navigate('/Faculty/Returned',{state:{row:row}})
          }}
          // onClick={handleOpenClo}
        >
          <AiFillEye style={{ marginRight: 10 }} />
          Folder
        </Button>
  
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={() => {
            senddata1(row);
            //navigate('/Faculty/Returned',{state:{row:row}})
          }}
        >
          <AiFillEye style={{ marginRight: 10 }} />
          Evaluation
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={async() => {
            console.log(row._id)
            const res = await axios.delete(`http://localhost:4000/AssginFolders/delone/${row._id}`);          
            getData();
          }}
        >
          <AiFillDelete style={{ marginRight: 10 }} />
          Delete
        </Button>
      </>
    );
  }
  const getData = async () => {
    const res = await axios.get(`http://localhost:4000/EvalFolders/showfolder`);
    setPosts(res.data);
    console.log("res", res.data);
    var row = [];
    var index = 0;
    res.data.map((val, id) => {
      if (val.WantRevision == false) {
        row.push({
          _id: val?._id,
          id: id,
          Program: val?.Program,
          Course: val.Course?.Name + "-" + val.Course?.Code,
          Evaluator: val.Evaluator?.Name,
          Faculty: val.User?.Name,
          data: val,
        });
      }
    });
    console.log("uajh", row);
    setRows(row);
  };

  return (
    <div
      className="container"
      style={{ height: 700, width: "100%", padding: 20 }}
    >
      <h1 className="mb-4 py-4">
        <b>ALL COURSE FOLDERS</b>
      </h1>
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
    </div>
  );
}
