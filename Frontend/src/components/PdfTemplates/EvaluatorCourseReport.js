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
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { Box } from "@mui/system";

export default function EvaluatorCourseReport() {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [data,setdata] =useState([])
  const [Programs,setPrograms] =useState([])
  const [program,setprogram] =useState("")
  const [Users,setUsers] =useState([])
  const [user,setuser] =useState("")
  var count = 0
  useEffect(()=>{
    getData()
    getData2()
    getRows()
  },[])
  const getRows = async () => {
    const res = await axios.get("http://localhost:4000/Program/show");
    setPrograms(res.data)
  }
  const getData = async () => {
    const res = await axios.get("http://localhost:4000/EvalFolders/showforReportser");
    setdata(res.data)
  };
  const getData2 = async () => {
    const response = await axios.get("http://localhost:4000/User/show/Evaluator");
    setUsers(response.data);
  };
  return (
    <>
      <div style={{ padding: 30 }}>
        <div className="d-flex justify-content-end">
          <div className="row ">
            <div className="col">
              <Box sx={{ minWidth: 220 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="taskType">Filter By Program</InputLabel>
                  <Select
                   value={program}
                   label="Generate Report"
                   onChange={(e) =>{
                     setprogram(e.target.value)
                     count=0
                   }
                 }
                 >
                 {Programs.map((a) => {
                   return (
                     <MenuItem value={a.Degree +" "+ a.Program}>
                       {a.Degree} {a.Program}
                     </MenuItem>
                   );
                 })}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="col">
              <Box sx={{ minWidth: 220 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="taskType">Filter By Evaluator</InputLabel>
                  <Select
                     value={user}
                     label="Generate Report"
                     onChange={(e) =>{
                        setuser(e.target.value)
                        count=0
                       }
                     }
                   > {Users.map((a) => {
                       return (
                         <MenuItem value={a}>
                           {a.Name}
                         </MenuItem>
                       );
                     })}
                    </Select>
                </FormControl>
              </Box>
            </div>

            <div className="col">
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
          </div>
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
          
          {data.map((e)=>{
            if(user==""||user.Name==e.Name){
            count = count+1
            var count2=0
            return(            
          <>
          <h3
            style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: 5,
            textAlign: "left",
            }}
          className="head my-4">
            {count} {e.Name}
          </h3> 
            {e.EvaluateFolders.length>=1?(
            <table className="table table-bordered">
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th className="col-1">S. No</th>
                  <th className="col-4">Faculty Name</th>
                  <th className="col-3">Program</th>
                  <th className="col-3">Course Title</th>
                  <th className="col-1">Section</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {e.EvaluateFolders.map((i)=>{
                  if(program==""||i.Folder.Program==program){
                  count2 = count2+1
                  return(
                    <tr>
                      <td className="col-1">{count2}.</td>
                      <td className="col-4">{i.Folder.User.Name}</td>
                      <td className="col-3">{i.Folder.Program}</td>
                      {i.Folder.LabTheory=="Lab"?(<td className="col-3">{i.Folder.Course.Name}(Lab)</td>):(<td className="col-3">{i.Folder.Course.Name}</td>)}
                      <td className="col-1">{i.Folder.Section}</td>
                    </tr>
                )}})}
              </tbody>
            </table>):(<h4
            style={{
            padding: 5,
            }}
          className="head my-4">
            No Folders Assigned
            </h4>
             )}
            </>)}
          })}

          </div>
        </div>
      </div>
    </>
  );
}
