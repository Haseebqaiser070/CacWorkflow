import { TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import { AiFillPrinter } from "react-icons/ai";

import React, { useEffect, useState, useRef } from "react";
import "./pdfstyles.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

export default function CoursesPrereq() {
  const { state } = useLocation();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [SOSs, setSOSs] = useState([]);

  useEffect(() => {
    getSOS();
  }, []);

  const getSOS = async () => {
    try {
      const response = await axios.get("http://localhost:4000/SOS/showallother");
      setSOSs(response.data);
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
              <h2>Courses having PreRequisites</h2>
            </div>
          </div>
          
            
            {SOSs.map((i,index)=>{
              var count=0
              return(
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
                  {index+1} {i.Program}
                </h3>          <table className="table table-bordered">
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
              {i.Categories.map((j)=>{              
              return (j.Courses.map((e)=>{
                if(e.PreRequisites.length>=1)
                  {count=count+1                    
                    return(
                    <tr>
                      <td className="col-1">{count}</td>
                      <td className="col-2">{e.Code}</td>
                      <td className="col-5">{e.Name}</td>
                      <td className="col-2">{e.Credit}({e.LectureHoursWeek},{e.LabHoursWeek})</td>
                      <td className="col-5">{i?.PreRequisites?.map((z) => z.Name)}</td>
                    </tr>
                  )}
              }))})}                
              </tbody>
              </table>
              </div>

            )})}
            
        </div>
      </div>
    </>
  );
}
