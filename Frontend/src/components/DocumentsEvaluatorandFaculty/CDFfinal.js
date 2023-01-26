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
import comsatslogo from "../CACMember/comsats_logo.png";

export default function CDFFinal() {
  axios.defaults.withCredentials = true;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { Program,Code } = useParams();

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
  const[LabCLO,setLabCLO]=useState([])
  const[TheoryCLO,setTheoryCLO]=useState([])
  const [Totalteaching,setTotalteaching]=useState(0)
  const [CDF, setCDF] = useState(
    {    Topics:[],
          CLOs:[],
          textBook:[],
          referenceBook:[]}  )
  useEffect(() => {
    getData();
    getContent();
  }, []);
  console.log("Content",Content)
  
  console.log("CDF",CDF)
  const getContent = async () => {
    const response = await axios.get(`http://localhost:4000/CDF/showOne/${Program}/${Code}`)
    setCDF(response.data);
    var sum=0
    if(response.data.Topics.length>0){
      response.data.Topics.forEach((i)=> {
        sum=sum+parseFloat(i.TeachingHours)
        })
      }
      var LabCLOss=[]
      var TheoryCLOss=[]
      response.data.CLOs.forEach((i) => {
        if(i.LaborTheory=="Lab"){
          LabCLOss = [...LabCLOss, i];
        } else if(i.LaborTheory=="Theory") {
          TheoryCLOss = [...TheoryCLOss, i];
        }
      });
      setLabCLO([...LabCLOss])
      setTheoryCLO([...TheoryCLOss])
      setTotalteaching(sum)
  };

  const getData = async () => {
    const response = await axios.get(`http://localhost:4000/ProgramCourses/showcode/${Program}/${Code}`);
    setContent(response.data);
  };
  return(
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
                  <b>Course Code: {Content.Code} </b>
                </h6>
              </div>
              <div className="col">
                <h6 style={{ paddingBottom: 20, textAlign: "right" }}>
                  <b>Course Title: {Content.Name}</b>
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 style={{ paddingBottom: 20 }}>
                  <b>Credit Hour: {Content.Credit+"("+Content.LectureHoursWeek+
                  ","+Content.LabHoursWeek+")"} </b>
                </h6>
              </div>
              <div className="col">
                <h6 style={{ paddingBottom: 20, textAlign: "right" }}>
                  <b>Lecture Hours/Week: {Content.LectureHoursWeek}</b>
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 style={{ paddingBottom: 20 }}>
                  <b>Lab Hours/Week: {Content.LabHoursWeek}</b>
                </h6>
              </div>
              <div className="col">
                <h6 style={{ textAlign: "right" }}>
                  <b>Pre-Requisite: {Content.PreRequisites.map((i)=>{
                    return(<>{i.Code}</>)
                  })}</b>
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
              {Content.catalogue}
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
      

              { 
              CDF.Topics.map((i)=>
              {return(
                  <>
                  <tr>
                    <td style={{ textAlign: "center" }}>{i.Unit}</td>
                    <td>
                      {i.Topic}
                    </td>
                    <td style={{ textAlign: "center" }}>{i.TeachingHours}</td>
                  </tr>
                  </>
                  )})}
                  <tr>
                    <th colSpan={2}>Total Contact Hours</th>
                    <td style={{ textAlign: "center" }}>{Totalteaching}</td>
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

                  {TheoryCLO.map(i=>{
                    var Sos=""
                    i.So.forEach((e)=>{
                      console.log("Sos",Sos)
                      if(Sos==""){
                        Sos=e.Number
                      }
                      else if(Sos.length==1){
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
                    <td>
                      {i.CLO}
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
          
                    
                  <tr className="py-2" style={{ textAlign: "center" }}>
                    <th colSpan={5}>CLO’s for Lab</th>
                  </tr>

                  {LabCLO?.map(i=>{
                    var Sos=""
                    i?.So.forEach((e)=>{
                      console.log("Sos",Sos)
                      if(Sos==""){
                        Sos=e.Number
                      }
                      else if(Sos?.length==1){
                        Sos=Sos+","+e.Number
                      }
                      else if(Sos[Sos?.length-2]==","){
                        if(parseInt(Sos[Sos.length-3])-parseInt(Sos[Sos.length-1])==1
                        && parseInt(e.Number)-parseInt(Sos[Sos.length-1])==1){
                          Sos[Sos.length-2]="-"
                          Sos[Sos.length-1]=e?.Number
                        }
                        else{
                          Sos=Sos+","+e?.Number
                        }
                      }
                      else if(Sos[Sos?.length-2]=="-"){
                        if(parseInt(Sos[Sos?.length-3])-parseInt(Sos[Sos?.length-1])==1
                        && parseInt(e?.Number)-parseInt(Sos[Sos?.length-1])==1){
                          Sos[Sos?.length-1]=e.Number
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
                  <th className="col-1">Assessment Tools</th>
                  {CDF.CLOs.map((i)=>{
                  return(
                    <th className="col-1">{i.sr}</th>
                  )})}
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
                {CDF.textBook.map((i)=>{
                  return(<li>{i.BookName}, {i.BookWriter}, {i.BookYear}</li>)})}
              </ol>

              <h4>Reference Books:</h4>
              <ol>
              {CDF.referenceBook.map((i)=>{
                  return(<li>{i.BookName}, {i.BookWriter}, {i.BookYear}</li>)})}
              </ol>
            </div>
          </div>
        </div>
      </div>
  </div>  
  );
}
