import React, { useState, useEffect } from "react";
import "./css/styles.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import {
  AiFillEye,
  AiFillEdit,
  AiOutlineUnorderedList,
  AiFillLock,
} from "react-icons/ai";
import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  LinearProgress,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
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

export default function ReturnedTasks() {
  const [Rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.get(
      "http://localhost:4000/Task/show/Returned"
    );
    setRows(response.data);
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
              if (
                row.taskType == "Create Catalog Description" ||
                row.taskType == "Update Catalog Description"
              ) {
                navigate(`/Admin/CourseReturnedView/${row.Course.Code}`, {
                  replace: true,
                });
              } else if (
                row.taskType == "Create SOS" ||
                row.taskType == "Update SOS"
              ) {
                navigate(`/Admin/SOSReturnedView/${row.Program}`, {
                  replace: true,
                });
              } else if (
                row.taskType == "Create CDF" ||
                row.taskType == "Update CDF"
              ) {
                navigate(`/Admin/CDFReturnedView/${row.Course.Code}`, {
                  replace: true,
                });
              } else if (
                row.taskType == "Create Syllabus" ||
                row.taskType == "Update Syllabus"
              ) {
                navigate(`/Admin/SyllabusReturnedView/${row.Course.Code}`, {
                  replace: true,
                });
              }
            }}
          >
            <AiFillEye />
          </Button>
        </Tooltip>

        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ backgroundColor: "#4b2980", marginLeft: 16 }}
          onClick={async () => {
            await axios.post(`http://localhost:4000/Task/lock/${row._id}`);
            getData();
          }}
        >
          <AiFillLock style={{ marginRight: 10 }} />
          Lock
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ backgroundColor: "#4b2980", marginLeft: 16 }}
          onClick={async () => {
            await axios.post(`http://localhost:4000/Task/revision/${row._id}`);
            getData();
          }}
        >
          <AiFillEdit style={{ marginRight: 10 }} />
          Send Revision
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Revisions"
                placeholder="Input changes"
                multiline
                rows={5}
              />
            </div>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="medium"
              style={{ marginTop: 10 }}
            >
              Send Revision
            </Button>
          </Box>
        </Modal>
      </div>
    );
  }
  const columns = [
    {
      field: "taskType",
      headerName: "Task",
      width: 200,
    },
    {
      field: "User",
      headerName: "Assigned To",
      valueGetter: (params) => params?.row?.User?.map((i)=>{return i?.Name}),
      width: 170,
    },

    {
      field: "Status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "Course",
      headerName: "Course",
      valueGetter: (params) => params?.row?.Course?.Name,
      width: 200,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 450,
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
          <b>RETURNED TASKS</b>
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
