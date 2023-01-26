import React, { useState, useEffect } from "react";
import "../css/styles.css";
import Popup from "./PopupFunction";
import Login from "./Login";
// import logo from "./FacultyRoutes/comsats_logo.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import comsats from "../css/comsats.jpg";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { AppBar, Box, Button, Modal } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import background from "../css/comsats.jpg";
import comsatslogo from "../CACMember/comsats_logo.png";
import axios from "axios";
export default function Home() {
  const [open, setOpen] = useState(false);
  const [Programdb, setProgramdb] = useState([]);
  const [Program, setProgram] = useState("");
  const [Years, setYears] = useState([]);
  const [year, setyear] = useState("");
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const getPrograms = async () => {
    const res = await axios.get("http://localhost:4000/SOS/ProgramsHome");
    setProgramdb(res.data);
  };
  const getProgramYears = async (Program) => {
    const res = await axios.get(`http://localhost:4000/SOS/Years/${Program}`);

    setYears(res.data);
  };
  useEffect(() => {
    getPrograms();
  }, []);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "#fff",
    boxShadow: 24,
    p: 4,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  };

  return (
    <div>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="fixed"
            style={{
              backgroundColor: "#023866",
              paddingTop: 3,
              paddingBottom: 3,
            }}
          >
            <Toolbar variant="dense">
              <img src={comsatslogo} width="60px" height="60px"></img>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, paddingLeft: 2 }}
              >
                COMSATS University Islamabad
              </Typography>
              <button
                style={{ backgroundColor: "#fff", color: "#000" }}
                class="btn btn-primary"
                id="btnNavbarSearch"
                type="button"
                onClick={handleOpen}
              >
                <span style={{ marginRight: 10 }}>
                  <BsFillPersonPlusFill />
                </span>
                Login
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Login />
                </Box>
              </Modal>
            </Toolbar>
          </AppBar>
        </Box>
      </div>

      <div
        className="header"
        style={{
          backgroundImage: `url(${background})`,
          // height: "70vh",
          // backgroundSize: "cover",
          // backgroundPosition: "center",
        }}
      ></div>

      <div className="section">
        <p>
          <h5>
            <b>About:</b>
          </h5>
          CIIT Course Catalog Portal is an information and assistance resource
          designed for the CIIT Faculty and Staff. The purpose of this portal is
          to provide a single point of contact for the employees of CIIT. CIIT
          Course Catalog Portal enables employees to find scheme of studies,
          list of courses and course contents. <br></br> Every possible effort
          has been made to ensure that the information presented in this Catalog
          is correct. However, this information is subject to change by
          appropriate action of the competent authority of CIIT.
        </p>
        <div>
          <div
            style={{
              backgroundColor: "#023866",
              padding: 10,
              textAlign: "center",
            }}
          >
            <h5 style={{ color: "#fff" }}>Find Scheme of Studies</h5>
          </div>
          <div className="my-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Program</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Program"
                size="medium"
                className="mb-4"
                value={Program}
                onChange={(e) => {
                  setProgram(e.target.value);
                  getProgramYears(e.target.value);
                }}
              >
                {Programdb.map((p) => {
                  return <MenuItem value={p}>{p}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                label="Year"
                size="medium"
                value={year}
                onChange={(e) => {
                  setyear(e.target.value);
                }}
              >
                {Years.map((p) => {
                  return <MenuItem value={p}>{p}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        {Program != "" && year != "" ? (
          <Button
            style={{ backgroundColor: "#4b2980" }}
            variant="contained"
            size="medium"
            onClick={() => {
              navigate(`/ViewSOS/${Program}/${year}`, { replace: true });
            }}
          >
            VIEW SCHEME OF STUDIES
          </Button>
        ) : (
          <Button
            variant="contained"
            size="medium"
            style={{ backgroundColor: "lightgrey", borderColor: "lightgrey" }}
            onClick={() => {
              alert("Please Select");
            }}
          >
            Please Select
          </Button>
        )}
      </div>
      <div style={{ backgroundColor: "#023866" }}>
        <p className="text-white py-3 text-center">
          Copyright © COMSATS University Islamabad, All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
