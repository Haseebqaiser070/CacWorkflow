//          CDF Form
import React, { useState, useEffect } from "react";
import "../css/styles.css";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";

import {
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import { muiAbtn } from "../style";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

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

export default function CreateCDF() {
  const { state } = useLocation();
  const { row } = state;
  const navigate = useNavigate();
  const [mainTopic, setmainTopic] = useState("");
  const [subTopic, setsubTopic] = useState([""]);
  const [teachingHours, setteachingHours] = useState("");
  const [clo, setclo] = useState("");
  const [unit, setunit] = useState([]);
  const [TopicRows, setTopicRows] = useState([...row.CDF.Topics]);
  const [btl, setbtl] = useState("");
  const [domain, setdomain] = useState("");
  const [so, setso] = useState([]);
  const [textBook, settextBook] = useState([...row.CDF.textBook]);
  const [referenceBook, setreferenceBook] = useState([
    ...row.CDF.referenceBook,
  ]);
  const [Topicsfinal, setTopicsfinal] = useState("");
  const [CLORows, setCLORows] = useState([...row.CDF.CLOs]);

  const [TheoryCLORows, setTheoryCLORows] = useState([]);
  const [LabCLORows, setLabCLORows] = useState([]);

  const [quizzes, setquizzes] = useState([
    { title: "Quiz 1" },
    { title: "Quiz 2" },
    { title: "Quiz 3" },
    { title: "Quiz 4" },
  ]);
  const [assignments, setassignments] = useState([
    { title: "Assignment 1" },
    { title: "Assignment 2" },
    { title: "Assignment 3" },
    { title: "Assignment 4" },
  ]);

  console.log("row: ", row);
  // const getData = async () => {
  //   const res = await axios.get("http://localhost:4000/Course/show");
  //   const data = await res.data;
  //   setCourse([...data]);
  // };

  useEffect(() => {
    // getData();
    getSORows();
    getBTLRows();
    getBTLDIC();
    getDomainRows();
    forLab();
  }, []);
  const forLab = () => {
    var labs = [];
    var theo = [];
    row.CDF.CLOs.forEach((i) => {
      if (i.LaborTheory == "Lab") {
        labs.push(i);
      } else if (i.LaborTheory == "Theory") {
        theo.push(i);
      }
    });
    setTheoryCLORows([...theo]);
    setLabCLORows([...labs]);
  };

  const getDomainRows = async () => {
    const res = await axios.get("http://localhost:4000/SOBTL/showDomain");
    const data = await res.data;
    setDomainRow([...data]);
  };

  const getBTLDIC = async () => {
    const res = await axios.get("http://localhost:4000/SOBTL/showBTLDic");
    const data = await res.data;
    setBTLDIC([...data]);
  };
  const [Verbs, setVerbs] = useState([]);
  const [Verb, setVerb] = useState("");
  const [BTLDIC, setBTLDIC] = useState([]);
  const [DomainRow, setDomainRow] = useState([]);
  const [SORow, setSORow] = useState([]);
  const [BTLRow, setBTLRow] = useState([]);
  const [openTopic, setOpenTopic] = useState(false);
  const handleOpenTopic = () => setOpenTopic(true);
  const handleCloseTopic = () => {
    setTopicsfinal("");
    setteachingHours("");
    setmainTopic("");
    setsubTopic("");
    setuid("")
    setOpenTopic(false);
  };

  const [openClo, setOpenClo] = useState(false);
  const handleOpenClo = () => setOpenClo(true);
  const handleCloseClo = () => {
    setunit([]);
    setclo("");
    setbtl("");
    setdomain("");
    setVerbs([]);
    setVerb("");
    setso([]);
    setOpenClo(false);
  };

  const getSORows = async () => {
    const ress = await axios.get("http://localhost:4000/SOBTL/showSO");
    const dataa = await ress.data;
    setSORow([...dataa]);
  };
  const getVerbs = () => {
    console.log("BTLDIC", BTLDIC);
    console.log("btl", btl);
    console.log("domain", domain);

    const filts = BTLDIC.filter((i) => {
      console.log(i);
      if (btl.BTL == i.BTL && domain == i.Domain) {
        return i;
      }
    });
    console.log("filts", filts);
    var ver = [];
    filts.forEach((e) => {
      console.log("e", e);
      ver = [...ver, ...e.Verbs];
      console.log(ver);
    });
    setVerbs([...ver]);
  };
  useEffect(() => {
    getVerbs();
  }, [btl, domain]);

  const getBTLRows = async () => {
    const res = await axios.get("http://localhost:4000/SOBTL/showBTL");
    const data = await res.data;
    setBTLRow([...data]);
  };
  const[uid,setuid]=useState("")
  const maintopicscolumns = [
    {
      field: "Unit",
      headerName: "Unit",
      width: "90",
    },
    {
      field: "Topic",
      headerName: "Topic",
      width: "650",
    },
    {
      field: "TeachingHours",
      headerName: "No. of Teaching Hours",
      width: "110",
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
                  setuid(row.Unit)
                  setTopicsfinal(row.Topic);
                  setteachingHours(row.TeachingHours);
                  setmainTopic("");
                  setsubTopic("");
                  handleOpenTopic()
                }}
              >
                <AiFillEdit />
              </Button>
            </Tooltip>

            <Modal
              open={openTopic}
              onClose={handleCloseTopic}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Box mb={3} style={{ display: "flex", justifyContent: "end" }}>
                  <CloseIcon
                    onClick={handleCloseTopic}
                    style={{ cursor: "pointer", color: "gray" }}
                  />
                </Box>
                <h4 className="mb-4">EDIT UNIT WISE MAIN TOPICS</h4>
                <form>
                  <div>
                    <div className="row">
                      <div className="col">
                        <FormControl fullWidth size="small">
                          <TextField
                            className="mb-4"
                            id="outlined-basic"
                            label="Add Main Topic"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={mainTopic}
                            onChange={(e) => {
                              setmainTopic(e.target.value);
                            }}
                          />
                        </FormControl>
                      </div>
                      <div className="col-3">
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ backgroundColor: "#4b2980" }}
                          onClick={() => {
                            var not = ["of","the","and","&","for","in","like"]
                            var dig = mainTopic.split(" ")
                            var dig2 = dig.map((i)=>{
                              if(!not.includes(i.toLowerCase())){
                                return i.charAt(0).toUpperCase()+i.slice(1)
                              }
                              else{
                                return i.toLowerCase()
                              }
                            })
                            var naam = dig2.join(" ")
                            const s = Topicsfinal + naam + ": ";
                            setTopicsfinal(s);
                            setmainTopic("");
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-9">
                        <FormControl fullWidth size="small">
                          <TextField
                            className="mb-4"
                            id="outlined-basic"
                            label="Add Sub Topics"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={subTopic}
                            onChange={(e) => {
                              setsubTopic(e.target.value);
                            }}
                          />
                        </FormControl>
                      </div>
                      <div className="col-3">
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ backgroundColor: "#4b2980" }}
                          onClick={() => {
                            let clone = Topicsfinal;
                            if (Topicsfinal[Topicsfinal.length - 2] == ":") {
                              clone = clone + subTopic + ". ";
                            } else {
                              clone = Topicsfinal.slice(0, -2);
                              clone = clone + "; " + subTopic + ". ";
                            }
                            setTopicsfinal(clone);
                            setsubTopic("");
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                    <FormControl fullWidth size="small">
                      <TextField
                        multiline
                        rows={3}
                        className="mb-4"
                        id="outlined-basic"
                        label="Topics"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={Topicsfinal}
                        onChange={(e) => {
                          setTopicsfinal(e.target.value);
                        }}
                      />
                    </FormControl>
                    <div className="row">
                      <div className="col">
                        <FormControl fullWidth size="small">
                          <TextField
                            className="mb-4"
                            id="outlined-basic"
                            label="Add Teaching Hours"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={teachingHours}
                            onChange={(e) => {
                              setteachingHours(e.target.value);
                            }}
                          />
                        </FormControl>
                      </div>
                    </div>
                    <div>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="medium"
                        style={{ backgroundColor: "#4b2980" }}
                        onClick={() => TopicsEdit()}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
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
                  var count = 0;
                  const clone = TopicRows.filter((obj) => {
                    if (row != obj) return obj;
                  });
                  clone.forEach((i) => {
                    count = count + 1;
                    i.Unit = count;
                  });
                  setTopicRows([...clone]);
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

  const TopicsEdit=()=>{
    var list = TopicRows.map((i)=>{
      if(i.Unit==uid){
        i.Topic=Topicsfinal
        i.TeachingHours=teachingHours  
      }
      return i 
    })
    setTopicRows([...list]);
    setuid("")
    setTopicsfinal("");
    setteachingHours("");
    setmainTopic("");
    setsubTopic("");    
    setOpenTopic(false);
  }
  const [whatis,setwhatis]=useState("")
  const [srid,setsrid]=useState("")
  const clocolumns = [
    {
      field: "sr",
      headerName: "Sr.#",
      width: "80",
    },
    {
      field: "Unit",
      headerName: "Unit#",
      width: "80",
    },
    {
      field: "CLO",
      headerName: "Course Learning Outcomes",
      width: "400",
    },
    {
      field: "BTL",
      headerName: "Bloom Taxonomy Learning Level",
      width: "200",
      valueGetter: (params) => {
        return params?.row?.BTL[0]?.BTL;
      },
    },
    {
      field: "So",
      headerName: "SO",
      width: "100",
      valueGetter: (params) => {
        var val = "";
        params?.row?.So?.forEach((e) => {
          val = val + e.Number + ",";
        });
        val = val.slice(0, -1);
        return val;
      },
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
                  setwhatis(row.LaborTheory)
                  setsrid(row.sr)                            
                  var arr=row.Unit.split("")
                  var arr2 = arr.filter((i)=>{
                    if(i!=","&&i!="-")return i
                  })                  
                  console.log("arr",arr)
                  console.log("arr2",arr2)
                  var obj =[]
                  arr2.forEach((i)=>{
                    obj.push({Unit:i})
                  })
                  console.log("obj",obj)
                  setunit(obj);
                  var array = row.CLO.split(" ")
                  setbtl(row.BTL[0]);
                  setdomain("");
                  setVerbs([]);                  
                  setVerb(array[0]);
                  setso(row.So);
                  array.shift()
                  setclo(array.join(" "));
                  handleOpenClo()
                }}
              >
                <AiFillEdit />
              </Button>
            </Tooltip>

            <Modal
              open={openClo}
              onClose={handleCloseClo}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Box mb={3} style={{ display: "flex", justifyContent: "end" }}>
                  <CloseIcon
                    onClick={handleCloseClo}
                    style={{ cursor: "pointer", color: "gray" }}
                  />
                </Box>
                <h4 className="mb-4">EDIT CLO MAPPING</h4>
                <form>
                  <div className="row">
                    <div className="col-5">
                      {/* ------------------------------------------------------------------------ */}
                      <FormControl fullWidth size="small">
                        <InputLabel id="taskType">Select Domain</InputLabel>
                        <Select
                          fullWidth
                          className="mb-4"
                          labelId="selectdegree"
                          id="selectdegree"
                          value={domain}
                          label="Select Domain"
                          onChange={(e) => {
                            setdomain(e.target.value);
                          }}
                        >
                          {DomainRow.map((i) => {
                            return (
                              <MenuItem value={i.Domain}>{i.Domain}</MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>

                    {/* ------------------------------------------------------------------------ */}
                    <div className="col-7">
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
                          Select BTL Level
                        </InputLabel>
                        <Select
                          className="mb-4"
                          id="outlined-basic"
                          label="Add BTL Level"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={btl}
                          onChange={(e) => {
                            setbtl(e.target.value);
                          }}
                        >
                          <MenuItem value={btl} selected disabled>{btl.BTL}</MenuItem>
                          {BTLRow.map((a) => {
                            return <MenuItem value={a}>{a.BTL}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </div>

                  <div className="row">
                    {/* ------------------------------------------------------------------------ */}
                    <div className="col-4">
                      <FormControl fullWidth size="small">
                        <InputLabel id="taskType">Select Verb</InputLabel>
                        <Select
                          fullWidth
                          className="mb-4"
                          value={Verb}
                          label="Select Verb"
                          onChange={(e) => setVerb(e.target.value)}
                        >
                          <MenuItem value={Verb} selected disabled>{Verb}</MenuItem>
                          {Verbs.map((i) => {
                            return <MenuItem value={i}>{i}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-8">
                      <FormControl fullWidth size="small">
                        <TextField
                          className="mb-4"
                          id="outlined-basic"
                          label="Add CLO"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={clo}
                          onChange={(e) => {
                            setclo(e.target.value);
                          }}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          multiple
                          fullWidth
                          variant="outlined"
                          id="tags-standard"
                          className="mb-4"
                          value={unit}
                          options={TopicRows}
                          size="small"
                          getOptionLabel={(option) => option.Unit}
                          defaultValue={null}
                          onChange={(e, val) => {
                            setunit(val);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Select Unit"
                              placeholder="Select Unit"
                            />
                          )}
                        />
                      </FormControl>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          multiple
                          fullWidth
                          variant="outlined"
                          id="tags-standard"
                          className="mb-4"
                          options={SORow}
                          size="small"
                          value={so}
                          getOptionLabel={(option) =>
                            option.Number + " " + option.SO
                          }
                          defaultValue={null}
                          onChange={(e, val) => {
                            setso(val);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Add SO"
                              placeholder="Add SO"
                            />
                          )}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="medium"
                      style={{ backgroundColor: "#4b2980" }}
                      onClick={() => CLOSEdit()}
                    >
                      Submit
                    </Button>
                  </div>
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
                  var count = 0;
                  const clone = CLORows.filter((obj) => {
                    if (row != obj) return obj;
                  });
                  const clone2 = TheoryCLORows.filter((obj) => {
                    if (row != obj) return obj;
                  });
                  const clone3 = LabCLORows.filter((obj) => {
                    if (row != obj) return obj;
                  });

                  clone.forEach((i) => {
                    count = count + 1;
                    var abc = i.sr;
                    i.sr = "CLO-" + count;
                    clone2.forEach((e) => {
                      if (e.sr == abc) {
                        e.sr = i.sr;
                      }
                    });
                    clone3.forEach((e) => {
                      if (e.sr == abc) {
                        e.sr = i.sr;
                      }
                    });
                  });
                  setCLORows([...clone]);
                  setTheoryCLORows([...clone2]);
                  setLabCLORows([...clone3]);
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

  const Topics = () => {
    var count = 0;
    const clone = [
      ...TopicRows,
      { Unit: "", Topic: Topicsfinal, TeachingHours: teachingHours },
    ];
    clone.forEach((i) => {
      count = count + 1;
      i.Unit = count;
    });
    setTopicsfinal("");
    setteachingHours("");
    setmainTopic("");
    setsubTopic("");
    setTopicRows([...clone]);
  };

  const CLOS = (str) => {
    var count = 0;
    var uns = "";
    var CLOO = Verb + " " + clo;
    unit.forEach((i) => {
      if (uns.length == 0) {
        uns = uns + i.Unit;
      } else if (uns.length == 1) {
        uns = uns + "-" + i.Unit;
      } else {
        var e = uns.slice(0, -2);
        uns = e + "-" + i.Unit;
      }
    });
    if (
      Verb != "" &&
      uns != "" &&
      clo != "" &&
      unit.length >= 1 &&
      so.length >= 1
    ) {
      const clone = [
        ...CLORows,
        {
          sr: "",
          LaborTheory: str,
          Unit: uns,
          CLO: CLOO,
          BTL: [btl],
          So: so,
          Quizzes: [],
          Assignment: [],
          Mid: "",
          Final: "",
          Project: "",
        },
      ];
      var abc = "";
      clone.forEach((i) => {
        count = count + 1;
        i.sr = "CLO-" + count;
        abc = "CLO-" + count;
      });

      if (str == "Lab") {
        var clone2 = [
          ...LabCLORows,
          {
            sr: abc,
            LaborTheory: str,
            Unit: uns,
            CLO: CLOO,
            BTL: [btl],
            So: so,
            Quizzes: [],
            Assignment: [],
            Mid: "",
            Final: "",
            Project: "",
          },
        ];
        setLabCLORows(clone2);
      } else {
        var clone2 = [
          ...TheoryCLORows,
          {
            sr: abc,
            LaborTheory: str,
            Unit: uns,
            CLO: CLOO,
            BTL: [btl],
            So: so,
            Quizzes: [],
            Assignment: [],
            Mid: "",
            Final: "",
            Project: "",
          },
        ];
        setTheoryCLORows(clone2);
      }

      setunit([]);
      setclo("");
      setbtl("");
      setdomain("");
      setVerbs([]);
      setVerb("");
      setso([]);
      setCLORows([...clone]);
    } else {
      alert("Missing Fields");
    }
  };
  
  const CLOSEdit = () => {
    var uns = "";
    var CLOO = Verb + " " + clo;
    unit.forEach((i) => {
      if (uns.length == 0) {
        uns = uns + i.Unit;
      } else if (uns.length == 1) {
        uns = uns + "-" + i.Unit;
      } else {
        var e = uns.slice(0, -2);
        uns = e + "-" + i.Unit;
      }
    });
    if (
      Verb != "" &&
      uns != "" &&
      clo != "" &&
      unit.length >= 1 &&
      so.length >= 1
    ) {
      const clone = CLORows.map((i) => {
        if(i.sr==srid){          
            i.sr= srid
            i.LaborTheory= whatis
            i.Unit= uns
            i.CLO= CLOO
            i.BTL= [btl]
            i.So= so
        }
        return i
      });
      if (whatis == "Lab") {
        var clone2 = LabCLORows.map((i) => {
          if(i.sr==srid){          
              i.sr= srid
              i.LaborTheory= whatis
              i.Unit= uns
              i.CLO= CLOO
              i.BTL= [btl]
              i.So= so
          }
          return i
        });
          
        setLabCLORows(clone2);
      } else {
        var clone2 = TheoryCLORows.map((i) => {
          if(i.sr==srid){          
              i.sr= srid
              i.LaborTheory= whatis
              i.Unit= uns
              i.CLO= CLOO
              i.BTL= [btl]
              i.So= so
          }
          return i
        });
        setTheoryCLORows(clone2);
      }
      setunit([]);
      setclo("");
      setbtl("");
      setdomain("");
      setVerbs([]);
      setVerb("");
      setso([]);
      setOpenClo(false)
      setCLORows([...clone]);
    } else {
      alert("Missing Fields");
    }
  };
  const onSubmithandler = async (e) => {
    e.preventDefault();
    console.log("\n\n\n\nFinal");
    console.log(TopicRows);
    console.log(CLORows);
    console.log(referenceBook);
    console.log(textBook);

    var col = [...TheoryCLORows, ...LabCLORows];
    await axios.post(
      "http://localhost:4000/CDFVerison/add",
      {
        Code: row.Code,
        Topics: TopicRows,
        CLOs: col,
        textBook,
        referenceBook,
      },
      { withCredentials: true }
    );
    delete row.CDF;
    delete row.Content;
    navigate(
      `/CAC/CDFCreation/${row.Code}`,
      { state: { row } },
      { replace: true }
    );
  };

  return (
    <>
      <div style={{ width: "100%", padding: 50 }}>
        <h1 className=" my-4 pb-4 ">
          <b>CREATE/EDIT COURSE DESCRIPTION FORM</b>
        </h1>
        <div
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: 1,
            marginBottom: 9,
          }}
        >
          <h5>Course Information</h5>
        </div>
        <div className="row">
          <div className="col">
            <h6>
              <b>Course Code: {row.Code.split("-")[0]}{row.Code.split("-")[1]}</b>
            </h6>
          </div>
          <div className="col">
            <h6 style={{ paddingBottom: 20, textAlign: "right" }}>
              <b>Course Title: {row.Name} </b>
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h6 style={{ paddingBottom: 35 }}>
              <b>
                Credit Hour:{" "}
                {row.Credit +
                  "(" +
                  row.LectureHoursWeek +
                  "," +
                  row.LabHoursWeek +
                  ")"}
              </b>
            </h6>
          </div>
          <div className="col">
            <h6 style={{ paddingBottom: 35, textAlign: "right" }}>
              <b>Lecture Hours/Week: {row.LectureHoursWeek} </b>
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h6 style={{ paddingBottom: 35 }}>
              <b>Lab Hours/Week: {row.LabHoursWeek}</b>
            </h6>
          </div>
          <div className="col">
            <h6 style={{ textAlign: "right" }}>
              <b>Pre-Requisite: {row.Content.PreRequisites}</b>
            </h6>
          </div>
        </div>
        <div>
          <div
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: 1,
              marginBottom: 9,
            }}
          >
            <h5>Catalogue Description:</h5>
          </div>
          <p>{row.Content.catalogue}</p>
        </div>
        <form onSubmit={onSubmithandler}>
          <div>
            <Card
              style={{
                backgroundColor: "#f5f5f5",
                marginTop: 25,

                padding: 25,
              }}
            >
              <div className="row">
                <div className="col">
                  <FormControl fullWidth size="small">
                    <TextField
                      style={{ backgroundColor: "#fff" }}
                      className="mb-4"
                      id="outlined-basic"
                      label="Add Main Topic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={mainTopic}
                      onChange={(e) => {
                        setmainTopic(e.target.value);
                      }}
                    />
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

                      var not = ["of","the","and","&","for","in","like"]
                      var dig = mainTopic.split(" ")
                      var dig2 = dig.map((i)=>{
                        if(!not.includes(i.toLowerCase())){
                          return i.charAt(0).toUpperCase()+i.slice(1)
                        }
                        else{
                          return i.toLowerCase()
                        }
                      })
                      var naam = dig2.join(" ")
                      const s = Topicsfinal + naam + ": ";
                      setTopicsfinal(s);
                      setmainTopic("");
                    }}
                  >
                    Add Main Topics
                  </Button>
                </div>
              </div>
              <div className="row">
                <div className="col-9">
                  <FormControl fullWidth size="small">
                    <TextField
                      style={{ backgroundColor: "#fff" }}
                      className="mb-4"
                      id="outlined-basic"
                      label="Add Sub Topics"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={subTopic}
                      onChange={(e) => {
                        setsubTopic(e.target.value);
                      }}
                    />
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
                      let clone = Topicsfinal;
                      if (Topicsfinal[Topicsfinal.length - 2] == ":") {
                        clone = clone + subTopic + ". ";
                      } else {
                        clone = Topicsfinal.slice(0, -2);
                        clone = clone + "; " + subTopic + ". ";
                      }
                      setTopicsfinal(clone);
                      setsubTopic("");
                    }}
                  >
                    Add Sub Topics
                  </Button>
                </div>
              </div>
              <FormControl fullWidth size="small">
                <TextField
                  style={{ backgroundColor: "#fff" }}
                  multiline
                  rows={3}
                  className="mb-4"
                  id="outlined-basic"
                  label="Topics"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={Topicsfinal}
                  onChange={(e) => {
                    setTopicsfinal(e.target.value);
                  }}
                />
              </FormControl>
              <div className="row">
                <div className="col">
                  <FormControl fullWidth size="small">
                    <TextField
                      style={{ backgroundColor: "#fff" }}
                      className="mb-4"
                      id="outlined-basic"
                      label="Add Teaching Hours"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={teachingHours}
                      onChange={(e) => {
                        setteachingHours(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>
              </div>
              <div>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="medium"
                  style={{ backgroundColor: "#4b2980" }}
                  onClick={() => Topics()}
                >
                  Submit
                </Button>
              </div>
            </Card>
          </div>
          <div
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: 1,
              marginBottom: 15,
              marginTop: 50,
            }}
          >
            <h5>Unit wise Major Topics:</h5>
          </div>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={TopicRows}
              columns={maintopicscolumns}
              getRowId={(Rows) => Rows.Unit}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </div>
          <h5 className="mt-4">Total Contact Hours</h5>

          <Card
            style={{
              backgroundColor: "#f5f5f5",
              marginTop: 25,

              padding: 25,
            }}
          >
            <div className="row">
              <div className="col-5">
                {/* ------------------------------------------------------------------------ */}
                <FormControl fullWidth size="small">
                  <InputLabel id="taskType">Select Domain</InputLabel>
                  <Select
                    style={{ backgroundColor: "#fff" }}
                    fullWidth
                    className="mb-4"
                    labelId="selectdegree"
                    id="selectdegree"
                    value={domain}
                    label="Select Domain"
                    onChange={(e) => {
                      setdomain(e.target.value);
                    }}
                  >
                    {DomainRow.map((i) => {
                      return <MenuItem value={i.Domain}>{i.Domain}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </div>

              {/* ------------------------------------------------------------------------ */}
              <div className="col-7">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Select BTL Level
                  </InputLabel>
                  <Select
                    style={{ backgroundColor: "#fff" }}
                    className="mb-4"
                    id="outlined-basic"
                    label="Add BTL Level"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={btl}
                    onChange={(e) => {
                      setbtl(e.target.value);
                    }}
                  >
                    {BTLRow.map((a) => {
                      return <MenuItem value={a}>{a.BTL}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="row">
              {/* ------------------------------------------------------------------------ */}
              <div className="col-3">
                <FormControl fullWidth size="small">
                  <InputLabel id="taskType">Select Verb</InputLabel>
                  <Select
                    style={{ backgroundColor: "#fff" }}
                    fullWidth
                    className="mb-4"
                    value={Verb}
                    label="Select Verb"
                    onChange={(e) => setVerb(e.target.value)}
                  >
                    {Verbs.map((i) => {
                      return <MenuItem value={i}>{i}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="col-9">
                <FormControl fullWidth size="small">
                  <TextField
                    style={{ backgroundColor: "#fff" }}
                    className="mb-4"
                    id="outlined-basic"
                    label="Add CLO"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={clo}
                    onChange={(e) => {
                      setclo(e.target.value);
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <FormControl fullWidth size="small">
                  <Autocomplete
                    style={{ backgroundColor: "#fff", marginBottom: 35 }}
                    multiple
                    fullWidth
                    variant="outlined"
                    id="tags-standard"
                    className="mb-4"
                    value={unit}
                    options={TopicRows}
                    size="small"
                    getOptionLabel={(option) => option.Unit}
                    defaultValue={null}
                    onChange={(e, val) => {
                      setunit(val);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select Unit"
                        placeholder="Select Unit"
                      />
                    )}
                  />
                </FormControl>
              </div>
            </div>
            {/* --------------------------------------------------------------------------------------------------- */}
            <div className="row">
              <div className="col">
                <FormControl fullWidth size="small">
                  <Autocomplete
                    style={{ backgroundColor: "#fff", marginBottom: 35 }}
                    multiple
                    fullWidth
                    variant="outlined"
                    id="tags-standard"
                    className="mb-4"
                    options={SORow}
                    size="small"
                    value={so}
                    getOptionLabel={(option) => option.Number + " " + option.SO}
                    defaultValue={null}
                    onChange={(e, val) => {
                      setso(val);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Add SO"
                        placeholder="Add SO"
                      />
                    )}
                  />
                </FormControl>
              </div>

              {/* <div className="col">
                <FormControl fullWidth size="small">
                  <TextField
                    className="mb-4"
                    id="outlined-basic"
                    label="Add SO"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={so}
                    onChange={(e) => {
                      setso(e.target.value);
                    }}
                  />
                </FormControl>
              </div> */}
            </div>
            <div>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="medium"
                style={{ backgroundColor: "#4b2980" }}
                onClick={() => CLOS("Theory")}
              >
                Submit
              </Button>
            </div>
          </Card>
          <div
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: 1,
              marginBottom: 15,
              marginTop: 50,
            }}
          >
            <h5>Mapping of CLOs and SOs:</h5>
          </div>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={TheoryCLORows}
              columns={clocolumns}
              getRowId={(Rows) => Rows.sr}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </div>
          <div
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: 1,
              marginBottom: 15,
              marginTop: 50,
            }}
          >
            <h5>CLO Assessment Mechanism</h5>
          </div>
          <div className=" table-responsive ">
            <table className="table  ">
              <thead>
                <tr>
                  <th className="col-1">Assessment Tools</th>
                  {TheoryCLORows.map((i) => {
                    return <th className="col-1">{i.sr}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                <tr className="col-1">
                  <td>Quizzes</td>
                  {TheoryCLORows.map((i, index) => {
                    return (
                      <th>
                        <Autocomplete
                          multiple
                          id="tags-standard"
                          value={i.Quizzes}
                          options={quizzes}
                          getOptionLabel={(option) => option.title}
                          onChange={(e, val) => {
                            const clone = [...TheoryCLORows];
                            clone[index].Quizzes = val;
                            setTheoryCLORows([...clone]);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              size="small"
                              label="Select Quiz"
                              placeholder="Select Quiz"
                            />
                          )}
                        />
                      </th>
                    );
                  })}
                </tr>
                <tr className="col-1">
                  <td>Assignments</td>
                  {TheoryCLORows.map((i, index) => {
                    return (
                      <th>
                        <Autocomplete
                          multiple
                          id="tags-standard"
                          value={i.Assignment}
                          options={assignments}
                          getOptionLabel={(option) => option.title}
                          onChange={(e, val) => {
                            const clone = [...TheoryCLORows];
                            clone[index].Assignment = val;
                            setTheoryCLORows([...clone]);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              size="small"
                              label="Select Assignment"
                              placeholder="Select Assignment"
                            />
                          )}
                        />
                      </th>
                    );
                  })}
                </tr>
                <tr>
                  <td>Midterm</td>
                  {TheoryCLORows.map((i, index) => {
                    return (
                      <th>
                        <FormControl fullWidth className="mt-4 mb-4 pb-3">
                          <InputLabel id="demo-simple-select-label">
                            MidTermExam
                          </InputLabel>
                          <Select
                            size="small"
                            value={i.Mid}
                            label="Select Mid Term Exam"
                            onChange={(e) => {
                              const clone = [...TheoryCLORows];
                              clone[index].Mid = e.target.value;
                              setTheoryCLORows([...clone]);
                            }}
                          >
                            <MenuItem value={"MidTermExam"}>
                              Mid Term Exam
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </th>
                    );
                  })}
                </tr>

                <td>Terminal</td>
                {TheoryCLORows.map((i, index) => {
                  return (
                    <th>
                      <FormControl fullWidth className="mt-4 mb-4 pb-3">
                        <InputLabel id="demo-simple-select-label">
                          Select Final Term Exam
                        </InputLabel>
                        <Select
                          size="small"
                          value={i.Final}
                          label="Select Final Term Exam"
                          onChange={(e) => {
                            const clone = [...TheoryCLORows];
                            clone[index].Final = e.target.value;
                            setTheoryCLORows([...clone]);
                          }}
                        >
                          <MenuItem value={"Final Term Exam"}>
                            Final Term Exam
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </th>
                  );
                })}
              </tbody>
            </table>
          </div>
          {row.LabHoursWeek > 0 && (
            <>
              <Card
                style={{
                  backgroundColor: "#f5f5f5",
                  marginTop: 25,

                  padding: 25,
                }}
              >
                <div className="row">
                  <div className="col-5">
                    {/* ------------------------------------------------------------------------ */}
                    <FormControl fullWidth size="small">
                      <InputLabel id="taskType">Select Domain</InputLabel>
                      <Select
                        style={{ backgroundColor: "#fff" }}
                        fullWidth
                        className="mb-4"
                        labelId="selectdegree"
                        id="selectdegree"
                        value={domain}
                        label="Select Domain"
                        onChange={(e) => {
                          setdomain(e.target.value);
                        }}
                      >
                        {DomainRow.map((i) => {
                          return (
                            <MenuItem value={i.Domain}>{i.Domain}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>

                  {/* ------------------------------------------------------------------------ */}
                  <div className="col-7">
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        Select BTL Level
                      </InputLabel>
                      <Select
                        style={{ backgroundColor: "#fff" }}
                        className="mb-4"
                        id="outlined-basic"
                        label="Add BTL Level"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={btl}
                        onChange={(e) => {
                          setbtl(e.target.value);
                        }}
                      >
                        {BTLRow.map((a) => {
                          return <MenuItem value={a}>{a.BTL}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="row">
                  {/* ------------------------------------------------------------------------ */}
                  <div className="col-3">
                    <FormControl fullWidth size="small">
                      <InputLabel id="taskType">Select Verb</InputLabel>
                      <Select
                        style={{ backgroundColor: "#fff" }}
                        fullWidth
                        className="mb-4"
                        value={Verb}
                        label="Select Verb"
                        onChange={(e) => setVerb(e.target.value)}
                      >
                        {Verbs.map((i) => {
                          return <MenuItem value={i}>{i}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-9">
                    <FormControl fullWidth size="small">
                      <TextField
                        style={{ backgroundColor: "#fff" }}
                        className="mb-4"
                        id="outlined-basic"
                        label="Add CLO"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={clo}
                        onChange={(e) => {
                          setclo(e.target.value);
                        }}
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <FormControl fullWidth size="small">
                      <Autocomplete
                        style={{ backgroundColor: "#fff", marginBottom: 35 }}
                        multiple
                        fullWidth
                        variant="outlined"
                        id="tags-standard"
                        className="mb-4"
                        value={unit}
                        options={TopicRows}
                        size="small"
                        getOptionLabel={(option) => option.Unit}
                        defaultValue={null}
                        onChange={(e, val) => {
                          setunit(val);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Select Unit"
                            placeholder="Select Unit"
                          />
                        )}
                      />
                    </FormControl>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <FormControl fullWidth size="small">
                      <Autocomplete
                        style={{ backgroundColor: "#fff", marginBottom: 35 }}
                        multiple
                        fullWidth
                        variant="outlined"
                        id="tags-standard"
                        className="mb-4"
                        options={SORow}
                        size="small"
                        value={so}
                        getOptionLabel={(option) =>
                          option.Number + " " + option.SO
                        }
                        defaultValue={null}
                        onChange={(e, val) => {
                          setso(val);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Add SO"
                            placeholder="Add SO"
                          />
                        )}
                      />
                    </FormControl>
                  </div>

                  {/* <div className="col">
                <FormControl fullWidth size="small">
                  <TextField
                    className="mb-4"
                    id="outlined-basic"
                    label="Add SO"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={so}
                    onChange={(e) => {
                      setso(e.target.value);
                    }}
                  />
                </FormControl>
              </div> */}
                </div>
                <div>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ backgroundColor: "#4b2980" }}
                    onClick={() => CLOS("Lab")}
                  >
                    Submit
                  </Button>
                </div>
              </Card>
              <div
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: 1,
                  marginBottom: 15,
                  marginTop: 50,
                }}
              >
                <h5>Mapping of CLOs and SOs:</h5>
              </div>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={LabCLORows}
                  columns={clocolumns}
                  getRowId={(Rows) => Rows.sr}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                />
              </div>
              <div
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: 1,
                  marginBottom: 15,
                  marginTop: 50,
                }}
              >
                <h5>CLO Assessment Mechanism</h5>
              </div>
              <div className=" table-responsive ">
                <table className="table  ">
                  <thead>
                    <tr>
                      <th className="col-1">Assessment Tools</th>
                      {LabCLORows.map((i) => {
                        return <th className="col-1">{i.sr}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="col-1">
                      <td>LAB Assignments</td>
                      {LabCLORows.map((i, index) => {
                        return (
                          <th>
                            <Autocomplete
                              multiple
                              id="tags-standard"
                              value={i.Assignment}
                              options={[{ title: "Lab Assignments" }]}
                              getOptionLabel={(option) => option.title}
                              onChange={(e, val) => {
                                const clone = [...LabCLORows];
                                clone[index].Assignment = val;
                                setLabCLORows([...clone]);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  size="small"
                                  label="Select Assignment"
                                  placeholder="Select Assignment"
                                />
                              )}
                            />
                          </th>
                        );
                      })}
                    </tr>
                    <tr>
                      <td>Project</td>
                      {LabCLORows.map((i, index) => {
                        return (
                          <th>
                            <FormControl fullWidth className="mt-4 mb-4 pb-3">
                              <InputLabel id="demo-simple-select-label">
                                Select Project
                              </InputLabel>
                              <Select
                                size="small"
                                value={i.Projects}
                                label="Select Project"
                                onChange={(e) => {
                                  const clone = [...LabCLORows];
                                  clone[index].Project = e.target.value;
                                  setLabCLORows([...clone]);
                                }}
                              >
                                <MenuItem value={"Project"}>Project</MenuItem>
                              </Select>
                            </FormControl>
                          </th>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
          <div
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: 1,
              marginBottom: 15,
              marginTop: 50,
            }}
          >
            <h5>Text and Reference Books</h5>
          </div>
          <div>
            <FormControl fullWidth className="mt-4 mb-4 pb-3">
              <Autocomplete
                style={{ marginBottom: 35 }}
                multiple
                fullWidth
                variant="outlined"
                id="tags-standard"
                className="mb-4"
                value={textBook}
                options={row.Content.Books}
                size="small"
                getOptionLabel={(option) => option.BookName}
                defaultValue={null}
                onChange={(e, val) => {
                  settextBook(val);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select Text Books"
                    placeholder="Select Text Books"
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth className="mb-4">
              <Autocomplete
                style={{ marginBottom: 35 }}
                multiple
                fullWidth
                variant="outlined"
                id="tags-standard"
                className="mb-4"
                value={referenceBook}
                options={row.Content.Books}
                size="small"
                getOptionLabel={(option) => option.BookName}
                defaultValue={null}
                onChange={(e, val) => {
                  setreferenceBook(val);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select Reference Books"
                    placeholder="Select Reference Books"
                  />
                )}
              />
            </FormControl>
          </div>
          <Button
            fullWidth
            className="my-4 mb-4"
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            style={{ backgroundColor: "#4b2980" }}
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
