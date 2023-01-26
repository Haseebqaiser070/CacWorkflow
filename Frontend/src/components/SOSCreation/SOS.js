import { Modal, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import {
  AiFillPrinter,
  AiFillEdit,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import axios from "axios";
import Popup from "./Popup";
import React, { useEffect, useState, useRef } from "react";
import "./pdfstyles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { muiAbtn } from "../style";
import { Box } from "@mui/system";
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

export default function SOS() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  axios.defaults.withCredentials = true;

  const { state } = useLocation();
  console.log(state);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { Program } = state.row;
  console.log("Program", Program);
  const [Version, setVersion] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [res, setresponse] = useState(false);
  const [DomainCourseSum, setDomainCourseSum] = useState(0);
  const [DomainCreditSum, setDomainCreditSum] = useState(0);
  const [CoveredCourseSum, setCoveredCourseSum] = useState(0);
  const [CoveredCreditSum, setCoveredCreditSum] = useState(0);
  //{Category:"",Optional:"",Track:"",Courses:[],Note:""}
  const [Content, setContent] = useState({
    Page1: { CoveredCategories: [], DomainCategories: [] },
    Program: "",
    Year: "",
    Categories: [],
  });
  console.log(Version);
  const navigate = useNavigate();
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const handleCloseX = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getData();
    getContent();
  }, []);

  const getData = async () => {
    console.log(Program);
    const response = await axios.get(
      `http://localhost:4000/SOSVerison/all/${Program}`
    );
    setVersion(response.data);
    if (response.data.length > 0) {
      setresponse(true);
      getContent();
    }
  };
  const getContent = async () => {
    console.log("\nabc");
    const response = await axios.get(
      `http://localhost:4000/SOSVerison/Latest/${Program}`
    );
    console.log("\nabc222");
    if (response.data != undefined) {
      setContent(response.data);
      var s = 0;
      var r = 0;
      response.data?.Page1?.CoveredCategories.forEach((i) => {
        s = s + parseInt(i.NoofCourses);
        r = r + parseInt(i.NoofCredits);
      });
      console.log("\ns", s, "\nr", r);
      setCoveredCourseSum(s);
      setCoveredCreditSum(r);
      var ss = 0;
      var rr = 0;
      response.data?.Page1?.DomainCategories.forEach((i) => {
        ss = ss + parseInt(i.NoofCourses);
        rr = rr + parseInt(i.NoofCredits);
      });
      console.log("\nss", ss, "\nrr", rr);
      setDomainCourseSum(ss);
      setDomainCreditSum(rr);
    } else {
      setContent({
        Page1: "",
        Program: "",
        Year: "",
        Categories: [],
      });
    }
  };
  const Edit = () => {
    console.log("Content", Content);
    state.row.Content = Content;
    state.row.DomainCourseSum = DomainCourseSum;
    state.row.DomainCreditSum = DomainCreditSum;
    state.row.CoveredCourseSum = CoveredCourseSum;
    state.row.CoveredCreditSum = CoveredCreditSum;
    console.log("state.row.Content", state.row.Content);
    navigate(`/CAC/CreateSOS/${Program}/1`, { state: { row: state.row } });
  };
  const getCon = async (id) => {
    const response = await axios.get(`http://localhost:4000/SOSVerison/${id}`);
    setContent(response.data);
    var s = 0;
    var r = 0;
    response.data?.Page1?.CoveredCategories.forEach((i) => {
      s = s + parseInt(i.NoofCourses);
      r = r + parseInt(i.NoofCredits);
    });
    console.log("\ns", s, "\nr", r);
    setCoveredCourseSum(s);
    setCoveredCreditSum(r);
    var ss = 0;
    var rr = 0;
    response.data?.Page1?.DomainCategories.forEach((i) => {
      ss = ss + parseInt(i.NoofCourses);
      rr = rr + parseInt(i.NoofCredits);
    });
    console.log("\nss", ss, "\nrr", rr);
    setDomainCourseSum(ss);
    setDomainCreditSum(rr);
  };
  console.log("content", Content);
  return (
    <div style={{ height: 700, padding: 30, width: "100%" }}>
      <div className="d-flex justify-content-end mb-4">
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={handleOpen}
        >
          <AiOutlineUnorderedList style={{ marginRight: 10 }} />
          Versions
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={Edit}
        >
          <AiFillEdit style={{ marginRight: 10 }} />
          Create/Edit SOS
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={handlePrint}
        >
          <AiFillPrinter style={{ marginRight: 10 }} />
          Print
        </Button>
      </div>

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
          <>
            <h4 style={{ textAlign: "center", marginBottom: 20 }}>VERSIONS</h4>

            <table class="table" id="list">
              <thead>
                <tr>
                  <th scope="col">Version</th>
                </tr>
              </thead>
              <tbody>
                {Version.map((Repo, index) => {
                  return (
                    <tr scope="row" key={Repo._id}>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => getCon(Repo._id)}
                      >
                        Version: {index + 1}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        </Box>
      </Modal>
      {!res ? (
        <div>
          <h5 style={{ textAlign: "center" }}>Repository is Empty!</h5>
          <p style={{ textAlign: "center" }}>
            Please add the course description
          </p>
        </div>
      ) : (
        <div ref={componentRef} className="main">
          <div>
            <div>
              <div>
                <h4>Nomenclature: {Program}</h4>
                <ol>
                  <li>Minimum Duration in year: 04 Years</li>
                  <li>Minimum No. of Semesters: 08</li>
                </ol>
              </div>
              <div>
                <table className="table mb-4">
                  <thead>
                    <tr>
                      <th className="col-6">Course Work</th>
                      <th className="col-3" style={{ textAlign: "center" }}>
                        Min No. of Courses
                      </th>
                      <th className="col-3" style={{ textAlign: "center" }}>
                        Min No. of Credit Hours
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th colSpan={2}>Area Covered in {Program}</th>
                    </tr>
                    {Content?.Page1?.CoveredCategories?.map((c, index) => {
                      return (
                        <tr>
                          <td>{c.Category}</td>
                          <td style={{ textAlign: "center" }}>
                            {c.NoofCourses}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {c.NoofCredits}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th style={{ textAlign: "right" }}>Total</th>
                      <th style={{ textAlign: "center" }}>
                        {CoveredCourseSum}
                      </th>
                      <th style={{ textAlign: "center" }}>
                        {CoveredCreditSum}
                      </th>
                    </tr>

                    <tr>
                      <th colSpan={2}>Domain Courses (List Attached)</th>
                    </tr>
                    {Content?.Page1?.DomainCategories?.map((c, index) => {
                      return (
                        <tr>
                          <td>{c.Category}</td>
                          <td style={{ textAlign: "center" }}>
                            {c.NoofCourses}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {c.NoofCredits}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th style={{ textAlign: "right" }}>Total</th>
                      <th style={{ textAlign: "center" }}>{DomainCourseSum}</th>
                      <th style={{ textAlign: "center" }}>{DomainCreditSum}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {Content.Categories.map((x) => {
              return (
                <>
                  <h5>{x.Category}</h5>
                  <table className="table table-bordered">
                    <thead style={{ textAlign: "center" }}>
                      <tr>
                        <th className="col-1">S. No</th>
                        <th className="col-2">Course Code</th>
                        <th className="col-5">Course Title</th>
                        <th className="col-2">Credit Hours</th>
                        <th className="col-2">Pre-requisite (s)</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                      {x?.Courses?.map((i, index) => {
                        return (
                          <tr>
                            <td className="col-1">{index + 1}</td>
                            <td className="col-2">{i.Code}</td>
                            <td className="col-5">{i.Name}</td>
                            <td className="col-2">
                              {i.Credit +
                                "(" +
                                i.LectureHoursWeek +
                                "," +
                                i.LabHoursWeek +
                                ")"}
                            </td>
                            <td className="col-2">
                              {" "}
                              {i?.PreRequisites?.map((z) => z.Name)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div>
                    <p>{x.Note}</p>
                  </div>
                </>
              );
            })}

            {Content.Categories.map((x) => {
              // {Category:"",Optional:"",Track:"",Courses:[],Note:""}

              return (
                <>
                  <div className="page-break" />
                  <div>
                    <h5>{x.Category}</h5>

                    <div style={{ paddingBottom: 20 }} className="row">
                      {x?.Courses?.map((i, index) => {
                        return (
                          <>
                            <div className="col">
                              <h6>
                                <b>Course Code: </b> {i.Code}
                              </h6>
                            </div>
                            <div className="col">
                              <h6 style={{ textAlign: "right" }}>
                                <b>Pre-Requisite: </b>
                                {i?.PreRequisites?.map((z) => z.Name)}
                              </h6>
                            </div>
                            <h6 style={{ paddingBottom: 20 }}>
                              <b>Course Title: </b> {i.Name}
                            </h6>
                            <h6 style={{ paddingBottom: 35 }}>
                              <b>Credit Hour: </b>
                              {i.Credit +
                                "(" +
                                i.LectureHoursWeek +
                                "," +
                                i.LabHoursWeek +
                                ")"}
                            </h6>

                            <div style={{ paddingBottom: 15 }}>
                              <h5>Course Objectives: </h5>
                              <ul>
                                {i?.objectiveList?.map((z) => {
                                  return <li>{z.title}</li>;
                                })}
                              </ul>
                            </div>
                            <div style={{ paddingBottom: 15 }}>
                              <h5>Course Contents: </h5>
                              <p>{i?.catalogue}</p>
                            </div>
                            <div style={{ paddingBottom: 15 }}>
                              <h5>Recommended Books: </h5>
                              <ol>
                                {i?.Books?.map((z) => {
                                  return (
                                    <li>
                                      {z.BookName}
                                      {z.BookWriter}
                                      {z.BookYear}
                                    </li>
                                  );
                                })}
                              </ol>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
