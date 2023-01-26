import Button from "@mui/material/Button";
import { AiFillPrinter } from "react-icons/ai";

import React, { useEffect, useState, useRef } from "react";
import "./pdfstyles.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
export default function CourseFolderCombinedReport() {
  const componentRef = useRef();
  const [folders, setfolders] = useState([]);
  const [tdeadline1, settdeadline1] = useState();
  const [tdeadline2, settdeadline2] = useState();
  const [tdeadline11, settdeadline11] = useState();
  const [tdeadline22, settdeadline22] = useState();

  const [ldeadline1, setldeadline1] = useState();
  const [ldeadline2, setldeadline2] = useState();
  const [ldeadline11, setldeadline11] = useState();
  const [ldeadline22, setldeadline22] = useState();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
 
  const getDeadline = async () => {
    const res = await axios.get(`http://localhost:4000/Content/ShowTheory`);
    var s = res.data.Round1.Deadline;
    var s1 = res.data.Round2.Deadline;

    s = new Date(res.data.Round1.Deadline);
    s1 = new Date(res.data.Round2.Deadline);

    settdeadline11(s);
    settdeadline1(
      s.getDate() +
        "/" +
        (s.getMonth() + 1) +
        "/" +
        s.getFullYear() +
        " " +
        s.getHours() +
        ":" +
        s.getMinutes() +
        ":" +
        s.getSeconds()
    );

    settdeadline22(s1);
    settdeadline2(
      s1.getDate() +
        "/" +
        (s1.getMonth() + 1) +
        "/" +
        s1.getFullYear() +
        " " +
        s1.getHours() +
        ":" +
        s1.getMinutes() +
        ":" +
        s1.getSeconds()
    );

    const ress = await axios.get(`http://localhost:4000/Content/ShowLab`);
    var s = ress.data?.Round1?.Deadline;
    var s1 = ress.data?.Round2?.Deadline;

    s = new Date(ress?.data?.Round1?.Deadline);
    s1 = new Date(ress?.data?.Round2?.Deadline);

    setldeadline11(s);
    setldeadline1(
      s.getDate() +
        "/" +
        (s.getMonth() + 1) +
        "/" +
        s.getFullYear() +
        " " +
        s.getHours() +
        ":" +
        s.getMinutes() +
        ":" +
        s.getSeconds()
    );

    setldeadline22(s1);
    setldeadline2(
      s1.getDate() +
        "/" +
        (s1.getMonth() + 1) +
        "/" +
        s1.getFullYear() +
        " " +
        s1.getHours() +
        ":" +
        s1.getMinutes() +
        ":" +
        s1.getSeconds()
    );
  };
  console.log("Foldertasss", folders);
  useEffect(() => {
    getDeadline();
  }, []);
  // const SendReminder = async () => {
  //   await axios.post(`http://localhost:4000/Program/Reminder`, {
  //     email: row.Email,
  //   });
  // };

  useEffect(() => {
    getCourses();
  }, []);
  const getCourses = () => {
    axios
      .get(`http://localhost:4000/EvalFolders/showfolder`)
      .then((res) => {
          console.log("Folderta", res.data);
          // const arr=res.data.map((item)=>item)
          // console.log("finalarray",arr)
          setfolders(res.data)
        
      })
      
      .catch((err) => {
        console.log(err);
      });

    //setfolders(array)
  };
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
      </div>

      <div ref={componentRef} className="main">
        <div
          className="d-flex row justify-content-center mb-4"
          style={{ margin: 30 }}
        >
          <div className="col-12">
            <h1>COMSATS University Islamabad</h1>
            <h1>Department of Computer Science</h1>
            <h2>Course Folder Submission Report</h2>
          </div>
        </div>
        
        {/* [
    {
        "_id": "638f1fbe781742c1c7cd3572",
        "Program": "BS Computer Science",
        "Course": {
            "_id": "63884a22f4f8b572637bfaf4",
            "Program": "BS Computer Science",
            "Code": "CSC-241",
            "Name": "Object Oriented Programming",
            "Credit": "4",
            "LectureHoursWeek": "3",
            "LabHoursWeek": "1",
            "PreRequisites": [],
            "catalogue": "This course emphasizes the concepts of object-oriented techniques used in developing computer-based system. The topics include: Overview of Object-Oriented Programming; Classes & its Concepts; Problem Solving   in   Object   Oriented   Paradigm; Inheritance; Polymorphism; Library Components; Object Oriented Concepts of File Handling; Swing Classes; Events & Event Handlers; and Canonical Uses.",
            "objectiveList": [
                {
                    "id": "825f868e-936f-4ecb-99ac-9f49162487a4",
                    "title": "To Introduce the Object Oriented Programming Paradigm;;",
                    "_id": "638842aaf4f8b572637bf2fa"
                },
                {
                    "id": "855e3533-e210-4aad-a5d9-6ab5f2b58cee",
                    "title": "To Teach in Depth the Philosophy of Object-oriented Design and Concepts of Encapsulation, Abstraction, Inheritance and Polymorphism;;",
                    "_id": "638842aaf4f8b572637bf2fb"
                },
                {
                    "id": "3d8720c3-e75a-42ab-99ca-f984f4b38898",
                    "title": "To Develop Understanding of  Sub Typing and Generic Types;",
                    "_id": "638842aaf4f8b572637bf2fc"
                },
                {
                    "id": "01fda049-862f-4e85-a163-09315613abfb",
                    "title": "To Explain the Usage of Library Components;;",
                    "_id": "638842aaf4f8b572637bf2fd"
                },
                {
                    "id": "e03033a8-f4ae-4e71-a5b4-94837985f878",
                    "title": "To Develop Code That Responds To Exception Conditions Raised During Execution;",
                    "_id": "638842aaf4f8b572637bf2fe"
                },
                {
                    "id": "72257128-cada-42a4-93a2-651193c04b6a",
                    "title": "To Develop Understanding of Event Handlers for Use in Reactive Systems, Such As GUIs;",
                    "_id": "638842aaf4f8b572637bf2ff"
                },
                {
                    "id": "cb246c99-1ade-4eb6-a009-6782754f5c32",
                    "title": "To Demonstrate Implementation of the Concepts.",
                    "_id": "638842aaf4f8b572637bf300"
                }
            ],
            "Books": [
                {
                    "id": "ef21c08f-1d6c-489e-9978-96f7c3016216",
                    "BookName": "Introduction To Java Programming and Data Structures, Comprehensive Version",
                    "BookWriter": "Y. Liang, Y. Daniel Liang, Pearson, ",
                    "BookYear": "2.",
                    "_id": "638842aaf4f8b572637bf301"
                },
                {
                    "id": "61ff4674-5aae-4e63-a561-e51f906f29f6",
                    "BookName": "Concise Guide To Object-Oriented Programming",
                    "BookWriter": "Kingsley Sage, Springer",
                    "BookYear": "2.",
                    "_id": "638842aaf4f8b572637bf302"
                },
                {
                    "id": "ad36f894-c396-42dc-90f5-f66f36cca2f7",
                    "BookName": "Absolute Java,",
                    "BookWriter": "Savitch, W. & Mock, K., Pearson",
                    "BookYear": "2.",
                    "_id": "638842aaf4f8b572637bf303"
                }
            ],
            "__v": 0
        },
        "Section": "a",
        "User": {
            "_id": "6366b387a2da35b199cc7e7c",
            "Name": "Cac Fyp",
            "Email": "cacfyp@gmail.com",
            "Password": "$2b$12$Ihgq20OMTl1/6jo1uMQ99e9ItPTPtzITMOV4rcALzDKEnAdTa7vGC",
            "Phone": "834889438",
            "Activated": true,
            "Roles": [
                "Admin",
                "CAC",
                "Faculty",
                "Evaluator"
            ],
            "CourseCreation": [
                "638764440a43d72e89808305"
            ],
            "CourseCDF": [],
            "CourseSyllabus": [
                "638760ac0a43d72e898076a3",
                "638764440a43d72e89808305"
            ],
            "CourseFolders": [
                "638f1fbe781742c1c7cd3572",
                "638f1fbe781742c1c7cd3575"
            ],
            "EvaluateFolders": [
                "638f20c8781742c1c7cd36d3"
            ],
            "SOSCreation": [
                {
                    "Program": "MS Software Engineering",
                    "_id": "63a0dc3f052a970850bd5c1a"
                }
            ],
            "__v": 0
        },
        "files": [
            {
                "Question": {
                    "Name": "dummy.pdf",
                    "Base64": "638f1fe9781742c1c7cd35a1"
                },
                "Solution": {
                    "Name": "dummy.pdf",
                    "Base64": "638f1fe9781742c1c7cd35a3"
                },
                "Awardlist": {
                    "Name": "dummy.pdf",
                    "Base64": "638f1fe9781742c1c7cd35a5"
                },
                "Best": {
                    "Name": "dummy.pdf",
                    "Base64": "638f1fe9781742c1c7cd35a7"
                },
                "Average": {
                    "Name": "dummy.pdf",
                    "Base64": "638f1fe9781742c1c7cd35a9"
                },
                "Worst": {
                    "Name": "dummy.pdf",
                    "Base64": "638f1fe9781742c1c7cd35ab"
                },
                "Title": "Quiz 1",
                "_id": "638f1fe9781742c1c7cd35ad"
            },
            {
                "Question": {
                    "Name": "dummy.pdf",
                    "Base64": "638f203a781742c1c7cd35fb"
                },
                "Solution": {
                    "Name": "dummy.pdf",
                    "Base64": "638f203a781742c1c7cd35fd"
                },
                "Awardlist": {
                    "Name": "dummy.pdf",
                    "Base64": "638f203a781742c1c7cd35ff"
                },
                "Best": {
                    "Name": "dummy.pdf",
                    "Base64": "638f203a781742c1c7cd3601"
                },
                "Average": {
                    "Name": "dummy.pdf",
                    "Base64": "638f203a781742c1c7cd3603"
                },
                "Worst": {
                    "Name": "dummy.pdf",
                    "Base64": "638f203a781742c1c7cd3605"
                },
                "Title": "Quiz 2",
                "_id": "638f203a781742c1c7cd3607"
            },
            {
                "Question": {
                    "Name": "dummy.pdf",
                    "Base64": "638f2054781742c1c7cd3617"
                },
                "Solution": {
                    "Name": "dummy.pdf",
                    "Base64": "638f2054781742c1c7cd3619"
                },
                "Awardlist": {
                    "Name": "dummy.pdf",
                    "Base64": "638f2054781742c1c7cd361b"
                },
                "Best": {
                    "Name": "dummy.pdf",
                    "Base64": "638f2054781742c1c7cd361d"
                },
                "Average": {
                    "Name": "dummy.pdf",
                    "Base64": "638f2054781742c1c7cd361f"
                },
                "Worst": {
                    "Name": "dummy.pdf",
                    "Base64": "638f2054781742c1c7cd3621"
                },
                "Title": "Assignment 1",
                "_id": "638f2054781742c1c7cd3623"
            },
            {
                "Question": {
                    "Name": "dummy.pdf",
                    "Base64": "638f207a781742c1c7cd3636"
                },
                "Solution": {
                    "Name": "dummy.pdf",
                    "Base64": "638f207a781742c1c7cd3638"
                },
                "Awardlist": {
                    "Name": "dummy.pdf",
                    "Base64": "638f207a781742c1c7cd363a"
                },
                "Best": {
                    "Name": "dummy.pdf",
                    "Base64": "638f207a781742c1c7cd363c"
                },
                "Average": {
                    "Name": "dummy.pdf",
                    "Base64": "638f207a781742c1c7cd363e"
                },
                "Worst": {
                    "Name": "dummy.pdf",
                    "Base64": "638f207a781742c1c7cd3640"
                },
                "Title": "Assignment 2",
                "_id": "638f207a781742c1c7cd3642"
            },
            {
                "Question": {
                    "Name": "dummy.pdf",
                    "Base64": "638f208d781742c1c7cd3659"
                },
                "Solution": {
                    "Name": "dummy.pdf",
                    "Base64": "638f208d781742c1c7cd365b"
                },
                "Awardlist": {
                    "Name": "dummy.pdf",
                    "Base64": "638f208d781742c1c7cd365d"
                },
                "Best": {
                    "Name": "dummy.pdf",
                    "Base64": "638f208d781742c1c7cd365f"
                },
                "Average": {
                    "Name": "dummy.pdf",
                    "Base64": "638f208d781742c1c7cd3661"
                },
                "Worst": {
                    "Name": "dummy.pdf",
                    "Base64": "638f208d781742c1c7cd3663"
                },
                "Title": "Mid",
                "_id": "638f208e781742c1c7cd3665"
            }
        ],
        "LabTheory": "Theory",
        "LectureDeliveryRecord": null,
        "ICEF": null,
        "Obe": null,
        "Round1": true,
        "Round2": false,
        "Evaluated": false,
        "WantRevision": false,
        "Revision": false,
        "Evaluator": {
            "_id": "6366b387a2da35b199cc7e7c",
            "Name": "Cac Fyp",
            "Email": "cacfyp@gmail.com",
            "Password": "$2b$12$Ihgq20OMTl1/6jo1uMQ99e9ItPTPtzITMOV4rcALzDKEnAdTa7vGC",
            "Phone": "834889438",
            "Activated": true,
            "Roles": [
                "Admin",
                "CAC",
                "Faculty",
                "Evaluator"
            ],
            "CourseCreation": [
                "638764440a43d72e89808305"
            ],
            "CourseCDF": [],
            "CourseSyllabus": [
                "638760ac0a43d72e898076a3",
                "638764440a43d72e89808305"
            ],
            "CourseFolders": [
                "638f1fbe781742c1c7cd3572",
                "638f1fbe781742c1c7cd3575"
            ],
            "EvaluateFolders": [
                "638f20c8781742c1c7cd36d3"
            ],
            "SOSCreation": [
                {
                    "Program": "MS Software Engineering",
                    "_id": "63a0dc3f052a970850bd5c1a"
                }
            ],
            "__v": 0
        },
        "Evaluation": [
            {
                "_id": "638f1fbe781742c1c7cd3573"
            },
            {
                "title": "Quiz 1",
                "clo_correct": false,
                "btl_correct": false,
                "Comments": "helloa",
                "Feedback": "helloa",
                "_id": "638f2141781742c1c7cd3795"
            }
        ],
        "__v": 0
    },
    {
        "_id": "638f1fbe781742c1c7cd3575",
        "Program": "BS Computer Science",
        "Course": {
            "_id": "63884a22f4f8b572637bfaf4",
            "Program": "BS Computer Science",
            "Code": "CSC-241",
            "Name": "Object Oriented Programming",
            "Credit": "4",
            "LectureHoursWeek": "3",
            "LabHoursWeek": "1",
            "PreRequisites": [],
            "catalogue": "This course emphasizes the concepts of object-oriented techniques used in developing computer-based system. The topics include: Overview of Object-Oriented Programming; Classes & its Concepts; Problem Solving   in   Object   Oriented   Paradigm; Inheritance; Polymorphism; Library Components; Object Oriented Concepts of File Handling; Swing Classes; Events & Event Handlers; and Canonical Uses.",
            "objectiveList": [
                {
                    "id": "825f868e-936f-4ecb-99ac-9f49162487a4",
                    "title": "To Introduce the Object Oriented Programming Paradigm;;",
                    "_id": "638842aaf4f8b572637bf2fa"
                },
                {
                    "id": "855e3533-e210-4aad-a5d9-6ab5f2b58cee",
                    "title": "To Teach in Depth the Philosophy of Object-oriented Design and Concepts of Encapsulation, Abstraction, Inheritance and Polymorphism;;",
                    "_id": "638842aaf4f8b572637bf2fb"
                },
                {
                    "id": "3d8720c3-e75a-42ab-99ca-f984f4b38898",
                    "title": "To Develop Understanding of  Sub Typing and Generic Types;",
                    "_id": "638842aaf4f8b572637bf2fc"
                },
                {
                    "id": "01fda049-862f-4e85-a163-09315613abfb",
                    "title": "To Explain the Usage of Library Components;;",
                    "_id": "638842aaf4f8b572637bf2fd"
                },
                {
                    "id": "e03033a8-f4ae-4e71-a5b4-94837985f878",
                    "title": "To Develop Code That Responds To Exception Conditions Raised During Execution;",
                    "_id": "638842aaf4f8b572637bf2fe"
                },
                {
                    "id": "72257128-cada-42a4-93a2-651193c04b6a",
                    "title": "To Develop Understanding of Event Handlers for Use in Reactive Systems, Such As GUIs;",
                    "_id": "638842aaf4f8b572637bf2ff"
                },
                {
                    "id": "cb246c99-1ade-4eb6-a009-6782754f5c32",
                    "title": "To Demonstrate Implementation of the Concepts.",
                    "_id": "638842aaf4f8b572637bf300"
                }
            ],
            "Books": [
                {
                    "id": "ef21c08f-1d6c-489e-9978-96f7c3016216",
                    "BookName": "Introduction To Java Programming and Data Structures, Comprehensive Version",
                    "BookWriter": "Y. Liang, Y. Daniel Liang, Pearson, ",
                    "BookYear": "2.",
                    "_id": "638842aaf4f8b572637bf301"
                },
                {
                    "id": "61ff4674-5aae-4e63-a561-e51f906f29f6",
                    "BookName": "Concise Guide To Object-Oriented Programming",
                    "BookWriter": "Kingsley Sage, Springer",
                    "BookYear": "2.",
                    "_id": "638842aaf4f8b572637bf302"
                },
                {
                    "id": "ad36f894-c396-42dc-90f5-f66f36cca2f7",
                    "BookName": "Absolute Java,",
                    "BookWriter": "Savitch, W. & Mock, K., Pearson",
                    "BookYear": "2.",
                    "_id": "638842aaf4f8b572637bf303"
                }
            ],
            "__v": 0
        },
        "Section": "a",
        "User": {
            "_id": "6366b387a2da35b199cc7e7c",
            "Name": "Cac Fyp",
            "Email": "cacfyp@gmail.com",
            "Password": "$2b$12$Ihgq20OMTl1/6jo1uMQ99e9ItPTPtzITMOV4rcALzDKEnAdTa7vGC",
            "Phone": "834889438",
            "Activated": true,
            "Roles": [
                "Admin",
                "CAC",
                "Faculty",
                "Evaluator"
            ],
            "CourseCreation": [
                "638764440a43d72e89808305"
            ],
            "CourseCDF": [],
            "CourseSyllabus": [
                "638760ac0a43d72e898076a3",
                "638764440a43d72e89808305"
            ],
            "CourseFolders": [
                "638f1fbe781742c1c7cd3572",
                "638f1fbe781742c1c7cd3575"
            ],
            "EvaluateFolders": [
                "638f20c8781742c1c7cd36d3"
            ],
            "SOSCreation": [
                {
                    "Program": "MS Software Engineering",
                    "_id": "63a0dc3f052a970850bd5c1a"
                }
            ],
            "__v": 0
        },
        "files": [],
        "LabTheory": "Lab",
        "LectureDeliveryRecord": null,
        "ICEF": null,
        "Obe": null,
        "Round1": false,
        "Round2": false,
        "Evaluated": false,
        "WantRevision": false,
        "Revision": false,
        "Evaluator": null,
        "Evaluation": [
            {
                "0": "n",
                "1": "o",
                "2": "n",
                "3": "e",
                "_id": "638f1fbe781742c1c7cd3576"
            }
        ],
        "__v": 0
    }
] */}
        {folders.length > 0 ? (
          folders?.map((item,index) => (
            <>
              <br></br>
              <hr style={{ width: "100%", borderWidth: 2 }}></hr>
              <br></br>
              <div className="my-4">
                <h4
                  style={{ backgroundColor: "#000", color: "#fff", padding: 5 }}
                >
                  <b>{index+1+")"} Teacher: </b>
                  {item?.User?.Name}
                </h4>
                <h4>           
                  <b>Program: </b>
                  {item?.Program}
                </h4>
                <h4>
                  <b>Course: </b>
                  {item?.Course?.Name +
                    " - " +
                    item?.Course?.Code +
                    " (" +
                    item?.LabTheory +
                    ")"}
                </h4>
              </div>
              <div className="my-4 p-4" style={{ backgroundColor: "#f5f5f5" }}>
                <h4>Deadlines</h4>
                {item?.LabTheory == "Theory" ? (
                  <>
                    <h5>
                      <b>Round 1: {tdeadline1}</b>
                    </h5>
                    <h5>
                      <b>Round 2: {tdeadline2}</b>
                    </h5>
                  </>
                ) : (
                  <>
                    <h5>
                      <b>Round 1: {ldeadline1}</b>
                    </h5>
                    <h5>
                      <b>Round 2: {ldeadline2}</b>
                    </h5>
                  </>
                )}
              </div>
              <div>
                <h1 className="my-4">Lecture Delivery Record</h1>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Lecture Delivery Record</th>
                      {item?.LectureDeliveryRecord == null ? (
                        <td>Not Submitted</td>
                      ) : (
                        <td>Submitted</td>
                      )}
                    </tr>
                  </thead>
                </table>
              </div>
              {item?.LabTheory == "Theory" ? (
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
                      {item?.files?.find((item) => item?.Title == "Quiz 1") ? (
                        <td>Submitted</td>
                      ) : (
                        <td>Not Submitted</td>
                      )}
                      {item?.files?.find((item) => item?.Title == "Quiz 2") ? (
                        <td>Submitted</td>
                      ) : (
                        <td>Not Submitted</td>
                      )}
                      {item?.files?.find((item) => item?.Title == "Quiz 3") ? (
                        <td>Submitted</td>
                      ) : (
                        <td>Not Submitted</td>
                      )}
                      {item?.files?.find((item) => item?.Title == "Quiz 4") ? (
                        <td>Submitted</td>
                      ) : (
                        <td>Not Submitted</td>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <></>
              )}

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
                    {item?.files?.find((item) => item?.Title == "Assignment 1") ? (
                      <td>Submitted</td>
                    ) : (
                      <td>Not Submitted</td>
                    )}
                    {item?.files?.find((item) => item?.Title == "Assignment 2") ? (
                      <td>Submitted</td>
                    ) : (
                      <td>Not Submitted</td>
                    )}
                    {item?.files?.find((item) => item?.Title == "Assignment 3") ? (
                      <td>Submitted</td>
                    ) : (
                      <td>Not Submitted</td>
                    )}
                    {item?.files?.find((item) => item?.Title == "Assignment 4") ? (
                      <td>Submitted</td>
                    ) : (
                      <td>Not Submitted</td>
                    )}
                  </tbody>
                </table>
              </div>

              <div>
                <h1 className="my-4">Mid Term</h1>

                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Mid Term</th>
                      {item?.files?.find((item) => item?.Title == "Mid") ? (
                        <td>Submitted</td>
                      ) : (
                        <td>Not Submitted</td>
                      )}
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
                      {item?.files?.find((item) => item?.Title == "Terminal") ? (
                        <td>Submitted</td>
                      ) : (
                        <td>Not Submitted</td>
                      )}
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
                      {item?.ICEF == null ? (
                        <td>Not Submitted</td>
                      ) : (
                        <td>Submitted</td>
                      )}
                    </tr>
                  </thead>
                </table>
              </div>
            </>
          ))
        ) : (
          <div>No Folders </div>
        )}
      </div>
    </div>
  );
}
