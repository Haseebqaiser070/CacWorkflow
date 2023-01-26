import { useState } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { FormControl } from "@mui/material";
import axios from "axios";

const theme = createTheme();

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [link,setlink]=useState(false)
  const validationSchema = yup.object({
    newPassword: yup
      .string("Enter your password")
      .min(3, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    confirmPassword: yup
      .string("Enter your password")
      .min(3, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });
  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      var { token } = user;
      console.log(token);
      return token;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    var Token=getToken()
    console.log("gdjshj",token)
    if (formik.values.newPassword === formik.values.confirmPassword) {
      const res = await axios.post(
        `http://localhost:4000/Auth/reset-password/${token}`,
        {
          password: formik.values.newPassword,
        }
      );
      console.log("res",res)
      if (res.status === 200) {
        setSuccess(true);
      } else if(res.status ===500) {
        setlink(true);
      }
      else{
        setError(true)
      }
    } else {
      setError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link to={"/"}>
            <img
              style={{
                width: "250px",
                margin: "0 0 20px 180px",
              }}
              alt="Remy Sharp"
              src="../assets/images/cui.png"
            />
          </Link>
          <Typography component="h1" variant="h5">
            Enter New Password
          </Typography>
          <Box onSubmit={handleSubmit} component="form" sx={{ mt: 1 }}>
            {error && (
              <Box sx={{ mb: 1, mt: 2 }}>
                <Typography
                  align="center"
                  sx={{ color: "red" }}
                  component="h4"
                  variant="h6"
                >
                  Password donot Match!
                </Typography>
              </Box>
            )}
             {link && (
              <Box sx={{ mb: 1, mt: 2 }}>
                <Typography
                  align="center"
                  sx={{ color: "red" }}
                  component="h4"
                  variant="h6"
                >
                  Reset Link has Expired!
                </Typography>
              </Box>
            )}
            {success && (
              <Box sx={{ mb: 1, mt: 2 }}>
                <Typography
                  align="center"
                  sx={{ color: "green" }}
                  component="h4"
                  variant="h6"
                >
                  Password Reset Successfull!
                </Typography>
              </Box>
            )}
            <FormControl sx={{ width: "400px" }}>
              <TextField
                margin="normal"
                fullWidth
                id="password"
                name="newPassword"
                label="New Password"
                type="password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
              />
              <TextField
                margin="normal"
                fullWidth
                id="password"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset password
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
