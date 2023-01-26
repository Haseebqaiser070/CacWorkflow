import { TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import { AiFillPrinter } from "react-icons/ai";

import React, { useEffect, useState, useRef } from "react";
import "./pdfstyles.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

export default function Sos() {
  const { state } = useLocation();
  const [sos, setSos] = useState([]);
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

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div style={{ padding: 30 }}>
        <div className="d-flex justify-content-end">
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
        <div ref={componentRef} className="main">
          <div>
            <>
              <h5>Category Name</h5>
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
                  <tr>
                    <td className="col-1">1</td>
                    <td className="col-2">CSC-101</td>
                    <td className="col-5">Introduction to ICT</td>
                    <td className="col-2">3(2,1)</td>
                    <td className="col-2">None</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <p>
                  Non-Muslim students can opt for HUM114 Ethics 3(3,0) course in
                  lieu of HUM110 Islamic Studies, if they intend to.
                </p>
              </div>
              <div>
                <div>
                  <h5>Category Name</h5>

                  <div style={{ paddingBottom: 20 }} className="row">
                    <div className="col">
                      <h6>
                        <b>Course Code: </b> CSC-101
                      </h6>
                    </div>
                    <div className="col">
                      <h6 style={{ textAlign: "right" }}>
                        <b>Pre-Requisite: </b>None
                      </h6>
                    </div>
                  </div>
                  <h6 style={{ paddingBottom: 20 }}>
                    <b>Course Title: </b> Introduction to ICT
                  </h6>
                  <h6 style={{ paddingBottom: 35 }}>
                    <b>Credit Hour: </b>
                    3(2,1)
                  </h6>
                </div>
                <div style={{ paddingBottom: 15 }}>
                  <h5>Course Objectives: </h5>
                  <ul>
                    <li>Objective 1</li>
                  </ul>
                </div>
                <div style={{ paddingBottom: 15 }}>
                  <h5>Course Contents: </h5>
                  <p>{Content.catalogue}</p>
                </div>
                <div style={{ paddingBottom: 15 }}>
                  <h5>Recommended Books: </h5>
                  <ol>
                    <li>Book Name, Writer, Year</li>
                  </ol>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
}
