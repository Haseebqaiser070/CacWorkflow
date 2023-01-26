import React, { useState, useEffect } from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Button, IconButton, InputAdornment } from "@mui/material";
import comsatslogo from "../CACMember/comsats_logo.png";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function Register() {
  const [FirstName, setFirstName] = useState("");
  const [SecondName, setSecondName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [Roles, setRoles] = useState([]);
  axios.defaults.withCredentials = true;

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

  const hanleSubmit = async (e) => {
    e.preventDefault();
    if (
      FirstName != "" &&
      SecondName != "" &&
      Email != "" &&
      Password != "" &&
      Roles != "" &&
      Phone != ""
    ) {
      console.log(Roles);
      const Name = FirstName + " " + SecondName;
      try {
        const res = await axios.post("http://localhost:4000/User/add", {
          Name,
          Email,
          Password,
          Phone,
          Roles,
        });

        setFirstName("");
        setSecondName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setRoles([]);
        setValues({
          password: "",
          showPassword: false,
        });
      
      } catch (err) {
        if ((err.response.data = "Email")) {
          alert("User with this Email already Exists");
        } else if ((err.response.data = "Phone")) {
          alert("User with this Phone already Exists");
        } else {
          alert("try again");
        }
      }
    }
  };
  return (
    <div className="container">
      <div className="row ">
        <div className="col-lg-12">
          <div className=" border-0  mt-3">
            <div className="text-center ">
              <img src={comsatslogo} width="80px" height="80px"></img>
            </div>
            <div>
              <h2 className="text-center font-weight-bold my-4 pb-2">
                Register Faculty
              </h2>
            </div>
            <div>
              <form onSubmit={hanleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <FormControl fullWidth size="small">
                      <TextField
                        label="First Name"
                        variant="outlined"
                        size="small"
                        type="text"
                        fullWidth
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-6">
                    <FormControl fullWidth size="small">
                      <TextField
                        label="Last Name"
                        variant="outlined"
                        size="small"
                        type="text"
                        fullWidth
                        value={SecondName}
                        onChange={(e) => setSecondName(e.target.value)}
                      />
                    </FormControl>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <FormControl fullWidth size="small">
                      <TextField
                        label="Phone Number"
                        variant="outlined"
                        size="small"
                        type="tel"
                        fullWidth
                        value={Phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-6">
                    <FormControl fullWidth size="small">
                      <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        type="email"
                        fullWidth
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="mb-3">
                  <Autocomplete
                    size="small"
                    multiple
                    id="tags-standard"
                    options={userRoles}
                    getOptionLabel={(option) => option}
                    defaultValue={[]}
                    value={Roles}
                    onChange={(e, val) => setRoles(val)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select User Roles"
                        placeholder="User Roles"
                      />
                    )}
                  />
                </div>

                <div>
                  {/* <FormControl fullWidth size="small">
                    <TextField
                      className="mb-4"
                      label="Password"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl> */}

                  <FormControl
                    className="mb-4"
                    variant="outlined"
                    fullWidth
                    size="small"
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
                </div>

                <div className="row mb-3"></div>
                <div className="mt-2 mb-0">
                  <Button
                    style={{ backgroundColor: "#4b2980" }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const userRoles = ["Admin", "CAC", "Faculty", "Evaluator"];
