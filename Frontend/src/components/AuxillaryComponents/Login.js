import React, { useState } from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import comsatslogo from "../CACMember/comsats_logo.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { Button, IconButton, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";

import { gridFilteredRowsLookupSelector } from "@mui/x-data-grid";
import useAuth from "../../MyHooks/useAuth";

function Login() {
  axios.defaults.withCredentials = true;
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const { setAuth, setPersist } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Email != "" && Password != "") {
      try {
        const response = await axios.post("http://localhost:4000/Auth/login", {
          Email,
          Password,
        });
        const data = response.data;
        console.log("ss", data);
        localStorage.setItem("user", JSON.stringify(response.data._id));

        const Roles = response?.data?.Roles;
        localStorage.setItem("role", JSON.stringify(Roles));

        console.log(Roles);
        setAuth({ Roles });
        setPersist(true);
        setEmail("");
        setPassword("");
        if (Roles.includes("Admin"))
          navigate("/Admin/Dashboard", { replace: true });
        else if (Roles.includes("CAC"))
          navigate("/CAC/Dashboard", { replace: true });
        else if (Roles.includes("Faculty"))
          navigate("/Faculty/Dashboard", { replace: true });
        else if (Roles.includes("Eveluator"))
          navigate("/Eveluator/Dashboard", { replace: true });
      } catch (err) {
        if (err.response?.data === "is not a User") {
          alert("User with this email does not exist");
        } else if (err.response?.data === "Deactivated") {
          alert("Account Deactivated by Admin");
        } else if (err.response?.data === "Incorrect password") {
          alert("Incorrect Password");
        } else {
          alert("Login Failed");
        }
      }
    } else {
      alert("Fill all the fields");
    }
  };
  return (
    <div>
      <MDBContainer className="my-3 ">
        <MDBRow>
          <MDBCol col="6" className="mb-2">
            <div className="d-flex flex-column ms-2">
              <div className="text-center mb-4">
                <img src={comsatslogo} width="130px" height="130px"></img>
              </div>

              <p className="text-center">Please login to your account</p>

              <form onSubmit={handleSubmit}>
                <FormControl fullWidth size="small">
                  <TextField
                    className="mb-4"
                    label="Email"
                    variant="outlined"
                    type="email"
                    size="medium"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl
                  className="mb-2"
                  variant="outlined"
                  fullWidth
                  size="medium"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>

                <div style={{ textAlign: "right" }}>
                  <Link className="small text-muted" to="forgotpassword">
                    Forgot Password?
                  </Link>
                </div>

                <div className="  mt-4 mb-0">
                  <Button
                    style={{ backgroundColor: "#4b2980" }}
                    fullWidth
                    type="Submit"
                    variant="contained"
                    size="small"
                  >
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </MDBCol>

          <MDBCol col="6" className="mb-2 ms-3">
            <div
              style={{ backgroundColor: "#4b2980" }}
              className="d-flex flex-column  justify-content-center  h-100 mb-4"
            >
              <div className="text-white px-2 py-3 p-md-3 mx-md-4">
                <h4 class="mb-4 text-center">Comsats Catalog Portal</h4>
                <p class="small  mb-0">
                  The purpose of this portal is to provide a single point of
                  contact for the employees of CIIT. CIIT Course Catalog Portal
                  enables employees to find scheme of studies, list of courses
                  and course contents.
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Login;
