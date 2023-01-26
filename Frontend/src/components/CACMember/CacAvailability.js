import React, { useEffect, useState } from "react";
import "../css/styles.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import { AiOutlineClockCircle, AiOutlineUsergroupAdd } from "react-icons/ai";
import { Card, Grid, MenuItem, Modal, OutlinedInput } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/system";
import MeetingUpdateNotification from "./AvailabilityUpdateNotification";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { muibtn } from "../style";
import { date } from "yup";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#fff",
  mdhadow: 24,
  p: 4,
  mdhadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
};

const cardStyle = {width:"100%"};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const times = [
  "8:30-10:00",
  "10:00-11:30",
  "11:30-1:00",
  "1:00-2:30",
  "2:30-4:00",
  "4:00-5:30",
];

// function getStyles(time, availabilityTime, theme) {
//   return {
//     fontWeight:
//       availabilityTime.indexOf(time) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

const columns = [
  {
    field: "mon",
    headerName: "Monday",
    flex: 1,
  },
  {
    field: "tue",
    headerName: "Tuesday",
    flex: 1,
  },
  {
    field: "wed",
    headerName: "Wednesday",
    flex: 1,
  },
  {
    field: "thur",
    headerName: "Thusday",
    flex: 1,
  },
  {
    field: "fri",
    headerName: "Friday",
    flex: 1,
  },
  {
    field: "sat",
    headerName: "Saturday",
    flex: 1,
  },
];

