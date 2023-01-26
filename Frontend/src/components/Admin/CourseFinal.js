import { TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import {
  AiFillPrinter,
  AiFillEdit,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./pdfstyles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function CourseFinal() {
  axios.defaults.withCredentials = true;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { id } = useParams();

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
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    console.log(id);
    const response = await axios.get(`http://localhost:4000/Course/${id}`);
    setContent(response.data);
  };
  return (
    <div style={{ height: 700, padding: 30, width: "100%" }}>
      <div className="d-flex justify-content-end mb-4">
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={handlePrint}
        >
          <AiFillPrinter style={{ marginRight: 10 }} />
          Print
        </Button>
      </div>

      {
        <div ref={componentRef} className="main">
          <div>
            <div style={{ paddingBottom: 20 }} className="row">
              <div className="col">
                <h6>
                  <b>Course Code: </b> {Content.Code.split("-")[0]}
                  {Content.Code.split("-")[1]}
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
              <b>Course Title: </b> {Content.Name}
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
      }
    </div>
  );
}
