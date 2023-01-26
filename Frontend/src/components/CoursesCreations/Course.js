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

import AddIcon from "@mui/icons-material/Add";

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

export default function Course() {
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

  const { Code, Name } = state.row;
  const [Version, setVersion] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [res, setresponse] = useState(false);
  const [Content, setContent] = useState({
    Code: "",
    Name: "",
    LectureHoursWeek: "0",
    LabHoursWeek: "0",
    Category: "",
    PreRequisites: [],
    catalogue: "",
    objectiveList: [],
    Books: [],
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
  }, []);

  const getData = async () => {
    console.log(Code);
    const response = await axios.get(
      `http://localhost:4000/CourseVersion/all/${Code}`
    );
    setVersion(response.data);
    if (response.data.length > 0) {
      setresponse(true);
      getContent();
    }
  };
  const getContent = async () => {
    const response = await axios.get(
      `http://localhost:4000/CourseVersion/Latest/${Code}`
    );
    setContent(response.data);
  };
  const Edit = () => {
    state.row.Content = Content;
    navigate(`/CAC/AddnewCourse/${Code}`, { state: { row: state.row } });
  };
  const getCon = async (id) => {
    const response = await axios.get(
      `http://localhost:4000/CourseVersion/${id}`
    );
    setContent(response.data);
  };
  console.log("content", Content);
  return (
    <div style={{ padding: 30, width: "100%" }}>
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
          Create/Edit catalogue Description
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
            <div style={{ paddingBottom: 20 }} className="row">
              <div className="col">
                <h6>
                  <b>Course Code: </b> {Code.split("-")[0]}
                  {Code.split("-")[1]}
                </h6>
              </div>
              <div className="col">
                <h6 style={{ textAlign: "right" }}>
                  <b>Pre-Requisite: </b>{" "}
                  {Content.PreRequisites.map((i) => i.Name)}
                </h6>
              </div>
            </div>
            <h6 style={{ paddingBottom: 20 }}>
              <b>Course Title: </b> {Name}
            </h6>
            <h6 style={{ paddingBottom: 35 }}>
              <b>Credit Hour: </b>
              {Content.Credit}
            </h6>
          </div>
          <div style={{ paddingBottom: 15 }}>
            <h5>Course Objectives: </h5>
            <ul>
              {Content.objectiveList.map((i) => {
                return <li>{i.title}</li>;
              })}
            </ul>
          </div>
          <div style={{ paddingBottom: 15 }}>
            <h5>Course Contents: </h5>
            <p>{Content.catalogue}</p>
          </div>
          <div style={{ paddingBottom: 15 }}>
            <h5>Recommended Books: </h5>
            <ol>
              {Content.Books.map((i) => {
                return (
                  <li>
                    {i.BookName}
                    {i.BookWriter}
                    {i.BookYear}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
