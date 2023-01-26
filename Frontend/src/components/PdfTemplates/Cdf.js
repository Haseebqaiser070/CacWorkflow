import Button from "@mui/material/Button";
import { AiFillPrinter } from "react-icons/ai";

import React, { useEffect, useState, useRef } from "react";
import "./Cdfstyles.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import comsatslogo from "../CACMember/comsats_logo.png";

export default function CdfTemplate() {
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
          <div
            className="d-flex row justify-content-center mb-4"
            style={{ margin: 30 }}
          >
            <div className="col-1">
              <img src={comsatslogo} width="130px" height="130px"></img>
            </div>
            <div className="col-11">
              <h1>COMSATS University Islamabad</h1>
              <h1>Department of Computer Science</h1>
              <h1>Course Description Form (CDF)</h1>
            </div>
          </div>
          <div style={{ borderColor: "#000" }}>
            <div>
              <h4
                style={{ backgroundColor: "#000", color: "#fff", padding: 4 }}
                className="head"
              >
                Course Information
              </h4>
            </div>
            <div>
              <div className="row">
                <div className="col">
                  <h6>
                    <b>Course Code: </b>
                  </h6>
                </div>
                <div className="col">
                  <h6 style={{ paddingBottom: 20, textAlign: "right" }}>
                    <b>Course Title: </b>
                  </h6>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h6 style={{ paddingBottom: 20 }}>
                    <b>Credit Hour: </b>
                  </h6>
                </div>
                <div className="col">
                  <h6 style={{ paddingBottom: 20, textAlign: "right" }}>
                    <b>Lecture Hours/Week: </b>
                  </h6>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h6 style={{ paddingBottom: 20 }}>
                    <b>Lab Hours/Week: </b>
                  </h6>
                </div>
                <div className="col">
                  <h6 style={{ textAlign: "right" }}>
                    <b>Pre-Requisite: </b>
                  </h6>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h4
                  style={{ backgroundColor: "#000", color: "#fff", padding: 4 }}
                  className="head"
                >
                  Catalogue Description
                </h4>
              </div>
              <p style={{ paddingBottom: 20 }}>
                {" "}
                This course introduces mathematical structures necessary for the
                development of program logic. It covers the following topics:
                Set Theory; Propositional & First Order Logic; Rules of
                Inference; Mathematical Proofs; Counting & Probability; Graphs &
                Tree Structures; and Discrete Probability.
              </p>
            </div>
            <div style={{ paddingBottom: 20 }}>
              <div>
                <h4
                  style={{ backgroundColor: "#000", color: "#fff", padding: 4 }}
                  className="head"
                >
                  Unit wise Major Topics:
                </h4>
              </div>
              <div>
                <table className="table table-bordered">
                  <thead
                    style={{ backgroundColor: "#f5f5f5", textAlign: "center" }}
                  >
                    <tr>
                      <th>Unit#</th>
                      <th>Topic</th>
                      <th>No. of teaching hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "center" }}>1</td>
                      <td>
                        Overview of Object-Oriented Programming: Concepts,
                        Principles, Evolution, and Advantages.
                      </td>
                      <td style={{ textAlign: "center" }}>1.5</td>
                    </tr>
                    <tr>
                      <th colSpan={2}>Total Contact Hours</th>
                      <td style={{ textAlign: "center" }}>45</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ paddingBottom: 20 }}>
              <div>
                <h4
                  style={{ backgroundColor: "#000", color: "#fff", padding: 4 }}
                  className="head"
                >
                  Mapping of CLOs and SOs
                </h4>
              </div>
              <div>
                <table className="table table-bordered">
                  <thead
                    style={{ backgroundColor: "#f5f5f5", textAlign: "center" }}
                  >
                    <tr>
                      <th className="col-1">Sr.#</th>
                      <th className="col-1">Unit#</th>
                      <th className="col-7">Course Learning Outcomes</th>
                      <th className="col-2">Bloom Taxonomy Learning Level</th>
                      <th className="col-1">SO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="py-2" style={{ textAlign: "center" }}>
                      <th colSpan={5}>CLO’s for Theory</th>
                    </tr>
                    <tr>
                      <td style={{}}>CLO-1</td>
                      <td style={{ textAlign: "center" }}>1-2</td>
                      <td>
                        Design an Object-Oriented model for a real-world
                        problem.
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <i> Creating</i>
                      </td>
                      <td style={{ textAlign: "center" }}>2,3</td>
                    </tr>
                    <tr className="py-2" style={{ textAlign: "center" }}>
                      <th colSpan={5}>CLO’s for Lab</th>
                    </tr>
                    <tr>
                      <td style={{}}>CLO-1</td>
                      <td style={{ textAlign: "center" }}>1-2</td>
                      <td>
                        Design an Object-Oriented model for a real-world
                        problem.
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <i> Creating</i>
                      </td>
                      <td style={{ textAlign: "center" }}>2,3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ paddingBottom: 20 }}>
              <div>
                <h4
                  style={{ backgroundColor: "#000", color: "#fff", padding: 4 }}
                  className="head"
                >
                  CLO Assessment Mechanism
                </h4>
              </div>
              <div>
                <table className="table table-bordered">
                  <thead
                    style={{ backgroundColor: "#f5f5f5", textAlign: "center" }}
                  >
                    <tr>
                      <th className="col-1">Assessment Tools</th>
                      <th className="col-1">CLO-1</th>
                      <th className="col-1">CLO-2</th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    <tr>
                      <td>Quizzes</td>
                      <td>Quiz 1&2</td>
                    </tr>
                    <tr>
                      <td>Assignments</td>
                      <td>Assignment 2&3</td>
                      <td>Lab Assignments</td>
                    </tr>
                    <tr>
                      <td>Mid Term Exam</td>
                      <td>Mid Term Exam</td>
                    </tr>
                    <tr>
                      <td>Final Term Exam</td>
                      <td>Final Term Exam</td>
                      <td>Final Term Exam</td>
                    </tr>
                    <tr>
                      <td>Project</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div>
                <h4
                  style={{ backgroundColor: "#000", color: "#fff", padding: 4 }}
                  className="head"
                >
                  Text and Reference Books
                </h4>
              </div>
              <div>
                <h4>TextBook:</h4>
                <ol>
                  <li>Title, Authors, Year</li>
                </ol>

                <h4>Reference Books:</h4>
                <ol>
                  <li>Title, Authors, Year</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
