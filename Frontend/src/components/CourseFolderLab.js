import React, { useState, useEffect } from "react";
import "./css/styles.css";
import Button from "@mui/material/Button";
import {
  Autocomplete,
  Box,
  Card,
  FormControlLabel,
  MenuItem,
  Modal,
  Switch,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import { AiFillEdit, AiOutlineFieldTime } from "react-icons/ai";
import axios from "axios";
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
export default function CourseFolderLab() {
  const navigate=useNavigate();

  const [Assignments1, setAssignments1] = useState("");
  const [Assignments2, setAssignments2] = useState("");
  const [Mid, setMidSessional] = useState("Mid");
  const [Checked, setChecked] = useState(true);
  const [date,setDate]=useState()
  const [date1,setDate1]=useState()
  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => setOpen1(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  axios.defaults.withCredentials = true;
  const handleChange = (event) => {
    setChecked(event.target.checked);
    if(Checked==true){
      setMidSessional("Mid")
    }
    else{
      setMidSessional("Sessional")

    }
  };
  const onsubmit1 = async (e) => {
    e.preventDefault();
    if (!isNaN(Assignments1)) {
      const res = await axios.post("http://localhost:4000/Content/Lab", {
        Round: "Round1",
        Round1: {
          Assignment: Assignments1,
          Deadline:date
        },
        Mid:Mid
      });
    } else {
      alert("inValid Input");
    }
  };
  const onsubmit2 = async (e) => {
    e.preventDefault();
    if (!isNaN(Assignments2)) {
      const res = await axios.post("http://localhost:4000/Content/Lab", {
        Round: "Round2",
        Round2: {
          Assignment: Assignments2,
          Deadline:date1
        },
        Mid:Mid
      });
    } else {
      alert("inValid Input");
    }
  };
  useEffect(() => {
    getLab();
  }, []);
  const getLab = async () => {
    const res = await axios.get("http://localhost:4000/Content/showLab");
    setAssignments1(res.data.Round1.Assignment);
    setAssignments2(res.data.Round2.Assignment);
    setMidSessional(res.data.Mid);
    setDate(res.data.Round1.Deadline)
    setDate1(res.data.Round2.Deadline)
    if(res.data.Mid=="Mid"){
      setChecked(true)
    }
    else{
      setChecked(false)
    }
  };
  const onsubmit3=async(date,round,type)=>{
  
    const res = await axios.put(`http://localhost:4000/Content/adddate`,{
      date:date,
      round:round,
      type:type,
    });
  }
  return (
    <div
      style={{
        width: "100%",
        padding: 40,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card style={{ padding: 40, borderRadius: 10 }}>
        <h1 className="mb-4 pb-4">
          <b>Define Course Folder Lab</b>
        </h1>
        <FormControlLabel
          className="py-4"
          control={
            <Switch
              checked={Checked}
             // onChangeva
              onChange={
              handleChange}
            />
              }
          label="MidTerm"
        />

        <div className="row">
          <div className="col">
            <h2 className="my-4" style={{ textAlign: "left" }}>
              Round 1
            </h2>
            <form onSubmit={onsubmit1}>
              <FormControl fullWidth size="small">
                <TextField
                  className="mb-4"
                  id="outlined-basic"
                  label="Enter no of Assignments"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={Assignments1}
                  onChange={(e) => setAssignments1(e.target.value)}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginTop: 5 }}
                type="submit"
              >
                Submit
              </Button>
            </form>

            <div style={{ marginTop: 30 }}>
              <h4 style={{ color: "red", marginTop: 20 }}>
                Current Deadline: {date}
              </h4>
              <div
                style={{ margin: 0, Padding: 0 }}
                className="flex justify-content-center"
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => setOpen(true)}
                >
                  <AiOutlineFieldTime style={{ marginRight: 10 }} />
                  Add Due Date
                </Button>
                
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalstyle}>
                  <div style={{ marginBottom: 10 }}>
                    <label style={{ display: "block" }} for="title">
                      <b>Select Date & Time</b>
                    </label>
                    <input
                      name="time"
                      onChange={(e)=>setDate(e.target.value)}
                      style={{ width: "100%" }}
                      type="datetime-local"
                       value={date}
                    ></input>

                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ marginTop: 16 }}
                      onClick={()=>onsubmit3(date,"Round1","Lab")}
                    >
                      <AiOutlineFieldTime style={{ marginRight: 10 }} />
                      Add Due Date
                    </Button>
                  </div>
                </Box>
              </Modal>

              

            </div>
          </div>
          <div className="col">
            <h2 className="my-4" style={{ textAlign: "left" }}>
              Round 2
            </h2>
            <form onSubmit={onsubmit2}>
              <FormControl fullWidth size="small">
                <TextField
                  className="mb-4"
                  id="outlined-basic"
                  label="Enter no of Assignments"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={Assignments2}
                  onChange={(e) => setAssignments2(e.target.value)}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginTop: 5 }}
                type="submit"
              >
                Submit
              </Button>
            </form>
            <div style={{ marginTop: 30 }}>
              <h4 style={{ color: "red", marginTop: 20 }}>
                Current Deadline:{date1}
              </h4>
              <div
                style={{ margin: 0, Padding: 0 }}
                className="flex justify-content-center"
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => setOpen1(true)}
                >
                  <AiOutlineFieldTime style={{ marginRight: 10 }} />
                  Add Due Date
                </Button>
                
              </div>
              <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalstyle}>
                  <div style={{ marginBottom: 10 }}>
                    <label style={{ display: "block" }} for="title">
                      <b>Select Date & Time</b>
                    </label>
                    <input
                      name="time"
                      onChange={(e)=>setDate1(e.target.value)}

                      style={{ width: "100%" }}
                      type="datetime-local"
                       value={date1}
                    ></input>

                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ marginTop: 16 }}
                      onClick={()=>onsubmit3(date1,"Round2","Lab")}
                    >
                      <AiOutlineFieldTime style={{ marginRight: 10 }} />
                      Add Due Date
                    </Button>
                  </div>
                </Box>
              </Modal>

              
                   
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
