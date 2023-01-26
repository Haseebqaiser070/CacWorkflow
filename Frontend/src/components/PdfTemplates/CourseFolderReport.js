import Button from "@mui/material/Button";
import { AiFillPrinter } from "react-icons/ai";

import React, { useEffect, useState, useRef } from "react";
import "./pdfstyles.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
export default function CourseFolderReport() {
  const componentRef = useRef();
  const [folders,setfolders]=useState([])
  const {row}=useLocation().state
  const [tdeadline1,settdeadline1]=useState();
  const [tdeadline2,settdeadline2]=useState();
  const [tdeadline11,settdeadline11]=useState();
  const [tdeadline22,settdeadline22]=useState();

  const [ldeadline1,setldeadline1]=useState();
  const [ldeadline2,setldeadline2]=useState();
  const [ldeadline11,setldeadline11]=useState();
  const [ldeadline22,setldeadline22]=useState();
  console.log("rew",row)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    getCourses();
  }, []);
  const getDeadline = async () => {
    const res = await axios.get(`http://localhost:4000/Content/ShowTheory`);
    var s=res.data.Round1.Deadline
    var s1=res.data.Round2.Deadline

    s=new Date(res.data.Round1.Deadline)
    s1=new Date(res.data.Round2.Deadline)
    
      settdeadline11(s)
      settdeadline1(s.getDate()+"/"+(s.getMonth()+1)+"/"+s.getFullYear()+" "+s.getHours()+":"+s.getMinutes()+':'+s.getSeconds());

      settdeadline22(s1)
      settdeadline2(s1.getDate()+"/"+(s1.getMonth()+1)+"/"+s1.getFullYear()+" "+s1.getHours()+":"+s1.getMinutes()+':'+s1.getSeconds());

      const ress = await axios.get(`http://localhost:4000/Content/ShowLab`);
    var s=ress.data?.Round1?.Deadline
    var s1=ress.data?.Round2?.Deadline

    s=new Date(ress?.data?.Round1?.Deadline)
    s1=new Date(ress?.data?.Round2?.Deadline)
    
      setldeadline11(s)
      setldeadline1(s.getDate()+"/"+(s.getMonth()+1)+"/"+s.getFullYear()+" "+s.getHours()+":"+s.getMinutes()+':'+s.getSeconds());

      setldeadline22(s1)
      setldeadline2(s1.getDate()+"/"+(s1.getMonth()+1)+"/"+s1.getFullYear()+" "+s1.getHours()+":"+s1.getMinutes()+':'+s1.getSeconds());
    


  };
  useEffect(()=>{
    getDeadline()

  },[])
  const SendReminder=async ()=>{
   await axios.post(`http://localhost:4000/Program/Reminder`,{email:row.Email})
   
  }
  const getCourses=()=>{
              
                     axios.get(`http://localhost:4000/EvalFolders/showfolder`).then((res)=>{
                      if(res.data!=null){
                        console.log("Folderta", res.data);
  
                        const arr=res.data.filter((item)=>item.User._id==row._id)
                        console.log("finalarray",arr)
                        setfolders(arr)

                      
                      }
                     }).catch((err)=>{
                      console.log(err)
                     })
                    
                    
                  //setfolders(array)
                }
  return (
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
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
             onClick={SendReminder}
        >
          <AiFillPrinter style={{ marginRight: 10 }} />
          Send Reminder
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
            <h2>Course Folder Report</h2>
          </div>
        </div>
        {folders.length>0?
      
      folders?.map((item)=>(
<>
<br></br>
<hr style={{width:"100%",borderWidth:2}}></hr>
<br></br>

        <div className="my-4">
          <h4>
            <b>Teacher: </b>{row.Name}
          </h4>
          <h4>
            <b>Program: </b>{item.Course.Program}
          </h4>
          <h4>
            <b>Course: </b>{item.Course.Name+" - "+item.Course.Code+" ("+item.LabTheory+")"}
          </h4>
        </div>
        <div className="my-4">
          <h4>Deadlines</h4>
          {item.LabTheory=="Theory"?
          <>
          <h5>
            <b>Round 1: {tdeadline1}</b>
          </h5>
          <h5>
            <b>Round 2: {tdeadline2}</b>
          </h5>
          </>
          :
          <>
          <h5>
            <b>Round 1: {ldeadline1}</b>
          </h5>
          <h5>
            <b>Round 2: {ldeadline2}</b>
          </h5>
          </>
          }
        </div>
        <div>
          <h1 className="my-4">Lecture Delivery Record</h1>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Lecture Delivery Record</th>
                {item.LectureDeliveryRecord==null?
                <td>Not Submitted</td>:
                <td>Submitted</td>
              }
                
              </tr>
            </thead>
          </table>
        </div>
        {item.LabTheory=="Theory"?
        <div>
          <h1 className="my-4">Quizzes</h1>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Quizzes</th>
                <th>Quiz 1</th>
                <th>Quiz 2</th>
                <th>Quiz 3</th>
                <th>Quiz 4</th>
              </tr>
            </thead>
            <tbody>
              <td></td>
              {(item.files.find((item)=>item.Title=="Quiz 1"))?
              <td>Submitted</td>:
              <td>Not Submitted</td>
              }
              {(item.files.find((item)=>item.Title=="Quiz 2"))?
              <td>Submitted</td>:
              <td>Not Submitted</td>
              }{(item.files.find((item)=>item.Title=="Quiz 3"))?
              <td>Submitted</td>:
              <td>Not Submitted</td>
              }{(item.files.find((item)=>item.Title=="Quiz 4"))?
              <td>Submitted</td>:
              <td>Not Submitted</td>
              }
            </tbody>
          </table>
        </div>
        :
        <></>
        }

        <div>
          <h1 className="my-4">Assignments</h1>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Assignments</th>
                <th>Assignment 1</th>
                <th>Assignment 2</th>
                <th>Assignment 3</th>
                <th>Assignment 4</th>
              </tr>
            </thead>
            <tbody>
              <td></td>
              {(item.files.find((item)=>item.Title=="Assignment 1"))?
              <td>Submitted</td>:
              <td>Not Submitted</td>
              }
              {(item.files.find((item)=>item.Title=="Assignment 2"))?
              <td>Submitted</td>:
              <td>Not Submitted</td>
              }{(item.files.find((item)=>item.Title=="Assignment 3"))?
              <td>Submitted</td>:
              <td>Not Submitted</td>
              }{(item.files.find((item)=>item.Title=="Assignment 4"))?
              <td>Submitted</td>:
              <td>Not Submitted</td>
            }
            </tbody>
          </table>
        </div>
        
        <div>
          <h1 className="my-4">Mid Term</h1>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Mid Term</th>
                {(item.files.find((item)=>item.Title=="Mid"))?
              <td>Submitted</td>:
              <td>Not Submitted</td>
            }
              </tr>
            </thead>
          </table>
        </div>
        <div>
          <h1 className="my-4">Terminal</h1>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Terminal</th>
                {(item.files.find((item)=>item.Title=="Terminal"))?
              <td>Submitted</td>:
              <td>Not Submitted</td>
            }
              </tr>
            </thead>
          </table>
        </div>
        <div>
          <h1 className="my-4">ICEF</h1>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ICEF</th>
                {item.ICEF==null?
                <td>Not Submitted</td>:
                <td>Submitted</td>
              }
              </tr>
            </thead>
          </table>
        </div>
        </>))
      :<div>No Folders </div>
      }
      </div>
      
    </div>
  );
}
