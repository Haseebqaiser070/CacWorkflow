import React, { useState, useEffect } from "react";
import "./css/styles.css";
import { Link } from "react-router-dom";
import Popup from "./AuxillaryComponents/PopupFunction";
import axios from "axios";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCourseForm() {
  const navigate = useNavigate();
  const [PreCode, setPreCode] = useState("");
  const [SufCode, setSufCode] = useState("");
  const [Name, setName] = useState("");
  const [allCredit, setAllCredit] = useState("");
  const [Category, setCategory] = useState("");
  const [PreRequisites, setPreRequisites] = useState([]);
  const [mainTopic, setmainTopic] = useState("");
  const [catalogue, setCatalogue] = useState("");
  const [objective, setobjective] = useState("");
  const [objectiveList, setObjectiveList] = useState([]);
  const [Courses, setCourse] = useState([]);

  const { id } = useParams();

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 2,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (props) => (
        <Button
          type="button"
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            var data = objectiveList.filter((obj) => obj.id !== props.row.id);
            setObjectiveList(data);
          }}
        >
          <AiFillDelete style={{ marginRight: 10 }} />
          Remove
        </Button>
      ),
    },
  ];

  const handleAdd = (e) => {
    e.preventDefault();
    setCatalogue(`${catalogue} ${mainTopic}; `);
    setmainTopic("");
  };
  const handleObjective = (e) => {
    e.preventDefault();
    setObjectiveList([...objectiveList, { id: uuidv4(), title: objective }]);
    setobjective("");
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await axios.get("http://localhost:4000/Course/show");
    const data = await res.data;
    const response = await axios.get(`http://localhost:4000/Course/${id}`);
    const up = await response.data;
    console.log(up);
    const newarr = data.filter((x) => {
      if (x.Name != up.Name) return x;
    });
    setCourse([{ Name: "none" }, ...newarr]);
    setName(up.Name);
    setPreCode(up.Code.split("-")[0]);
    setSufCode(up.Code.split("-")[1]);
    setCategory(up.Category);
    setCatalogue(up.catalogue);
    setObjectiveList(up.objectiveList);
    setPreRequisites([...up.PreRequisites]);
    const sum = parseInt(up.LectureHoursWeek) + parseInt(up.LabHoursWeek);
    setAllCredit(sum + "(" + up.LectureHoursWeek + "," + up.LabHoursWeek + ")");
  };
  const EditCourse = async (e) => {
    e.preventDefault();
    const Code = PreCode + "-" + SufCode;
    const LectureHoursWeek = allCredit.slice(2, 3);
    const LabHoursWeek = allCredit.slice(4, 5);
    const Credit = allCredit.slice(0, 1);
    console.log(Code, LectureHoursWeek, LabHoursWeek, Credit, objectiveList);
    console.log("cat: ", Category);
    console.log("catlog: ", catalogue);
    console.log("pre: ", PreRequisites);
    if (
      PreCode != "" &&
      SufCode != "" &&
      Name != "" &&
      allCredit != "" &&
      PreRequisites != [] &&
      catalogue != "" &&
      Category != "" &&
      objectiveList != []
    ) {
      await axios.put(`http://localhost:4000/Course/${id}`, {
        Code,
        Name,
        Credit,
        LectureHoursWeek,
        LabHoursWeek,
        Category,
        PreRequisites,
        catalogue,
        objectiveList,
      });
      setSufCode("");
      setName("");
      setPreRequisites([]);
      setCatalogue("");
      setObjectiveList([]);
      navigate("/admin/AddCourse", { replace: true });
    } else {
      alert("empty values");
    }
  };
  return (
    <div style={{ padding: 30 }} className="row">
      <h4 style={{ textAlign: "center", marginBottom: 30 }}>Add New Cource</h4>
      <form onSubmit={EditCourse}>
        <div className="row">
          <div className="mb-3 col-4">
            <label for="course-code" className="form-label">
              Course Code
            </label>
            <div className="row">
              <div className="col">
                <select
                  class="form-select"
                  onChange={(e) => setPreCode(e.target.value)}
                  defaultValue={PreCode}
                >
                  <option value="" selected disabled hidden>
                    {PreCode}
                  </option>
                  <option>MTH</option>
                  <option>CSC</option>
                  <option>HUM</option>
                  <option>PHY</option>
                  <option>EEE</option>
                  <option>DSC</option>
                  <option>CYC</option>
                  <option>AIC</option>
                </select>
              </div>
              <div className="col">
                <input
                  maxlength="3"
                  pattern="^[0-9]{3}$"
                  type="text"
                  className="form-control"
                  id="course-code"
                  placeholder="Code"
                  value={SufCode}
                  onChange={(e) => setSufCode(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mb-3 col-6">
            <label for="course-name" className="form-label">
              Course Name
            </label>
            <input
              type="text"
              className="form-control"
              id="course-name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3 col-2">
            <label for="credit-hour" className="form-label">
              Course Categories
            </label>
            <select
              class="form-select"
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" selected disabled hidden>
                ={Category}
              </option>
              <option>Computing Course</option>
              <option>CYC</option>
              <option>AIC</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label for="credit-hour" className="form-label">
              Credit Hour
            </label>
            <select
              class="form-select"
              onChange={(e) => setAllCredit(e.target.value)}
            >
              <option value="" selected disabled hidden>
                {allCredit}
              </option>
              <option>4(0,4)</option>
              <option>4(3,1)</option>
              <option>3(3,0)</option>
              <option>3(2,1)</option>
              <option>2(0,2)</option>
            </select>
          </div>
          <div class="col">
            <Stack spacing={3} sx={{ width: 500 }}>
              <Autocomplete
                multiple
                id="tags-standard"
                value={PreRequisites}
                options={Courses}
                getOptionLabel={(option) => option.Name}
                defaultValue={null}
                onChange={(e, val) => setPreRequisites(val)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Pre-Requisites"
                    placeholder="Pre-Requisites"
                  />
                )}
              />
            </Stack>
          </div>
        </div>

        <div style={{ marginBottom: 20, marginTop: 20 }}>
          <form>
            <div className="row">
              <div className="col-9">
                <input
                  className="form-control"
                  id="maintopic"
                  type="text"
                  placeholder="Add Main Topic"
                  value={mainTopic}
                  onChange={(e) => setmainTopic(e.target.value)}
                ></input>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={handleAdd}
                >
                  ADD
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="mb-3">
          <table className="table table-responsive ">
            <thead>
              <tr className="cdf">
                <th>Catalogue Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="cd">
                <td>{catalogue}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div style={{ marginBottom: 20, marginTop: 20 }}>
            <form>
              <div className="row">
                <div className="col-9">
                  <input
                    className="form-control"
                    id="objective"
                    type="text"
                    placeholder="Objective"
                    value={objective}
                    onChange={(e) => setobjective(e.target.value)}
                  ></input>
                </div>
                <div className="col-3 d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={handleObjective}
                  >
                    ADD
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              rows={objectiveList}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </div>
        </div>

        <input
          type="submit"
          name="submit"
          value="Update"
          className="button btn btn-primary ms-auto me-0 me-md-3 my-2 my-md-0"
        />
      </form>
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
];

// const rows = [
//   { id: 1, title: "Snow" },
//   { id: 2, title: "Lannister" },
// ];
