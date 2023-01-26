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
import { useLocation, useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import { muiAbtn } from "../style";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
};

export default function CreateSOS() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { Program, Content } = state.row;
  axios.defaults.withCredentials = true;
  const [Rows, setRows] = useState([]);
  const [Year, setYear] = useState(Content.Year);
  //------------------------------------------------

  const [Categories, setCategories] = useState([]);
  //{Category:"",Optional:"",Track:"",Courses:[],Note:""}
  //------------------------------------------------
  const [Courses, setCourse] = useState([]);
  const [Category, setCategory] = useState([]);

  const [coursesList, setCoursesList] = useState([]);

  console.log("Course", Courses);
  console.log("state.row", state.row);
  console.log("state.row", state.row.CoveredCategories);
  console.log("state.row", state.row.DomainCategories);
  console.log("CATS", Categories);
  console.log("Content", Content);

  const [AssignCategory, setAssignCategory] = useState([""]);

  const [AssignPrerequisite, setAssignPrerequisite] = useState([]);
  const [opts, setopts] = useState([]);
  console.log("Category", Category);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const settracks = (clone) => {
    var num = 0;

    clone.forEach((e) => {
      console.log("e", e);
      if (e.Track.includes("Track")) {
        num = num + 1;
        e.Track = "Track" + num + " ";
      }
    });
    console.log(clone);
    setCategories([...clone]);
  };
  const getCategory = async () => {
    // const res = await axios.get("http://localhost:4000/Category/show");
    // const data = await res.data;
    // console.log("data",data);
    console.log("CATS", Categories);
    if (Content.Categories != undefined) {
      setCategories(Content.Categories);
    }
    setCategory([
      ...state.row.CoveredCategories,
      ...state.row.DomainCategories,
    ]);
  };
  const getData = async () => {
    const res = await axios.get("http://localhost:4000/RepoCourse/show");
    const data = await Promise.all(
      res.data.map((i) => {
        i.PreRequisites = [];
        return i;
      })
    );
    setCourse([...data]);
  };

  const AddSOS = async (e) => {
    e.preventDefault();
    var check = true;
    Categories.forEach((e) => {
      var r = Category.find((i) => i.Category == e.Category);
      if (e.Courses.length != r.NoofCourses) {
        check = false;
        // cats.Category
        alert("In " + e?.Category + " Number of courses is greater");
      }
    });
    if(Year.length!=4){
      check=false
    }
    if (check) {
      console.log("SOS");
      // const retnSOSPage1 = await axios.post("http://localhost:4000/SOSpage1/add", {
      //   Program,
      //   Year,
      //   CoveredCategories: state.row.CoveredCategories,
      //   DomainCategories: state.row.DomainCategories
      // }
      // )

      await axios.post("http://localhost:4000/SOSVerison/add", {
        CoveredCategories: state.row.CoveredCategories,
        DomainCategories: state.row.DomainCategories,
        Program,
        Year,
        Categories,
      });
      navigate(
        `/CAC/SOSCreation/${Program}`,
        { state: { row: { Program } } },
        { replace: true }
      );
    }
  };

  useEffect(() => {
    getData();
    getCategory();
  }, []);
  function check(cats) {
    var r = Category.find((i) => i.Category == cats.Category);
    if (cats.Courses.length > r.NoofCourses) {
      alert("In " + cats.Category + " Number of courses is greater");
    }
    var sum = 0;
    cats.Courses.forEach((e) => {
      sum = sum + parseInt(e.LectureHoursWeek);
      sum = sum + parseInt(e.LabHoursWeek);
    });
    var ccc = Category.map((i) => {
      if (i.Category == cats.Category) {
        i.NoofCredits = sum;
      }
      return i;
    });
    Category = ccc;
  }
  const columns = [
    {
      field: "Code",
      headerName: "Course Code",
      width: "150",
    },
    {
      field: "Name",
      headerName: "Course Name",
      width: "400",
    },
    {
      field: "CreditHours",
      headerName: "Credit Hour",
      valueGetter: (params) => {
        return (
          params?.row?.Credit +
          "(" +
          params?.row?.LectureHoursWeek +
          "," +
          params?.row?.LabHoursWeek +
          ")"
        );
      },
      width: "200",
    },

    {
      field: "Prerequisites",
      headerName: "Pre-requisite(s)",
      width: "300",

      renderCell: ({ row }) => (
        <>
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="small"
            style={muiAbtn}
            onClick={() => {
              let num2 = row.Code.split("-")[1].charAt(0);
              let numcode = parseInt(num2);
              const ans = Courses.filter((i) => {
                let num = i.Code.split("-")[1].charAt(0);
                let num1 = parseInt(num);
                if (num1 < numcode) return i;
              });
              setopts([...ans]);
              setAssignPrerequisite([...row.PreRequisites]);
              setOpen(true);
            }}
          >
            Add/Edit PreRequisites
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box component="form" sx={style}>
              <Box mb={3} style={{ display: "flex", justifyContent: "end" }}>
                <CloseIcon
                  onClick={handleClose}
                  style={{ cursor: "pointer", color: "gray" }}
                />
              </Box>
              <h4 style={{ textAlign: "center", marginBottom: 30 }}>
                ADD PREREQUISITES
              </h4>
              <Autocomplete
                className="mb-4"
                multiple
                id="tags-standard"
                value={AssignPrerequisite}
                options={opts}
                getOptionLabel={(option) => option.Name}
                defaultValue={null}
                onChange={(e, val) => setAssignPrerequisite(val)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Set Prerequisite"
                    placeholder="Set Prerequisite"
                    size="small"
                  />
                )}
              />
              <Button
                fullWidth
                type="button"
                variant="contained"
                color="primary"
                size="medium"
                style={{ backgroundColor: "#4b2980" }}
                onClick={() => {
                  row.PreRequisites = AssignPrerequisite;
                  var a1;
                  var a2;

                  Categories.forEach((e) => {
                    let check = false;
                    e.Courses.forEach((i) => {
                      if (i._id == row._id) {
                        check = true;
                        a2 = e.Courses.indexOf(i);
                      }
                    });
                    if (check) {
                      a1 = Categories.indexOf(e);
                    }
                  });
                  var clone = Categories;
                  console.log("a1", a1, "a2", a2);

                  console.log("clone1", clone);
                  console.log(row);
                  clone[a1].Courses[a2].PreRequisites = AssignPrerequisite;
                  console.log("clone12331", clone);
                  setCategories([...clone]);
                  setAssignPrerequisite([]);
                  setOpen(false);
                }}
              >
                Add Prerequisites
              </Button>
            </Box>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <div className="container" style={{ width: "100%", padding: 30 }}>
      <h1 style={{ textTransform: "uppercase" }} className="my-4 pb-4">
        <b>Create Scheme of Studies for {Program} </b>
      </h1>
      <form onSubmit={AddSOS}>
        <h4 className="mb-4 mt-2">
          <b>Enter SOS Title</b>
        </h4>
        <FormControl fullWidth size="small">
          <TextField
            className="mb-4"
            id="outlined-basic"
            label="SOS Title"
            variant="outlined"
            size="small"
            fullWidth
            value={Year}
            onChange={(e) =>{
              if(isNaN(e.target.value)){alert("enter a numeric value")}                      
              else if(e.target.value.length>4){alert("enter a 4 digit year")}
              else{setYear(e.target.value)}
          
            }}
          />
        </FormControl>
        <div className="row">
          <h4 className="mb-4 mt-2">
            <b>Select Category</b>
          </h4>

          <div className="col">
            <FormControl fullWidth size="small">
              {/* <Autocomplete
            multiple
            id="tags-standard"
            className="mb-4"
            value={AssignCategory}
            options={Category}
            getOptionLabel={(option) => option.CategoryName}
            defaultValue={null}
            onChange={(e, val) => setAssignCategory(val)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Assign Category"
                placeholder="Assign Category"
                size="small"
              />
            )}
          /> */}

              <Select
                fullWidth
                className="mb-4"
                labelId="courseAssign"
                id="courseAssign"
                label="ADD Category"
                value={AssignCategory[0]}
                onChange={(e) => {
                  setAssignCategory([e.target.value, ...AssignCategory]);
                }}
                autoWidth
              >
                {Category?.map((a) => {
                  return <MenuItem value={a.Category}>{a.Category}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-2">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="medium"
              style={{ backgroundColor: "#4b2980" }}
              onClick={() => {
                const clone = [
                  {
                    Category: AssignCategory[0],
                    Optional: "",
                    Track: "",
                    Courses: [],
                    Note: "",
                  },
                  ...Categories,
                ];
                setCategories([...clone]);
                const cc = Category.filter((i) => {
                  if (i.CategoryName != AssignCategory) {
                    return i;
                  }
                });
                console.log("CategoriesCategories", Categories);
                setCategory(cc);
                setAssignCategory(["", "", ...AssignCategory]);
              }}
            >
              Add Category
            </Button>
          </div>
        </div>
        {Categories?.map((obj, index) => {
          return (
            <div>
              <div className=" my-4">
                <Card style={{ padding: 30, backgroundColor: "#FAFAFA" }}>
                  <div className="row">
                    <div className="col-9">
                      <h2
                        style={{
                          textAlign: "left",
                          fontStyle: "Uppercase",
                          color: "red",
                        }}
                        className="mb-3 "
                      >
                        {obj.Category}
                      </h2>
                    </div>
                    <div className="col-3">
                      <Button
                        style={{ float: "right", backgroundColor: "red" }}
                        className="mb-4"
                        variant="contained"
                        size="small"
                        onClick={() => {
                          const clone = [...Categories];
                          clone.splice(index, 1);
                          setCategories([...clone]);
                          console.log("index", index);
                          const copy = [...AssignCategory];
                          copy.splice(index, 1);
                          setAssignCategory([...copy]);
                        }}
                      >
                        <CloseIcon />
                      </Button>
                    </div>
                  </div>

                  {/* {Category:"",Optional:"",Track:"",Courses:[],Note:""} */}
                  <h4 style={{ marginTop: 30 }}>
                    <b>Enter Description for {obj.Category} </b>
                  </h4>
                  <FormControl fullWidth size="small">
                    <TextField
                      multiline
                      rows={3}
                      className="mb-4"
                      id="outlined-basic"
                      label="Add Category Description (optional)"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={Categories[index].Optional}
                      onChange={(e) => {
                        const clone = [...Categories];
                        clone[index].Optional = e.target.value;
                        setCategories([...clone]);
                      }}
                    />
                  </FormControl>

                  <FormControl className="mb-4">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={
                            Categories[index].Track.includes("Track")
                              ? true
                              : false
                          }
                          onChange={() => {
                            // recheck checked in conditions
                            if (Categories[index].Track == "") {
                              const clone = Categories;
                              clone[index].Track = "Track";
                              settracks(clone);
                            } else if (Categories[index].Track != "") {
                              const clone = Categories;
                              clone[index].Track = "";
                              settracks(clone);
                            }
                          }}
                        />
                      }
                      label="Do this category have tracks"
                      labelPlacement="start"
                    />
                  </FormControl>

                  {/* {Category:"",Optional:"",Track:"",Courses:[],Note:""} */}

                  {Categories[index].Track.includes("Track") ? (
                    <FormControl fullWidth size="small">
                      <h4 className="mb-4 mt-2">
                        <b>
                          {Categories[index].Track.substring(
                            0,
                            Categories[index].Track.indexOf(" ") + 1
                          )}
                        </b>
                      </h4>
                      <TextField
                        className="mb-4"
                        id="outlined-basic"
                        label="Add Track (optional)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={Categories[index].Track.substring(
                          Categories[index].Track.indexOf(" ") + 1
                        )}
                        onChange={(e) => {
                          const clone = [...Categories];
                          clone[index].Track =
                            Categories[index].Track.substring(
                              0,
                              Categories[index].Track.indexOf(" ") + 1
                            ) + e.target.value;
                          setCategories([...clone]);
                        }}
                      />
                    </FormControl>
                  ) : (
                    <p style={{ color: "red", textAlign: "center" }}>
                      No tracks
                    </p>
                  )}

                  <div>
                    <h4 style={{ marginTop: 50, marginBottom: 30 }}>
                      <b>Select Courses in {obj.Category} </b>
                    </h4>

                    <Autocomplete
                      style={{ marginBottom: 35 }}
                      multiple
                      variant="outlined"
                      value={Categories[index].Courses}
                      options={Courses}
                      size="medium"
                      getOptionLabel={(option) => option.Name}
                      defaultValue={null}
                      onChange={(e, val) => {
                        const clone = [...Categories];
                        clone[index].Courses = val;
                        setCategories([...clone]);
                        check(Categories[index]);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Select Courses"
                          placeholder="Select Courses"
                        />
                      )}
                    />
                  </div>
                  <h4 style={{ marginTop: 40 }}>
                    <b>Selected Courses in {obj.Category} </b>
                  </h4>
                  <p className="mb-4">Add Prerequisite of courses (if any)</p>
                  <div style={{ height: 300, width: "100%" }}>
                    <DataGrid
                      rows={Categories[index].Courses}
                      columns={columns}
                      getRowId={(Rows) => Rows._id}
                      disableSelectionOnClick
                    />
                  </div>

                  <div className="mb-4 ">
                    <h4 className="mt-4 ">Specific Note</h4>

                    <FormControl fullWidth size="small">
                      <TextField
                        multiline
                        rows={3}
                        className="mb-4"
                        id="outlined-basic"
                        label="Note (Optional)"
                        variant="outlined"
                        size="medium"
                        fullWidth
                        value={Categories[index].Note}
                        onChange={(e) => {
                          const clone = [...Categories];
                          clone[index].Note = e.target.value;
                          setCategories([...clone]);
                        }}
                      />
                    </FormControl>
                  </div>
                </Card>
              </div>

              <div style={{ marginTop: 50 }} className="row">
                <h4 className="mb-4 mt-2">
                  <b>Select Category</b>
                </h4>

                <div className="col">
                  <FormControl fullWidth size="small">
                    <Select
                      className="mb-4"
                      labelId="courseAssign"
                      id="courseAssign"
                      label="ADD Category"
                      value={AssignCategory[index + 1]}
                      onChange={(e) => {
                        const clone = [...AssignCategory];
                        clone[index + 1] = e.target.value;
                        setAssignCategory([...clone]);
                      }}
                      autoWidth
                    >
                      {Category.map((a) => {
                        return (
                          <MenuItem value={a.Category}>{a.Category}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-2">
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ backgroundColor: "#4b2980" }}
                    onClick={() => {
                      const clone = [...Categories];
                      clone.splice(index + 1, 0, {
                        Category: AssignCategory[index + 1],
                        Optional: "",
                        Track: "",
                        Courses: [],
                        Note: "",
                      });
                      setCategories([...clone]);
                      const copy = [...AssignCategory];
                      copy[index + 1] = "";
                      copy.splice(index + 2, 0, "");
                      setAssignCategory([...copy]);
                      const cc = Category.filter((i) => {
                        if (i.CategoryName != AssignCategory) {
                          return i;
                        }
                      });
                      setCategory(cc);
                    }}
                  >
                    Add Category
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
        <Button
          style={{
            marginTop: 40,
            marginBottom: 50,
            backgroundColor: "#4b2980",
          }}
          fullWidth
          variant="contained"
          color="primary"
          size="medium"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
