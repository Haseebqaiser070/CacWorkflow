import { TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import { AiFillPrinter } from "react-icons/ai";

import React, { useEffect, useState, useRef } from "react";
import "./pdfstyles.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

export default function AvailableCodes() {
  const { state } = useLocation();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    getCodesAvail();
  }, []);
  const [Avaible,setAvaible]= useState([])

  const getCodesAvail = async () => {
    const response = await axios.get("http://localhost:4000/RepoCourse/available",{withCredentials:true});
    setAvaible(response.data);
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
              <h2>Avaible Course Codes between 0 to 500</h2>
            </div>
          </div>
          <div>
            <table className="table table-bordered">
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th className="col-1">S. No</th>
                  <th className="col-11">
                    Available Codes(Can be alloted to other subjects)
                  </th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {Avaible.map((i,index)=>{
                  return(
                    <tr>
                      <td className="col-1">{index+1}</td>
                      <td className="col-11">{i}</td>
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
