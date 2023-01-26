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
import { useLocation, useNavigate,useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import comsatslogo from "../CACMember/comsats_logo.png";

export default function SyllabusFinal() {
    axios.defaults.withCredentials = true;
    const { Program,Code } = useParams()

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [Content, setContent] = useState([]);
  const [CDF, setCDF] = useState(
    {    Topics:[],
          CLOs:[],
          textBook:[],
          referenceBook:[]}  )
    
  const [SO, setSO] = useState([])  
  const [Cat, setCat] = useState({
    Code: Code,
    Name: "",
    Credit:"",
    LectureHoursWeek: "0",
    LabHoursWeek: "0",
    Category: "",
    PreRequisites: [],
    catalogue: "jkkl",
    objectiveList: [],
    Books: [],
  });
  console.log("Content",Content,"\n Cat",Cat,"\n CDF",CDF)
  const navigate = useNavigate();
  
  console.log("SO",SO)

  useEffect(() => {
    getContent()
    getstuff()
    getCat()
  }, []);
  const getstuff = async()=>{
    const res = await axios.get(`http://localhost:4000/CDF/showOne/${Program}/${Code}`)
    setCDF(res.data)
    var sooo = []
    res.data.CLOs.forEach(e => {
        e.So.forEach(i=>{
            if(!sooo.some(e=>e._id==i._id)){                
                sooo.push(i)    
            }
        })
    });
    setSO([...sooo])
  }
  const getCat = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/ProgramCourses/showcode/${Program}/${Code}`);
      console.log(response.data);
      setCat({
        Code: response.data.Code,
        Name: response.data.Name,
        Credit:response.data.Credit,
        LectureHoursWeek: response.data.LectureHoursWeek,
        LabHoursWeek: response.data.LabHoursWeek,        
        PreRequisites: response.data.PreRequisites,
        catalogue: response.data.catalogue,
        objectiveList: response.data.objectiveList,
        Books: response.data.Books,
      })
    } catch (error) {
      console.log(error);
    }
  };
  const getContent = async () => {
    const response = await axios.get(
      `http://localhost:4000/Syllabus/showcodeandprogram/${Program}/${Code}`);
    setContent([...response.data.Plan]);
  };



  return (
    
      <div style={{ padding: 30 }}>
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
                  <b>Course Code: {Cat.Code}</b>
                </h6>
              </div>
              <div className="col">
                <h6 style={{ paddingBottom: 20, textAlign: "right" }}>
                  <b>Course Title: {Cat.Name}</b>
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 style={{ paddingBottom: 20 }}>
                  <b>Credit Hour: {Cat.Credit+"("+Cat.LectureHoursWeek+
                    ","+Cat.LabHoursWeek+")"} </b>
                </h6>
              </div>
              <div className="col">
                <h6 style={{ paddingBottom: 20, textAlign: "right" }}>
                  <b>Lecture Hours/Week: {Cat.LectureHoursWeek}</b>
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 style={{ paddingBottom: 20 }}>
                  <b>Lab Hours/Week: {Cat.LabHoursWeek}</b>
                </h6>
              </div>
              <div className="col">
                <h6 style={{ textAlign: "right" }}>
                  <b>Pre-Requisite: {Cat.PreRequisites}</b>
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
              {" "}{Cat.catalogue}
            </p>
          </div>

          <div>
            <div>
              <h4
                style={{ backgroundColor: "#000", color: "#fff", padding: 4 }}
                className="head"
              >
                Reading Material:
              </h4>
            </div>
            <div>
              <h4>TextBook:</h4>
              <ol>{
              CDF.textBook.map(i=>{return(<li>{i.BookName} {i.BookWriter} {i.BookYear}</li>)
              })}                
              </ol>

              <h4>Reference Books:</h4>
              <ol>{
              CDF.referenceBook.map(i=>{return(<li>{i.BookName} {i.BookWriter} {i.BookYear}</li>)
              })}</ol>
            </div>
          </div>
          {/* Weekwise plan  */}
          <div style={{ paddingBottom: 20 }}>
            <div>
              <h4
                style={{ backgroundColor: "#000", color: "#fff", padding: 4 }}
                className="head"
              >
                Week wise Plan:
              </h4>
            </div>
            <div>
              <table className="table table-bordered">
                <thead
                  style={{ backgroundColor: "#f5f5f5", textAlign: "center" }}
                >
                  <tr>
                    <th className="col-1">Lecture #</th>
                    <th className="col-1">CDF Unit#</th>
                    <th className="col-7">Topics Covered</th>
                    <th className="col-3">Reference Material</th>
                  </tr>
                </thead>
                <tbody>
                 {Content.map((i)=>{
                    return(   
                        <tr>
                            <td style={{ textAlign: "center" }}>{i.lecture}</td>
                            <td style={{ textAlign: "center" }}>{i.CDFUnit}</td>
                            <td>
                            {i.topics}
                            </td>
                            <td>{i.material.split("-").map((e)=>{return(<>{e}</>)})}</td>
                        </tr>
                    )})
                }
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
                Student Outcomes (SOs)
              </h4>
            </div>
            <div>
              <table className="table table-bordered">
                <thead
                  style={{ backgroundColor: "#f5f5f5", textAlign: "center" }}
                >
                  <tr>
                    <th className="col-1">S#</th>
                    <th className="col-11" style={{ textAlign: "center" }}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SO.map(i=>{return(<tr>
                    <td style={{ textAlign: "center" }}>{i.Number}</td>
                    <td>
                    {i.SO}
                    </td>
                  </tr>)})}                  
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
                Course Learning Outcomes (CLOs)
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
                {CDF.CLOs.map(i=>{
                      let Sos="string"
                      i.So.forEach((e)=>{
                        console.log("Sos",Sos)
                        if(Sos==""){
                          Sos=e.Number
                        }
                        else if(Sos.length == 1){
                          Sos=Sos+","+e.Number
                        }
                        else if(Sos[Sos.length-2]==","){
                          if(parseInt(Sos[Sos.length-3])-parseInt(Sos[Sos.length-1])==1
                          && parseInt(e.Number)-parseInt(Sos[Sos.length-1])==1){
                            Sos[Sos.length-2]="-"
                            Sos[Sos.length-1]=e.Number
                          }
                          else{
                            Sos=Sos+","+e.Number
                          }
                        }
                        else if(Sos[Sos.length-2]=="-"){
                          if(parseInt(Sos[Sos.length-3])-parseInt(Sos[Sos.length-1])==1
                          && parseInt(e.Number)-parseInt(Sos[Sos.length-1])==1){
                            Sos[Sos.length-1]=e.Number
                          }
                          else{
                            Sos=Sos+","+e.Number
                          }
                        }
                        
                      })
                      return(
                    
                    <tr>
                      <td style={{}}>{i.sr}</td>
                      <td style={{ textAlign: "center" }}>{i.Unit}</td>
                      <td>{i.CLO}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <i>{i.BTL.map((e)=>{return(<>{e.BTL}</>)})}</i>
                      </td>
                      <td style={{ textAlign: "center" }}>{Sos}</td>
                    </tr>
                )})}
                    
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
                    {CDF.CLOs.map((i)=>{
                    return(
                      <th className="col-1">{i.sr}</th>
                    )})}
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    <tr>
                      <td>Quizzes</td>
                      {CDF.CLOs.map((i)=>{
                      return(
                        <th>{i.Quizzes.map(e=>e.title)}</th>)})}
                    </tr>
                    <tr>
                      <td>Assignments</td>
                      {CDF.CLOs.map((i)=>{
                      return(
                        <th>{i.Assignment.map(e=>e.title)}</th>)})}
                    </tr>
                    <tr>
                    <td>Mid Term Exam</td>
                    {CDF.CLOs.map((i)=>{
                      return(
                        <th>{i.Mid}</th>)})}
                    </tr>
                    <tr>
                      <td>Final Term Exam</td>
                      {CDF.CLOs.map((i)=>{
                      return(
                        <th>{i.Final}</th>)})}
                    </tr>
                    <tr>
                      <td>Project</td>
                      {CDF.CLOs.map((i)=>{
                      return(
                        <th>{i.Project}</th>)})}
 
                    </tr>
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      )
}
