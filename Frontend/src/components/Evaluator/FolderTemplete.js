import {
  Button,
  Card,
  CardMedia,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Menu,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getGridColDef } from "@mui/x-data-grid";
import { Quiz } from "@mui/icons-material";
import Navigation from "./Navigation";
import { muiAbtn, muibtn } from "../style";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";

export default function FolderTemplete() {
  const [open, setOpen] = React.useState(true);
  axios.defaults.withCredentials = true;
  const location = useLocation().state;
  const [cdf, setcdf] = useState();
  const { id } = useParams();
  console.log("useParams", location);
  const [move, setmove] = useState("");
  const [evaluation,setevaluation]=useState([]);
  const handleClickScroll = async (section) => {
    const mov = await JSON.parse(localStorage.getItem("ref"));
    const element = document.getElementById(mov);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    getFolderData();
  }, []);
  const getcdf = async () => {
    console.log("ingetcdf");
    const res = await axios.get(
      `http://localhost:4000/CDF/showOne/${location.i?.Folder.Program}/${location.i?.Folder.Course.Code}`
    );
    console.log("CDF", res.data);
    setcdf(res.data);
  };
  var clo="", title, btl;
  var cloa="", titlea, btla;
  var clom="", titlem, btlm;
  var clof="", titlef, btlf;

  const [Folder, setFolder] = useState({
    files: [],
    ICEF: null,
    Obe: null,
    LectureDeliveryRecord: null,
  });
  const [quiz, setquiz] = useState({
    title: title,
    clo_no: clo,
    clo_correct: true,
    btl_no: btl,
    btl_correct: true,
    Comments: "",
    Feedback: "",
  });
  const [assignment, setassignment] = useState({
    title: titlea,
    clo_no: cloa,
    clo_correct: true,
    btl_no: btla,
    btl_correct: true,
    Comments: "",
    Feedback: "",
  });
  const [mid, setmid] = useState({
    title: titlem,
    clo_no: clom,
    clo_correct: true,
    btl_no: btlm,
    btl_correct: true,
    Comments: "",
    Feedback: "",
  });
  const [final, setfinal] = useState({
    title: titlef,
    clo_no: clof,
    clo_correct: true,
    btl_no: btlf,
    btl_correct: true,
    Comments: "",
    Feedback: "",
  });

  console.log("Folder: ", Folder);
  const getFolderData = async () => {
    console.log("id is here", id);
    const res = await axios.get(
      `http://localhost:4000/EvalFolders/showComp/${id}`
    );
    console.log(res.data);
    setFolder(res.data);
    setevaluation(res.data?.Evaluation)
    getcdf();
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const addQuiz = (tit) => {
    setquiz((existingValues) => ({
      ...existingValues,
      clo_no: clo.sr,
      btl_no: btl,
      title: tit,
    }));

    axios.put(
      `http://localhost:4000/Folders/addEvaluation/${location.i.Folder._id}`,
      {
        title: tit,
        data: quiz,
      }
    );

    setquiz({
      title: tit,
      clo_no: clo.sr,
      clo_correct: true,
      btl_no: btl,
      btl_correct: true,
      Comments: "",
      Feedback: "",
    });
  };
  const addAssignment = (tit) => {
    setassignment((existingValues) => ({
      ...existingValues,
      clo_no: cloa.sr,
      btl_no: btla,
      title: tit,
    }));

    axios.put(
      `http://localhost:4000/Folders/addEvaluation/${location.i.Folder._id}`,
      {
        title: tit,
        data: assignment,
      }
    );

    setassignment({
      title: tit,
      clo_no: cloa.sr,
      clo_correct: true,
      btl_no: btla,
      btl_correct: true,
      Comments: "",
      Feedback: "",
    });
  };
  const addmid = (tit) => {
    setmid((existingValues) => ({
      ...existingValues,
      clo_no: clom.sr,
      btl_no: btlm,
      title: tit,
    }));

    axios.put(
      `http://localhost:4000/Folders/addEvaluation/${location.i.Folder._id}`,
      {
        title: tit,
        data: mid,
      }
    );

    setmid({
      title: tit,
      clo_no: clom.sr,
      clo_correct: true,
      btl_no: btlm,
      btl_correct: true,
      Comments: "",
      Feedback: "",
    });
  };
  const addEvaluationstatus = () => {
    axios.put(
      `http://localhost:4000/Folders/editEvaluation/${location.i.Folder._id}`,
      {
        Evaluation: true,
      }
    );
    alert("Course Evaluated");
  };
  const addRevisionEvaluationstatus = () => {
    axios.put(
      `http://localhost:4000/Folders/editRevisionEvaluation/${location.i.Folder._id}`,
      {
        WantRevision: false,
        Revision: false,
      }
    );
    alert("Course Revision Evaluated");
  };

  const addRevisionstatus = () => {
    axios.put(
      `http://localhost:4000/Folders/editRevision/${location.i.Folder._id}`,
      {
        WantRevision: true,
      }
    );
    alert("Course Sent for Revision");
  };

  const addfinal = (tit) => {
    setfinal((existingValues) => ({
      ...existingValues,
      clo_no: clof.sr,
      btl_no: btlf,
      title: tit,
    }));

    axios.put(
      `http://localhost:4000/Folders/addEvaluation/${location.i.Folder._id}`,
      {
        title: tit,
        data: final,
      }
    );

    setfinal({
      title: tit,
      clo_no: clof.sr,
      clo_correct: true,
      btl_no: btlf,
      btl_correct: true,
      Comments: "",
      Feedback: "",
    });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openNav = Boolean(anchorEl);
  const handleClickNav = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseNav = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        // height: "700",
        width: "100%",
      }}
    >
      {console.log("cdds", Folder)}
      {Folder.Round1 == true || Folder.Round2 == true ? (
        <>
          <div>
            <Box
              style={{
                padding: 10,
                margin: "3%",
                position: "fixed",
                top: 10,
                backgroundColor: "#ffd700",
              }}
            >
              <IconButton
                size="large"
                id="basic-button"
                aria-controls={openNav ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openNav ? "true" : undefined}
                onClick={handleClickNav}
                style={{ backgroundColor: "#fff", color: "#4b2980" }}
              >
                <MenuIcon fontSize="inherit" />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openNav}
                onClose={handleCloseNav}
                style={{ overflow: "scroll" }}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Navigation
                  data={Folder}
                  handleClickScroll={handleClickScroll}
                />
              </Menu>
            </Box>
          </div>

          {Folder.files.length == 0 ? (
            <div>No Files Uploaded</div>
          ) : (
            <div style={{ padding: 30, marginTop: 90 }}>
              <div id="lecture">
                <h3
                  className="mb-4"
                  style={{
                    padding: 13,
                    backgroundColor: "#4b2980",
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                >
                  <b> Lecture Delivery Record </b>
                </h3>
                {Folder.LectureDeliveryRecord == null ? (
                  <p style={{ textAlign: "center" }}>
                    No Lecture Delivery Record
                  </p>
                ) : (
                  <div style={{ marginTop: 50 }}>
                    <Card sx={{ maxWidth: "100%", marginTop: 0 }}>
                      <h3
                        className="my-4 py-4"
                        style={{ textTransform: "uppercase" }}
                      >
                        Lecture Delivery Record
                      </h3>
                      <CardMedia
                        className="cardmedia"
                        component="iframe"
                        Height="1056px"
                        src={Folder.LectureDeliveryRecord?.pdf}
                      />
                    </Card>
                  </div>
                )}
              </div>
              {Folder.files.length > 0 &&
                Folder.files.map((i) => {
                  var ind;
                  const cloobj=evaluation.find((it)=>it.title==i.Title)
                  console.log("cloobj",cloobj)
                  //setquiz(cloobj)
                  if (i.Title.includes("Quiz") && cdf != null) {
                    cdf.CLOs.map((val) => {
                      val.Quizzes.find((item, index) => {
                        if (item.title == i.Title) {
                          ind = val;
                          clo = clo+val.sr;
                          btl = ind.BTL[0]?.BTL;
                          title = i.Title;
                        }
                      });
                    });
                    return (
                      <div>
                        <div style={{ marginTop: 50 }}>
                          <h3
                            className="mb-4"
                            style={{
                              padding: 13,
                              backgroundColor: "#4b2980",
                              color: "#fff",
                              textTransform: "uppercase",
                            }}
                          >
                            <b> {i.Title} </b>
                          </h3>
                          <Card
                            sx={{ maxWidth: "100%", marginTop: 0 }}
                            id={i.Title + "Question"}
                          >
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} Question Paper
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Question?.Base64?.pdf}
                            />
                          </Card>
                          <Card
                            sx={{ maxWidth: "100%", marginTop: 20 }}
                            id={i.Title + "Answer"}
                          >
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} Solution
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Solution.Base64?.pdf}
                            />
                          </Card>
                          <Card
                            sx={{ maxWidth: "100%", marginTop: 20 }}
                            id={i.Title + "Best"}
                          >
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} (Best)
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Best.Base64?.pdf}
                            />
                          </Card>
                          <Card
                            sx={{ maxWidth: "100%", marginTop: 20 }}
                            id={i.Title + "Average"}
                          >
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} (Average)
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Average.Base64?.pdf}
                            />
                          </Card>
                          <Card
                            sx={{ maxWidth: "100%", marginTop: 20 }}
                            id={i.Title + "Worst"}
                          >
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} (Worst)
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Worst.Base64?.pdf}
                            />
                          </Card>
                          <Card
                            sx={{ maxWidth: "100%", marginTop: 20 }}
                            id={i.Title + "Award"}
                          >
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} Award List
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Awardlist.Base64?.pdf}
                            />
                          </Card>
                          <div
                            style={{
                              backgroundColor: "#fff",
                              marginTop: 35,
                              marginBottom: 35,
                              padding: 35,
                              paddingBottom: 35,
                            }}
                          >
                            <h2 className="my-4 py-4">{i.Title} Evalution</h2>
                            <div className="row " id={i.Title + "Evaluation"}>
                              <div className="col">
                                <TextField
                                  className="mb-4"
                                  label="CLO NO iN CDF"
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  value={clo}
                                  defaultValue={(e) => {
                                    setquiz((existingValues) => ({
                                      ...existingValues,
                                      clo_no: clo,
                                    }));
                                  }}
                                  onChange={(e) => {
                                    setquiz((existingValues) => ({
                                      ...existingValues,
                                      clo_no: clo,
                                      title: i.Title,
                                    }));
                                  }}
                                />
                              </div>
                              <div className="col mb-4 pl-4 ml-4">
                                <FormControl>
                                  <FormLabel>
                                    Is it have correct Mapping?
                                  </FormLabel>
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={cloobj?.clo_correct}
                                    defaultChecked={cloobj?.clo_correct}
                                    name="radio-buttons-group"
                                    onChange={(e) => {
                                      setquiz((existingValues) => ({
                                        ...existingValues,
                                        clo_correct: e.target.value,
                                        title: i.Title,
                                      }));
                                    }}
                                  >
                                    <FormControlLabel
                                      value={true}
                                      control={<Radio size="small" />}
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      value={false}
                                      control={<Radio size="small" />}
                                      label="No"
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <TextField
                                  className="mb-4"
                                  label="BTL LEVEL iN CDF"
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  value={btl}
                                  defaultValue={(e) => {
                                    setquiz((existingValues) => ({
                                      ...existingValues,
                                      btl_no: btl,
                                    }));
                                  }}
                                  onChange={(e) => {
                                    setquiz((existingValues) => ({
                                      ...existingValues,
                                      btl_no: btl,
                                    }));
                                  }}
                                />
                              </div>
                              <div className="col mb-4">
                                <FormControl>
                                  <FormLabel>
                                    Is it have correct BTL Level ?
                                  </FormLabel>
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    defaultValue={cloobj?.btl_correct}
                                    defaultChecked={cloobj?.btl_correct}
                                    onChange={(e) => {
                                      setquiz((existingValues) => ({
                                        ...existingValues,
                                        btl_correct: e.target.value,
                                      }));
                                    }}
                                  >
                                    <FormControlLabel
                                      value={true}
                                      control={<Radio size="small" />}
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      value={false}
                                      control={<Radio size="small" />}
                                      label="No"
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </div>
                            </div>
                            <div>
                              <TextField
                                multiline={true}
                                rows={2}
                                label="Other Comments:"
                                className="mb-4"
                                variant="outlined"
                                size="small"
                                fullWidth
                                placeholder={cloobj?.Comments}
                                defaultValue={cloobj?.Comments}

                                value={quiz?.Comments}
                                onChange={(e) => {
                                  setquiz((existingValues) => ({
                                    ...existingValues,
                                    Comments: e.target.value,
                                  }));
                                }}
                              />
                              <TextField
                                multiline={true}
                                rows={3}
                                label="Feedback:"
                                className="mb-4"
                                variant="outlined"
                                size="small"
                                fullWidth
                                placeholder={cloobj?.Feedback}
                                defaultValue={cloobj?.Feedback}

                                value={quiz?.Feedback}
                                onChange={(e) => {
                                  setquiz((existingValues) => ({
                                    ...existingValues,
                                    Feedback: e.target.value,
                                  }));
                                }}
                              />
                              <Button
                                style={{ float: "right" }}
                                variant="contained"
                                color="primary"
                                size="small"
                                type="submit"
                                onClick={() => addQuiz(i.Title)}
                              >
                                Submit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}

              {Folder.files?.length > 0 &&
                Folder.files?.map((i) => {
                  const cloobj=evaluation.find((it)=>it.title==i.Title)
                  var ind;
                  if (i.Title.includes("Assignment") && cdf != null) {
                    cdf.CLOs.map((val) => {
                      val.Assignment?.find((item, index) => {
                        if (item.title == i.Title) {
                          ind = val;
                          cloa = cloa+val.sr;
                          btla = ind.BTL[0]?.BTL;
                          titlea = i.Title;
                        }
                      });
                    });
                    return (
                      <div>
                        <div style={{ marginTop: 50 }}>
                          <h3
                            className="mb-4"
                            style={{
                              padding: 13,
                              backgroundColor: "#4b2980",
                              color: "#fff",
                              textTransform: "uppercase",
                            }}
                          >
                            <b> {i.Title} </b>
                          </h3>
                          <Card
                            sx={{ maxWidth: "100%", marginTop: 0 }}
                            id={i.Title + "Question"}
                          >
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} Question Paper
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Question.Base64?.pdf}
                            />
                          </Card>
                          <Card
                            sx={{ maxWidth: "100%", marginTop: 20 }}
                            id={i.Title + "Answer"}
                          >
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} Solution
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Solution.Base64?.pdf}
                            />
                          </Card>
                          <Card
                            sx={{ maxWidth: "100%", marginTop: 20 }}
                            id={i.Title + "Best"}
                          >
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} (Best)
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Best.Base64?.pdf}
                            />
                          </Card>
                          <Card
                            sx={{ maxWidth: "100%", marginTop: 20 }}
                            id={i.Title + "Average"}
                          >
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} (Average)
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Average.Base64?.pdf}
                            />
                          </Card>
                          <Card
                            sx={{ maxWidth: "100%", marginTop: 20 }}
                            id={i.Title + "Worst"}
                          >
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} (Worst)
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Worst.Base64?.pdf}
                            />
                          </Card>
                          <Card
                            sx={{ maxWidth: "100%", marginTop: 20 }}
                            id={i.Title + "Award"}
                          >
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} Award List
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Awardlist.Base64?.pdf}
                            />
                          </Card>
                          <div
                            style={{
                              backgroundColor: "#fff",
                              marginTop: 35,
                              marginBottom: 35,
                              padding: 35,
                              paddingBottom: 35,
                            }}
                          >
                            <h2 className="my-4 py-4">{i.Title} Evalution</h2>
                            <div className="row " id={i.Title + "Evaluation"}>
                              <div className="col">
                                <TextField
                                  className="mb-4"
                                  label="CLO NO iN CDF"
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  value={cloa}
                                  defaultValue={(e) => {
                                    setassignment((existingValues) => ({
                                      ...existingValues,
                                      clo_no: cloa,
                                    }));
                                  }}
                                  onChange={(e) => {
                                    setassignment((existingValues) => ({
                                      ...existingValues,
                                      clo_no: cloa,
                                      title: i.Title,
                                    }));
                                  }}
                                />
                              </div>
                              <div className="col mb-4 pl-4 ml-4">
                                <FormControl>
                                  <FormLabel>
                                    Is it have correct Mapping?
                                  </FormLabel>
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={cloobj?.clo_correct}
                                    defaultChecked={cloobj?.clo_correct}
                                    name="radio-buttons-group"
                                    onChange={(e) => {
                                      setassignment((existingValues) => ({
                                        ...existingValues,
                                        clo_correct: e.target.value,
                                        title: i.Title,
                                      }));
                                    }}
                                  >
                                    <FormControlLabel
                                      value={true}
                                      control={<Radio size="small" />}
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      value={false}
                                      control={<Radio size="small" />}
                                      label="No"
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <TextField
                                  className="mb-4"
                                  label="BTL LEVEL iN CDF"
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  value={btla}
                                  defaultValue={(e) => {
                                    setassignment((existingValues) => ({
                                      ...existingValues,
                                      btl_no: btla,
                                    }));
                                  }}
                                  onChange={(e) => {
                                    setassignment((existingValues) => ({
                                      ...existingValues,
                                      btl_no: btla,
                                    }));
                                  }}
                                />
                              </div>
                              <div className="col mb-4">
                                <FormControl>
                                  <FormLabel>
                                    Is it have correct BTL Level ?
                                  </FormLabel>
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={cloobj?.btl_correct}
                                    defaultChecked={cloobj?.btl_correct}                                    name="radio-buttons-group"
                                    onChange={(e) => {
                                      setassignment((existingValues) => ({
                                        ...existingValues,
                                        btl_correct: e.target.value,
                                      }));
                                    }}
                                  >
                                    <FormControlLabel
                                      value={true}
                                      control={<Radio size="small" />}
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      value={false}
                                      control={<Radio size="small" />}
                                      label="No"
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </div>
                            </div>
                            <div>
                              <TextField
                                multiline={true}
                                rows={2}
                                label="Other Comments:"
                                className="mb-4"
                                variant="outlined"
                                size="small"
                                fullWidth
                                placeholder={cloobj?.Comments}
                                defaultValue={cloobj?.Comments}

                                value={assignment?.Comments}
                                onChange={(e) => {
                                  setassignment((existingValues) => ({
                                    ...existingValues,
                                    Comments: e.target.value,
                                  }));
                                }}
                              />
                              <TextField
                                multiline={true}
                                rows={3}
                                label="Feedback:"
                                className="mb-4"
                                variant="outlined"
                                size="small"
                                fullWidth
                                placeholder={cloobj?.Feedback}
                                defaultValue={cloobj?.Feedback}
                                value={assignment?.Feedback}
                                onChange={(e) => {
                                  setassignment((existingValues) => ({
                                    ...existingValues,
                                    Feedback: e.target.value,
                                  }));
                                }}
                              />
                              <Button
                                style={{ float: "right" }}
                                variant="contained"
                                color="primary"
                                size="small"
                                type="submit"
                                onClick={() => addAssignment(i.Title)}
                              >
                                Submit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}

              {Folder.files?.length > 0 &&
                Folder.files?.map((i) => {
                  var ind;
                  const cloobj=evaluation.find((it)=>it.title==i.Title)

                  if (i.Title.includes("Terminal") && cdf != null) {
                    cdf.CLOs.map((val) => {
                      if (val.Final.includes("Final") && cdf != null) {
                        ind = val;
                        clof = clof+val.sr;
                        btlf = ind.BTL[0]?.BTL;
                        titlef = i.Title;
                      }
                    });
                    return (
                      <div>
                        <div style={{ marginTop: 50 }} id={"Terminal"}>
                          <h3
                            className="mb-4"
                            style={{
                              padding: 13,
                              backgroundColor: "#4b2980",
                              color: "#fff",
                              textTransform: "uppercase",
                            }}
                          >
                            <b> {i.Title} </b>
                          </h3>
                          <Card sx={{ maxWidth: "100%", marginTop: 0 }}                            
                          id={i.Title + "Question"}>
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} Question Paper
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Question.Base64?.pdf}
                            />
                          </Card>
                          <Card sx={{ maxWidth: "100%", marginTop: 20 }}
                          id={i.Title + "Answer"}>
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} Solution
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Solution.Base64?.pdf}
                            />
                          </Card>
                          <Card sx={{ maxWidth: "100%", marginTop: 20 }}
                          id={i.Title + "Best"}>
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} (Best)
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Best.Base64.pdf}
                            />
                          </Card>
                          <Card sx={{ maxWidth: "100%", marginTop: 20 }}
                          id={i.Title + "Average"}>
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} (Average)
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Average.Base64?.pdf}
                            />
                          </Card>
                          <Card sx={{ maxWidth: "100%", marginTop: 20 }}
                          id={i.Title + "Worst"}>
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} (Worst)
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Worst.Base64.pdf}
                            />
                          </Card>
                          <Card sx={{ maxWidth: "100%", marginTop: 20 }}
                          id={i.Title + "Award"}>
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} Award List
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Awardlist.Base64?.pdf}
                            />
                          </Card>
                          <div
                            style={{
                              backgroundColor: "#fff",
                              marginTop: 35,
                              marginBottom: 35,
                              padding: 35,
                              paddingBottom: 35,
                            }}
                            id={i.Title + "Evaluation"}
                          >
                            <h2 className="my-4 py-4">{i.Title} Evalution</h2>
                            <div className="row ">
                              <div className="col">
                                <TextField
                                  className="mb-4"
                                  label="CLO NO iN CDF"
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  value={clof}
                                  defaultValue={(e) => {
                                    setfinal((existingValues) => ({
                                      ...existingValues,
                                      clo_no: clof,
                                    }));
                                  }}
                                  onChange={(e) => {
                                    setfinal((existingValues) => ({
                                      ...existingValues,
                                      clo_no: clof,
                                      title: i.Title,
                                    }));
                                  }}
                                />
                              </div>
                              <div className="col mb-4 pl-4 ml-4">
                                <FormControl>
                                  <FormLabel>
                                    Is it have correct Mapping?
                                  </FormLabel>
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={cloobj?.clo_correct}
                                    defaultChecked={cloobj?.clo_correct}
                                    name="radio-buttons-group"
                                    onChange={(e) => {
                                      setfinal((existingValues) => ({
                                        ...existingValues,
                                        clo_correct: e.target.value,
                                        title: i.Title,
                                      }));
                                    }}
                                  >
                                    <FormControlLabel
                                      value={true}
                                      control={<Radio size="small" />}
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      value={false}
                                      control={<Radio size="small" />}
                                      label="No"
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <TextField
                                  className="mb-4"
                                  label="BTL LEVEL iN CDF"
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  value={btlf}
                                  defaultValue={(e) => {
                                    setfinal((existingValues) => ({
                                      ...existingValues,
                                      btl_no: btlf,
                                    }));
                                  }}
                                  onChange={(e) => {
                                    setfinal((existingValues) => ({
                                      ...existingValues,
                                      btl_no: btlf,
                                    }));
                                  }}
                                />
                              </div>
                              <div className="col mb-4">
                                <FormControl>
                                  <FormLabel>
                                    Is it have correct BTL Level ?
                                  </FormLabel>
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={cloobj?.btl_correct}
                                    defaultChecked={cloobj?.btl_correct}
                                    name="radio-buttons-group"
                                    onChange={(e) => {
                                      setfinal((existingValues) => ({
                                        ...existingValues,
                                        btl_correct: e.target.value,
                                      }));
                                    }}
                                  >
                                    <FormControlLabel
                                      value={true}
                                      control={<Radio size="small" />}
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      value={false}
                                      control={<Radio size="small" />}
                                      label="No"
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </div>
                            </div>
                            <div>
                              <TextField
                                multiline={true}
                                rows={2}
                                label="Other Comments:"
                                className="mb-4"
                                variant="outlined"
                                size="small"
                                fullWidth
                                placeholder={cloobj?.Comments}
                                defaultValue={cloobj?.Comments}

                                value={final?.Comments}
                                onChange={(e) => {
                                  setfinal((existingValues) => ({
                                    ...existingValues,
                                    Comments: e.target.value,
                                  }));
                                }}
                              />
                              <TextField
                                multiline={true}
                                rows={3}
                                label="Feedback:"
                                className="mb-4"
                                variant="outlined"
                                size="small"
                                fullWidth
                                placeholder={cloobj?.Feedback}
                                defaultValue={cloobj?.Feedback}
                                value={final?.Feedback}
                                onChange={(e) => {
                                  setfinal((existingValues) => ({
                                    ...existingValues,
                                    Feedback: e.target.value,
                                  }));
                                }}
                              />
                              <Button
                                style={{ float: "right" }}
                                variant="contained"
                                color="primary"
                                size="small"
                                type="submit"
                                onClick={() => addfinal(i.Title)}
                              >
                                Submit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              {Folder.files.length > 0 &&
                Folder.files.map((i) => {
                  var ind;
                  if (
                    i.Title.includes("Mid") ||
                    (i.Title.includes("Sessional") && cdf != null)
                  ) {
                    const cloobj=evaluation.find((it)=>it.title==i.Title)

                    cdf?.CLOs?.map((val) => {
                      if (
                        val.Mid.includes("Mid") ||
                        (val.Mid.includes("Sessional") && cdf != null)
                      ) {
                        ind = val;
                        clom = clom+val.sr;
                        btlm = ind.BTL[0]?.BTL;
                        titlem = i.Title;
                      }
                    });
                    return (
                      <div>
                        <div style={{ marginTop: 50 }} id={"Mid"}>
                          <h3
                            className="mb-4"
                            style={{
                              padding: 13,
                              backgroundColor: "#4b2980",
                              color: "#fff",
                              textTransform: "uppercase",
                            }}
                          >
                            {i.Title}
                          </h3>
                          <Card sx={{ maxWidth: "100%", marginTop: 0 }}                             
                          id={i.Title + "Question"}>
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} Question Paper
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Question.Base64?.pdf}
                            />
                          </Card>
                          <Card sx={{ maxWidth: "100%", marginTop: 20 }}
                          id={i.Title + "Answer"}>
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} Solution
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Solution.Base64?.pdf}
                            />
                          </Card>
                          <Card sx={{ maxWidth: "100%", marginTop: 20 }}
                          id={i.Title + "Best"}>
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} (Best)
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Best.Base64?.pdf}
                            />
                          </Card>
                          <Card sx={{ maxWidth: "100%", marginTop: 20 }}
                          id={i.Title + "Average"}>
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} (Average)
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Average.Base64?.pdf}
                            />
                          </Card>
                          <Card sx={{ maxWidth: "100%", marginTop: 20 }}
                          id={i.Title + "Worst"}>
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} (Worst)
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Worst.Base64?.pdf}
                            />
                          </Card>
                          <Card sx={{ maxWidth: "100%", marginTop: 20 }}
                          id={i.Title + "Award"}>
                            <h2
                              className="my-4 py-4"
                              style={{ textTransform: "uppercase" }}
                            >
                              {i.Title} Award List
                            </h2>
                            <CardMedia
                              className="cardmedia"
                              component="iframe"
                              Height="1056px"
                              src={i.Awardlist.Base64?.pdf}
                            />
                          </Card>
                          <div
                            style={{
                              backgroundColor: "#fff",
                              marginTop: 35,
                              marginBottom: 35,
                              padding: 35,
                              paddingBottom: 35,
                            }}
                            id={i.Title + "Evaluation"}
                          >
                            <h2 className="my-4 py-4" >{i.Title} Evalution</h2>
                            <div className="row ">
                              <div className="col">
                                <TextField
                                  className="mb-4"
                                  label="CLO NO iN CDF"
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  value={clom}
                                  defaultValue={(e) => {
                                    setmid((existingValues) => ({
                                      ...existingValues,
                                      clo_no: clom,
                                    }));
                                  }}
                                  onChange={(e) => {
                                    setmid((existingValues) => ({
                                      ...existingValues,
                                      clo_no: clom,
                                      title: i.Title,
                                    }));
                                  }}
                                />
                              </div>
                              <div className="col mb-4 pl-4 ml-4">
                                <FormControl>
                                  <FormLabel>
                                    Is it have correct Mapping?
                                  </FormLabel>
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={cloobj?.clo_correct}
                                    defaultChecked={cloobj?.clo_correct}
                                    name="radio-buttons-group"
                                    onChange={(e) => {
                                      setmid((existingValues) => ({
                                        ...existingValues,
                                        clo_correct: e.target.value,
                                        title: i.Title,
                                      }));
                                    }}
                                  >
                                    <FormControlLabel
                                      value={true}
                                      control={<Radio size="small" />}
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      value={false}
                                      control={<Radio size="small" />}
                                      label="No"
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <TextField
                                  className="mb-4"
                                  label="BTL LEVEL iN CDF"
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  value={btlm}
                                  defaultValue={(e) => {
                                    setmid((existingValues) => ({
                                      ...existingValues,
                                      btl_no: btlm,
                                    }));
                                  }}
                                  onChange={(e) => {
                                    setmid((existingValues) => ({
                                      ...existingValues,
                                      btl_no: btlm,
                                    }));
                                  }}
                                />
                              </div>
                              <div className="col mb-4">
                                <FormControl>
                                  <FormLabel>
                                    Is it have correct BTL Level ?
                                  </FormLabel>
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={cloobj?.btl_correct}
                                    defaultChecked={cloobj?.btl_correct}
                                    name="radio-buttons-group"
                                    onChange={(e) => {
                                      setmid((existingValues) => ({
                                        ...existingValues,
                                        btl_correct: e.target.value,
                                      }));
                                    }}
                                  >
                                    <FormControlLabel
                                      value={true}
                                      control={<Radio size="small" />}
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      value={false}
                                      control={<Radio size="small" />}
                                      label="No"
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </div>
                            </div>
                            <div>
                              <TextField
                                multiline={true}
                                rows={2}
                                label="Other Comments:"
                                className="mb-4"
                                variant="outlined"
                                size="small"
                                fullWidth
                                defaultValue={cloobj?.Comments}
                                placeholder={cloobj?.Comments}
                                value={mid.Comments}
                                onChange={(e) => {
                                  setmid((existingValues) => ({
                                    ...existingValues,
                                    Comments: e.target.value,
                                  }));
                                }}
                              />
                              <TextField
                                multiline={true}
                                rows={3}
                                label="Feedback:"
                                className="mb-4"
                                variant="outlined"
                                size="small"
                                fullWidth
                                defaultValue={cloobj?.Feedback}
                                placeholder={cloobj?.Feedback}
                                value={mid.Feedback}
                                onChange={(e) => {
                                  setmid((existingValues) => ({
                                    ...existingValues,
                                    Feedback: e.target.value,
                                  }));
                                }}
                              />
                              <Button
                                style={{ float: "right" }}
                                variant="contained"
                                color="primary"
                                size="small"
                                type="submit"
                                onClick={() => addmid(i.Title)}
                              >
                                Submit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}

              <div id={"Obe"}>
                <h3
                  className="mb-4 "
                  style={{
                    padding: 13,
                    backgroundColor: "#4b2980",
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                >
                  Outcome Based Education
                </h3>
                {Folder.Obe == null ? (
                  <p>no OBE</p>
                ) : (
                  <Card sx={{ maxWidth: 824 }}>
                    <CardMedia
                      className="cardmedia"
                      component="iframe"
                      Height="1056px"
                      src={Folder.Obe?.pdf}
                    />
                  </Card>
                )}
                <div style={{ marginTop: 50 }}>
                  <h3 className="mb-4 pb-4">ICEF</h3>
                  {Folder.ICEF == null ? (
                    <p>No ICEF</p>
                  ) : (
                    <Card sx={{ maxWidth: 824 }}>
                      <CardMedia
                        className="cardmedia"
                        component="iframe"
                        Height="1056px"
                        src={Folder.ICEF?.pdf}
                      />
                    </Card>
                  )}
                  <p>{}</p>

                  <div className="row">
                    <div className="col-6">
                      {Folder.Revision == true ? (
                        <Button
                          className="my-4 "
                          variant="contained"
                          color="primary"
                          fullWidth
                          size="large"
                          type="submit"
                          onClick={() => addRevisionEvaluationstatus()}
                          style={muiAbtn}
                        >
                          Evaluate Revision
                        </Button>
                      ) : (
                        <Button
                          className="my-4 "
                          variant="contained"
                          color="primary"
                          fullWidth
                          size="large"
                          type="submit"
                          onClick={() => addEvaluationstatus()}
                          style={muiAbtn}
                        >
                          Evaluate Folder
                        </Button>
                      )}
                    </div>
                    <div className="col-6">
                      <Button
                        className="my-4 "
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        onClick={() => addRevisionstatus()}
                        style={muiAbtn}
                      >
                        Send Folder For Revision
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          style={{ minHeight: "100vh" }}
          className="d-flex align-items-center justify-content-center"
        >
          <h4>No Submission done yet!!</h4>
        </div>
      )}
    </div>
  );
}
