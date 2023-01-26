import React, { useState, useEffect } from "react";
import "./css/styles.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import {
  Autocomplete,
  Card,
  InputLabel,
  LinearProgress,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";

import CloseIcon from "@mui/icons-material/Close";

import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import { muiAbtn, muibtn } from "./style";
import CustomNoRowsOverlay from "./AuxillaryComponents/CustomNoRowsOverlay";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
};

export default function BtlDictionary() {
  axios.defaults.withCredentials = true;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDomain("");
    setBtl("");
    setVerbs([]);
    setUpid("");
    setVerb("");
  };
  const [Verb, setVerb] = useState("");
  const [Btl, setBtl] = useState("");
  const [Domain, setDomain] = useState("");
  const [BTLRow, setBTLRow] = useState([]);
  const [DomainRow, setDomainRow] = useState([]);
  const [Upid, setUpid] = useState("");
  const [Verbs, setVerbs] = useState([]);
  const [BTLDIC, setBTLDIC] = useState([]);

  useEffect(() => {
    getBTLDIC();
    getBTLRows();
    getDomainRows();
  }, []);

  const getBTLRows = async () => {
    const res = await axios.get("http://localhost:4000/SOBTL/showBTL");
    const data = await res.data;
    setBTLRow([...data]);
  };

  const getDomainRows = async () => {
    const res = await axios.get("http://localhost:4000/SOBTL/showDomain");
    const data = await res.data;
    setDomainRow([...data]);
  };

  const getBTLDIC = async () => {
    const res = await axios.get("http://localhost:4000/SOBTL/showBTLDic");
    const data = await res.data;
    setBTLDIC([...data]);
  };

  const ADDing = () => {
    const Verb2 = Verb.charAt(0).toUpperCase() + Verb.slice(1);
    var clone = [...Verbs];
    clone.push(Verb2);
    setVerbs([...clone]);
    setVerb("");
  };

  const sub = async (e) => {
    e.preventDefault();
    console.log("hi");
    var check = false;
    BTLDIC.forEach((i) => {
      if (i.BTL == Btl && Domain == i.Domain) {
        check = true;
      }
    });
    if (Btl == Upid?.BTL && Domain == Upid?.Domain) {
      check = false;
    }
    if (check) {
      alert(
        "Verbs with same Domain and BTL leveel already exists Update to enter them in same category"
      );
    } else if (Btl != "" && Domain != "" && Verbs.length >= 1 && Upid == "") {
      console.log("hi1");
      const res = await axios.post("http://localhost:4000/SOBTL/addBTLDic", {
        BTL: Btl,
        Domain,
        Verbs,
      });
      console.log("hi11");
      getBTLDIC();
      setDomain("");
      setBtl("");
      setVerbs([]);
      setUpid("");
      setVerb("");
      setOpen(false);
    } else if (Btl != "" && Domain != "" && Verbs.length >= 1 && Upid != "") {
      console.log("hi2");

      const res = await axios.put(
        `http://localhost:4000/SOBTL/BTLDic/${Upid._id}`,
        {
          BTL: Btl,
          Domain,
          Verbs,
        }
      );
      console.log("hi22");
      getBTLDIC();
      setDomain("");
      setBtl("");
      setVerbs([]);
      setUpid("");
      setVerb("");
      setOpen(false);
    } else {
      alert("missing fields");
    }
  };

  const update = async (ii) => {
    const res = await axios.get(`http://localhost:4000/SOBTL/BTLDic/${ii}`);
    setDomain(res.data.Domain);
    setBtl(res.data.BTL);
    setVerbs(res.data.Verbs);
    setOpen(true);
  };

  function ActionButton({ row }) {
    return (
      <>
        <Tooltip title="Edit" placement="top-start">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ backgroundColor: "#4b2980", marginLeft: 16, padding: 10 }}
            onClick={() => {
              setUpid(row);
              update(row._id);
            }}
          >
            <AiFillEdit />
          </Button>
        </Tooltip>
        <Tooltip title="Delete" placement="top-start">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ backgroundColor: "#4b2980", marginLeft: 16, padding: 10 }}
            onClick={async () => {
              await axios.delete(
                `http://localhost:4000/SOBTL/BTLDic/${row._id}`
              );
              getBTLDIC();
            }}
          >
            <AiFillDelete />
          </Button>
        </Tooltip>
      </>
    );
  }

  const columns = [
    {
      field: "BTL",
      headerName: "BTL Level",
      width: "200",
    },
    {
      field: "Domain",
      headerName: "Domain",
      width: "200",
    },

    {
      field: "Verbs",
      headerName: "Verbs",
      valueGetter: (params) =>
        params?.row?.Verbs?.map((i) => {
          return i;
        }),
      width: "400",
    },

    {
      field: "Action",
      headerName: "Action",
      width: "200",
      editable: false,
      renderCell: ActionButton,
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        padding: 40,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card style={{ padding: 30, borderRadius: 10 }}>
        <h1 className="py-4 my-2">
          <b>BTL LEVEL DICTIONARY</b>
        </h1>

        <div className="d-flex justify-content-end mb-4 pb-2">
          <Button
            variant="contained"
            color="primary"
            size="medium"
            style={muibtn}
            onClick={handleOpen}
          >
            <AddIcon style={{ marginRight: "6px" }} />
            ADD NEW VERBS
          </Button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={sub}>
              <Box mb={3} style={{ display: "flex", justifyContent: "end" }}>
                <CloseIcon
                  onClick={handleClose}
                  style={{ cursor: "pointer", color: "gray" }}
                />
              </Box>
              <h4 className="mb-4">ADD NEW VERB</h4>
              <div>
                <FormControl fullWidth size="small">
                  <InputLabel id="taskType">Select Domain</InputLabel>
                  <Select
                    fullWidth
                    className="mb-4"
                    labelId="selectdegree"
                    id="selectdegree"
                    value={Domain}
                    label="Select Domain"
                    onChange={(e) => setDomain(e.target.value)}
                  >
                    {DomainRow.map((i) => {
                      return <MenuItem value={i.Domain}>{i.Domain}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                  <InputLabel id="taskType">Select BTL Level</InputLabel>
                  <Select
                    fullWidth
                    className="mb-4"
                    labelId="selectdegree"
                    id="selectdegree"
                    value={Btl}
                    label="Select BTL Level"
                    onChange={(e) => setBtl(e.target.value)}
                  >
                    {BTLRow.map((i) => {
                      return <MenuItem value={i.BTL}>{i.BTL}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <div className="row">
                  <div className="col-9">
                    <FormControl fullWidth size="medium">
                      <TextField
                        className="mb-4"
                        id="outlined-basic"
                        label="Verbs"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={Verb}
                        onChange={(e) => setVerb(e.target.value)}
                      />
                    </FormControl>
                  </div>
                  <div className="col-3">
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="medium"
                      style={{ backgroundColor: "#4b2980" }}
                      onClick={ADDing}
                    >
                      ADD
                    </Button>
                  </div>
                </div>
                <FormControl fullWidth size="medium">
                  {/* <Autocomplete
                className="mb-4"
                multiple
                id="tags-standard"
                value={AssignPrerequisite}
                options={opts}
                getOptionLabel={(option) => option.Name}
                defaultValue={null}
                onChange={(e, val) => setAssignPrerequisite(val)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Set Prerequisite"
                    placeholder="Set Prerequisite"
                    size="small"
                  />
                )}
              /> */}
                  <Autocomplete
                    style={{ backgroundColor: "#fff", marginBottom: 35 }}
                    multiple
                    fullWidth
                    variant="outlined"
                    id="tags-standard"
                    className="mb-4"
                    size="small"
                    defaultValue={null}
                    value={Verbs}
                    options={[]}
                    getOptionLabel={(option) => option}
                    onChange={(e, val) => setVerbs(val)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Verbs"
                        placeholder="Add Verbs"
                      />
                    )}
                  />

                  {/* <TextField
                    className="mb-4"
                    id="outlined-basic"
                    label="VERBS"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={Verb}
                    onChange={(e) => setVerb(e.target.value)}
                  /> */}
                </FormControl>
              </div>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                style={muibtn}
              >
                <AiFillEdit style={{ marginRight: 10 }} />
                {Upid == "" ? <>Add Verb</> : <>Update Verb</>}
              </Button>
            </form>
          </Box>
        </Modal>

        <div>
          <DataGrid
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
              LoadingOverlay: LinearProgress,
            }}
            style={{ height: "50vh", width: "100%" }}
            columns={columns}
            rows={BTLDIC}
            getRowId={(Rows) => Rows._id}
            pageSize={4}
            rowsPerPageOptions={[4]}
            disableSelectionOnClick
          />
        </div>
      </Card>
    </div>
  );
}
