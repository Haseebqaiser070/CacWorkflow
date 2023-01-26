import { Box, Button, FormControl, Modal, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import "../css/styles.css";
import CloseIcon from "@mui/icons-material/Close";

import AddIcon from "@mui/icons-material/Add";
import { muibtn } from "../style";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
};

export default function Profile() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setpassword("");
  };
  const [state, setstate] = useState({
    Name: "",
    Email: "",
    Roles: [],
    Phone: "",
  });

  useEffect(async () => {
    const response = await axios.get("http://localhost:4000/Auth/whole", {
      withCredentials: true,
    });
    setstate(response.data);
  }, []);
  const [password, setpassword] = useState("");
  const Submit = async () => {
    const res = await axios.post(`http://localhost:4000/Auth/reset-password`, {
      email: state.Email,
      password: password,
    });
    alert("Password Changed!!");
    navigate(-1);
  };
  return (
    <div className="container">
      <div
        class="rounded-top text-white d-flex flex-row"
        style={{ backgroundColor: "#4b2980", height: "200px" }}
      >
        <div
          class="ms-4 mt-5 d-flex justify-content-center"
          style={{ textAlign: "center" }}
        ></div>
        <div class="ms-3" style={{ marginTop: "130px" }}>
          <h2>{state.Name}</h2>
          {state.Roles.map((e) => {
            return <p>{e}, </p>;
          })}
        </div>
      </div>
      <div class="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}></div>
      <div class="card-body p-4 text-black">
        <div class="mb-4">
          <p class="lead fw-normal mb-1">About</p>
          <div class="p-4" style={{ backgroundColor: "#f8f9fa" }}>
            <p class="font-italic mb-1">
              <b>Email:</b> {state.Email}
            </p>
            <p class="font-italic mb-1">
              <b>Phone Number: </b> {state.Phone}
            </p>
          </div>
        </div>
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          onClick={handleOpen}
          // style={{ backgroundColor: "#4b2980" }}
        >
          Reset Password
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form>
              <Box mb={3} style={{ display: "flex", justifyContent: "end" }}>
                <CloseIcon
                  onClick={handleClose}
                  style={{ cursor: "pointer", color: "gray" }}
                />
              </Box>
              <h4 className="mb-4">RESET PASSWORD</h4>
              <div>
                <FormControl fullWidth size="medium">
                  <TextField
                    className="mb-4"
                    id="outlined-basic"
                    label="Enter Password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </FormControl>
              </div>
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                style={muibtn}
                onClick={Submit}
              >
                <AiFillEdit style={{ marginRight: 10 }} />
                Reset
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
