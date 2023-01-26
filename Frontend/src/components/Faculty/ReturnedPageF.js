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
              if (item.title?.includes("Quiz")) {
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
              if (item.title?.includes("Assignment")) {
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
            {state.data?.Evaluation?.map((item, index) => {
              if (
                item.title?.includes("Mid") ||
                item.title?.includes("Sessional")
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
              if (item.title?.includes("Terminal")) {
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
       
    </>
  );
}
