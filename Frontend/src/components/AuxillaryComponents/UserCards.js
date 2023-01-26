import { Card, CardContent, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "../css/styles.css";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function UserCards(props) {
  const [CAC, setCAC] = useState(0);
  const [Faculty, setFaculty] = useState(0);
  const [Evaluator, setEvaluator] = useState(0);
  useEffect(() => {
    getData();
  }, [props]);
  var count1 = 0;
  var count2 = 0;
  var count3 = 0;

  const getData = async () => {
    props.pre.forEach((element) => {
      element.Roles.forEach((e) => {
        if (e == "CAC") count1 = count1 + 1;
        if (e == "Faculty") count2 = count2 + 1;
        if (e == "Evaluator") count3 = count3 + 1;
      });
    });
    setCAC(count1);
    setFaculty(count2);
    setEvaluator(count3);
    // console.log(response.data);
  };
  const style = {
    backgroundColor: "#4b2980",
    color: "#fff",
    padding: 20,
    borderRadius: 7,
  };
  return (
    <div style={{ marginTop: 50, marginBottom: 80 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item style={style}>
              <h1>{CAC}</h1>
              <h5>TOTAL CAC MEMBERS</h5>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={style}>
              <h1>{Faculty}</h1>
              <h5>TOTAL FACULTY MEMBERS</h5>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={style}>
              <h1>{Evaluator}</h1>
              <h5>TOTAL EVALUATORS</h5>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
