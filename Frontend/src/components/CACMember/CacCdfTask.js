import React, { useState, useEffect } from "react";
import "../css/styles.css";
import axios from "axios";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckSquare, AiFillEdit } from "react-icons/ai";
import { muiAbtn } from "../style";
import { Card, LinearProgress } from "@mui/material";
import CustomNoRowsOverlay from "../AuxillaryComponents/CustomNoRowsOverlay";

export default function CacCdfTask() {
  const [Rows, setRows] = useState([]);

  useEffect(() => {
    getRepoCourse();
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
              `/CAC/CDFCreation/${row.Code}`,
              { state: { row } },
              { replace: true }
            );
          }}
        >
          <AiFillEdit style={{ marginRight: 10 }} />
          Create/Edit CDF
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={async () => {
            try {
              var response = await axios.post(
                `http://localhost:4000/CDFCreate/Submit/${row.Code}`,
                {
                  withCredentials: true,
                }
              );
              getRepoCourse();
            } catch (err) {
              if (err.response?.data == "Deadline Passed") {
                alert("Cannot Submit Deadline has Passed");
              } else if (err.response?.data == "No Versions") {
                alert("Cannot Submit Nothing added");
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

  const getRepoCourse = async () => {
    const response = await axios.get("http://localhost:4000/CDFCreate/get", {
      withCredentials: true,
    });
    console.log(response.data);
    setRows(response.data);
  };

  const columns = [
    {
      field: "Code",
      headerName: "Code",
      width: 150,
    },

    {
      field: "Name",
      headerName: "Name",
      width: 450,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 400,
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
          <b>COURSE DESCRIPTION FORM ASSIGNED</b>
        </h1>
        <div>
          <DataGrid
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
              LoadingOverlay: LinearProgress,
            }}
            style={{ height: "60vh", width: "100%" }}
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
