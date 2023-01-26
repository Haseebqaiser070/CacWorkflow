import React, { useState, useEffect } from "react";
import "../css/styles.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { muiAbtn } from "../style";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, LinearProgress } from "@mui/material";
import { AiFillEye } from "react-icons/ai";
import CustomNoRowsOverlay from "../AuxillaryComponents/CustomNoRowsOverlay";
const columns = [
  {
    field: "Program",
    headerName: "Program",
    width: "200",
  },
  {
    field: "Course",
    headerName: "Course",
    width: "350",
  },
  {
    field: "Evaluator",
    headerName: "Evaluator",
    width: "200",
  },

  {
    field: "actions",
    headerName: "Actions",
    width: "250",
    editable: false,
    renderCell: HandleButton,
  },
];
function HandleButton(row) {
  const navigate = useNavigate();
  const senddata = (roww) => {
    console.log("helllo", roww);
    navigate("/Faculty/Returned", { state: roww.row });
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
      >
        <AiFillEye style={{ marginRight: 10 }} />
        View Evaluation
      </Button>
    </>
  );
}
export default function ReturnedFolders() {
  const [Rows, setRows] = useState([]);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();
  const [Posts, setPosts] = useState([]);

  useEffect(async () => {
    console.log("per");
    const response = await axios.get("http://localhost:4000/Auth/check", {
      withCredentials: true,
    });
    setUser(response.data._id);
  }, []);

  // const userid = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    getData();
  }, [user]);
  const getData = async () => {
    const res = await axios.get(`http://localhost:4000/EvalFolders/showfolder`);
    setPosts(res.data);
    var row = [];
    var index = 0;
    res.data.map((val, id) => {
      if (
        val.Evaluated == true &&
        val.User._id == user &&
        val.WantRevision == false
      ) {
        row.push({
          _id: val._id,
          id: id,
          Program: val.Program,
          Course: val.Course.Name + "-" + val.LabTheory,
          Evaluator: val.Evaluator.Name,
          data: val,
        });
      }
    });
    setRows(row);
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
        <h1 className="mb-4 py-4">
          <b>RETURNED FOLDERS</b>
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
            disableSelectionOnClick
          />
        </div>
      </Card>
    </div>
  );
}
