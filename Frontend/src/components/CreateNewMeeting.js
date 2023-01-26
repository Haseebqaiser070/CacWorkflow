import React, { useEffect, useState } from "react";
import "./css/styles.css";
import axios from "axios";

import Button from "@mui/material/Button";
import { DataGrid, getGridDefaultColumnTypes } from "@mui/x-data-grid";
import {
  Autocomplete,
  Box,
  Card,
  LinearProgress,
  Modal,
  TextField,
} from "@mui/material";
import {
  AiFillClockCircle,
  AiFillDelete,
  AiFillEdit,
  AiOutlineFieldTime,
} from "react-icons/ai";
import { TaskOutlined } from "@mui/icons-material";
import { muiAbtn, muibtn } from "./style";
import CustomNoRowsOverlay from "./AuxillaryComponents/CustomNoRowsOverlay";

const modalstyle = {
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

export default function CreateNewMeeting() {
  const [rows, setRows] = useState([]);
  const [meetings, setmeetings] = useState([]);
  const [date, setdate] = useState();
  const [task, settask] = useState([]);
  const [members, setmembers] = useState([]);
  const [idealtime, setideal] = useState([]);

  const [change, setchange] = useState(false);
  const [changee, setchangee] = useState(false);
  const [changem, setchangem] = useState(false);
  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => setOpen1(false);
  const handleSubmit = async (e) => {};
  const handleChange = async (e) => {};
  const [users, setusers] = useState([]);
  const [tusers, settusers] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      const res = await axios.get("http://localhost:4000/Task/showInit");
      setRows(res.data);
      console.log("rows", res.data);
    };
    const getmeetings = async () => {
      const res = await axios.get("http://localhost:4000/Meeting/all");
      var row = [];
      var tasks = [],
        members = [];
      console.log("res:", res.data);
      res.data.map(async (val, id) => {
        val.taskType.map((i) => {
          tasks.push(i.taskType);
        });
        val.teacher_id.map((i) => {
          members.push(i.Name);
        });
        console.log("yasks", tasks);
        console.log("ds,", val);
        if (val.taskType.length == 0) {
          const res = await axios.delete(
            `http://localhost:4000/Meeting/delete/${val._id}`
          );
        } else {
          row[id] = {
            _id: val._id,
            id: id,
            task: tasks,
            Cacmembers: members,
            meetingDate: val.dateTime,
            report: val,
          };
        }

        (tasks = []), (members = []);
      });

      setmeetings(row);
    };

    const getAllusers = async () => {
      const res = await axios.get("http://localhost:4000/User/show");
      var arr = res.data;
      res.data.map((item) => {
        if (item.Roles.find((i) => i == "CAC" || i == "Faculty") == undefined) {
          arr = arr.filter((it) => it._id != item?._id);
        }
      });
      var array = arr;
      var variable;
      /* arr.map((item) => {
        console.log("item",rows)
        rows?.map((i)=>{
          variable = i.AssignMember?.find((it) => it?._id == item?._id);
          console.log("variable",variable)
          if (variable != undefined) {
            console.log("inside undefined confidtion")

            array = array.filter((it) => it?._id != variable?._id);
            console.log("inside undefin",array)


          }
        })*
        
      });*/

      // arr.filter((item)=>item!=(rows.find((i)=>{i.User._id==item._id})))
      //  console.log("arrr",arr)
      setusers(array);
      settusers(array);
    };
    const getideal = async () => {
      const res = await axios.get("http://localhost:4000/Meeting/get-ideal");
      console.log("res in get ideal", res);
      var a = [];
      res?.data[0]?.idealtime?.map((item) => {
        item.slot.map((i) => {
          a.push({ day: item.day, slot: i });
        });
      });
      console.log("asd", a);
      setideal(a);
    };

    getAll();
    getAllusers();
    getmeetings();
    getideal();
    setchange(false);
    setchangee(false);
    setchangem(false);
  }, [change, changem, changee]);

  useEffect(() => {
    const getAllusers = async () => {
      var us = tusers;
      task?.map((item) => {
        item?.AssignMember?.map((i) => {
          us = us.filter((it) => it?.Name != i?.Name);
        });
      });
      setusers(us);
    };

    getAllusers();
  }, [task]);
  function ActionButton(row) {
    const [datee, setdatee] = useState();
    const [taske, settaske] = useState(row.row.report.taskType);
    const [memberse, setmemberse] = useState(row.row.report.teacher_id);
    const [open2, setOpen2] = useState(false);

    const handleClose2 = () => setOpen2(false);
    const Deletemeet = async (roww) => {
      const res = await axios.delete(
        `http://localhost:4000/Meeting/delete/${roww.row._id}`
      );

      setchange(true);
    };
    const Update = async () => {
      /*var mem = [],
      memberse.map((i) => {
        mem.push(i);
      });
      rows.map((value) => {
        var a = taske?.find((i) => i?._id == value?._id);
        a?.AssignMember?.map((x) => {
          mem.push(x);
        });
      });*/
      var Task = [];
      var flag = false;

      taske.map((i, index) => {
        Task.push(i);
        if (index == taske.length - 1) {
        } else {
          var a = meetings.find((it) => it?.task == i?.taskType);
          if (a) {
            flag = true;
          }
        }
      });

      //settaske(Task);
      //setmemberse(mem);

      var obj = {
        id: row.row._id,
        dateTime: datee,
        taskType: taske,
        teacher_id: memberse,
      };
      if (flag == true) {
        alert("Meeting already exists for this task!!");
        handleClose2();
      } else {
        const res = await axios.put(
          "http://localhost:4000/Meeting/update",
          obj
        );
        alert("Meeting Updated");
        setchangee(true);
        handleClose2();
      }
    };

    return (
      <>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={() => setOpen2(true)}
        >
          <AiFillEdit style={{ marginRight: 10 }} />
          Edit
        </Button>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalstyle}>
            <div style={{ marginBottom: 10 }}>
              <div>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={rows}
                  value={taske}
                  getOptionLabel={(option) => option.taskType}
                  onChange={(value, newValue) => {
                    settaske(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Tasks"
                      placeholder="Select Tasks"
                      size="small"
                    />
                  )}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <Autocomplete
                  id="tags-standard"
                  options={idealtime}
                  getOptionLabel={(option) => option.day + ": " + option.slot}
                  onChange={(value, newValue) => {
                    setdatee(newValue.day + ": " + newValue.slot);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Slot"
                      placeholder="Select ideal Slot"
                      size="small"
                    />
                  )}
                />
              </div>

              <div className="mt-4">
                <label style={{ display: "block" }} for="title">
                  <b>Select Date & Time</b>
                </label>
                <input
                  name="time"
                  onChange={(e) => setdatee(e.target.value)}
                  style={{ width: "100%" }}
                  type="datetime-local"
                  value={datee}
                ></input>
              </div>

              <div>
                <Autocomplete
                  className="mt-4"
                  multiple
                  id="tags-standard"
                  options={users}
                  value={memberse}
                  getOptionLabel={(option) => option.Name}
                  onChange={(value, newValue) => {
                    setmemberse(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Invite Other Members"
                      placeholder="Invite Other Members"
                      size="small"
                    />
                  )}
                />
              </div>

              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginTop: 16 }}
                onClick={() => Update(taske)}
              >
                <AiOutlineFieldTime style={{ marginRight: 10 }} />
                Update Meeting
              </Button>
            </div>
          </Box>
        </Modal>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={() => Deletemeet(row)}
        >
          <AiFillDelete style={{ marginRight: 10 }} />
          Delete
        </Button>
      </>
    );
  }
  const Submit = async () => {
    var mem = [],
      Task = [];
    var flag = false;
    members.map((i) => {
      mem.push(i?._id);
    });
    rows.map((value) => {
      var a = task.find((i) => i?._id == value?._id);
      a?.AssignMember?.map((x) => {
        mem.push(x?._id);
      });
    });
    console.log("mdmn", mem);
    setmembers(mem);
    task.map((i) => {
      Task.push(i?._id);
      var a = meetings.find((it) => it?.task == i.taskType);
      if (a) {
        flag = true;
      }
    });
    settask(Task);
    if (flag == true) {
      alert("Meeting already exists for this task!!");
      handleClose1();
    } else {
      console.log("mn", members);

      var obj = { dateTime: date, taskType: task, teacher_id: mem };
      console.log("objs", obj);
      const res = await axios.post("http://localhost:4000/Meeting/create", obj);
      alert("meeting created");
      setchangem(true);
    }
    handleClose1();
  };

  const columns = [
    {
      field: "task",
      headerName: "Task Title",
      flex: 1,
    },
    {
      field: "Cacmembers",
      headerName: "Cac Members",
      flex: 1,
    },
    {
      field: "meetingDate",
      headerName: "Meeting Date",
      flex: 1,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      editable: false,
      renderCell: ActionButton,
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
          <b>ALL MEETINGS</b>
        </h1>
        <div className="d-flex justify-content-end mb-4">
          <Button
            variant="contained"
            color="primary"
            size="medium"
            style={muibtn}
            onClick={() => setOpen1(true)}
          >
            <AiFillClockCircle style={{ marginRight: 10 }} />
            Create New Meeting
          </Button>
          <Modal
            open={open1}
            onClose={handleClose1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalstyle}>
              <div style={{ marginBottom: 10 }}>
                <div>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={rows}
                    getOptionLabel={(option) => option.taskType}
                    onChange={(value, newValue) => {
                      settask(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select Tasks"
                        placeholder="Select Tasks"
                        size="small"
                      />
                    )}
                  />
                </div>
                <div style={{ marginTop: 20 }}>
                  <Autocomplete
                    id="tags-standard"
                    options={idealtime}
                    getOptionLabel={(option) => option.day + ": " + option.slot}
                    onChange={(value, newValue) => {
                      setdate(newValue.day + ": " + newValue.slot);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select Slot(Optional)"
                        placeholder="Select ideal Slot"
                        size="small"
                      />
                    )}
                  />
                </div>

                <div className="mt-4">
                  <label style={{ display: "block" }} for="title">
                    <b>Select Date & Time</b>
                  </label>
                  <input
                    name="time"
                    onChange={(e) => setdate(e.target.value)}
                    style={{ width: "100%" }}
                    type="datetime-local"
                    value={date}
                  ></input>
                </div>

                <div>
                  <Autocomplete
                    className="mt-4"
                    multiple
                    id="tags-standard"
                    options={users}
                    getOptionLabel={(option) => option.Name}
                    onChange={(value, newValue) => {
                      setmembers(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Invite Other Members"
                        placeholder="Invite Other Members"
                        size="small"
                      />
                    )}
                  />
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={muibtn}
                  onClick={Submit}
                >
                  <AiOutlineFieldTime style={{ marginRight: 10 }} />
                  Create Meeting
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
        <div>
          <DataGrid
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
              LoadingOverlay: LinearProgress,
            }}
            style={{ height: "70vh", width: "100%" }}
            columns={columns}
            rows={meetings}
            getRowId={(Rows) => Rows._id}
            // pageSize={10}
            // rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </Card>
    </div>
  );
}