export default function CacAvailability() {
  // const theme = useTheme();
  const [availabilityTimeMon, setAvailabilityTImeMon] = React.useState([]);
  const [availabilityTimeTue, setAvailabilityTImeTue] = React.useState([]);
  const [availabilityTimeThur, setAvailabilityTImeThur] = React.useState([]);
  const [availabilityTimeFri, setAvailabilityTImeFri] = React.useState([]);
  const [availabilityTimeSat, setAvailabilityTImeSat] = React.useState([]);
  const [availabilityTimeWed, setAvailabilityTImeWed] = React.useState([]);

  var availabilityTimeTuee,
    availabilityTimeThurr,
    availabilityTimeMonn,
    availabilityTimeFrii,
    availabilityTimeSatt,
    availabilityTimeWedd;
  const [teacherId, setTeacherId] = useState();
  const [availabilityData, setAvailabilityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entry, setentry] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [flag, setflag] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      var user = await axios.get("http://localhost:4000/Auth/check");
      console.log("eroo", user);

      var { data } = await axios.get(
        `http://localhost:4000/Meeting/get-availability/${user.data._id}`
      );
      if (data != null) {
        setflag(true);
        var array = [];
        times.map((item) => {
          var a = data.time.mon.find((it) => it == item);
          if (a == undefined) {
            array.push(item);
          }
        });
        setAvailabilityTImeMon(array);
        array = [];
        times.map((item) => {
          var a = data.time.tue.find((it) => it == item);
          if (a == undefined) {
            array.push(item);
          }
        });
        setAvailabilityTImeTue(array);

        array = [];
        times.map((item) => {
          var a = data.time.wed.find((it) => it == item);
          if (a == undefined) {
            array.push(item);
          }
        });
        setAvailabilityTImeWed(array);

        array = [];
        times.map((item) => {
          var a = data.time.thur.find((it) => it == item);
          if (a == undefined) {
            array.push(item);
          }
        });
        setAvailabilityTImeThur(array);

        array = [];
        times.map((item) => {
          var a = data.time.fri.find((it) => it == item);
          if (a == undefined) {
            array.push(item);
          }
        });
        setAvailabilityTImeFri(array);
        array = [];
        times.map((item) => {
          var a = data.time.sat.find((it) => it == item);
          if (a == undefined) {
            array.push(item);
          }
        });
        setAvailabilityTImeSat(array);
        //console.log("eroo",data)
        setAvailabilityData(data.time);
      }

      console.log("data", data);

      setTeacherId(user.data._id);
      setentry(false);
      setLoading(false);
    };

    getAll();
  }, [entry]);

  const handleChangeMon = (event) => {
    const {
      target: { value },
    } = event;

    setAvailabilityTImeMon(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeTue = (event) => {
    const {
      target: { value },
    } = event;

    setAvailabilityTImeTue(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeWed = (event) => {
    const {
      target: { value },
    } = event;

    setAvailabilityTImeWed(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeThur = (event) => {
    const {
      target: { value },
    } = event;

    setAvailabilityTImeThur(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeFri = (event) => {
    const {
      target: { value },
    } = event;

    setAvailabilityTImeFri(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeSat = (event) => {
    const {
      target: { value },
    } = event;

    setAvailabilityTImeSat(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var arr = availabilityTimeMon;
    console.log("helllo", availabilityTimeMon);
    console.log("helllotimes", arr);
    var obj = times;
    availabilityTimeMon.map((item) => {
      var a = times.find((i) => i == item);
      if (a != null) {
        obj = obj.filter((it) => it != item);
      }
    });
    availabilityTimeMonn = obj;
    obj = times;
    availabilityTimeTue.map((item) => {
      var a = times.find((i) => i == item);
      if (a != null) {
        obj = obj.filter((it) => it != item);
      }
    });
    availabilityTimeTuee = obj;

    obj = times;
    availabilityTimeWed.map((item) => {
      var a = times.find((i) => i == item);
      if (a != null) {
        obj = obj.filter((it) => it != item);
      }
    });
    availabilityTimeWedd = obj;

    obj = times;
    availabilityTimeThur.map((item) => {
      var a = times.find((i) => i == item);
      if (a != null) {
        obj = obj.filter((it) => it != item);
      }
    });
    availabilityTimeThurr = obj;

    obj = times;
    availabilityTimeFri.map((item) => {
      var a = times.find((i) => i == item);
      if (a != null) {
        obj = obj.filter((it) => it != item);
      }
    });
    availabilityTimeFrii = obj;

    obj = times;
    availabilityTimeSat.map((item) => {
      var a = times.find((i) => i == item);
      if (a != null) {
        obj = obj.filter((it) => it != item);
      }
    });
    availabilityTimeSatt = obj;

    console.log("arr1", obj);
    const data = {
      mon: availabilityTimeMonn,
      tue: availabilityTimeTuee,
      wed: availabilityTimeWedd,
      thur: availabilityTimeThurr,
      fri: availabilityTimeFrii,
      sat: availabilityTimeSatt,
    };
    console.log(data);
    if (flag) {
      const res = await axios.put(
        `http://localhost:4000/Meeting/update-availability/${teacherId}`,
        data
      );
      console.log("sada", res);
    } else {
      await axios.post(
        `http://localhost:4000/Meeting/add-availability/${teacherId}`,
        data
      );
    }
    handleClose();
    setentry(true);
  };

  return (
    !loading && (
      <div
        style={{
          width: "100%",
          padding: 40,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Card style={{ padding: 30, borderRadius: 10 }}>
          {flag ? <></> : <MeetingUpdateNotification />}
          <h1 className="py-4 mb-4">
            <b>SEMESTER TIMETABLE (FREE SLOTS)</b>
          </h1>

          <div className="d-flex justify-content-end mb-4">
            {flag ? (
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={muibtn}
                onClick={handleOpen}
              >
                <AiOutlineClockCircle style={{ marginRight: 10 }} />
                Edit Your Availability
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={muibtn}
                onClick={handleOpen}
              >
                <AiOutlineClockCircle style={{ marginRight: 10 }} />
                Set Your Availability
              </Button>
            )}
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box mb={1} style={{ display: "flex", justifyContent: "end" }}>
                <CloseIcon
                  onClick={handleClose}
                  style={{ cursor: "pointer", color: "gray" }}
                />
              </Box>
              <h4 className="mb-4">SELECT YOUR BUSY SLOTS</h4>
              <>
                <div className="form-group py-2">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-multiple-name-label">
                      Monday
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      name="mon"
                      multiple
                      value={availabilityTimeMon}
                      onChange={handleChangeMon}
                      input={<OutlinedInput label="Monday" />}
                      MenuProps={MenuProps}
                      autoWidth
                    >
                      {times.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="form-group py-2">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-multiple-name-label">
                      Tuesday
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      name="tue"
                      multiple
                      value={availabilityTimeTue}
                      onChange={handleChangeTue}
                      input={<OutlinedInput label="Tuesday" />}
                      MenuProps={MenuProps}
                      autoWidth
                    >
                      {times.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="form-group py-2">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-multiple-name-label">
                      Wednesday
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      name="wed"
                      multiple
                      value={availabilityTimeWed}
                      onChange={handleChangeWed}
                      input={<OutlinedInput label="Wednesday" />}
                      MenuProps={MenuProps}
                      autoWidth
                    >
                      {times.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="form-group py-2">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-multiple-name-label">
                      Thursday
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      name="thur"
                      multiple
                      value={availabilityTimeThur}
                      onChange={handleChangeThur}
                      input={<OutlinedInput label="Thursday" />}
                      MenuProps={MenuProps}
                      autoWidth
                    >
                      {times.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="form-group py-2">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-multiple-name-label">
                      Friday
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      name="fri"
                      multiple
                      value={availabilityTimeFri}
                      onChange={handleChangeFri}
                      input={<OutlinedInput label="Friday" />}
                      MenuProps={MenuProps}
                      autoWidth
                    >
                      {times.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="form-group py-2">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-multiple-name-label">
                      Saturday
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      name="sat"
                      multiple
                      value={availabilityTimeSat}
                      onChange={handleChangeSat}
                      input={<OutlinedInput label="Saturday" />}
                      MenuProps={MenuProps}
                      autoWidth
                    >
                      {times.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={muibtn}
                  onClick={handleSubmit}
                >
                  <AiOutlineClockCircle style={{ marginRight: 10 }} />
                  Submit
                </Button>
              </>
            </Box>
          </Modal>

          <div  style={{ padding: 30 }}>
           
              <Grid  className="d-md-flex"  style={{ marginBottom: 30 }}>
                <Grid item md={4} sm={12} className="m-2">
                  <Item style={cardStyle} >
                    <h1>Monday</h1>
                    <h5>{availabilityData?.mon}</h5>
                  </Item>
                </Grid>
                <Grid item md={4} sm={12} className="m-2">
                  <Item style={cardStyle}>
                    <h1>Tuesday</h1>
                    <h5>{availabilityData?.tue}</h5>
                  </Item>
                </Grid>
                <Grid item md={4} sm={12} className="m-2">
                  <Item style={cardStyle}>
                    <h1>Wednesday</h1>
                    <h5>{availabilityData?.wed}</h5>
                  </Item>
                </Grid>
              </Grid>
              <Grid className="d-md-flex">
                <Grid item md={4} sm={12} className="m-2">
                  <Item style={cardStyle}>
                    <h1>Thursday</h1>
                    <h5>{availabilityData?.thur}</h5>
                  </Item>
                </Grid>
                <Grid item md={4} sm={12} className="m-2">
                  <Item style={cardStyle}>
                    <h1>Friday</h1>
                    <h5>{availabilityData?.fri}</h5>
                  </Item>
                </Grid>
                <Grid item md={4} sm={12} className="m-2">
                  <Item style={cardStyle}>
                    <h1>Saturday</h1>
                    <h5>{availabilityData?.sat}</h5>
                  </Item>
                </Grid>
              </Grid>
          </div>
        </Card>
      </div>
    )
  );
}
