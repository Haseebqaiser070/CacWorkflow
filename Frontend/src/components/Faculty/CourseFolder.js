import React, { useState, useEffect } from "react";
import "../css/styles.css";
import Button from "@mui/material/Button";
import Popup from "../AuxillaryComponents/PopupFunction";
import { Box, Card, CardMedia, Modal } from "@mui/material";
import axios from "axios";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NestCamWiredStandTwoTone } from "@mui/icons-material";
import useAuth from "../../MyHooks/useAuth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  //   border: "2px solid #000",

  boxShadow: 24,
  p: 4,
};

export default function CourseFolder() {
  axios.defaults.withCredentials = true;
  const { id } = useParams();
  const userid = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open3, setOpen3] = useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const [date, setdate] = useState(new Date(Date.now()));
  const [folders, setfolders] = useState("");

  useEffect(() => {
    getTheory();
  }, []);

  const [Assignments1, setAssignments1] = useState([]);
  const [Assignments2, setAssignments2] = useState([]);
  const [Quiz1, setQuiz1] = useState([]);
  const [Quiz2, setQuiz2] = useState([]);

  const getTheory = async () => {
    const res = await axios.get("http://localhost:4000/Content/showTheory");
    setfolders(res.data);
    var quiz1 = [];
    var assignments1 = [];
    var quiz2 = [];
    var assignments2 = [];
    console.log("setfolfers", folders);
    for (
      var i = 1;
      i <= parseInt(res.data.Round1.Quiz) + parseInt(res.data.Round2.Quiz);
      i++
    ) {
      if (i <= parseInt(res.data.Round1.Quiz)) {
        quiz1.push(i);
      } else {
        quiz2.push(i);
      }
    }
    for (
      var i = 1;
      i <=
      parseInt(res.data.Round1.Assignment) +
        parseInt(res.data.Round2.Assignment);
      i++
    ) {
      if (i <= parseInt(res.data.Round1.Assignment)) {
        assignments1.push(i);
      } else {
        assignments2.push(i);
      }
    }
    setQuiz1([...quiz1]);
    setQuiz2([...quiz2]);
    setAssignments1([...assignments1]);
    setAssignments2([...assignments2]);
  };
  const [Title, setTitle] = useState("");
  const quiztitle = (num) => {
    var t = "Quiz " + num;
    setTitle(t);
  };
  const Assignmenttitle = (num) => {
    var t = "Assignment " + num;
    setTitle(t);
  };
  const Midtitle = () => {
    var t = "Mid";
    setTitle(t);
  };
  const Sess1 = () => {
    var t = "Sessional 1";
    setTitle(t);
  };
  const Sess2 = () => {
    var t = "Sessional 2";
    setTitle(t);
  };
  const Final = () => {
    var t = "Terminal";
    setTitle(t);
  };

  const [LectureDeliveryRecord, setLectureDeliveryRecord] = useState("");
  const [Question, setQuestion] = useState("");
  const [Awardlist, setAwardlist] = useState("");
  const [Best, setBest] = useState("");
  const [Average, setAverage] = useState("");
  const [Worst, setWorst] = useState("");
  const [Solution, setSolution] = useState("");
  const [Question1, setQuestion1] = useState("");
  const [Awardlist1, setAwardlist1] = useState("");
  const [Best1, setBest1] = useState("");
  const [Average1, setAverage1] = useState("");
  const [Worst1, setWorst1] = useState("");
  const [Solution1, setSolution1] = useState("");
  const [ICEF, setICEF] = useState("");
  const [Obe, setObe] = useState("");
  const [deadline1, setdeadline1] = useState();
  const [deadline2, setdeadline2] = useState();
  const [deadline11, setdeadline11] = useState();
  const [deadline22, setdeadline22] = useState();
  const [round1flag, setflag1] = useState(false);
  const [deadlinereq1, setdeadreq1] = useState(false);
  const [deadlinereq2, setdeadreq2] = useState(false);
  const [round2flag, setflag2] = useState(false);
  const [pressed, setpressed] = useState(false);
  const [pressed1, setpressed1] = useState(false);
  const [submitted1, setSubmitted1] = useState(false);
  const [submitted2, setSubmitted2] = useState(false);
  const [submittedRevision, setRevisionSubmitted] = useState(false);
  const [submittedflag, setSubmittedflag] = useState(false);

  const [fileBase64String, setFileBase64String] = useState("");
  const setflag = async (deadline11, deadline22) => {
    var b = date.getMonth() + 1;
    var a =
      date.getDate() +
      "/" +
      b +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();
    console.log("date", deadline22);
    console.log("dsaa", date);

    if (date > deadline11) {
      setflag1(true);
    }
    if (date > deadline22) {
      setflag2(true);
    }
  };

  //----------
  const encodeFileBase64 = (file, ty) => {
    var reader = new FileReader();
    console.log("\nfile", file);
    console.log("\nty", ty);

    reader.readAsDataURL(file);
    reader.onload = () => {
      var Base64 = reader.result;
      if (ty == "Question") {
        setQuestion1(file.name);
        setQuestion(Base64);
      } else if (ty == "Awardlist") {
        setAwardlist1(file.name);
        setAwardlist(Base64);
      } else if (ty == "Best") {
        setBest1(file.name);
        setBest(Base64);
      } else if (ty == "Average") {
        setAverage1(file.name);
        setAverage(Base64);
      } else if (ty == "Worst") {
        setWorst1(file.name);
        setWorst(Base64);
      } else if (ty == "Solution") {
        setSolution1(file.name);
        setSolution(Base64);
      } else if (ty == "ICEF") {
        setICEF(Base64);
      } else if (ty == "Obe") {
        setObe(Base64);
      } else if (ty == "LectureDeliveryRecord") {
        setLectureDeliveryRecord(Base64);
      }
      setFileBase64String(Base64);
    };
    var a = base64toData();
    const url = URL.createObjectURL(a);
    console.log("\nurl", url);
    const pdf = url.substring(url.indexOf(":") + 1);
    setDecoded(pdf);

    reader.onerror = (error) => {
      console.log("error: ", error);
    };
  };
  const [Decoded, setDecoded] = useState("");

  const base64toData = () => {
    const base64WithoutPrefix = fileBase64String.substring(
      fileBase64String.indexOf(",") + 1
    );
    // const base64WithoutPrefix = fileBase64String.substr('data:application/pdf;base64,'.length);

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: "application/pdf" });
    // return(ecodeURIComponent(bytes.split("")
    // .map((c)=> {
    //   return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    // })
    // .join("")
    // ))
  };
  useEffect(() => {
    getFolderData();
  }, []);
  useEffect(() => {
    getDeadline();
  }, []);
  const [Folder, setFolder] = useState({ files: [], ICEF: null, Obe: null });

  const getFolderData = async () => {
    const res = await axios.get(`http://localhost:4000/Folders/showOne/${id}`);
    console.log("FolderData", res.data);
    console.log("Fusera", id);

    setFolder(res.data);
    setSubmitted1(res.data.Round1);
    setRevisionSubmitted(res.data.WantRevision);
    setSubmitted2(res.data.Round2);
  };
  const getDeadline = async () => {
    const res = await axios.get(`http://localhost:4000/Content/ShowTheory`);
    console.log("deadlinesdata", res.data);
    const answer = await getDeadlineRequest();
    console.log("answrarray", answer);
    var s = res.data.Round1.Deadline;
    var s1 = res.data.Round2.Deadline;

    s = new Date(res.data.Round1.Deadline);
    s1 = new Date(res.data.Round2.Deadline);
    if (answer[0] == false) {
      console.log("sdc");

      setdeadline11(s);
      setdeadline1(
        s.getDate() +
          "/" +
          (s.getMonth() + 1) +
          "/" +
          s.getFullYear() +
          " " +
          s.getHours() +
          ":" +
          s.getMinutes()
      );
      setflag(s, deadline22);
    }
    if (answer[1] == false) {
      console.log("sdc");

      setdeadline22(s1);
      setdeadline2(
        s1.getDate() +
          "/" +
          (s1.getMonth() + 1) +
          "/" +
          s1.getFullYear() +
          " " +
          s1.getHours() +
          ":" +
          s1.getMinutes()
      );
      setflag(deadline11, s1);
    }
  };
  const getDeadlineRequest = async () => {
    const res = await axios.get(`http://localhost:4000/Content/ShowLabReq`);
    console.log("deadlinesdata", res?.data);
    console.log("FolderData", userid);
    var returnarray = [false, false];
    var a = res.data.Theory?.find((item) => item?.Request_id?._id == userid);
    console.log("rerse", returnarray);
    if (a != undefined) {
      if (a?.pending == false) {
        if (a.Round.includes("Round1")) {
          var s = new Date(a?.DeadlineDate);

          setdeadline11(s);
          setdeadline1(a?.Deadline);
          setdeadreq1(true);
          returnarray[0] = true;
          setflag(s, deadline22);
          //console.log("a",s)
          // setdeadline1(s.getDate()+"/"+(s.getMonth()+1)+"/"+s.getFullYear()+" "+s.getHours()+":"+s.getMinutes());
        } else {
          var s = new Date(a?.DeadlineDate);
          console.log("ads", s);
          setdeadline22(s);
          setdeadline2(a?.Deadline);
          setdeadreq2(true);
          returnarray[1] = true;
          setflag(deadline11, s);
        }
      }
    }
    console.log("reds", returnarray);
    return returnarray;
  };

  const SubmitICEF = async (e) => {
    e.preventDefault();
    const res = await axios.put(`http://localhost:4000/Folders/addICEF/${id}`, {
      ICEF: ICEF,
    });
    console.log("helloinicef", res);

    getFolderData();
    handleClose1();
  };
  const SubmitObe = async (e) => {
    e.preventDefault();
    const res = await axios.put(`http://localhost:4000/Folders/addObe/${id}`, {
      Obe: Obe,
    });
    console.log("helloinobe", res);

    getFolderData();
    handleClose2();
  };
  const SubmitLec = async (e) => {
    e.preventDefault();
    const res = await axios.put(`http://localhost:4000/Folders/addLec/${id}`, {
      LectureDeliveryRecord: LectureDeliveryRecord,
    });
    console.log("helloinlec", res);
    getFolderData();
    handleClose3();
  };
  const Submit1 = async (e) => {
    e.preventDefault();
    if(submittedRevision==false){
      if (
        Question1 != "" &&
        Question != "" &&
        Awardlist1 != "" &&
        Awardlist != "" &&
        Best1 != "" &&
        Best != "" &&
        Average1 != "" &&
        Average != "" &&
        Worst1 != "" &&
        Worst != "" &&
        Solution1 != "" &&
        Solution != ""
      ) {
        console.log("Title", Title);
        console.log("Question1,Question", Question1, Question);
        console.log("Awardlist1,Awardlist", Awardlist1, Awardlist);
        console.log("Best1,Best", Best1, Best);
        console.log("Average1,Average", Average1, Average);
        console.log("Worst1,Worst", Worst1, Worst);
        console.log("Solution1,Solution", Solution1, Solution);
        const res = await axios.put(`http://localhost:4000/Folders/add/${id}`, {
          Title,
          Question: {
            Name: Question1,
            Base64: Question,
          },
          Best: {
            Name: Best1,
            Base64: Best,
          },
          Average: {
            Name: Average1,
            Base64: Average,
          },
          Worst: {
            Name: Worst1,
            Base64: Worst,
          },
          Solution: {
            Name: Solution1,
            Base64: Solution,
          },
          Awardlist: {
            Name: Awardlist1,
            Base64: Awardlist,
          },
        });
        handleClose();
      }
      else{
        alert("Please Add All documents!!")
      }
    }
     else {
      console.log("Question", Question);
      console.log("Solution", Solution);
      console.log("Awardlist", Awardlist);
      console.log("Best", Best);
      console.log("Average", Average);
      console.log("Worst", Worst);
      var q1 = Question1,
        q = Question,
        an1 = Solution1,
        an = Solution,
        aw1 = Awardlist1,
        aw = Awardlist,
        b1 = Best1,
        b = Best,
        av1 = Average1,
        av = Average,
        w1 = Worst1,
        w = Worst;
      const answer = await axios.get(
        `http://localhost:4000/Folders/showfiles/${Folder._id}`
      );
      console.log("ans", answer);

      if (Question == "" && Question1 == "") {
        const a = Folder.files?.find((item) => item.Title == Title);
        console.log("wqq", a);
        q1 = a?.Question.Name;
        const ans = answer.data.files?.find((item) => item.Title == Title);
        console.log("inquestion", ans);
        q = ans?.Question?.Base64?.pdf;
        setQuestion(ans?.Question?.Base64?.pdf);
        setQuestion1(a.Question.Name);
      }
      if (Best == "" && Best1 == "") {
        const a = Folder.files?.find((item) => item.Title == Title);
        console.log("wqa", a);
        b1 = a?.Best.Name;
        const ans = answer.data.files?.find((item) => item.Title == Title);
        b = ans?.Best?.Base64?.pdf;
        setBest(ans?.Best?.Base64?.pdf);
        setBest1(a.Best.Name);
      }
      if (Average == "" && Average1 == "") {
        const a = Folder.files?.find((item) => item.Title == Title);
        console.log("wqaa", a);
        av1 = a?.Average.Name;
        const ans = answer.data.files?.find((item) => item.Title == Title);
        av = ans?.Average?.Base64?.pdf;
        setAverage(ans?.Average?.Base64?.pdf);
        setAverage1(a.Average.Name);
      }
      if (Worst == "" && Worst1 == "") {
        const a = Folder.files?.find((item) => item.Title == Title);
        w1 = a?.Worst.Name;
        const ans = answer.data.files?.find((item) => item.Title == Title);
        w = ans?.Worst?.Base64?.pdf;
        setWorst(ans?.Worst?.Base64?.pdf);
        setWorst1(a.Worst.Name);
      }
      if (Solution == "" && Solution1 == "") {
        const a = Folder.files?.find((item) => item.Title == Title);
        an1 = a?.Solution.Name;
        const ans = answer.data.files?.find((item) => item.Title == Title);
        an = ans?.Solution?.Base64?.pdf;
        setSolution(ans?.Solution?.Base64?.pdf);
        setSolution1(a.Solution.Name);
      }
      if (Awardlist == "" && Awardlist1 == "") {
        const a = Folder.files?.find((item) => item.Title == Title);
        aw1 = a?.Awardlist.Name;
        const ans = answer.data.files?.find((item) => item.Title == Title);
        aw = ans?.Awardlist?.Base64?.pdf;
        setAwardlist(ans?.Awardlist?.Base64?.pdf);
        setAwardlist1(a.Awardlist.Name);
      }
      console.log("Question", q);
      console.log("Solution", an);
      console.log("Awardlist", aw);
      console.log("Best", b);
      console.log("Average", av);
      console.log("Worst", w);
      const res = await axios.put(`http://localhost:4000/Folders/add/${id}`, {
        Title,
        Question: {
          Name: q1,
          Base64: q,
        },
        Best: {
          Name: b1,
          Base64: b,
        },
        Average: {
          Name: av1,
          Base64: av,
        },
        Worst: {
          Name: w1,
          Base64: w,
        },
        Solution: {
          Name: an1,
          Base64: an,
        },
        Awardlist: {
          Name: aw1,
          Base64: aw,
        },
      });
      //getFolderData();

      handleClose();
    }
    getFolderData();

  };
  const SubmitE1 = async () => {
    setpressed(false);

    console.log("Round1", { Round1: true });
    const res = await axios.post(
      `http://localhost:4000/Faculty/TheoryReq/${userid}`,
      {
        Round: "Round1",
        Deadline: deadline1,
        DeadlineDate: deadline11,
        Type: "Theory",
      }
    );
    //getFolderData();
    alert("Extension Request Sent");
    console.log("Rodwew", res);
  };
  const SubmitE2 = async () => {
    setpressed1(false);
    console.log("Round2", { Round1: true });
    const res = await axios.post(
      `http://localhost:4000/Faculty/TheoryReq/${userid}`,
      {
        Round: "Round2",
        Deadline: deadline2,
        DeadlineDate: deadline11,
        Type: "Theory",
      }
    );
    //getFolderData();
    alert("Extension Request Sent");

    console.log("Rodwew", res);
  };
  const SubmitR1 = async () => {
    var Round1 = true;
    getFolderData();
    console.log("folders in submit r1", Folder);
    Quiz1.forEach((i) => {
      var t = "Quiz " + i;

      var res = Folder.files.some((obj) => obj.Title == t);
      console.log("quizez", res);
      if (!res) {
        Round1 = false;
      }
    });
    Assignments1.forEach((i) => {
      var t = "Assignment " + i;

      var res = Folder.files.find((obj) => obj.Title == t);
      console.log("assignments", res);

      if (!res) {
        Round1 = false;
      }
    });
    if (folders.Mid == "Mid") {
      var t = "Mid";

      var res = Folder.files.some((obj) => obj.Title == t);
      console.log("mid", res);

      if (!res) {
        Round1 = false;
      }
    } else if (folders.Mid == "Sessional") {
      var t = "Sessional 1";

      var res = Folder.files.some((obj) => obj.Title == t);
      console.log("mid", res);

      if (!res) {
        Round1 = false;
      }
      var tt = "Sessional 2";
      var res2 = Folder.files.some((obj) => {
        obj.Title == tt;
      });
      console.log("mid", res2);
      if (!res2) {
        Round1 = false;
      }
    }
    if (Round1) {
      console.log("Round1", { Round1: true });
      const res = await axios.put(
        `http://localhost:4000/Folders/SubmitaRound/${id}`,
        {
          Round: "Round1",
        }
      );
      getFolderData();
      alert("Submitted");
    } else {
      alert("Enter all required documents for Round 1");
    }
  };
  const SubmitR1Revision = async () => {
    var Round1 = true;
    getFolderData();
    console.log("folders in submit r1", Folder);
    Quiz1.forEach((i) => {
      var t = "Quiz " + i;

      var res = Folder.files.some((obj) => obj.Title == t);
      console.log("quizez", res);
      if (!res) {
        Round1 = false;
      }
    });
    Assignments1.forEach((i) => {
      var t = "Assignment " + i;

      var res = Folder.files.find((obj) => obj.Title == t);
      console.log("assignments", res);

      if (!res) {
        Round1 = false;
      }
    });
    if (folders.Mid == "Mid") {
      var t = "Mid";

      var res = Folder.files.some((obj) => obj.Title == t);
      console.log("mid", res);

      if (!res) {
        Round1 = false;
      }
    } else if (folders.Mid == "Sessional") {
      var t = "Sessional 1";

      var res = Folder.files.some((obj) => obj.Title == t);
      console.log("mid", res);

      if (!res) {
        Round1 = false;
      }
      var tt = "Sessional 2";
      var res2 = Folder.files.some((obj) => {
        obj.Title == tt;
      });
      console.log("mid", res2);
      if (!res2) {
        Round1 = false;
      }
    }
    var Round2 = true;
    Quiz2.forEach((i) => {
      var t = "Quiz " + i;
      var res = Folder.files.some((obj) => obj.Title == t);
      if (!res) {
        Round2 = false;
      }
    });
    Assignments2.forEach((i) => {
      var t = "Assignment " + i;
      var res = Folder.files.some((obj) => obj.Title == t);
      if (!res) {
        Round2 = false;
      }
    });
    var t = "Terminal";
    var res = Folder.files.some((obj) => obj.Title == t);
    if (!res) {
      Round2 = false;
    }
    if (Folder.ICEF == null || Folder.ICEF == "") {
      Round2 = false;
    }
    if (Folder.Obe == null || Folder.Obe == "") {
      Round2 = false;
    }

    console.log("Round1", { Round1: true });
    const ress = await axios.put(
      `http://localhost:4000/Folders/SubmitaRoundRevision/${id}`,
      {
        Revision: true,
      }
    );
    setRevisionSubmitted(false);
    getFolderData();
    alert("Revision Submitted");
  };

  const SubmitR2 = async () => {
    var Round2 = true;
    Quiz2.forEach((i) => {
      var t = "Quiz " + i;
      var res = Folder.files.some((obj) => obj.Title == t);
      if (!res) {
        Round2 = false;
      }
    });
    Assignments2.forEach((i) => {
      var t = "Assignment " + i;
      var res = Folder.files.some((obj) => obj.Title == t);
      if (!res) {
        Round2 = false;
      }
    });
    var t = "Terminal";
    var res = Folder.files.some((obj) => obj.Title == t);
    if (!res) {
      Round2 = false;
    }
    if (Folder.ICEF == null || Folder.ICEF == "") {
      Round2 = false;
    }
    if (Folder.Obe == null || Folder.Obe == "") {
      Round2 = false;
    }

    if (Round2) {
      console.log("Round2", { Round2: true });
      const res = await axios.put(
        `http://localhost:4000/Folders/SubmitaRound/${id}`,
        {
          Round: "Round2",
        }
      );
      getFolderData();
      alert("Submitted");
    } else {
      alert("Enter all required documents for Round 2");
    }
  };

  return (
    <div class="container" style={{ height: 700, width: "100%", padding: 20 }}>
      <h1 style={{ marginBottom: 30 }}>Course Folder Maintainence</h1>
      {console.log("inreturn", deadline2, round2flag)}
      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={SubmitLec}>
            <div class="mb-3">
              <label class="form-label" for="customFile">
                <b>Upload Lecture Delivery Record</b>
              </label>
              <input
                type="file"
                class="form-control"
                id="customFile"
                onChange={(e) => {
                  encodeFileBase64(e.target.files[0], "LectureDeliveryRecord");
                }}
              />
            </div>
            <div class="d-grid">
              <button
                class="btn btn-block py-2 btn-primary"
                id="quiz1"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>

      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={SubmitICEF}>
            <div class="mb-3">
              <label class="form-label" for="customFile">
                <b>Upload ICEF</b>
              </label>
              <input
                type="file"
                class="form-control"
                id="customFile"
                onChange={(e) => {
                  encodeFileBase64(e.target.files[0], "ICEF");
                }}
              />
            </div>

            <div class="d-grid">
              <button
                class="btn btn-block py-2 btn-primary"
                id="quiz1"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={SubmitObe}>
            <div class="mb-3">
              <label class="form-label" for="customFile">
                <b>Upload OBE</b>
              </label>
              <input
                type="file"
                class="form-control"
                id="customFile"
                onChange={(e) => {
                  encodeFileBase64(e.target.files[0], "Obe");
                }}
              />
            </div>
            <div class="d-grid">
              <button
                class="btn btn-block py-2 btn-primary"
                id="quiz1"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={Submit1}>
            <div class="mb-3">
              <label class="form-label" for="customFile">
                <b>Upload Best</b>
              </label>
              <input
                type="file"
                class="form-control"
                id="customFile"
                onChange={(e) => {
                  encodeFileBase64(e.target.files[0], "Best");
                }}
              />
            </div>

            <div class="mb-3">
              <label class="form-label" for="customFile">
                <b>Upload Average</b>
              </label>
              <input
                type="file"
                class="form-control"
                id="customFile"
                onChange={(e) => {
                  encodeFileBase64(e.target.files[0], "Average");
                }}
              />
            </div>

            <div class="mb-3">
              <label class="form-label" for="customFile">
                <b>Upload Worst</b>
              </label>
              <input
                type="file"
                class="form-control"
                id="customFile"
                onChange={(e) => {
                  encodeFileBase64(e.target.files[0], "Worst");
                }}
              />
            </div>

            <div class="mb-3">
              <label class="form-label" for="customFile">
                <b>Upload Question Paper</b>
              </label>
              <input
                type="file"
                class="form-control"
                id="customFile"
                onChange={(e) => {
                  encodeFileBase64(e.target.files[0], "Question");
                }}
              />
            </div>

            <div class="mb-3">
              <label class="form-label" for="customFile">
                <b>Upload Solution</b>
              </label>
              <input
                type="file"
                class="form-control"
                id="customFile"
                onChange={(e) => {
                  encodeFileBase64(e.target.files[0], "Solution");
                }}
              />
            </div>

            <div class="mb-3">
              <label class="form-label" for="customFile">
                <b>Upload Award List</b>
              </label>
              <input
                type="file"
                class="form-control"
                id="customFile"
                onChange={(e) => {
                  encodeFileBase64(e.target.files[0], "Awardlist");
                }}
              />
            </div>

            <div class="d-grid">
              <button
                class="btn btn-block py-2 btn-primary"
                id="quiz1"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>

      <table class=" table  tablecourse">
        <tbody>
          <div className="row">
            <div className="col">
              <tr
                className="card p-4 m-2"
                style={{
                  boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
                }}
              >
                <th className="py-2">
                  <h2>Round 1</h2>
                  <h4
                    style={{ color: "red", textAlign: "center", marginTop: 20 }}
                  >
                    Deadline: {deadline1}
                  </h4>
                </th>
                {Quiz1.map((i) => {
                  return (
                    <td className="d-grid py-2 px-2">
                      {submitted1 == true && submittedRevision == false ? (
                        Folder.files.find((obj) => {
                          var t = "Quiz " + i;
                          return obj.Title == t;
                        }) ? (
                          <button
                            class="btn btn-block py-2 btn-primary"
                            id="quiz1"
                            type="button"
                            style={{
                              backgroundColor: "lightgrey",
                              borderColor: "lightgrey",
                            }}
                            onClick={() => {
                              alert("Round has been submited");
                            }}
                          >
                            Quiz {i} (Submitted)
                          </button>
                        ) : (
                          <button
                            class="btn btn-block py-2 btn-primary"
                            id="quiz1"
                            type="button"
                            style={{
                              backgroundColor: "lightgrey",
                              borderColor: "lightgrey",
                            }}
                            onClick={() => {
                              alert("Round has been submited");
                            }}
                          >
                            Quiz {i}
                          </button>
                        )
                      ) : round2flag == true && submittedRevision == true ? (
                        Folder.files.find((obj) => {
                          var t = "Quiz " + i;
                          return obj.Title == t;
                        }) ? (
                          <button
                            class="btn btn-block py-2 btn-primary"
                            id="quiz1"
                            type="button"
                            style={{
                              backgroundColor: "lightgrey",
                              borderColor: "lightgrey",
                            }}
                            onClick={() => {
                              alert("Round has been submited");
                            }}
                          >
                            Quiz {i} (Submited)
                          </button>
                        ) : (
                          <button
                            class="btn btn-block py-2 btn-primary"
                            id="quiz1"
                            type="button"
                            style={{
                              backgroundColor: "lightgrey",
                              borderColor: "lightgrey",
                            }}
                            onClick={() => {
                              alert("Round has been submited");
                            }}
                          >
                            Quiz {i}
                          </button>
                        )
                      ) : Folder.files.find((obj) => {
                          var t = "Quiz " + i;
                          return obj.Title == t;
                        }) ? (
                        <button
                          class="btn btn-block py-2 btn-primary"
                          id="quiz1"
                          type="button"
                          onClick={() => {
                            quiztitle(i);
                            handleOpen();
                          }}
                        >
                          Quiz {i} (Submitted)
                        </button>
                      ) : (
                        <button
                          class="btn btn-block py-2 btn-primary"
                          id="quiz1"
                          type="button"
                          onClick={() => {
                            quiztitle(i);
                            handleOpen();
                          }}
                        >
                          Quiz {i}
                        </button>
                      )}
                    </td>
                  );
                })}

                {Assignments1.map((i) => {
                  return (
                    <td className="d-grid py-2 px-2">
                      {submitted1 == true && submittedRevision == false ? (
                        Folder.files.find((obj) => {
                          var t = "Assignment " + i;
                          return obj.Title == t;
                        }) ? (
                          <button
                            class="btn btn-block py-2 btn-primary"
                            id="Assignment"
                            type="button"
                            style={{
                              backgroundColor: "lightgrey",
                              borderColor: "lightgrey",
                            }}
                            onClick={() => {
                              alert("Round has been submited");
                            }}
                          >
                            Assignment {i} (Submited)
                          </button>
                        ) : (
                          <button
                            class="btn btn-block py-2 btn-primary"
                            id="quiz1"
                            type="button"
                            style={{
                              backgroundColor: "lightgrey",
                              borderColor: "lightgrey",
                            }}
                            onClick={() => {
                              alert("Round has been submited");
                            }}
                          >
                            Assignment {i}
                          </button>
                        )
                      ) : round2flag == true && submittedRevision == true ? (
                        Folder.files.find((obj) => {
                          var t = "Assignment " + i;
                          return obj.Title == t;
                        }) ? (
                          <button
                            class="btn btn-block py-2 btn-primary"
                            id="Assignment"
                            type="button"
                            style={{
                              backgroundColor: "lightgrey",
                              borderColor: "lightgrey",
                            }}
                            onClick={() => {
                              alert("Round has been Submitted");
                            }}
                          >
                            Assignment {i} (Submited)
                          </button>
                        ) : (
                          <button
                            class="btn btn-block py-2 btn-primary"
                            id="quiz1"
                            type="button"
                            style={{
                              backgroundColor: "lightgrey",
                              borderColor: "lightgrey",
                            }}
                            onClick={() => {
                              alert("Round has been Submitted");
                            }}
                          >
                            Assignment {i}
                          </button>
                        )
                      ) : Folder.files.find((obj) => {
                          var t = "Assignment " + i;
                          return obj.Title == t;
                        }) ? (
                        <button
                          class="btn btn-block py-2 btn-primary"
                          id="Assignment"
                          type="button"
                          onClick={() => {
                            Assignmenttitle(i);
                            handleOpen();
                          }}
                        >
                          Assignment {i} (Submitted)
                        </button>
                      ) : (
                        <button
                          class="btn btn-block py-2 btn-primary"
                          id="Assignment"
                          type="button"
                          onClick={() => {
                            Assignmenttitle(i);
                            handleOpen();
                          }}
                        >
                          Assignment {i}
                        </button>
                      )}
                    </td>
                  );
                })}
                {folders != "" && folders.Mid == "Mid" ? (
                  submitted1 == true && submittedRevision == false ? (
                    <td className="d-grid py-2 px-2">
                      <button
                        class="btn btn-block py-2 btn-primary"
                        id="Mid"
                        type="button"
                        style={{
                          backgroundColor: "lightgrey",
                          borderColor: "lightgrey",
                        }}
                        onClick={() => {
                          alert("Round has been submited");
                        }}
                      >
                        {Folder.files.find((obj) => {
                          var t = "Mid";
                          return obj.Title == t;
                        }) ? (
                          <> Midterm Exam (Submited)</>
                        ) : (
                          <> Midterm Exam</>
                        )}
                      </button>
                    </td>
                  ) : round2flag == true && submittedRevision == true ? (
                    <td className="d-grid py-2 px-2">
                      <button
                        class="btn btn-block py-2 btn-primary"
                        id="Mid"
                        type="button"
                        style={{
                          backgroundColor: "lightgrey",
                          borderColor: "lightgrey",
                        }}
                        onClick={() => {
                          alert("Round has been Submitted");
                        }}
                      >
                        {Folder.files.find((obj) => {
                          var t = "Mid";
                          return obj.Title == t;
                        }) ? (
                          <> Midterm Exam (Submited)</>
                        ) : (
                          <> Midterm Exam</>
                        )}
                      </button>
                    </td>
                  ) : (
                    <button
                      class="btn btn-block py-2 btn-primary"
                      id="Assignment"
                      type="button"
                      onClick={() => {
                        Midtitle();
                        handleOpen();
                      }}
                    >
                      {Folder.files.find((obj) => {
                        var t = "Mid";
                        return obj.Title == t;
                      }) ? (
                        <> Midterm Exam (Submited)</>
                      ) : (
                        <> Midterm Exam</>
                      )}
                    </button>
                  )
                ) : submitted1 == true && submittedRevision == false ? (
                  <>
                    <td className="d-grid py-2 px-2">
                      <button
                        class="btn btn-block py-2 btn-primary"
                        id="Sessional1"
                        type="button"
                        style={{
                          backgroundColor: "lightgrey",
                          borderColor: "lightgrey",
                        }}
                        onClick={() => {
                          alert("Round has been submited");
                        }}
                      >
                        {Folder.files.find((obj) => {
                          var t = "Sessional 1";
                          return obj.Title == t;
                        }) ? (
                          <> Sessional 1 (Submited)</>
                        ) : (
                          <> Sessional 1 </>
                        )}
                      </button>
                    </td>
                    <td className="d-grid py-2 px-2">
                      <button
                        class="btn btn-block py-2 btn-primary"
                        id="Sessional2"
                        type="button"
                        style={{
                          backgroundColor: "lightgrey",
                          borderColor: "lightgrey",
                        }}
                        onClick={() => {
                          alert("Round has been submited");
                        }}
                      >
                        {Folder.files.find((obj) => {
                          var t = "Sessional 1";
                          return obj.Title == t;
                        }) ? (
                          <> Sessional 2 (Submited)</>
                        ) : (
                          <> Sessional 2</>
                        )}
                      </button>
                    </td>
                  </>
                ) : round2flag == true && submittedRevision == false ? (
                  <>
                    <button
                      class="btn btn-block py-2 btn-primary"
                      id="Assignment"
                      type="button"
                      style={{
                        backgroundColor: "lightgrey",
                        borderColor: "lightgrey",
                      }}
                      onClick={() => {
                        alert("deadline passed");
                      }}
                    >
                      Sessional 1 (deadline passed)
                    </button>
                    <button
                      class="btn btn-block py-2 btn-primary"
                      id="Assignment"
                      type="button"
                      style={{
                        backgroundColor: "lightgrey",
                        borderColor: "lightgrey",
                      }}
                      onClick={() => {
                        alert("deadline passed");
                      }}
                    >
                      Sessional 2 (deadline passed)
                    </button>
                  </>
                ) : (
                  <>
                    <td className="d-grid py-2 px-2">
                      <button
                        class="btn btn-block py-2 btn-primary"
                        id="Sessional1"
                        type="button"
                        onClick={() => {
                          Sess1();
                          handleOpen();
                        }}
                      >
                        {Folder.files.find((obj) => {
                          var t = "Sessional 1";
                          return obj.Title == t;
                        }) ? (
                          <> Sessional 1 (Submited)</>
                        ) : (
                          <> Sessional 1 </>
                        )}
                      </button>
                    </td>
                    <td className="d-grid py-2 px-2">
                      <button
                        class="btn btn-block py-2 btn-primary"
                        id="Sessional2"
                        type="button"
                        onClick={() => {
                          Sess2();
                          handleOpen();
                        }}
                      >
                        {Folder.files.find((obj) => {
                          var t = "Sessional 1";
                          return obj.Title == t;
                        }) ? (
                          <> Sessional 2 (Submited)</>
                        ) : (
                          <> Sessional 2</>
                        )}
                      </button>
                    </td>
                  </>
                )}
                <td className="d-grid py-4 px-2">
                  {submitted1 == true && submittedRevision == false ? (
                    <button
                      class="btn btn-block py-2 btn-primary"
                      type="button"
                      style={{ backgroundColor: "grey", borderColor: "grey" }}
                      onClick={() => {
                        alert("Round 1 already submitted");
                      }}
                    >
                      Round 1 (Submitted)
                    </button>
                  ) : round1flag == true && submittedRevision == false ? (
                    <>
                      <h4
                        style={{
                          color: "red",
                          textAlign: "center",
                          marginTop: 20,
                        }}
                      >
                        Submission Closed!!!
                      </h4>
                      {pressed ? (
                        <button
                          class="btn btn-block py-2 btn-primary"
                          type="button"
                          style={{
                            backgroundColor: "grey",
                            borderColor: "grey",
                          }}
                          onClick={SubmitE1}
                        >
                          Send Extension Request
                        </button>
                      ) : (
                        <button
                          class="btn btn-block py-2 btn-primary"
                          type="button"
                          onClick={SubmitE1}
                        >
                          Send Extension Request
                        </button>
                      )}
                    </>
                  ) : submittedRevision ? (
                    <></>
                  ) : (
                    <button
                      class="btn btn-block py-2 btn-primary"
                      type="button"
                      onClick={SubmitR1}
                    >
                      Submit
                    </button>
                  )}
                </td>
              </tr>
            </div>
            <div className="col">
              <tr
                className="card m-2 p-4"
                style={{
                  boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
                }}
              >
                <th className="py-2">
                  <h2>Round 2</h2>
                  <h4
                    style={{ color: "red", textAlign: "center", marginTop: 20 }}
                  >
                    Deadline: {deadline2}
                  </h4>
                </th>

                {Quiz2.map((i) => {
                  return (
                    <td className="d-grid py-2 px-2">
                      {submitted2 == true && submittedRevision == false ? (
                        Folder.files.find((obj) => {
                          var t = "Quiz " + i;
                          return obj.Title == t;
                        }) ? (
                          <button
                            class="btn btn-block py-2 btn-primary"
                            id="quiz1"
                            type="button"
                            style={{
                              backgroundColor: "lightgrey",
                              borderColor: "lightgrey",
                            }}
                            onClick={() => {
                              alert("Round has been submited");
                            }}
                          >
                            Quiz {i} (Submited)
                          </button>
                        ) : (
                          <button
                            class="btn btn-block py-2 btn-primary"
                            id="quiz1"
                            type="button"
                            style={{
                              backgroundColor: "lightgrey",
                              borderColor: "lightgrey",
                            }}
                            onClick={() => {
                              alert("Round has been submited");
                            }}
                          >
                            Quiz {i}
                          </button>
                        )
                      ) : round2flag == true && submittedRevision == false ? (
                        <button
                          class="btn btn-block py-2 btn-primary"
                          id="quiz1"
                          type="button"
                          style={{
                            backgroundColor: "lightgrey",
                            borderColor: "lightgrey",
                          }}
                          onClick={() => {
                            alert("deadline passed");
                          }}
                        >
                          Quiz {i} (deadline passed)
                        </button>
                      ) : Folder.files.find((obj) => {
                          var t = "Quiz " + i;
                          return obj.Title == t;
                        }) ? (
                        <button
                          class="btn btn-block py-2 btn-primary"
                          id="quiz1"
                          type="button"
                          onClick={() => {
                            quiztitle(i);
                            handleOpen();
                          }}
                        >
                          Quiz {i} (Submited)
                        </button>
                      ) : (
                        <button
                          class="btn btn-block py-2 btn-primary"
                          id="quiz1"
                          type="button"
                          onClick={() => {
                            quiztitle(i);
                            handleOpen();
                          }}
                        >
                          Quiz {i}
                        </button>
                      )}
                    </td>
                  );
                })}

                {Assignments2.map((i) => {
                  return (
                    <td className="d-grid py-2 px-2">
                      {submitted2 == true && submittedRevision == false ? (
                        Folder.files.find((obj) => {
                          var t = "Assignment " + i;
                          return obj.Title == t;
                        }) ? (
                          <button
                            class="btn btn-block py-2 btn-primary"
                            id="Assignment"
                            type="button"
                            style={{
                              backgroundColor: "lightgrey",
                              borderColor: "lightgrey",
                            }}
                            onClick={() => {
                              alert("Round has been submited");
                            }}
                          >
                            Assignment {i} (Submited)
                          </button>
                        ) : (
                          <button
                            class="btn btn-block py-2 btn-primary"
                            id="quiz1"
                            type="button"
                            style={{
                              backgroundColor: "lightgrey",
                              borderColor: "lightgrey",
                            }}
                            onClick={() => {
                              alert("Round has been submited");
                            }}
                          >
                            Assignment {i}
                          </button>
                        )
                      ) : round2flag == true && submittedRevision == false ? (
                        <button
                          class="btn btn-block py-2 btn-primary"
                          id="Assignment"
                          type="button"
                          style={{
                            backgroundColor: "lightgrey",
                            borderColor: "lightgrey",
                          }}
                          onClick={() => {
                            alert("deadline passed");
                          }}
                        >
                          Assignment {i} (deadline passed)
                        </button>
                      ) : Folder.files.find((obj) => {
                          var t = "Assignment " + i;
                          return obj.Title == t;
                        }) ? (
                        <button
                          class="btn btn-block py-2 btn-primary"
                          id="Assignment"
                          type="button"
                          onClick={() => {
                            Assignmenttitle(i);
                            handleOpen();
                          }}
                        >
                          Assignment {i} (Submited)
                        </button>
                      ) : (
                        <button
                          class="btn btn-block py-2 btn-primary"
                          id="quiz1"
                          type="button"
                          onClick={() => {
                            Assignmenttitle(i);
                            handleOpen();
                          }}
                        >
                          Assignment {i}
                        </button>
                      )}
                    </td>
                  );
                })}

                {submitted2 == true && submittedRevision == false ? (
                  <td className="d-grid py-2 px-2">
                    <button
                      class="btn btn-block py-2 btn-primary"
                      id="Mid"
                      type="button"
                      style={{
                        backgroundColor: "lightgrey",
                        borderColor: "lightgrey",
                      }}
                      onClick={() => {
                        alert("Round has been submited");
                      }}
                    >
                      {Folder.files.find((obj) => {
                        var t = "Terminal";
                        return obj.Title == t;
                      }) ? (
                        <> Terminal Exam (Submited)</>
                      ) : (
                        <> Terminal Exam </>
                      )}
                    </button>
                  </td>
                ) : round2flag == true && submittedRevision == false ? (
                  <td className="d-grid py-2 px-2">
                    <button
                      class="btn btn-block py-2 btn-primary"
                      id="Assignment"
                      type="button"
                      style={{
                        backgroundColor: "lightgrey",
                        borderColor: "lightgrey",
                      }}
                      onClick={() => {
                        alert("deadline passed");
                      }}
                    >
                      Terminal Exam (deadline passed)
                    </button>
                  </td>
                ) : (
                  <td className="d-grid py-2 px-2">
                    <button
                      class="btn btn-block py-2 btn-primary"
                      id="Mid"
                      type="button"
                      onClick={() => {
                        Final();
                        handleOpen();
                      }}
                    >
                      {Folder.files.find((obj) => {
                        var t = "Terminal";
                        return obj.Title == t;
                      }) ? (
                        <> Terminal Exam (Submited)</>
                      ) : (
                        <> Terminal Exam </>
                      )}
                    </button>
                  </td>
                )}

                {submitted2 == true && submittedRevision == false ? (
                  <td className="d-grid py-2 px-2">
                    <button
                      class="btn py-2  btn-block btn-primary"
                      id="quiz1"
                      type="button"
                      style={{
                        backgroundColor: "lightgrey",
                        borderColor: "lightgrey",
                      }}
                      onClick={() => {
                        alert("Round has been submited");
                      }}
                    >
                      {Folder.LectureDeliveryRecord == null ? (
                        <>Lecture Delivery Record</>
                      ) : (
                        <>Lecture Delivery Record (Submited)</>
                      )}
                    </button>
                  </td>
                ) : round2flag == true && submittedRevision == false ? (
                  <td className="d-grid py-2 px-2">
                    <button
                      class="btn btn-block py-2 btn-primary"
                      id="Assignment"
                      type="button"
                      style={{
                        backgroundColor: "lightgrey",
                        borderColor: "lightgrey",
                      }}
                      onClick={() => {
                        alert("deadline passed");
                      }}
                    >
                      Lecture Delivery Record (deadline passed)
                    </button>
                  </td>
                ) : (
                  <td className="d-grid py-2 px-2">
                    <button
                      class="btn py-2  btn-block btn-primary"
                      id="quiz1"
                      type="button"
                      onClick={handleOpen3}
                    >
                      {Folder.LectureDeliveryRecord == null ? (
                        <>Lecture Delivery Record</>
                      ) : (
                        <>Lecture Delivery Record (Submited)</>
                      )}
                    </button>
                  </td>
                )}

                {submitted2 == true && submittedRevision == false ? (
                  <td className="d-grid py-2 px-2">
                    <button
                      class="btn py-2  btn-block btn-primary"
                      id="quiz1"
                      type="button"
                      style={{
                        backgroundColor: "lightgrey",
                        borderColor: "lightgrey",
                      }}
                      onClick={() => {
                        alert("Round has been submited");
                      }}
                    >
                      {" "}
                      {Folder.ICEF == null ? <>ICEF</> : <>ICEF (Submited)</>}
                    </button>
                  </td>
                ) : round2flag == true && submittedRevision == false ? (
                  <td className="d-grid py-2 px-2">
                    <button
                      class="btn btn-block py-2 btn-primary"
                      id="Assignment"
                      type="button"
                      style={{
                        backgroundColor: "lightgrey",
                        borderColor: "lightgrey",
                      }}
                      onClick={() => {
                        alert("deadline passed");
                      }}
                    >
                      ICEF (deadline passed)
                    </button>
                  </td>
                ) : (
                  <td className="d-grid py-2 px-2">
                    <button
                      class="btn py-2  btn-block btn-primary"
                      id="quiz1"
                      type="button"
                      onClick={handleOpen1}
                    >
                      {" "}
                      {Folder.ICEF == null ? <>ICEF</> : <>ICEF (Submited)</>}
                    </button>
                  </td>
                )}

                {submitted2 == true && submittedRevision == false ? (
                  <td className="d-grid py-2 px-2">
                    <button
                      class="btn py-2  btn-block btn-primary"
                      id="quiz1"
                      type="button"
                      style={{
                        backgroundColor: "lightgrey",
                        borderColor: "lightgrey",
                      }}
                      onClick={() => {
                        alert("Round has been submited");
                      }}
                    >
                      {Folder.Obe == null ? <>OBE</> : <>OBE (Submited)</>}
                    </button>
                  </td>
                ) : round2flag == true && submittedRevision == false ? (
                  <td className="d-grid py-2 px-2">
                    <button
                      class="btn btn-block py-2 btn-primary"
                      ids="Assignment"
                      type="button"
                      style={{
                        backgroundColor: "lightgrey",
                        borderColor: "lightgrey",
                      }}
                      onClick={() => {
                        alert("deadline passed");
                      }}
                    >
                      OBE (deadline passed)
                    </button>
                  </td>
                ) : (
                  <td className="d-grid py-2 px-2">
                    <button
                      class="btn py-2  btn-block btn-primary"
                      id="quiz1"
                      type="button"
                      onClick={handleOpen2}
                    >
                      {Folder.Obe == null ? <>OBE</> : <>OBE (Submited)</>}
                    </button>
                  </td>
                )}

                {submitted2 == true && submittedRevision == false ? (
                  <td className="d-grid py-2 px-2">
                    <button
                      class="btn btn-block py-2 btn-primary"
                      type="button"
                      style={{ backgroundColor: "grey", borderColor: "grey" }}
                      onClick={() => {
                        alert("Round 2 already submitted");
                      }}
                    >
                      Round 2 (Submitted)
                    </button>
                  </td>
                ) : (
                  <td className="d-grid py-4 px-2">
                    {round2flag == true && submittedRevision == false ? (
                      <>
                        <h4
                          style={{
                            color: "red",
                            textAlign: "center",
                            marginTop: 20,
                          }}
                        >
                          Submission Closed!!!
                        </h4>

                        {pressed1 ? (
                          <button
                            class="btn btn-block py-2 btn-primary"
                            type="button"
                            style={{
                              backgroundColor: "grey",
                              borderColor: "grey",
                            }}
                          >
                            Send Extension Request
                          </button>
                        ) : (
                          <button
                            class="btn btn-block py-2 btn-primary"
                            type="button"
                            onClick={SubmitE2}
                          >
                            Send Extension Request
                          </button>
                        )}
                      </>
                    ) : submittedRevision ? (
                      <></>
                    ) : (
                      <button
                        class="btn btn-block py-2 btn-primary"
                        type="button"
                        onClick={SubmitR2}
                      >
                        Submit
                      </button>
                    )}
                  </td>
                )}
              </tr>
            </div>
          </div>
        </tbody>
      </table>
      {submittedRevision ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            class="btn btn-block py-2 btn-primary mb-4"
            type="button"
            onClick={SubmitR1Revision}
          >
            Send Revision
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
