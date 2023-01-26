import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  AiFillEye,
  AiFillEdit,
  AiFillDelete,
  AiOutlineClockCircle,
  AiFillClockCircle,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import {
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  Modal,
} from "@mui/material";
import { muibtn } from "./style";

const columns1 = [
  {
    field: "day",
    headerName: "Days",
    width: "200",
  },
  {
    field: "slot",
    headerName: "Free Time of Members",
    width: "700",
  },
];

export default function ViewCacAvailability() {
  const [availabilityData, setAvailabilityData] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState();
  const [ideal, setideal] = useState();
  const [flag, setflag] = useState();
  const [Arr, setArry] = useState([
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
  ]);
  useEffect(() => {
    const getAll = async () => {
      var res = await axios.get(
        `http://localhost:4000/Meeting/get-all-availability`
      );

      var abc = res.data.map(function (item) {
        return {
          cacMember: item?.teacher_id?.Name,

          mon: item.time.mon,
          tue: item.time.tue,
          wed: item.time.wed,
          thur: item.time.thur,
          fri: item.time.fri,
          sat: item.time.sat,
          id: item._id,
        };
      });
      setdata(res.data);
      setAvailabilityData(abc);

      var a = [
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
      ];
      abc.map((item) => {
        var x = item.mon.indexOf("8:30-10:00");
        if (x == -1) {
          a[0][0] = a[0][0] + "";
        } else {
          a[0][0] = a[0][0] + item?.cacMember + ",";
        }
        var x = item.mon.indexOf("10:00-11:30");
        if (x == -1) {
          a[1][0] = a[1][0] + "";
        } else {
          a[1][0] = a[1][0] + item?.cacMember + ",";
        }
        var x = item.mon.indexOf("11:30-1:00");
        if (x == -1) {
          a[2][0] = a[2][0] + "";
        } else {
          a[2][0] = a[2][0] + item?.cacMember + ",";
        }
        var x = item.mon.indexOf("1:00-2:30");
        if (x == -1) {
          a[3][0] = a[3][0] + "";
        } else {
          a[3][0] = a[3][0] + item?.cacMember + ",";
        }
        var x = item.mon.indexOf("2:30-4:00");
        if (x == -1) {
          a[4][0] = a[4][0] + "";
        } else {
          a[4][0] = a[4][0] + item?.cacMember + ",";
        }
        var x = item.mon.indexOf("4:00-5:30");
        if (x == -1) {
          a[5][0] = a[5][0] + "";
        } else {
          a[5][0] = a[5][0] + item?.cacMember + ",";
        }

        var x = item.tue.indexOf("8:30-10:00");
        if (x == -1) {
          a[0][1] = a[0][1] + "";
        } else {
          a[0][1] = a[0][1] + item?.cacMember + ",";
        }
        var x = item.tue.indexOf("10:00-11:30");
        if (x == -1) {
          a[1][1] = a[1][1] + "";
        } else {
          a[1][1] = a[1][1] + item?.cacMember + ",";
        }
        var x = item.tue.indexOf("11:30-1:00");
        if (x == -1) {
          a[2][1] = a[2][1] + "";
        } else {
          a[2][1] = a[2][1] + item?.cacMember + ",";
        }
        var x = item.tue.indexOf("1:00-2:30");
        if (x == -1) {
          a[3][1] = a[3][1] + "";
        } else {
          a[3][1] = a[3][1] + item?.cacMember + ",";
        }
        var x = item.tue.indexOf("2:30-4:00");
        if (x == -1) {
          a[4][1] = a[4][1] + "";
        } else {
          a[4][1] = a[4][1] + item?.cacMember + ",";
        }
        var x = item.tue.indexOf("4:00-5:30");
        if (x == -1) {
          a[5][1] = a[5][1] + "";
        } else {
          a[5][1] = a[5][1] + item?.cacMember + ",";
        }

        var x = item.wed.indexOf("8:30-10:00");
        if (x == -1) {
          a[0][2] = a[0][2] + "";
        } else {
          a[0][2] = a[0][2] + item?.cacMember + ",";
        }
        var x = item.wed.indexOf("10:00-11:30");
        if (x == -1) {
          a[1][2] = a[1][2] + "";
        } else {
          a[1][2] = a[1][2] + item?.cacMember + ",";
        }
        var x = item.wed.indexOf("11:30-1:00");
        if (x == -1) {
          a[2][2] = a[2][2] + "";
        } else {
          a[2][2] = a[2][2] + item?.cacMember + ",";
        }
        var x = item.wed.indexOf("1:00-2:30");
        if (x == -1) {
          a[3][2] = a[3][2] + "";
        } else {
          a[3][2] = a[3][2] + item?.cacMember + ",";
        }
        var x = item.wed.indexOf("2:30-4:00");
        if (x == -1) {
          a[4][2] = a[4][2] + "";
        } else {
          a[4][2] = a[4][2] + item?.cacMember + ",";
        }
        var x = item.wed.indexOf("4:00-5:30");
        if (x == -1) {
          a[5][2] = a[5][2] + "";
        } else {
          a[5][2] = a[5][2] + item?.cacMember + ",";
        }

        var x = item.thur.indexOf("8:30-10:00");
        if (x == -1) {
          a[0][3] = a[0][3] + "";
        } else {
          a[0][3] = a[0][3] + item?.cacMember + ",";
        }
        var x = item.thur.indexOf("10:00-11:30");
        if (x == -1) {
          a[1][3] = a[1][3] + "";
        } else {
          a[1][3] = a[1][3] + item?.cacMember + ",";
        }
        var x = item.thur.indexOf("11:30-1:00");
        if (x == -1) {
          a[2][3] = a[2][3] + "";
        } else {
          a[2][3] = a[2][3] + item?.cacMember + ",";
        }
        var x = item.thur.indexOf("1:00-2:30");
        if (x == -1) {
          a[3][3] = a[3][3] + "";
        } else {
          a[3][3] = a[3][3] + item?.cacMember + ",";
        }
        var x = item.thur.indexOf("2:30-4:00");
        if (x == -1) {
          a[4][3] = a[4][3] + "";
        } else {
          a[4][3] = a[4][3] + item?.cacMember + ",";
        }
        var x = item.thur.indexOf("4:00-5:30");
        if (x == -1) {
          a[5][3] = a[5][3] + "";
        } else {
          a[5][3] = a[5][3] + item?.cacMember + ",";
        }

        var x = item.fri.indexOf("8:30-10:00");
        if (x == -1) {
          a[0][4] = a[0][4] + "";
        } else {
          a[0][4] = a[0][4] + item?.cacMember + ",";
        }
        var x = item.fri.indexOf("10:00-11:30");
        if (x == -1) {
          a[1][4] = a[1][4] + "";
        } else {
          a[1][4] = a[1][4] + item?.cacMember + ",";
        }
        var x = item.fri.indexOf("11:30-1:00");
        if (x == -1) {
          a[2][4] = a[2][4] + "";
        } else {
          a[2][4] = a[2][4] + item?.cacMember + ",";
        }
        var x = item.fri.indexOf("1:00-2:30");
        if (x == -1) {
          a[3][4] = a[3][4] + "";
        } else {
          a[3][4] = a[3][4] + item?.cacMember + ",";
        }
        var x = item.fri.indexOf("2:30-4:00");
        if (x == -1) {
          a[4][4] = a[4][4] + "";
        } else {
          a[4][4] = a[4][4] + item?.cacMember + ",";
        }
        var x = item.fri.indexOf("4:00-5:30");
        if (x == -1) {
          a[5][4] = a[5][4] + "";
        } else {
          a[5][4] = a[5][4] + item?.cacMember + ",";
        }

        var x = item.sat.indexOf("8:30-10:00");
        if (x == -1) {
          a[0][5] = a[0][5] + "";
        } else {
          a[0][5] = a[0][5] + item?.cacMember + ",";
        }
        var x = item.sat.indexOf("10:00-11:30");
        if (x == -1) {
          a[1][5] = a[1][5] + "";
        } else {
          a[1][5] = a[1][5] + item?.cacMember + ",";
        }
        var x = item.sat.indexOf("11:30-1:00");
        if (x == -1) {
          a[2][5] = a[2][5] + "";
        } else {
          a[2][5] = a[2][5] + item?.cacMember + ",";
        }
        var x = item.sat.indexOf("1:00-2:30");
        if (x == -1) {
          a[3][5] = a[3][5] + "";
        } else {
          a[3][5] = a[3][5] + item?.cacMember + ",";
        }
        var x = item.sat.indexOf("2:30-4:00");
        if (x == -1) {
          a[4][5] = a[4][5] + "";
        } else {
          a[4][5] = a[4][5] + item?.cacMember + ",";
        }
        var x = item.sat.indexOf("4:00-5:30");
        if (x == -1) {
          a[5][5] = a[5][5] + "";
        } else {
          a[5][5] = a[5][5] + item?.cacMember + ",";
        }
      });
      setArry(a);
      setLoading(false);
      setflag(true);
    };
    const getavailability = async () => {
      var array = [
        "8:30-10:00",
        "10:00-11:30",
        "11:30-1:00",
        "1:00-2:30",
        "2:30-4:00",
        "4:00-5:30",
      ];
      var countm = [0, 0, 0, 0, 0, 0],
        countt = [0, 0, 0, 0, 0, 0],
        countw = [0, 0, 0, 0, 0, 0],
        countth = [0, 0, 0, 0, 0, 0],
        countf = [0, 0, 0, 0, 0, 0],
        counts = [0, 0, 0, 0, 0, 0];
      console.log("i am here", data);
      data?.map((item, id) => {
        array.map((i, id) => {
          var a = item.time.mon.find((it) => it == i);
          if (a != undefined) {
            countm[id] = countm[id] + 1;
          }
          var a = item.time.tue.find((it) => it == i);
          if (a != undefined) {
            countt[id] = countt[id] + 1;
          }
          var a = item.time.wed.find((it) => it == i);
          if (a != undefined) {
            countw[id] = countw[id] + 1;
          }
          var a = item.time.thur.find((it) => it == i);
          if (a != undefined) {
            countth[id] = countth[id] + 1;
          }
          var a = item.time.fri.find((it) => it == i);
          if (a != undefined) {
            countf[id] = countf[id] + 1;
          }
          var a = item.time.sat.find((it) => it == i);
          if (a != undefined) {
            counts[id] = counts[id] + 1;
          }
        });
      });

      var maxm = Math.max(...countm);
      var s = [];
      countm.map((item, index) => {
        if (item == maxm) {
          s.push(array[index]);
        }
      });
      console.log("ada", s);

      var idealtime = [];
      idealtime.push({ id: 1, day: "Monday", slot: s });
      maxm = Math.max(...countt);
      var s = [];
      countt.map((item, index) => {
        if (item == maxm) {
          s.push(array[index]);
        }
      });
      console.log("ad1a", s);

      idealtime.push({ id: 2, day: "Tuesday", slot: s });
      maxm = Math.max(...countw);
      var s = [];
      countw.map((item, index) => {
        if (item == maxm) {
          s.push(array[index]);
        }
      });
      console.log("ada2", s);

      idealtime.push({ id: 3, day: "Wednesday", slot: s });
      maxm = Math.max(...countth);
      var s = [];
      countth.map((item, index) => {
        if (item == maxm) {
          s.push(array[index]);
        }
      });
      console.log("ada3", s);

      idealtime.push({ id: 4, day: "Thursday", slot: s });
      maxm = Math.max(...countf);
      var s = [];
      countf.map((item, index) => {
        if (item == maxm) {
          s.push(array[index]);
        }
      });
      console.log("ada4", s);

      idealtime.push({ id: 5, day: "Friday", slot: s });
      maxm = Math.max(...counts);
      var s = [];
      counts.map((item, index) => {
        if (item == maxm) {
          s.push(array[index]);
        }
      });
      console.log("ada5", s);

      idealtime.push({ id: 6, day: "Saturday", slot: s });
      console.log("countm", idealtime);
      setideal(idealtime);
      var res = await axios.post(
        `http://localhost:4000/Meeting/update-ideal`,
        idealtime
      );
      console.log("response", res);
    };
    getavailability();
    getAll();
  }, [flag]);

  const submit = () => {
    axios.delete(`http://localhost:4000/Meeting/delete-availability`);
  };

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [rows, setRows] = React.useState([]);
  return (
    <div
      style={{
        width: "100%",
        padding: 40,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card style={{ padding: 30, borderRadius: 10 }}>
        <h1 className="py-4 mb-4">
          <b>CAC MEMBERS AVAILABILITIES</b>
        </h1>
        <div>
          <div className="d-flex justify-content-end mb-4">
            <Button
              className="mb-4"
              variant="contained"
              color="primary"
              size="medium"
              style={muibtn}
              onClick={handleClickOpen}
            >
              <AiOutlineClockCircle style={{ marginRight: 10 }} />
              Send Time Change Notification
            </Button>

            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure to reset availbilties of all users?"}
              </DialogTitle>

              <DialogActions>
                <Button
                  onClick={async () => {
                    submit();
                    handleCloseDialog();
                  }}
                >
                  Yes
                </Button>

                <Button onClick={handleCloseDialog} autoFocus>
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <div className="table-responsive">
            <table className="table table-border">
              <thead>
                <tr style={{ textAlign: "center", textTransform: "uppercase" }}>
                  <th>
                    <AiFillClockCircle style={{ marginRight: 10 }} />
                    Time Slots
                  </th>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                  <th>Saturday</th>
                </tr>
              </thead>
              <tbody
                style={{
                  textAlign: "center",
                }}
              >
                <tr>
                  <th style={{ padding: 15 }}>08:30-10:00</th>
                  {Arr[0]?.map((item) =>
                    item == "" ? (
                      <td
                        style={{
                          padding: 25,
                          backgroundColor: "grey",
                          color: "white",
                          borderWidth: 2,
                        }}
                      >
                        ------
                      </td>
                    ) : (
                      <td
                        style={{
                          padding: 15,
                          backgroundColor: "darkgreen",
                          color: "white",
                          borderWidth: 2,
                        }}
                      >
                        {item}
                      </td>
                    )
                  )}
                </tr>
                <tr>
                  <th style={{ padding: 15 }}>10:00-11:30</th>
                  {Arr[1]?.map((item) =>
                    item == "" ? (
                      <td
                        style={{
                          padding: 25,
                          backgroundColor: "grey",
                          color: "white",
                          borderWidth: 2,
                        }}
                      >
                        ------
                      </td>
                    ) : (
                      <td
                        style={{
                          padding: 15,
                          backgroundColor: "darkgreen",
                          color: "white",
                          borderWidth: 2,
                        }}
                      >
                        {item}
                      </td>
                    )
                  )}
                </tr>
                <tr style={{ padding: 15 }}>
                  <th style={{ padding: 15 }}>11:30-01:00</th>
                  {Arr[2]?.map((item) =>
                    item == "" ? (
                      <td
                        style={{
                          padding: 25,
                          backgroundColor: "grey",
                          color: "white",
                          borderWidth: 2,
                        }}
                      >
                        ------
                      </td>
                    ) : (
                      <td
                        style={{
                          padding: 15,
                          backgroundColor: "darkgreen",
                          color: "white",
                          borderWidth: 2,
                        }}
                      >
                        {item}
                      </td>
                    )
                  )}
                </tr>
                <tr>
                  <th style={{ padding: 15 }}>01:00-02:30</th>
                  {Arr[3]?.map((item) =>
                    item == "" ? (
                      <td
                        style={{
                          padding: 25,
                          backgroundColor: "grey",
                          color: "white",
                          borderWidth: 2,
                        }}
                      >
                        ------
                      </td>
                    ) : (
                      <td
                        style={{
                          padding: 15,
                          backgroundColor: "darkgreen",
                          color: "white",
                          borderWidth: 2,
                        }}
                      >
                        {item}
                      </td>
                    )
                  )}
                </tr>
                <tr>
                  <th style={{ padding: 15 }}>02:30-04:00</th>
                  {Arr[4]?.map((item) =>
                    item == "" ? (
                      <td
                        style={{
                          padding: 25,
                          backgroundColor: "grey",
                          color: "white",
                          borderWidth: 2,
                        }}
                      >
                        ------
                      </td>
                    ) : (
                      <td
                        style={{
                          padding: 15,
                          backgroundColor: "darkgreen",
                          color: "white",
                          borderWidth: 2,
                        }}
                      >
                        {item}
                      </td>
                    )
                  )}
                </tr>
                <tr>
                  <th style={{ padding: 15 }}>04:00-05:30</th>
                  {Arr[5]?.map((item) =>
                    item == "" ? (
                      <td
                        style={{
                          padding: 25,
                          backgroundColor: "grey",
                          color: "white",
                          borderWidth: 2,
                        }}
                      >
                        ------
                      </td>
                    ) : (
                      <td
                        style={{
                          padding: 15,
                          backgroundColor: "darkgreen",
                          color: "white",
                          borderWidth: 2,
                        }}
                      >
                        {item}
                      </td>
                    )
                  )}
                </tr>
              </tbody>
            </table>
          </div>

          <h4 style={{ marginTop: "4%", marginBottom: "3%" }}>
            <b>Ideal Time</b>
          </h4>
          <DataGrid
            style={{ height: 300, width: "100%" }}
            columns={columns1}
            rows={ideal}
            pageSize={10}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </Card>
    </div>
  );
}
