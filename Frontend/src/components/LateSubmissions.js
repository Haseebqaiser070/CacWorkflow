import React, { useState, useEffect } from "react";
import "./css/styles.css";
import { DataGrid } from "@mui/x-data-grid";
import { Button, getListSubheaderUtilityClass, LinearProgress, Modal } from "@mui/material";
import { AiOutlineFieldTime } from "react-icons/ai";
import { Box } from "@mui/system";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import CustomNoRowsOverlay from "./AuxillaryComponents/CustomNoRowsOverlay";

export default function PendingDeadlineRequests() {
  const [posts, setPosts] = useState({});
  const [Rows, setRows] = useState({});
  const [tdeadline1,settdeadline1]=useState();
  const [tdeadline2,settdeadline2]=useState();
  const [tdeadline11,settdeadline11]=useState();
  const [tdeadline22,settdeadline22]=useState();

  const [ldeadline1,setldeadline1]=useState();
  const [ldeadline2,setldeadline2]=useState();
  const [ldeadline11,setldeadline11]=useState();
  const [ldeadline22,setldeadline22]=useState();
  const columns = [
    {
      field: "Program",
      headerName: "Program",
      flex: 1,
    },
    {
      field: "Course",
      headerName: "Course",
      flex: 1,
    },
   
    {
      field: "Faculty",
      headerName: "Faculty Member",
      flex: 1,
    },
    {
      field: "Evaluator",
      headerName: "Evaluator",
      flex: 1,
    },
  ];
  const getDeadline = async () => {
    const res = await axios.get(`http://localhost:4000/Content/ShowTheory`);
    var s=res.data.Round1.Deadline
    var s1=res.data.Round2.Deadline

    s=new Date(res.data.Round1.Deadline)
    s1=new Date(res.data.Round2.Deadline)
    
      settdeadline11(s)
      settdeadline1(s.getDate()+"/"+(s.getMonth()+1)+"/"+s.getFullYear()+" "+s.getHours()+":"+s.getMinutes());

      settdeadline22(s1)
      settdeadline2(s1.getDate()+"/"+(s1.getMonth()+1)+"/"+s1.getFullYear()+" "+s1.getHours()+":"+s1.getMinutes());

      const ress = await axios.get(`http://localhost:4000/Content/ShowLab`);
    var s=ress.data?.Round1?.Deadline
    var s1=ress.data?.Round2?.Deadline

    s=new Date(ress?.data?.Round1?.Deadline)
    s1=new Date(ress?.data?.Round2?.Deadline)
    
      setldeadline11(s)
      setldeadline1(s.getDate()+"/"+(s.getMonth()+1)+"/"+s.getFullYear()+" "+s.getHours()+":"+s.getMinutes());

      setldeadline22(s1)
      setldeadline2(s1.getDate()+"/"+(s1.getMonth()+1)+"/"+s1.getFullYear()+" "+s1.getHours()+":"+s1.getMinutes());
    


  };
  useEffect(()=>{
    getDeadline()

  },[])
  useEffect(()=>{
    getFolders()

  },[ldeadline22])
  const getFolders = async () => {
    const res = await axios.get(`http://localhost:4000/Content/Folders`);
    console.log("FolderData",res.data);
    var array=[]
    const date=new Date(Date.now())
    var a=(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes())

    console.log("asa",date)
    console.log("asa",ldeadline11)

    if(date>tdeadline11){
      res?.data.map((item)=>{
        if(item.Round1==false && item.LabTheory.includes("Theory")){
          array.push({Program:item?.Course?.Program,Course:item?.Course?.Code+" ("+item?.LabTheory+")"+" -"+"Round1",Faculty:item?.User?.Name,Evaluator:item?.Evaluator?.Name})
        }
      })
    }
    if(date>tdeadline22){
      res?.data.map((item)=>{
        if(item.Round2==false && item.LabTheory.includes("Theory")){
          array.push({Program:item?.Course?.Program,Course:item?.Course?.Code+" ("+item?.LabTheory+")"+" -"+"Round2",Faculty:item?.User?.Name,Evaluator:item?.Evaluator?.Name})
        }
      })
    }
    if(date>ldeadline11){
      res?.data.map((item)=>{
        if(item.Round1==false && item.LabTheory.includes("Lab")){
          array.push({Program:item?.Course?.Program,Course:item?.Course?.Code+" ("+item?.LabTheory+")"+" -"+"Round1",Faculty:item?.User?.Name,Evaluator:item?.Evaluator?.Name})
        }
      })
    }
    if(date>ldeadline22){
      res?.data.map((item)=>{
        if(item.Round2==false && item.LabTheory.includes("Lab")){
          array.push({Program:item?.Course?.Program,Course:item?.Course?.Code+" ("+item?.LabTheory+")"+" -"+"Round2",Faculty:item?.User?.Name,Evaluator:item?.Evaluator?.Name})
        }
      })
    }
    console.log("array",array)
    var arr=[];
    array.map((item,index)=>{
      var a=arr.find((i)=>i==item)
      if(a==undefined){
        arr[index]={id:index,Program:item?.Program,Course:item?.Course,Faculty:item?.Faculty,Evaluator:item?.Evaluator}
      }
    })
    console.log("arr",arr)

    setRows(arr)
  };
  return (
    <div style={{ width: "100%", padding: 20 }}>
      <h1 className="mb-4 py-4">
        <b>LATE SUBMISSIONS</b>
      </h1>
      <p>Theory: {tdeadline1} ,   {tdeadline2}</p>
      <p>Lab: {ldeadline1}  , {ldeadline2}</p>
      <DataGrid
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
          LoadingOverlay: LinearProgress,
        }}
        style={{ height: 400, width: "100%" }}
        columns={columns}
        getRowId={(Rows) => Rows.id}
        rows={Rows}
        disableSelectionOnClick
      />
    </div>
  );
}
