import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

export default function FolderNavigation(props) {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);


  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);
  const [open8, setOpen8] = React.useState(false);
  console.log("props", props.data);
  const data = props.data;
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };



  const handleClick5 = () => {
    setOpen5(!open5);
  };
  const handleClick6 = () => {
    setOpen6(!open6);
  };

  const handleClick7 = () => {
    setOpen7(!open7);
  };
  const handleClick8 = () => {
    setOpen8(!open8);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <List
        sx={{
          width: "100%",
          maxWidth: 300,
          bgcolor: "background.paper",
          maxHeight: 400,
          overflow: "auto",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Folder Navigation
          </ListSubheader>
        }
      >
        <ListItemButton
          onClick={() => {
            props.handleClickScroll("lecture");
            localStorage.setItem("ref", JSON.stringify("lecture"));
          }}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Lecture Delivery Record" />
        </ListItemButton>

        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Quizzes" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {data?.files.map((item) =>
            item.Title.includes("Quiz") ? (
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={handleClick1}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={item.Title} />
                  {open1 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open1} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Best");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Best")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Best" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Average");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Average")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Average" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Worst");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Worst")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Worst" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Question");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Question")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Question Paper" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Answer");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Answer")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Solution" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Award");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Award")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Award List" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Evaluation");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Evaluation")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Evaluation" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            ) : (
              <></>
            )
          )}
        </Collapse>

        <ListItemButton onClick={handleClick2}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Assignments" />
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          {data?.files.map((item) =>
            item.Title.includes("Assignment") ? (
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={handleClick3}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={item.Title} />
                  {open3 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open3} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Best");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Best")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Best" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Average");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Average")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Average" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Worst");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Worst")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Worst" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Question");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Question")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Question Paper" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Answer");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Answer")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Solution" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Award");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Award")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Award List" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Evaluation");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Evaluation")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Evaluation" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            ) : (
              <></>
            )
          )}
        </Collapse>

        <ListItemButton onClick={handleClick5}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Mid" />
          {open5 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open5} timeout="auto" unmountOnExit>
          {data?.files.map((item) =>
            item.Title.includes("Mid") || item.Title.includes("Sessional")  ? (
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={handleClick6}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={item.Title} />
                  {open6 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open6} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Best");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Best")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Best" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Average");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Average")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Average" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Worst");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Worst")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Worst" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Question");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Question")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Question Paper" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Answer");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Answer")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Solution" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Award");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Award")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Award List" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Evaluation");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Evaluation")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Evaluation" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            ) : (
              <></>
            )
          )}
        </Collapse>


        

        <ListItemButton onClick={handleClick7}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Terminal" />
          {open7 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open7} timeout="auto" unmountOnExit>
          {data?.files.map((item) =>
            item.Title?.includes("Terminal") ? (
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={handleClick8}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={item.Title} />
                  {open8 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open8} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Best");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Best")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Best" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Average");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Average")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Average" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Worst");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Worst")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Worst" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Question");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Question")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Question Paper" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Answer");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Answer")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Solution" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Award");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Award")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Award List" />
                    </ListItemButton>
                    <ListItemButton
                      sx={{ pl: 8 }}
                      onClick={() => {
                        props.handleClickScroll(item.Title + "Evaluation");
                        localStorage.setItem(
                          "ref",
                          JSON.stringify(item.Title + "Evaluation")
                        );
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Evaluation" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            ) : (
              <></>
            )
          )}
        </Collapse>
        <ListItemButton
          onClick={() => {
            props.handleClickScroll("Obe");
            localStorage.setItem("ref", JSON.stringify("Obe"));
          }}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="OBE" />
        </ListItemButton>
      </List>
    </div>
  );
}
