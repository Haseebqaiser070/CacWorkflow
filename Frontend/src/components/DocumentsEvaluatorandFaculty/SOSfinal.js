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

export default function SOSFinal() {
  axios.defaults.withCredentials = true;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { Program,Year } = useParams();

  const [DomainCourseSum,setDomainCourseSum] = useState(0);
  const [DomainCreditSum,setDomainCreditSum] = useState(0);
  const [CoveredCourseSum, setCoveredCourseSum] = useState(0);
  const [CoveredCreditSum, setCoveredCreditSum] = useState(0);
  const [Content, setContent] = useState({
    Program: "",
    Year: "",
    Categories: [
      { Category: "", Optional: "", Track: "", Courses: [], Note: "" },
    ],
  });

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(`http://localhost:4000/SOS/${Program}/${Year}`);
    setContent(response.data);
    var s =0 
    var r =0
    response.data?.Page1?.CoveredCategories.forEach((i)=>{
    s =s +parseInt(i.NoofCourses)
    r =r +parseInt(i.NoofCredits)      
     })
     console.log("\ns",s,"\nr",r)
    setCoveredCourseSum(s)  
    setCoveredCreditSum(r)
    var ss =0
    var rr =0                
    response.data?.Page1?.DomainCategories.forEach((i)=>{
    ss =ss +parseInt(i.NoofCourses)
    rr =rr +parseInt(i.NoofCredits)
    })      
    console.log("\nss",ss,"\nrr",rr)
    setDomainCourseSum(ss)
    setDomainCreditSum(rr)
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
          <div>
            <div>
              <h4>
                Nomenclature: {Content?.Program}
              </h4>
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
                    <th colSpan={2}>Area Covered in {Content?.Program}</th>
                  </tr> 
                  {Content?.Page1?.CoveredCategories?.map((c,index)=>{return(
                  <tr>
                    <td>{c.Category}</td>
                    <td style={{ textAlign: "center" }}>{c?.NoofCourses}</td>
                    <td style={{ textAlign: "center" }}>{c?.NoofCredits}</td>
                  </tr>                  
                  )})}
                  <tr>
                    <th style={{ textAlign: "right" }}>Total</th>
                    <th style={{ textAlign: "center" }}>{CoveredCourseSum}</th>
                    <th style={{ textAlign: "center" }}>{CoveredCreditSum}</th>
                  </tr>
                  
                  <tr>
                    <th colSpan={2}>Domain Courses (List Attached)</th>
                  </tr> 
                  {Content?.Page1?.DomainCategories?.map((c,index)=>{return(
                  <tr>
                    <td>{c.Category}</td>
                    <td style={{ textAlign: "center" }}>{c?.NoofCourses}</td>
                    <td style={{ textAlign: "center" }}>{c?.NoofCredits}</td>
                  </tr>                  
                  )})}
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
                            <td className="col-2">{i?.Code}</td>
                            <td className="col-5">{i?.Name}</td>
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
                              {i?.PreRequisites?.map((z) => z?.Name)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div>
                    <p>{x?.Note}</p>
                  </div>
                </>
              );
            })}

            {Content?.Categories?.map((x) => {
              // {Category:"",Optional:"",Track:"",Courses:[],Note:""}

              return (
                <div>
                  <div>
                    <h5>{x?.Category}</h5>

                    <div style={{ paddingBottom: 20 }} className="row">
                      {x?.Courses?.map((i, index) => {
                        return (
                          <>
                            <div className="col">
                              <h6>
                                <b>Course Code: </b> {i?.Code}
                              </h6>
                            </div>
                            <div className="col">
                              <h6 style={{ textAlign: "right" }}>
                                <b>Pre-Requisite: </b>
                                {i?.PreRequisites?.map((z) => z?.Name)}
                              </h6>
                            </div>
                            <h6 style={{ paddingBottom: 20 }}>
                              <b>Course Title: </b> {i?.Name}
                            </h6>
                            <h6 style={{ paddingBottom: 35 }}>
                              <b>Credit Hour: </b>
                              {i.Credit +
                                "(" +
                                i?.LectureHoursWeek +
                                "," +
                                i?.LabHoursWeek +
                                ")"}
                            </h6>

                            <div style={{ paddingBottom: 15 }}>
                              <h5>Course Objectives: </h5>
                              <ul>
                                {i?.objectiveList?.map((z) => {
                                  return <li>{z?.title}</li>;
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
                                      {z?.BookName}
                                      {z?.BookWriter}
                                      {z?.BookYear}
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
                </div>
              );
            })}
          </div>
        </div>
      }
    </div>
  );
}
