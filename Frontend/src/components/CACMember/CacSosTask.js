import React, { useState, useEffect } from "react";
import "../css/styles.css";
import axios from "axios";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { muiAbtn } from "../style";
import { Card, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckSquare, AiFillEdit } from "react-icons/ai";
import CustomNoRowsOverlay from "../AuxillaryComponents/CustomNoRowsOverlay";

export default function CacSosTask() {
  const [RepoProgram, setRepoProgram] = useState([]);

  useEffect(() => {
    getRepoProgram();
  }, []);
  function ActionButtons(props) {
    const navigate = useNavigate();
    const { row } = props;

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={() => {
            navigate(
              `/CAC/SOSCreation/${row.Program}`,
              { state: { row } },
              { replace: true }
            );
          }}
        >
          <AiFillEdit style={{ marginRight: 10 }} />
          Create/Edit SOS
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={async () => {
            try {
              var response = await axios.post(
                `http://localhost:4000/SOSCreate/Submit/${row.Program}`,
                {
                  withCredentials: true,
                }
              );
              getRepoProgram();
            } catch (err) {
              if (err.response?.data == "Deadline Passed") {
                alert("Cannot Submit Deadline has Passed");
              } else if (err.response?.data == "No Versions") {
                alert("Cannot Submit Nothing added");
              } else if (err.response?.data == "SOS of this program for this year has already been made") {
                alert("SOS of this program for this year has already been made");
              }              
            }
          }}
        >
          <AiOutlineCheckSquare style={{ marginRight: 10 }} />
          Submit
        </Button>
      </div>
    );
  }

  const getRepoProgram = async () => {
    const response = await axios.get("http://localhost:4000/SOSCreate/get", {
      withCredentials: true,
    });
    setRepoProgram(response.data);
  };
  console.log(RepoProgram);
  const columns = [
    {
      field: "Program",
      headerName: "Program",
      flex: 3,
    },

    {
      field: "Action",
      headerName: "Action",
      flex: 2,
      editable: false,
      renderCell: ActionButtons,
    },
  ];
  return (
    <div
      style={{
        width: "100%",
        padding: 40,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card style={{ padding: 30, borderRadius: 10 }}>
        <h1 className="py-4 mb-4">
          <b>SCHEME OF STUDIES ASSIGNED</b>
        </h1>
        <div>
          <DataGrid
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
              LoadingOverlay: LinearProgress,
            }}
            style={{ height: "60vh", width: "100%" }}
            columns={columns}
            getRowId={(RepoProgram) => RepoProgram._id}
            rows={RepoProgram}
            disableSelectionOnClick
          />
        </div>
      </Card>
    </div>
  );
}
