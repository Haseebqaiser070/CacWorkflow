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
import { Paper, Typography } from "@mui/material";

import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGridColDef } from "@mui/x-data-grid";
import { Quiz } from "@mui/icons-material";

export default function ReturnedFolder({ route }) {
  const [open, setOpen] = React.useState(true);
  axios.defaults.withCredentials = true;
  const { state } = useLocation();
  const [cdf, setcdf] = useState();
  const { id } = useParams();
  console.log("useParams", state);
  useEffect(() => {
    getcdf();
  }, []);
  const getcdf = async () => {
    console.log("ingetcdf");
    const res = await axios.get(
      `http://localhost:4000/CDF/showOne/${location.i?.Folder.Program}/${location.i?.Folder.Course.Code}`
    );
    console.log("CDF", res.data);
    setcdf(res.data);
  };

  const [Folder, setFolder] = useState({
    files: [],
    ICEF: null,
    Obe: null,
    LectureDeliveryRecord: null,
  });

  return (
    <>
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
          </div>
          {state.data.files.length > 0 &&
            state.data.files.map((i) => {
              var ind;

              if (i.Title.includes("Quiz")) {
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
                    </div>
                  </div>
                );
              }
            })}

          {state.data.files.length > 0 &&
            state.data.files.map((i) => {
              var ind;
              if (i.Title.includes("Assignment")) {
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
                    </div>
                  </div>
                );
              }
            })}

          {state.data.files.length > 0 &&
            state.data.files.map((i) => {
              var ind;
              if (i.Title.includes("Terminal")) {
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
                    </div>
                  </div>
                );
              }
            })}
          {state.data.files.length > 0 &&
            state.data.files.map((i) => {
              var ind;
              if (i.Title.includes("Mid") || i.Title.includes("Sessional")) {
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
                    </div>
                  </div>
                );
              }
            })}

          <div>
            <h1
              style={{
                backgroundColor: "#2ac0dc",
                paddingTop: "30%",
                paddingBottom: "30%",
              }}
            >
              Outcome Based Education
            </h1>
            {state.data.Obe == null ? (
              <p>no OBE</p>
            ) : (
              <Card sx={{ maxWidth: 824 }}>
                <CardMedia
                  className="cardmedia"
                  component="iframe"
                  Height="1056px"
                  src={state.data.Obe.pdf}
                />
              </Card>
            )}
            <div style={{ marginTop: 50 }}>
              <h3 className="mb-4 pb-4">ICEF</h3>
              {state.data.ICEF == null ? (
                <p>No ICEF</p>
              ) : (
                <Card sx={{ maxWidth: 824 }}>
                  <CardMedia
                    className="cardmedia"
                    component="iframe"
                    Height="1056px"
                    src={state.data.ICEF.pdf}
                  />
                </Card>
              )}
              <p>{}</p>
            </div>
          </div>

          <Paper
            variant="outlined"
            elevation={3}
            style={{
              display: "grid",
              placeItems: "center",
              // placeContent: "center",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                color: "darkblue",
                fontWeight: "bold",
                fontSize: 24,
                marginTop: 20,
              }}
            >
              Evaluation
            </div>
            {state.data.Evaluation?.map((item, index) => {
              if (item?.title?.includes("Quiz")) {
                return (
                  <table
                    className="table"
                    cellSpacing={9}
                    cellPadding={6}
                    style={{
                      color: "#333333",
                      borderCollapse: "separate",
                      padding: ".7rem",
                      /* margin: "1rem", */
                      /* border: "2px solid #572E74",
                  borderRadius: "6px", */
                    }}
                  >
                    <colgroup className="cols">
                      <col className="col1" />
                      <col className="col2" />
                      <col className="col3" />
                      <col className="col4" />
                    </colgroup>
                    <tbody>
                      <tr
                        style={{
                          backgroundColor: "white",
                        }}
                      >
                        <td style={{ fontWeight: "bold", fontSize: 18 }}>
                          {item.title}
                        </td>
                      </tr>

                      <tr
                        style={{
                          backgroundColor: "white",
                        }}
                      >
                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          CLO-NO
                        </td>
                        <td style={{ fontSize: 15 }}>{item.clo_no}</td>
                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Is CLO Mapping Correct
                        </td>
                        {item.clo_correct ? (
                          <td style={{ fontSize: 15 }}>{"Yes"}</td>
                        ) : (
                          <td style={{ fontSize: 15 }}>{"No"}</td>
                        )}

                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          BTL-NO
                        </td>
                        <td style={{ fontSize: 15 }}>{item.btl_no}</td>
                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Is BTL Mapping Correct
                        </td>
                        {item.btl_correct ? (
                          <td style={{ fontSize: 15 }}>{"Yes"}</td>
                        ) : (
                          <td style={{ fontSize: 15 }}>{"No"}</td>
                        )}
                      </tr>
                      <tr
                        style={{
                          backgroundColor: "white",
                        }}
                      >
                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Comment
                        </td>
                        <td style={{ fontSize: 15 }}>{item.Comments}</td>

                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Feedback
                        </td>
                        <td style={{ fontSize: 15 }}>{item.Feedback}</td>
                      </tr>
                    </tbody>
                  </table>
                );
              }
            })}
            {state.data.Evaluation?.map((item, index) => {
              if (item.title.includes("Assignment")) {
                return (
                  <table
                    className="table"
                    cellSpacing={9}
                    cellPadding={6}
                    style={{
                      color: "#333333",
                      borderCollapse: "separate",
                      padding: ".7rem",
                      /* margin: "1rem", */
                      /* border: "2px solid #572E74",
              borderRadius: "6px", */
                    }}
                  >
                    <colgroup className="cols">
                      <col className="col1" />
                      <col className="col2" />
                      <col className="col3" />
                      <col className="col4" />
                    </colgroup>
                    <tbody>
                      <tr
                        style={{
                          backgroundColor: "white",
                        }}
                      >
                        <td style={{ fontWeight: "bold", fontSize: 18 }}>
                          {item.title}
                        </td>
                      </tr>

                      <tr
                        style={{
                          backgroundColor: "white",
                        }}
                      >
                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          CLO-NO
                        </td>
                        <td style={{ fontSize: 15 }}>{item.clo_no}</td>
                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Is CLO Mapping Correct
                        </td>
                        {item.clo_correct ? (
                          <td style={{ fontSize: 15 }}>{"Yes"}</td>
                        ) : (
                          <td style={{ fontSize: 15 }}>{"No"}</td>
                        )}

                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          BTL-NO
                        </td>
                        <td style={{ fontSize: 15 }}>{item.btl_no}</td>
                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Is BTL Mapping Correct
                        </td>
                        {item.btl_correct ? (
                          <td style={{ fontSize: 15 }}>{"Yes"}</td>
                        ) : (
                          <td style={{ fontSize: 15 }}>{"No"}</td>
                        )}
                      </tr>
                      <tr
                        style={{
                          backgroundColor: "white",
                        }}
                      >
                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Comment
                        </td>
                        <td style={{ fontSize: 15 }}>{item.Comments}</td>

                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Feedback
                        </td>
                        <td style={{ fontSize: 15 }}>{item.Feedback}</td>
                      </tr>
                    </tbody>
                  </table>
                );
              }
            })}
            {state.data.Evaluation?.map((item, index) => {
              if (
                item.title.includes("Mid") ||
                item.title.includes("Sessional")
              ) {
                return (
                  <table
                    className="table"
                    cellSpacing={9}
                    cellPadding={6}
                    style={{
                      color: "#333333",
                      borderCollapse: "separate",
                      padding: ".7rem",
                      /* margin: "1rem", */
                      /* border: "2px solid #572E74",
                  borderRadius: "6px", */
                    }}
                  >
                    <colgroup className="cols">
                      <col className="col1" />
                      <col className="col2" />
                      <col className="col3" />
                      <col className="col4" />
                    </colgroup>
                    <tbody>
                      <tr
                        style={{
                          backgroundColor: "white",
                        }}
                      >
                        <td style={{ fontWeight: "bold", fontSize: 18 }}>
                          {item.title}
                        </td>
                      </tr>

                      <tr
                        style={{
                          backgroundColor: "white",
                        }}
                      >
                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          CLO-NO
                        </td>
                        <td style={{ fontSize: 15 }}>{item.clo_no}</td>
                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Is CLO Mapping Correct
                        </td>
                        {item.clo_correct ? (
                          <td style={{ fontSize: 15 }}>{"Yes"}</td>
                        ) : (
                          <td style={{ fontSize: 15 }}>{"No"}</td>
                        )}

                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          BTL-NO
                        </td>
                        <td style={{ fontSize: 15 }}>{item.btl_no}</td>
                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Is BTL Mapping Correct
                        </td>
                        {item.btl_correct ? (
                          <td style={{ fontSize: 15 }}>{"Yes"}</td>
                        ) : (
                          <td style={{ fontSize: 15 }}>{"No"}</td>
                        )}
                      </tr>
                      <tr
                        style={{
                          backgroundColor: "white",
                        }}
                      >
                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Comment
                        </td>
                        <td style={{ fontSize: 15 }}>{item.Comments}</td>

                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Feedback
                        </td>
                        <td style={{ fontSize: 15 }}>{item.Feedback}</td>
                      </tr>
                    </tbody>
                  </table>
                );
              }
            })}
            {state.data.Evaluation?.map((item, index) => {
              if (item.title.includes("Terminal")) {
                return (
                  <table
                    className="table"
                    cellSpacing={9}
                    cellPadding={6}
                    style={{
                      color: "#333333",
                      borderCollapse: "separate",
                      padding: ".7rem",
                      /* margin: "1rem", */
                      /* border: "2px solid #572E74",
                  borderRadius: "6px", */
                    }}
                  >
                    <colgroup className="cols">
                      <col className="col1" />
                      <col className="col2" />
                      <col className="col3" />
                      <col className="col4" />
                    </colgroup>
                    <tbody>
                      <tr
                        style={{
                          backgroundColor: "white",
                        }}
                      >
                        <td style={{ fontWeight: "bold", fontSize: 18 }}>
                          {item.title}
                        </td>
                      </tr>

                      <tr
                        style={{
                          backgroundColor: "white",
                        }}
                      >
                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          CLO-NO
                        </td>
                        <td style={{ fontSize: 15 }}>{item.clo_no}</td>
                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Is CLO Mapping Correct
                        </td>
                        {item.clo_correct ? (
                          <td style={{ fontSize: 15 }}>{"Yes"}</td>
                        ) : (
                          <td style={{ fontSize: 15 }}>{"No"}</td>
                        )}

                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          BTL-NO
                        </td>
                        <td style={{ fontSize: 15 }}>{item.btl_no}</td>
                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Is BTL Mapping Correct
                        </td>
                        {item.btl_correct ? (
                          <td style={{ fontSize: 15 }}>{"Yes"}</td>
                        ) : (
                          <td style={{ fontSize: 15 }}>{"No"}</td>
                        )}
                      </tr>
                      <tr
                        style={{
                          backgroundColor: "white",
                        }}
                      >
                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Comment
                        </td>
                        <td style={{ fontSize: 15 }}>{item.Comments}</td>

                        <td
                          valign="middle"
                          style={{
                            backgroundColor: "#E9ECF1",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Feedback
                        </td>
                        <td style={{ fontSize: 15 }}>{item.Feedback}</td>
                      </tr>
                    </tbody>
                  </table>
                );
              }
            })}
          </Paper>
        </div>
      </div>
    </>
  );
}
