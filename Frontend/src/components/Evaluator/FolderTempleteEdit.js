import {
  Button,
  Card,
  CardMedia,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGridColDef } from "@mui/x-data-grid";
import { Quiz } from "@mui/icons-material";
import Navigation from "./Navigation";

export default function FolderTemplete() {
  const [open, setOpen] = React.useState(true);
  axios.defaults.withCredentials = true;
  const location = useLocation().state;
  const [cdf, setcdf] = useState();
  const { id } = useParams();
  console.log("useParams", location);
  useEffect(() => {
    getcdf();
  }, []);
  const getcdf = async () => {
    const res = await axios.get(
      `http://localhost:4000/CDF/showOne/${location.data?.Program}/${location.data?.Course?.Code}`
    );
    console.log("CDF", res.data);
    setcdf(res.data);
  };
  var clo, title, btl;
  var cloa, titlea, btla;
  var clom, titlem, btlm;
  var clof, titlef, btlf;

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

  
  const addQuiz = (tit) => {
    setquiz((existingValues) => ({
      ...existingValues,
      clo_no: clo.sr,
      btl_no: btl,
      title: tit,
    }));

    axios.put(
      `http://localhost:4000/Folders/addEvaluation/${location.data?._id}`,
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
      `http://localhost:4000/Folders/addEvaluation/${location.data?._id}`,
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
      `http://localhost:4000/Folders/addEvaluation/${location.data?._id}`,
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
      `http://localhost:4000/Folders/editEvaluation/${location.data?._id}`,
      {
        Evaluation: true,
      }
    );
    alert("Course Evaluated");
  };
  const addfinal = (tit) => {
    setfinal((existingValues) => ({
      ...existingValues,
      clo_no: clof.sr,
      btl_no: btlf,
      title: tit,
    }));

    axios.put(
      `http://localhost:4000/Folders/addEvaluation/${location.data?._id}`,
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
  return (
    <div
      className="container-fluid"
      style={{
        height: 700,
        width: "100%",

        overflow: "hidden",
      }}
    >
      <div style={{ padding: 30, overflowY: "scroll", maxHeight: "80vh" }}>
        <div>
          <h1
            className="mb-4 pb-4"
            style={{
              padding: 10,
              backgroundColor: "#4b2980",
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            Lecture Delivery Record
          </h1>
          {location.data.LectureDeliveryRecord == null ? (
            <p>No Lecture Delivery Record</p>
          ) : (
            <div style={{ marginTop: 50 }}>
              <Card sx={{ maxWidth: "100%", marginTop: 0 }}>
                <h2
                  className="my-4 py-4"
                  style={{ textTransform: "uppercase" }}
                >
                  LectureDeliveryRecord
                </h2>
                <CardMedia
                  className="cardmedia"
                  component="iframe"
                  Height="1056px"
                  src={location.data.LectureDeliveryRecord.Base64.pdf}
                />
              </Card>
            </div>
          )}
        </div>
        {location.data.files.length > 0 &&
          location.data.files.map((i) => {
            var ind;

            if (i.Title.includes("Quiz") && cdf!=null) {
              cdf.CLOs.map((val) => {
                val.Quizzes.find((item, index) => {
                  if (item.title == i.Title) {
                    ind = val;
                    clo = val.sr;
                    btl = ind.BTL[0].BTL;
                    title = i.Title;
                  }
                });
              });
              var a=location.data.Evaluation.find((item)=>item.title==i.Title)
              if(a==undefined){
                setquiz({
                  title: i.Title,
                  clo_no: clo,
                  clo_correct: true,
                  btl_no: btl,
                  btl_correct: true,
                  Comments: "",
                  Feedback: "",
                })}
                else{
                setquiz({title:a?.title,
                  clo_no: a?.clo_no,
                  clo_correct: a?.clo_correct,
                  btl_no: a?.btl_no,
                  btl_correct: a?.btl_correct,
                  Comments: a?.Comments,
                  Feedback: a?.Feedback})
                }

              return (
                <div>
                  <div style={{ marginTop: 50 }}>
                    <h1
                      className="mb-4 pb-4"
                      style={{
                        padding: 10,
                        backgroundColor: "#4b2980",
                        color: "#fff",
                        textTransform: "uppercase",
                      }}
                    >
                      {i.Title}
                    </h1>
                    <Card sx={{ maxWidth: "100%", marginTop: 0 }}>
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
                        src={i.Question.Base64.pdf}
                      />
                    </Card>
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                        src={i.Solution.Base64.pdf}
                      />
                    </Card>
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                        src={i.Average.Base64.pdf}
                      />
                    </Card>
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                        src={i.Awardlist.Base64.pdf}
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
                      <div className="row ">
                        <div className="col">
                          <TextField
                            className="mb-4"
                            label="CLO NO iN CDF"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={a.clo_no}
                            defaultValue={(e) => {
                              setquiz((existingValues) => ({
                                ...existingValues,
                                clo_no:a.clo_no,
                              }));
                            }}
                            onChange={(e) => {
                              setquiz((existingValues) => ({
                                ...existingValues,
                                clo_no: a.clo_no,
                                title: i.Title,
                              }));
                            }}
                          />
                        </div>
                        <div className="col mb-4 pl-4 ml-4">
                          <FormControl>
                            <FormLabel>Is it have correct Mapping?</FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue={a.clo_correct}
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
                            value={a.btl_no}
                            defaultValue={(e) => {
                              setquiz((existingValues) => ({
                                ...existingValues,
                                btl_no: a.btl_no,
                              }));
                            }}
                            onChange={(e) => {
                              setquiz((existingValues) => ({
                                ...existingValues,
                                btl_no: a.btl_no,
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
                              defaultValue={a.btl_correct}
                              name="radio-buttons-group"
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
                          value={a.Comments}
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
                          value={a.Feedback}
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
          })
        }

        {location.data.files.length > 0 &&
          location.data.files.map((i) => {
            var ind;
            if (i.Title.includes("Assignment") && cdf!=null ) {
              cdf.CLOs.map((val) => {
                val.Assignment.find((item, index) => {
                  if (item.title == i.Title) {
                    ind = val;
                    cloa = val.sr;
                    btla = ind.BTL[0].BTL;
                    titlea = i.Title;
                  }
                });
              });
              var a=location.data.Evaluation.find((item)=>item?.title==i.Title)
              
              if(a==undefined){
                setassignment({
                  title: i.Title,
                  clo_no: cloa,
                  clo_correct: true,
                  btl_no: btla,
                  btl_correct: true,
                  Comments: "",
                  Feedback: "",
                })}
                else{
                setassignment({title:a?.title,
                  clo_no: a?.clo_no,
                  clo_correct: a?.clo_correct,
                  btl_no: a?.btl_no,
                  btl_correct: a?.btl_correct,
                  Comments: a?.Comments,
                  Feedback: a?.Feedback})
                }
              return (
                <div>
                  <div style={{ marginTop: 50 }}>
                    <h1
                      className="mb-4 pb-4"
                      style={{
                        padding: 10,
                        backgroundColor: "#4b2980",
                        color: "#fff",
                        textTransform: "uppercase",
                      }}
                    >
                      {i.Title}
                    </h1>
                    <Card sx={{ maxWidth: "100%", marginTop: 0 }}>
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
                        src={i.Question.Base64.pdf}
                      />
                    </Card>
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                        src={i.Solution.Base64.pdf}
                      />
                    </Card>
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                        src={i.Average.Base64.pdf}
                      />
                    </Card>
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                        src={i.Awardlist.Base64.pdf}
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
                      <div className="row ">
                        <div className="col">
                          <TextField
                            className="mb-4"
                            label="CLO NO iN CDF"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={a.clo_no}
                            defaultValue={(e) => {
                              setassignment((existingValues) => ({
                                ...existingValues,
                                clo_no: a.clo_no,
                              }));
                            }}
                            onChange={(e) => {
                              setassignment((existingValues) => ({
                                ...existingValues,
                                clo_no: a.clo_no,
                                title: i.Title,
                              }));
                            }}
                          />
                        </div>
                        <div className="col mb-4 pl-4 ml-4">
                          <FormControl>
                            <FormLabel>Is it have correct Mapping?</FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue={a.clo_correct}
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
                            value={a.btl_no}
                            defaultValue={(e) => {
                              setassignment((existingValues) => ({
                                ...existingValues,
                                btl_no: a.btl_no,
                              }));
                            }}
                            onChange={(e) => {
                              setassignment((existingValues) => ({
                                ...existingValues,
                                btl_no: a.btl_no,
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
                              defaultValue={a.btl_correct}
                              name="radio-buttons-group"
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
                          value={a.Comments}
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
                          value={a.Feedback}
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

        {location.data.files.length > 0 &&
          location.data.files.map((i) => {
            var ind;
            if (i.Title.includes("Terminal") && cdf!=null) {
              cdf.CLOs.map((val) => {
                if (val.Final.includes("Final") && cdf != null) {
                  ind = val;
                  clof = val.sr;
                  btlf = ind.BTL[0].BTL;
                  titlef = i.Title;
                }
              });
              var a=location.data.Evaluation.find((item)=>item.title==i.Title)
              if(a==undefined){
                setfinal({
                  title: i.Title,
                  clo_no: clof,
                  clo_correct: true,
                  btl_no:btlf,
                  btl_correct: true,
                  Comments: "",
                  Feedback: "",
                })
              }
              else{
                setfinal({title:a?.title,
                  clo_no: a?.clo_no,
                  clo_correct: a?.clo_correct,
                  btl_no: a?.btl_no,
                  btl_correct: a?.btl_correct,
                  Comments: a?.Comments,
                  Feedback: a?.Feedback})
              }
              
              return (
                <div>
                  <div style={{ marginTop: 50 }}>
                    <h1
                      className="mb-4 pb-4"
                      style={{
                        padding: 10,
                        backgroundColor: "#4b2980",
                        color: "#fff",
                        textTransform: "uppercase",
                      }}
                    >
                      {i.Title}
                    </h1>
                    <Card sx={{ maxWidth: "100%", marginTop: 0 }}>
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
                        src={i.Question.Base64.pdf}
                      />
                    </Card>
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                        src={i.Solution.Base64.pdf}
                      />
                    </Card>
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                        src={i.Average.Base64.pdf}
                      />
                    </Card>
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                        src={i.Awardlist.Base64.pdf}
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
                      <div className="row ">
                        <div className="col">
                          <TextField
                            className="mb-4"
                            label="CLO NO iN CDF"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={a.clo_no}
                            defaultValue={(e) => {
                              setfinal((existingValues) => ({
                                ...existingValues,
                                clo_no: a.clo_no,
                              }));
                            }}
                            onChange={(e) => {
                              setfinal((existingValues) => ({
                                ...existingValues,
                                clo_no: a.clo_no,
                                title: i.Title,
                              }));
                            }}
                          />
                        </div>
                        <div className="col mb-4 pl-4 ml-4">
                          <FormControl>
                            <FormLabel>Is it have correct Mapping?</FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue={a.clo_correct}
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
                            value={a.btl_no}
                            defaultValue={(e) => {
                              setfinal((existingValues) => ({
                                ...existingValues,
                                btl_no: a.btl_no,
                              }));
                            }}
                            onChange={(e) => {
                              setfinal((existingValues) => ({
                                ...existingValues,
                                btl_no: a.btl_no,
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
                              defaultValue={a.btl_correct}
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
                          value={a.Comments}
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
                          value={a.Feedback}
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
        {location.data.files.length > 0 &&
          location.data.files.map((i) => {
            var ind;
            if (
              i.Title.includes("Mid") ||
              (i.Title.includes("Sessional") && cdf!=null)
            ){
              cdf?.CLOs?.map((val) => {
                if (
                  val.Mid.includes("Mid") ||
                  (val.Mid.includes("Sessional") && cdf != null)
                ) {
                  ind = val;
                  clom = val.sr;
                  btlm = ind.BTL[0].BTL;
                  titlem = i.Title;
                }
              });
              var a=location.data.Evaluation.find((item)=>item.title==i.Title)
              if(a==undefined){
              setfinal({
                title: i.Title,
                clo_no: clom,
                clo_correct: true,
                btl_no: btlm,
                btl_correct: true,
                Comments: "",
                Feedback: "",
              })}
              else{
              setmid({title:a?.title,
                clo_no: a?.clo_no,
                clo_correct: a?.clo_correct,
                btl_no: a?.btl_no,
                btl_correct: a?.btl_correct,
                Comments: a?.Comments,
                Feedback: a?.Feedback})
              }
              return (
                <div>
                  <div style={{ marginTop: 50 }}>
                    <h1
                      className="mb-4 pb-4"
                      style={{
                        padding: 10,
                        backgroundColor: "#4b2980",
                        color: "#fff",
                        textTransform: "uppercase",
                      }}
                    >
                      {i.Title}
                    </h1>
                    <Card sx={{ maxWidth: "100%", marginTop: 0 }}>
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
                        src={i.Question.Base64.pdf}
                      />
                    </Card>
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                        src={i.Solution.Base64.pdf}
                      />
                    </Card>
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                        src={i.Average.Base64.pdf}
                      />
                    </Card>
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                    <Card sx={{ maxWidth: "100%", marginTop: 20 }}>
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
                        src={i.Awardlist.Base64.pdf}
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
                      <div className="row ">
                        <div className="col">
                          <TextField
                            className="mb-4"
                            label="CLO NO iN CDF"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={a.clo_no}
                            defaultValue={(e) => {
                              setmid((existingValues) => ({
                                ...existingValues,
                                clo_no: a.clo_no,
                              }));
                            }}
                            onChange={(e) => {
                              setmid((existingValues) => ({
                                ...existingValues,
                                clo_no: a.clo_no,
                                title: i.Title,
                              }));
                            }}
                          />
                        </div>
                        <div className="col mb-4 pl-4 ml-4">
                          <FormControl>
                            <FormLabel>Is it have correct Mapping?</FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue={a.clo_correct}
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
                            value={a.btl_no}
                            defaultValue={(e) => {
                              setmid((existingValues) => ({
                                ...existingValues,
                                btl_no: a.btl_no,
                              }));
                            }}
                            onChange={(e) => {
                              setmid((existingValues) => ({
                                ...existingValues,
                                btl_no: a.btl_no,
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
                              defaultValue={a.btl_correct}
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
                          value={a.Comments}
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
                          value={a.Feedback}
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

        <div>
          <h1
            className="mb-4 pb-4"
            style={{
              padding: 10,
              backgroundColor: "#4b2980",
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            Outcome Based Education
          </h1>
          {location.data.Obe == null ? (
            <p>no OBE</p>
          ) : (
            <Card sx={{ maxWidth: 824 }}>
              <CardMedia
                className="cardmedia"
                component="iframe"
                Height="1056px"
                src={location.data.Obe.pdf}
              />
            </Card>
          )}
          <div style={{ marginTop: 50 }}>
            <h3 className="mb-4 pb-4">ICEF</h3>
            {location.data.ICEF == null ? (
              <p>No ICEF</p>
            ) : (
              <Card sx={{ maxWidth: 824 }}>
                <CardMedia
                  className="cardmedia"
                  component="iframe"
                  Height="1056px"
                  src={location.data.ICEF.pdf}
                />
              </Card>
            )}
            <p>{}</p>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              type="submit"
              onClick={() => addEvaluationstatus()}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
