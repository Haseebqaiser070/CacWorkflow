import Button from "@mui/material/Button";
import { AiFillPrinter } from "react-icons/ai";

import React, { useEffect, useState, useRef } from "react";
import "./pdfstyles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import comsatslogo from "../CACMember/comsats_logo.png";

export default function IndiviualTask() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [Rep, setRep] = useState("");
  axios.defaults.withCredentials = true;
  const { tid } = useParams();

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const res = await axios.get(
      `http://localhost:4000/Task/ShowOneReport/${tid}`
    );
    console.log(res.data);
    setRep(res.data);
  };
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
            <div
              className="d-flex row justify-content-center mb-4"
              style={{ margin: 30 }}
            >
              <div className="col-12">
                <h1>COMSATS University Islamabad</h1>
                <h1>Department of Computer Science</h1>
                <h2>Indiviual Task Report</h2>
              </div>
            </div>
            {Rep != "" && (
              <div style={{ marginBottom: "40px" }}>
                <div>
                  <h3
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                      padding: 5,
                      textAlign: "left",
                    }}
                    className="head my-4"
                  >
                    {Rep.taskType}
                  </h3>
                  <div className="row ">
                    <div className="col">
                      <p>
                        <b>Program: </b> {Rep.Program}
                      </p>
                    </div>
                    {/* <div className="col">
                    <p style={{ color: "red", textAlign: "right" }}>
                      <b>Status: </b> Assigned
                    </p>
                  </div> */}
                  </div>

                  <p>
                    <b> Members Allocated: </b>{" "}
                    {Rep.AssignMember.map((i) => {
                      return <p>{i.Name}</p>;
                    })}
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#f6f6f6",
                    padding: "5px 25px 5px 25px",
                  }}
                >
                  {Rep.Task.map((q, index) => {
                    return (
                      <div>
                        <h2
                          style={{
                            textAlign: "left",
                            marginTop: 35,
                            marginBottom: 15,
                          }}
                        >
                          {index + 1}. {q.User.map((i) => i.Name)},
                        </h2>
                        <div className="row">
                          {q.taskType == "Create SOS" ||
                          q.taskType == "Update SOS" ? (
                            <div className="col">
                              <p>
                                <b>Program: </b> {Rep.Program}
                              </p>
                            </div>
                          ) : (
                            <div className="col">
                              <p>
                                <b>Course Assigned: </b> {q.Course.Name}
                              </p>
                            </div>
                          )}

                          <div className="col">
                            <p style={{ textAlign: "right" }}>
                              <b>Status: </b> {q.Status}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
