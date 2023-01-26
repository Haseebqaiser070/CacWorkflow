import React, { useState, useEffect } from "react";
import "../css/styles.css";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Modal,
  Switch,
  TextField,
} from "@mui/material";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";

import { useLocation, useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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

export default function CreateSOS1() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const { state } = useLocation();
  const { Program, Content } = state.row;
  console.log("state", state);
  //{Category:"",Optional:"",Track:"",Courses:[],Note:""}

  //------------------------------------------------
  const [CoveredCourseSum, setCoveredCourseSum] = useState(
    state.row.CoveredCourseSum
  );
  const [CoveredCreditSum, setCoveredCreditSum] = useState(
    state.row.CoveredCreditSum
  );
  const [DomainCategories, setDomainCategories] = useState(
    state.row.Content.Page1.DomainCategories
  );
  const [CoveredCategories, setCoveredCategories] = useState(
    state.row.Content.Page1.CoveredCategories
  );
  const [DomainCourseSum, setDomainCourseSum] = useState(
    state.row.DomainCourseSum
  );
  const [DomainCreditSum, setDomainCreditSum] = useState(
    state.row.DomainCreditSum
  );
  const [Category, setCategory] = useState([]);
  const [Addcat, setAddcat] = useState("");
  const [Addcat2, setAddcat2] = useState("");
  const getCategory = async () => {
    const res = await axios.get("http://localhost:4000/Category/show");
    const data = await res.data;
    console.log(data);
    setCategory([...data]);
  };
  console.log("Content", Content);
  console.log("CoveredCategories", CoveredCategories);
  console.log("DomainCategories", DomainCategories);

  useEffect(() => {
    getCategory();
    getCoveredsum();
    getDomianSum();
  }, []);

  const getCoveredsum = () => {
    var s = 0;
    var r = 0;
    CoveredCategories.forEach((i) => {
      s = s + parseInt(i.NoofCourses);
      r = r + parseInt(i.NoofCredits);
    });
    setCoveredCourseSum(s);
    setCoveredCreditSum(r);
  };
  const getDomianSum = () => {
    var ss = 0;
    var rr = 0;
    DomainCategories.forEach((i) => {
      ss = ss + parseInt(i.NoofCourses);
      rr = rr + parseInt(i.NoofCredits);
    });
    setDomainCourseSum(ss);
    setDomainCreditSum(rr);
  };
  return (
    <div
      className="container"
      style={{ height: 700, width: "100%", padding: 20 }}
    >
      <h1 style={{ textTransform: "uppercase" }} className="my-4 pb-4">
        <b>Create Scheme of Studies for {Program} </b>
      </h1>

      <Card style={{ padding: 30, marginBottom: 35 }}>
        <div className="row">
          <h4 className="mb-4 mt-2">
            <b>Add Categories in {Program}</b>
          </h4>

          <div className="col-9">
            <FormControl fullWidth size="small">
              <Select
                fullWidth
                className="mb-4"
                labelId="courseAssign"
                id="courseAssign"
                label="ADD Category"
                value={Addcat}
                onChange={(e) => {
                  setAddcat(e.target.value);
                }}
                autoWidth
              >
                {Category.map((cats) => {
                  return (
                    <MenuItem value={cats.CategoryName}>
                      {cats.CategoryName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-3">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="medium"
              style={{ backgroundColor: "#4b2980" }}
              onClick={() => {
                setCoveredCategories([
                  ...CoveredCategories,
                  {
                    Category: Addcat,
                    NoofCourses: 0,
                    NoofCredits: 0,
                  },
                ]);
                setAddcat("");
              }}
            >
              Add Category
            </Button>
          </div>
        </div>
        <div className="row">
          <h4 className="mb-4 mt-2">
            <b>Domain Courses Categories</b>
          </h4>

          <div className="col-9">
            <FormControl fullWidth size="small">
              <Select
                fullWidth
                className="mb-4"
                labelId="courseAssign"
                id="courseAssign"
                label="ADD Category"
                value={Addcat2}
                onChange={(e) => {
                  setAddcat2(e.target.value);
                }}
                autoWidth
              >
                {Category.map((cats) => {
                  return (
                    <MenuItem value={cats.CategoryName}>
                      {cats.CategoryName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-3">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="medium"
              style={{ backgroundColor: "#4b2980" }}
              onClick={() => {
                setDomainCategories([
                  ...DomainCategories,
                  {
                    Category: Addcat2,
                    NoofCourses: 0,
                    NoofCredits: 0,
                  },
                ]);
                setAddcat2("");
              }}
            >
              Add Category
            </Button>
          </div>
        </div>
      </Card>
      <div className="table-responsive my-4 pt-4">
        <table className="table table-borderless">
          <thead style={{ backgroundColor: "#4b2980", color: "#fff" }}>
            <tr>
              <th>Course Work</th>
              <th>Min No. of Courses</th>
              <th>Min No. of Credit Hours</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Area Covered in {Program}</th>
            </tr>
            {CoveredCategories.map((c, index) => {
              return (
                <tr>
                  <td>{c.Category}</td>
                  <td>
                    <FormControl fullWidth size="small">
                      <TextField
                        className="mb-4"
                        id="outlined-basic"
                        label="No of Courses"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={c.NoofCourses}
                        onChange={(e) => {
                          const clone = [...CoveredCategories];
                          clone[index].NoofCourses = e.target.value;
                          setCoveredCategories([...clone]);
                          getCoveredsum();
                        }}
                      />
                    </FormControl>
                  </td>
                  <td>
                    <FormControl fullWidth size="small">
                      <p
                        className="mb-4"
                        id="outlined-basic"
                        label="No of Courses"
                        variant="outlined"
                        size="small"
                        fullWidth
                      >
                        {c.NoofCredits}
                      </p>
                    </FormControl>
                  </td>
                  <td style={{ textAlign: "center" }}>
                      <CloseIcon sx={{ color: "red" }} onClick={()=>{
                        var clone = [...CoveredCategories]
                        clone.splice(index,1)
                        setCoveredCategories([...clone])
                      }} />
                    
                  </td>
                </tr>
              );
            })}
            {
              <tr className="my-4" style={{ backgroundColor: "#f5f5f5" }}>
                <th>Total </th>
                <th>{CoveredCourseSum}</th>
                <th>{CoveredCreditSum}</th>
              </tr>
            }

            <th colSpan={2} className="pt-4 mt-5">
              Domain Courses
            </th>
            {DomainCategories.map((c, index) => {
              return (
                <tr>
                  <td>{c.Category}</td>
                  <td>
                    <FormControl fullWidth size="small">
                      <TextField
                        className="mb-4"
                        id="outlined-basic"
                        label="No of Courses"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={c.NoofCourses}
                        onChange={(e) => {
                          const clone = [...DomainCategories];
                          clone[index].NoofCourses = e.target.value;
                          setDomainCategories([...clone]);
                          getDomianSum();
                        }}
                      />                      
                    </FormControl>
                  </td>
                  <td>
                    <FormControl fullWidth size="small">
                      <p
                        className="mb-4"
                        id="outlined-basic"
                        label="No of Courses"
                        variant="outlined"
                        size="small"
                        fullWidth                        
                      >{c.NoofCredits}</p>
                    </FormControl>
                  </td>
                  <td style={{ textAlign: "center" }}>
                      <CloseIcon sx={{ color: "red" }} onClick={()=>{
                        var clone = [...DomainCategories]
                        clone.splice(index,1)
                        setDomainCategories([...clone])
                      }} />                    
                  </td>
                </tr>
              );
            })}
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th>Total </th>
              <th>{DomainCourseSum}</th>
              <th>{DomainCreditSum}</th>
            </tr>

            <tr className="my-4" style={{ backgroundColor: "#f5f5f5" }}>
              <th>Total No of Courses in a Program </th>
              <th colSpan={2}>{DomainCourseSum + CoveredCourseSum}</th>
            </tr>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th>Total Credit Hours in the Program: </th>
              <th colSpan={2}>{DomainCreditSum + CoveredCreditSum}</th>
            </tr>
          </tbody>
        </table>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="medium"
          className="my-4 mb-4"
          style={{ backgroundColor: "#4b2980" }}
          onClick={() => {
            if (CoveredCourseSum == 0 || DomainCourseSum == 0) {
              alert("Categories in Complete");
            } else {
              state.row.CoveredCategories = CoveredCategories;
              state.row.DomainCategories = DomainCategories;
              navigate(
                `/CAC/CreateSOS/${Program}/2`,
                { state: { row: state.row } },
                { replace: true }
              );
            }
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
{
  /* <Card style={{ padding: 30, marginBottom: 35 }}>
        <div className="row">
          <h4 className="mb-4 mt-2">
            <b>Add Categories in {Program}</b>
          </h4>
          <form onSubmit={sub1}>
          <div className="col-9">
            <FormControl fullWidth size="small">
              <Select
                className="mb-4"
                labelId="courseAssign"
                id="courseAssign"
                label="ADD Category"
                value={Addcat}
                onChange={(e) => {
                  setAddcat(e.target.value);
                }}
                autoWidth
              >{Category.map((cats)=>{
                return(
                  <MenuItem value={cats.CategoryName}>{cats.CategoryName}</MenuItem>
                  )})}
              </Select>
            </FormControl>
          </div>
          <div className="col-3">
            <Button fullWidth variant="contained" color="primary" size="medium" type="submit">
              Add Category
            </Button>
          
          </div>
          </form>
        </div>
        <div className="row">
          <h4 className="mb-4 mt-2">
            <b>Domain Courses Categories</b>
          </h4>
        <form onSubmit={sub2}>
          <div className="col-9">
            <FormControl fullWidth size="small">
              <Select
                className="mb-4"
                labelId="courseAssign"
                id="courseAssign"
                label="ADD Category"
                value={Addcat2}
                onChange={(e) => {
                  setAddcat2(e.target.value);
                }}
                autoWidth
              >{Category.map((cats)=>{
                return(
                  <MenuItem value={cats.CategoryName}>{cats.CategoryName}</MenuItem>
                  )})}
              </Select>
            </FormControl>
          </div>
          <div className="col-3">
            <Button fullWidth variant="contained" color="primary" size="medium" type="submit" >
              Add Category
            </Button>
          </div>
          </form>
        </div>
      </Card> */
}
