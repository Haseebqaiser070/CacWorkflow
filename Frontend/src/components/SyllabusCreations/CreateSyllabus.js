import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControlLabel,
  Modal,
  Switch,
  Card,
  Tooltip,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../css/styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import CloseIcon from "@mui/icons-material/Close";

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

export default function CreateSyllabus() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [unit, setunit] = useState([]);
  const [topicsCovered, setTopicsCovered] = useState("");
  const [bookName, setBookName] = useState("");

  const [refmat, setrefmat] = useState(false);

  const [chapter, setChapter] = useState("");
  const [Bookfinal, setBookfinal] = useState("");
  const [CDFtops, setCDFtops] = useState([]);
  const { state } = useLocation();
  console.log(state);
  const { row } = state;
  const [Rows, setRows] = useState([...row.Content]);

  const [Authors, setAuthors] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const Add = () => {
    var Lec = Rows.length + 1;
    var b = "";
    if (refmat == true) {
      b = Bookfinal + "-Ref. Material";
      setrefmat(false);
    } else if (refmat == false) {
      b = Bookfinal;
    }
    setRows([
      ...Rows,
      { lecture: Lec, CDFUnit: unit, topics: topicsCovered, material: b },
    ]);
    setunit([]);
    setTopicsCovered("");
    setBookName("");
    setChapter("");
    setBookfinal("");
  };

  const Edit = () => {
    var b = "";
    if (refmat == true) {
      b = Bookfinal + "-Ref. Material";
      setrefmat(false);
    } else if (refmat == false) {
      b = Bookfinal;
    }
    var list = Rows.map((i)=>{
      if(i.lecture==lecid){
        i.CDFUnit= unit
        i.topics= topicsCovered
        i.material= b
      }
      return i 
    })
    setRows([...list]);
    setunit([]);
    setTopicsCovered("");
    setBookName("");
    setChapter("");
    setBookfinal("");
    setOpen(false)
  };
  const [lecid,setlecid]=useState("")
  
  useEffect(() => {
    getstuff();
    getAuths();
  }, []);
  console.log("--------Authors----------", Authors);
  const getAuths = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/Course/Authors/${row.Code}`
      );
      setAuthors(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getstuff = async () => {
    const res = await axios.get(`http://localhost:4000/CDF/shower/${row.Code}`);
    var largest = 0;
    console.log("Topics", res.data);
    res.data.Topics.forEach((i) => {
      if (i.Unit.length == 1) {
        if (parseInt(i.Unit) > largest) {
          largest = parseInt(i.Unit);
        }
      } else if (i.Unit.length > 1) {
        if (parseInt(i.Unit.substring(2)) > largest) {
          largest = parseInt(i.Unit);
        }
      }
      console.log("lar", largest);
    });
    var abc = [];
    for (var i = 1; i < largest + 1; i++) {
      var a = i + "";
      abc.push(a);
    }
    console.log("abc", abc);
    setCDFtops([...abc]);
  };

  const columns = [
    {
      field: "lecture",
      headerName: "Lecture#",
      width: "80",
    },
    {
      field: "CDFUnit",
      headerName: "CDF Unit#",
      width: "100",
    },
    {
      field: "topics",
      headerName: "Topics Covered",
      width: "500",
    },
    {
      field: "material",
      headerName: "Reference Material",
      width: "300",
      valueGetter: ((params) => {
        var arr = params?.row?.material.split("-");
        var outarr = arr.join(", \n")
        return outarr
      }),
    },

    {
      field: "action",
      headerName: "Action",
      width: "200",
      renderCell: ({ row }) => {
        return (
          <>
            <Tooltip title="Edit" placement="top-start">
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{
                  backgroundColor: "#4b2980",
                  marginLeft: 10,
                  padding: 10,
                }}
                onClick={()=>{
                  var arrs = row.material.split("-")
                  setTopicsCovered(row.topics);
                  arrs[arrs.length-1] == "Ref. Material"?setrefmat(true):setrefmat(false);                  
                  setBookName("");
                  setChapter("");
                  setunit(row.CDFUnit)
                  setlecid(row.lecture)
                  if(arrs[arrs.length-1]=="Ref. Material"){
                    arrs.pop()
                  }
                  setBookfinal(arrs.join("-"));
                  handleOpen()
                }}
              >
                <AiFillEdit />
              </Button>
            </Tooltip>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Box mb={3} style={{ display: "flex", justifyContent: "end" }}>
                  <CloseIcon
                    onClick={handleClose}
                    style={{ cursor: "pointer", color: "gray" }}
                  />
                </Box>
                <h4 className="mb-4">EDIT WEEK WISE PLAN</h4>
                <form onSubmit={onSubmit}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Select CDF Unit
                    </InputLabel>
                    <Select
                      style={{ backgroundColor: "#fff" }}
                      className="mb-4"
                      id="outlined-basic"
                      label="Select CDF Unit"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={unit}
                      onChange={(e) => {
                        setunit(e.target.value);
                      }}
                    >
                      {CDFtops.map((i) => {
                        return <MenuItem value={i}>{i}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth size="large">
                    <TextField
                      style={{ backgroundColor: "#fff" }}
                      className="mb-4"
                      id="outlined-basic"
                      label="Add Topics Covered"
                      variant="outlined"
                      size="large"
                      fullWidth
                      value={topicsCovered}
                      onChange={(e) => {
                        setTopicsCovered(e.target.value);
                      }}
                    />
                  </FormControl>
                  <div className="row">
                    <div className="col">
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
                          Select Book
                        </InputLabel>
                        <Select
                          style={{ backgroundColor: "#fff" }}
                          className="mb-4"
                          id="outlined-basic"
                          label="Add Book Name"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={bookName}
                          onChange={(e) => {
                            setBookName(e.target.value);
                          }}
                        >
                          {Authors.map((a) => {
                            return <MenuItem value={a}>{a}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col">
                      <FormControl fullWidth size="small">
                        <TextField
                          style={{ backgroundColor: "#fff" }}
                          className="mb-4"
                          id="outlined-basic"
                          label="Add Chapter"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={chapter}
                          onChange={(e) => {
                            setChapter(e.target.value);
                          }}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <FormControl className="mb-4">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={refmat}
                              onChange={() => {
                                setrefmat(!refmat);
                              }}
                            />
                          }
                          label="ref material"
                          labelPlacement="start"
                        />
                      </FormControl>
                    </div>
                    <div className="col-4">
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="medium"
                        style={{ backgroundColor: "#4b2980" }}
                        onClick={() => {
                          if (Bookfinal == "") {
                            var ab = bookName + ": " + chapter;
                            setBookfinal(ab);
                            setBookName("");
                            setChapter("");
                          } else {
                            var ab =
                              Bookfinal + "-" + bookName + ": " + chapter;
                            setBookfinal(ab);
                            setBookName("");
                            setChapter("");
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  <FormControl fullWidth size="small">
                    <TextField
                      style={{
                        marginBottom: 20,
                        backgroundColor: "#fff",
                      }}
                      id="outlined-basic"
                      label="Books"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={Bookfinal}
                      onChange={(e) => {
                        setBookfinal(e.target.value);
                      }}
                    />
                  </FormControl>
                  <Button
                    className="mt-3"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ backgroundColor: "#4b2980" }}
                    onClick={() => {
                      Edit();
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            </Modal>

            <Tooltip title="Delete" placement="top-start">
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{
                  backgroundColor: "#4b2980",
                  marginLeft: 16,
                  padding: 10,
                }}
                onClick={() => {
                  var Lec = Rows.length + 1;
                  const clone = Rows.filter((obj) => {
                    if (row != obj) return obj;
                  });
                  var count = 0;
                  clone.forEach((i) => {
                    count = count + 1;
                    i.lecture = count;
                  });
                  setRows([...clone]);
                }}
              >
                <AiFillDelete />
              </Button>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/SyllabusVerison/add", {
      Code: row.Code,
      Plan: Rows,
    });
    navigate(
      `/CAC/SyllabusCreation/${row.Code}`,
      { state: { row } },
      { replace: true }
    );
  };
  return (
    <div style={{ width: "100%", padding: 50 }}>
      <h1 className=" my-4 pb-4 ">
        <b>CREATE/EDIT SYLLABUS</b>
      </h1>
      <form onSubmit={onSubmit}>
        <h2 style={{ textAlign: "left" }} className="my-4 pt-4">
          ADD WEEK WISE PLAN
        </h2>
        <Card
          style={{
            padding: 20,
            backgroundColor: "#e8f0f7",
          }}
        >
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Select CDF Unit
            </InputLabel>
            <Select
              style={{ backgroundColor: "#fff" }}
              className="mb-4"
              id="outlined-basic"
              label="Select CDF Unit"
              variant="outlined"
              size="small"
              fullWidth
              value={unit}
              onChange={(e) => {
                setunit(e.target.value);
              }}
            >
              {CDFtops.map((i) => {
                return <MenuItem value={i}>{i}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth size="large">
            <TextField
              style={{ backgroundColor: "#fff" }}
              className="mb-4"
              id="outlined-basic"
              label="Add Topics Covered"
              variant="outlined"
              size="large"
              fullWidth
              value={topicsCovered}
              onChange={(e) => {
                setTopicsCovered(e.target.value);
              }}
            />
          </FormControl>
          <div className="row">
            <div className="col">
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Select Book
                </InputLabel>
                <Select
                  style={{ backgroundColor: "#fff" }}
                  className="mb-4"
                  id="outlined-basic"
                  label="Add Book Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={bookName}
                  onChange={(e) => {
                    setBookName(e.target.value);
                  }}
                >
                  {Authors.map((a) => {
                    return <MenuItem value={a}>{a}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col">
              <FormControl fullWidth size="small">
                <TextField
                  style={{ backgroundColor: "#fff" }}
                  className="mb-4"
                  id="outlined-basic"
                  label="Add Chapter"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={chapter}
                  onChange={(e) => {
                    setChapter(e.target.value);
                  }}
                />
              </FormControl>
            </div>

            <div className="col-2">
              <FormControl className="mb-4">
                <FormControlLabel
                  control={
                    <Switch
                      checked={refmat}
                      onChange={() => {
                        setrefmat(!refmat);
                      }}
                    />
                  }
                  label="ref material"
                  labelPlacement="start"
                />
              </FormControl>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="medium"
                style={{ backgroundColor: "#4b2980" }}
                onClick={() => {
                  if (Bookfinal == "") {
                    var ab = bookName + ": " + chapter;
                    setBookfinal(ab);
                    setBookName("");
                    setChapter("");
                  } else {
                    var ab = Bookfinal + "-" + bookName + ": " + chapter;
                    setBookfinal(ab);
                    setBookName("");
                    setChapter("");
                  }
                }}
              >
                Add
              </Button>
            </div>
          </div>
          <FormControl fullWidth size="small">
            <TextField
              style={{
                marginTop: 25,
                marginBottom: 20,
                backgroundColor: "#fff",
              }}
              id="outlined-basic"
              label="Books"
              variant="outlined"
              size="small"
              fullWidth
              value={Bookfinal}
              onChange={(e) => {
                setBookfinal(e.target.value);
              }}
            />
          </FormControl>
          <Button
            className="mt-3"
            fullWidth
            variant="contained"
            color="primary"
            size="medium"
            style={{ backgroundColor: "#4b2980" }}
            onClick={() => {
              Add();
            }}
          >
            Submit
          </Button>
        </Card>
        <div
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: 2,
            marginBottom: 15,
            marginTop: 50,
          }}
        >
          <h5>Week wise Plan:</h5>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={Rows}
            columns={columns}
            getRowId={(Rows) => Rows.lecture}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>

        <Button
          fullWidth
          className="my-4 mb-4"
          variant="contained"
          color="primary"
          size="medium"
          style={{ backgroundColor: "#4b2980" }}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
