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
import { useLocation, useNavigate ,useParams} from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import comsatslogo from "../CACMember/comsats_logo.png";

export default function SyllabusReturnedView() {
    axios.defaults.withCredentials = true;
    const { Code } = useParams()

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
  const navigate = useNavigate();
  
  console.log("SO",SO)

  useEffect(() => {
    getContent()
    getstuff()
    getCat()
  }, []);
  const getstuff = async()=>{
    const res = await axios.get(`http://localhost:4000/CDF/shower/${Code}`)
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
      const response = await axios.get(`http://localhost:4000/Course/bycode/${Code}`);
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
      `http://localhost:4000/Syllabus/ReturnedCourse/${Code}`);
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
            <div className="col-2">
              <img src={comsatslogo} width="100px" height="100px"></img>
            </div>

            <div className="col-11">
              <h1>COMSATS University Islamabad</h1>
              <h1>Department of Computer Science</h1>
              <h1>Course Syllabus</h1>
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
          <div>
          <div style={{ paddingTop: 20 }}>
            <h4
              style={{ backgroundColor: "#000", color: "#fff", padding: 4 }}
              className="head"
            >
              Policy & Procedures
            </h4>
          </div>
          <div>
            <ul>
              <li className="pb-2">
                <b>Attendance Policy:</b> Every student must attend 80% of the
                lectures as well as laboratory in this course. The students
                falling short of required percentage of attendance of
                lectures/laboratory work, is not allowed to appear in the
                terminal examination.
              </li>
              <li className="pb-2">
                <b>Course Assessment: </b>
                <table
                  className="table table-bordered"
                  style={{ textAlign: "center" }}
                >
                  <thead
                    style={{ backgroundColor: "#f5f5f5", textAlign: "center" }}
                  >
                    <tr>
                      <th></th>
                      <th>Quizzes</th>
                      <th>Assignments</th>
                      <th>Mid Term Exam</th>
                      <th>Terminal Exam</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Theory(T)</th>
                      <td>15</td>
                      <td>10</td>
                      <td>25</td>
                      <td>50</td>
                      <td>100</td>
                    </tr>
                    <tr>
                      <th>Lab(L)</th>
                      <td>-</td>
                      <td>25</td>
                      <td>25</td>
                      <td>50</td>
                      <td>100</td>
                    </tr>
                    <tr>
                      <th>Final Marks (T+L)</th>
                      <th colSpan={5}>(T/100)*75 + (L/100)*25</th>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li className="pb-2">
                <b>Grading Policy: </b>The minimum passing marks for each course
                is 50% (In case of LAB; in addition to theory, student is also
                required to obtain 50% marks in the lab to pass the course). The
                correspondence between letter grades, credit points, and
                percentage marks at CUI is as follows:
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    style={{ textAlign: "center" }}
                  >
                    <thead
                      style={{
                        backgroundColor: "#f5f5f5",
                        textAlign: "center",
                      }}
                    >
                      <tr>
                        <th>Grade</th>
                        <th>A</th>
                        <th>A-</th>
                        <th>B+</th>
                        <th>B</th>
                        <th>B-</th>
                        <th>C+</th>
                        <th>C</th>
                        <th>C-</th>
                        <th>D+</th>
                        <th>D</th>
                        <th>F</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Marks</th>
                        <td> = 85</td>
                        <td>80 - 84</td>
                        <td>75 - 79</td>
                        <td>71 - 74</td>
                        <td>68 - 70</td>
                        <td>64 - 67</td>
                        <td>61 - 63</td>
                        <td>58 - 60</td>
                        <td>54 - 57</td>
                        <td>50 - 53</td>
                        <td> 50</td>
                      </tr>
                      <tr>
                        <th>Marks</th>
                        <td>3.67-4.00</td>
                        <td>3.34- 3.66</td>
                        <td>3.01-3.33</td>
                        <td>2.67-3.00</td>
                        <td>2.34-2.66</td>
                        <td>2.01-2.33</td>
                        <td>1.67-2.00</td>
                        <td>1.31-1.66</td>
                        <td>1.01-1.30</td>
                        <td>0.10-1.00</td>
                        <td> 0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li className="pb-2">
                <b>Academic Integrity: </b>All CUI policies regarding ethics
                apply to this course. The students are advised to discuss their
                grievances/problems with their counsellors or course instructor
                in a respectful manner.
              </li>
              <li className="pb-2">
                <b>Plagiarism Policy:</b> Plagiarism, copying and any other
                dishonest behaviour is prohibited by the rules and regulations
                of CUI. Violators will face serious consequences.
              </li>
            </ul>
          </div>
        </div>
        </div>
      </div>
      )
}
