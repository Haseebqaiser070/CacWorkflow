import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";
import { AiFillPrinter } from "react-icons/ai";

import React, { useEffect, useState, useRef } from "react";
import "./pdfstyles.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { Box } from "@mui/system";

export default function ProgramReport() {
  const { Degree } = useParams();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(async () => {
    await getPrograms();
  }, []);
  const [Programs, setPrograms] = useState([]);

  const getPrograms = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/Program/showall/${Degree}`,
        { withCredentials: true }
      );
      setPrograms(response.data);
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
            size="medium"
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
              <h2>All Programs (Degree Level)</h2>
            </div>
          </div>
          <div>
            <table className="table table-bordered">
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th className="col-1">S. No</th>
                  <th className="col-3">Degree</th>
                  <th className="col-8">Program</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {Programs.map((i, index) => {
                  return (
                    <tr>
                      <td className="col-1">{index + 1}</td>
                      <td className="col-2">{i.Degree}</td>
                      <td className="col-5">{i.Program}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
