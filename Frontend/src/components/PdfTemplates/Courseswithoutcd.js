import { TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import { AiFillPrinter } from "react-icons/ai";

import React, { useEffect, useState, useRef } from "react";
import "./pdfstyles.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

export default function Courseswithoutcd() {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(async () => {
    await getCourse();
  }, []);
  const [Course,setCourse]= useState([])

  const getCourse = async () => {
    try {
      const response = await axios.get("http://localhost:4000/RepoCourse/showwithoutcat",{withCredentials:true});
      setCourse(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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
          <div
            className="d-flex row justify-content-center mb-4"
            style={{ margin: 30 }}
          >
            <div className="col-12">
              <h1>COMSATS University Islamabad</h1>
              <h1>Department of Computer Science</h1>
              <h2>Courses without Catalogue Description</h2>
            </div>
          </div>
          <div>
            <table className="table table-bordered">
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th className="col-1">S. No</th>
                  <th className="col-2">Course Code</th>
                  <th className="col-5">Course Title</th>
                  <th className="col-2">Credit Hours</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
              {Course.map((i,index)=>{
                  return(
                    <tr>
                      <td className="col-1">{index+1}</td>
                      <td className="col-2">{i.Code}</td>
                      <td className="col-5">{i.Name}</td>
                      <td className="col-2">{i.Credit}({i.LectureHoursWeek},{i.LabHoursWeek})</td>
                    </tr>
                  )
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
