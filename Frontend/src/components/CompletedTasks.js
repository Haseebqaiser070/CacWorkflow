import React, { useState, useEffect } from "react";
import "./css/styles.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import {
  AiFillEye,
  AiFillDelete,
  AiOutlineUnorderedList,
  AiFillLock,
} from "react-icons/ai";
import { Box, Card, LinearProgress, Tooltip } from "@mui/material";
import CustomNoRowsOverlay from "./AuxillaryComponents/CustomNoRowsOverlay";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  //   border: "2px solid #000",

  boxShadow: 24,
  p: 4,
};

export default function CompletedTasks() {
  
  const [Rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getRows();
  }, []);
  axios.defaults.withCredentials=true
  const getRows = async () => {
    const res = await axios.get("http://localhost:4000/Task/showFinInit", {
      withCredentials: true,
    });
    console.log(res.data);
    setRows(res.data);
  };
  function ActionButtons(props) {
    const navigate = useNavigate();
    const { row } = props;
    return (
      <div>
        <Tooltip title="View" placement="top-start">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ backgroundColor: "#4b2980", marginLeft: 16, padding: 10 }}
            onClick={() => {
              navigate(`/Admin/IndiviualTask/${row._id}`);
              // Getss(row._id);
              // setOpen1(true);
            }}
          >
            <AiFillEye />
          </Button>
        </Tooltip>
        <Tooltip title="Delete" placement="top-start">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ backgroundColor: "#4b2980", marginLeft: 16, padding: 10 }}
            onClick={async () => {
              await axios.delete(
                `http://localhost:4000/Task/deleteInit/${row._id}`
              );
              const res = await axios.get("http://localhost:4000/Meeting/all");
              console.log("res", res);
              var a = [];
              res.data.map((item) => {
                var b = item.taskType.find((it) => it.taskType == row.taskType);
                console.log("dse", b);

                if (b != undefined) {
                  console.log("dse", a);
                  a.push(item._id);
                }
              });
              console.log("asa", a);
              a?.map((value) => {
                axios
                  .delete(`http://localhost:4000/Meeting/delete/${value}`)
                  .then((res) => {
                    console.log("res", res);
                  });
              });
              getRows();
            }}

          >
            <AiFillDelete />
          </Button>
        </Tooltip>
      </div>
    );
  }
  const columns = [
    {
      field: "Program",
      headerName: "Program",
      width: 200,
    },

    {
      field: "taskType",
      headerName: "Task",
      width: 200,
    },
    {
      field: "User",
      headerName: "Assigned To",
      width: 270,
    },

    {
      field: "Action",
      headerName: "Action",
      width: 200,
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
        <h1 className="my-4 pb-4">
          <b>COMPLETED TASKS</b>
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
