import React, { useState } from "react";
import "./css/Navigation.css";
import "./css/styles.css";
import { Link, Outlet } from "react-router-dom";
import Popup from "./AuxillaryComponents/PopupFunction";
import Register from "./AuxillaryComponents/Register";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import AvatarMenu from "./AuxillaryComponents/AvatarMenu";
import CloseIcon from "@mui/icons-material/Close";

import {
  BsFillPersonPlusFill,
  BsFillPeopleFill,
  BsFillBookFill,
  BsFillHouseDoorFill,
  BsFillBookmarkPlusFill,
  BsListCheck,
  BsListTask,
  BsFillFileCheckFill,
  BsFillFilePdfFill,
  BsFillFolderFill,
  BsFillPersonFill,
  BsFillCalendarWeekFill,
  BsBookHalf,
  BsCollectionFill,
  BsJournal,
  BsStack,
  BsPersonFill,
  BsPersonBadgeFill,
  BsPersonCheckFill,
  BsCalendarMonthFill,
  BsCalendarPlusFill,
  BsCalendarCheckFill,
  BsPlusCircleFill,
  BsFillFilterCircleFill,
} from "react-icons/bs";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useAuth from "../MyHooks/useAuth";
import { Box, Button, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  borderRadius: "5px",

  boxShadow: 24,
  p: 4,
};

export default function Navigation() {
  const [openCourses, setOpenCourses] = useState(false);
  const [openSoBtl, setOpenSoBtl] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);
  const [openDocument, setOpenDocument] = useState(false);
  const [openTasks, setOpenTasks] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openMeeting, setOpenMeeting] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openSdebar, setopenSdebar] = useState(false);
  const handleClose = () => setOpen(false);
  const { setAdmin, setFaculty } = useAuth();

  axios.defaults.withCredentials = true;

  const handleLogout = async (e) => {
    await axios.post("http://localhost:4000/Auth/logout");
    setAdmin(false);
    setFaculty(false);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <div
        className="bg"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
          borderBottom: "1px solid #fff",
        }}
      >
        <nav className="d-flex align-items-center navbar-expand navbar-dark  ">
          <a className="navbar-brand ps-3" to="/Dashboard">
            <b>ADMIN DASHBOARD</b>
          </a>
          <div className="d-none d-md-inline-block form-inline me-0 me-md-3 my-2 my-md-0">
            <div className="input-group " >
              <Button
                fullWidth
                style={{
                  backgroundColor: "#fff",
                  color: "#00447f",
                }}
                variant="contained"
                color="primary"
                size="small"
                type="button"
                onClick={() => setOpen(true)}
              >
                <span style={{ marginRight: 10 }}>
                  <BsFillPersonPlusFill />
                </span>
                <b>Add Faculty</b>
              </Button>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Box style={{ display: "flex", justifyContent: "end" }}>
                    <CloseIcon
                      onClick={handleClose}
                      style={{ cursor: "pointer", color: "gray" }}
                    />
                  </Box>
                  <Register />
                </Box>
              </Modal>
            </div>
          </div>
          <div className="ms-auto">
            <AvatarMenu />
          </div>
          {openSdebar == false ? (
            <button
              className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 d-lg-none"
              id="sidebarToggle"
              onClick={() => setopenSdebar(true)}
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          ) : (
            <></>
          )}
          {openSdebar === true ? (
            <button
              className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 d-lg-none"
              id="sidebarToggle"
              onClick={() => setopenSdebar(false)}
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          ) : (
            <></>
          )}
        </nav>
      </div>

      <div id="layoutSidenav" >
        <div
          id="layoutSidenav_nav "
          className={!openSdebar ? "d-none d-lg-block" : "d-block overSidebar "}
        >
          <nav
      
            className="sb-sidenav accordion bg "
            id="sidenavAccordion"
          >
            <div
              style={{
                height: "calc(100vh - 57px)",
                overflow: "auto",
              }}
              className="sb-sidenav-menu "
            >
              <div className="nav">
                <div className="sb-sidenav-menu-heading"></div>
                <Link class="nav-link sidenavtext " to="Dashboard">
                  <div class="sb-nav-link-icon">
                    <BsFillHouseDoorFill color="#fff" />
                  </div>
                  Dashboard
                </Link>
                <Link class="nav-link sidenavtext " to="AddProgram">
                  <div class="sb-nav-link-icon">
                    <BsPlusCircleFill color="#fff" />
                  </div>
                  Add Program
                </Link>

                <div
                  onClick={() => {
                    openSoBtl ? setOpenSoBtl(false) : setOpenSoBtl(true);
                  }}
                  style={{ cursor: "pointer" }}
                  class="nav-link sidenavtext"
                >
                  <div class="sb-nav-link-icon">
                    <BsFillBookFill color="#fff" />
                  </div>
                  SO & BTL Level
                  <div style={{ marginLeft: "auto" }} class="sb-nav-link-icon">
                    {openSoBtl ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </div>
                </div>
                {openSoBtl && (
                  <>
                    <Link
                      class="nav-link sidenavtext "
                      to="SO"
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFilePdfFill color="#fff" />
                      </div>
                      Student Outcomes
                    </Link>

                    <Link
                      class="nav-link sidenavtext "
                      to="BTLLevel"
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFilePdfFill color="#fff" />
                      </div>
                      BTL Level
                    </Link>
                    <Link
                      class="nav-link sidenavtext "
                      to="CloDomains"
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFilePdfFill color="#fff" />
                      </div>
                      CLO Domains
                    </Link>
                    <Link
                      class="nav-link sidenavtext "
                      to="BtlDictionary"
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFilePdfFill color="#fff" />
                      </div>
                      BTL Dictionary
                    </Link>
                  </>
                )}

                <div
                  onClick={() => {
                    openFolder ? setOpenFolder(false) : setOpenFolder(true);
                  }}
                  style={{ cursor: "pointer" }}
                  class="nav-link sidenavtext"
                >
                  <div class="sb-nav-link-icon">
                    <BsFillBookFill color="#fff" />
                  </div>
                  Course Folder
                  <div style={{ marginLeft: "auto" }} class="sb-nav-link-icon">
                    {openFolder ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </div>
                </div>
                {openFolder && (
                  <>
                    <Link
                      class="nav-link sidenavtext "
                      to="AllCourseFolder"
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFilePdfFill color="#fff" />
                      </div>
                      All Course Folders
                    </Link>
                    <Link
                      class="nav-link sidenavtext "
                      to="CourseFolderTheory"
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFilePdfFill color="#fff" />
                      </div>
                      Course Folder Theory
                    </Link>
                    <Link
                      class="nav-link sidenavtext "
                      to="CourseFolderLab"
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFilePdfFill color="#fff" />
                      </div>
                      Course Folder Lab
                    </Link>

                    <Link
                      class="nav-link sidenavtext "
                      to="FolderInRevisionA"
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFolderFill color="#fff" />
                      </div>
                      Folder In Revision
                    </Link>
                    <Link
                      class="nav-link sidenavtext "
                      to="PendingDeadlineRequests"
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFolderFill color="#fff" />
                      </div>
                      Pending Deadline Requests
                    </Link>
                    <Link
                      class="nav-link sidenavtext "
                      to="LateSubmissions"
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFolderFill color="#fff" />
                      </div>
                      Late Submissions
                    </Link>
                  </>
                )}

                <div
                  onClick={() => {
                    openCourses ? setOpenCourses(false) : setOpenCourses(true);
                  }}
                  style={{ cursor: "pointer" }}
                  class="nav-link sidenavtext"
                >
                  <div class="sb-nav-link-icon">
                    <BsFillBookFill color="#fff" />
                  </div>
                  Courses
                  <div style={{ marginLeft: "auto" }} class="sb-nav-link-icon">
                    {openCourses ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </div>
                </div>
                {openCourses && (
                  <>
                    <Link
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                      class="nav-link sidenavtext "
                      to="AllProgramCourses"
                    >
                      <div class="sb-nav-link-icon">
                        <BsCollectionFill color="#fff" />
                      </div>
                      All Programwise Courses
                    </Link>
                    <Link
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                      class="nav-link sidenavtext "
                      to="AllCourses"
                    >
                      <div class="sb-nav-link-icon">
                        <BsCollectionFill color="#fff" />
                      </div>
                      All Courses
                    </Link>
                    <Link
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                      class="nav-link sidenavtext"
                      to="InitCourse"
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillBookmarkPlusFill color="#fff" />
                      </div>
                      Initialize New Course
                    </Link>
                    <Link
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                      class="nav-link sidenavtext "
                      to="AllCategories"
                    >
                      <div class="sb-nav-link-icon">
                        <BsListCheck color="#fff" />
                      </div>
                      Course Categories
                    </Link>
                  </>
                )}
                <div
                  onClick={() => {
                    openTasks ? setOpenTasks(false) : setOpenTasks(true);
                  }}
                  style={{ cursor: "pointer" }}
                  class="nav-link sidenavtext"
                >
                  <div class="sb-nav-link-icon">
                    <BsStack color="#fff" backgroundColor="#fff" />
                  </div>
                  Tasks
                  <div style={{ marginLeft: "auto" }} class="sb-nav-link-icon">
                    {openTasks ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </div>
                </div>
                {openTasks && (
                  <>
                    <Link
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                      class="nav-link sidenavtext "
                      to="InitializeTask"
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillBookmarkPlusFill color="#fff" />
                      </div>
                      Initialize Task
                    </Link>
                    {/* <Link
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                      class="nav-link sidenavtext "
                      to="Tasks"
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFilterCircleFill color="#fff" />
                      </div>
                      Assigned Tasks
                    </Link> */}
                    <Link
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                      class="nav-link sidenavtext "
                      to="ReturnedTasks"
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFileCheckFill color="#fff" />
                      </div>
                      Submitted Tasks
                    </Link>
                    <Link
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                      class="nav-link sidenavtext "
                      to="CompletedTasks"
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFileCheckFill color="#fff" />
                      </div>
                      Completed Tasks
                    </Link>
                  </>
                )}

                <div
                  onClick={() => {
                    openDocument
                      ? setOpenDocument(false)
                      : setOpenDocument(true);
                  }}
                  style={{ cursor: "pointer" }}
                  class="nav-link sidenavtext"
                >
                  <div class="sb-nav-link-icon">
                    <BsFillBookFill color="#fff" />
                  </div>
                  Degree Documents
                  <div style={{ marginLeft: "auto" }} class="sb-nav-link-icon">
                    {openDocument ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </div>
                </div>
                {openDocument && (
                  <>
                    <Link
                      class="nav-link sidenavtext "
                      to="AllSchemeofStudies"
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFilePdfFill color="#fff" />
                      </div>
                      Scheme of Studies
                    </Link>
                    <Link
                      class="nav-link sidenavtext "
                      to="GenCDFall"
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFilePdfFill color="#fff" />
                      </div>
                      General CDFs
                    </Link>
                    <Link
                      class="nav-link sidenavtext "
                      to="AllCDFs"
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFilePdfFill color="#fff" />
                      </div>
                      CDFs
                    </Link>
                    <Link
                      class="nav-link sidenavtext "
                      to="Gensyllabusall"
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFilePdfFill color="#fff" />
                      </div>
                      General Syllabus
                    </Link>
                    <Link
                      class="nav-link sidenavtext "
                      to="AllSyllabus"
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillFilePdfFill color="#fff" />
                      </div>
                      Syllabus
                    </Link>
                  </>
                )}

                <div
                  onClick={() => {
                    openUsers ? setOpenUsers(false) : setOpenUsers(true);
                  }}
                  style={{ cursor: "pointer" }}
                  class="nav-link sidenavtext"
                >
                  <div class="sb-nav-link-icon">
                    <BsPersonFill color="#fff" />
                  </div>
                  Users
                  <div style={{ marginLeft: "auto" }} class="sb-nav-link-icon">
                    {openUsers ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </div>
                </div>
                {openUsers && (
                  <>
                    <Link
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                      class="nav-link sidenavtext "
                      to="Users"
                    >
                      <div class="sb-nav-link-icon">
                        <BsFillPeopleFill color="#fff" />
                      </div>
                      All Users
                    </Link>
                    <Link
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                      class="nav-link sidenavtext "
                      to="FacultyMembers"
                    >
                      <div class="sb-nav-link-icon">
                        <BsPersonBadgeFill color="#fff" />
                      </div>
                      FacultyMembers
                    </Link>

                    <Link
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                      class="nav-link sidenavtext "
                      to="Evaluators"
                    >
                      <div class="sb-nav-link-icon">
                        <BsPersonCheckFill color="#fff" />
                      </div>
                      Evaluators
                    </Link>
                  </>
                )}

                {/* <Link class="nav-link sidenavtext " to="Meeting">
                  <div class="sb-nav-link-icon">
                    <BsFillCalendarWeekFill color="#fff" />
                  </div>
                  CAC Meeting
                </Link> */}
                <div
                  onClick={() => {
                    openMeeting ? setOpenMeeting(false) : setOpenMeeting(true);
                  }}
                  style={{ cursor: "pointer" }}
                  class="nav-link sidenavtext"
                >
                  <div class="sb-nav-link-icon">
                    <BsCalendarMonthFill color="#fff" />
                  </div>
                  Meeting
                  <div style={{ marginLeft: "auto" }} class="sb-nav-link-icon">
                    {openMeeting ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </div>
                </div>
                {openMeeting && (
                  <>
                    <Link
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                      class="nav-link sidenavtext "
                      to="CreateNewMeeting"
                    >
                      <div class="sb-nav-link-icon">
                        <BsCalendarPlusFill color="#fff" />
                      </div>
                      Create New Meeting
                    </Link>
                    <Link
                      style={{ marginLeft: "12px", fontSize: "14px" }}
                      class="nav-link sidenavtext "
                      to="ViewCacMemberAvailabilty"
                    >
                      <div class="sb-nav-link-icon">
                        <BsCalendarCheckFill color="#fff" />
                      </div>
                      CAC Member Availability
                    </Link>
                  </>
                )}

                {/* <Link class="nav-link sidenavtext " to="Flip">
                  <div class="sb-nav-link-icon">
                    <BsBookHalf color="#fff" />
                  </div>
                  Flipbook
                </Link> */}
              </div>
            </div>
          </nav>
        </div>
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 57px)",
            overflow: "auto",
          }}
          onClick={() => setopenSdebar(false)}
        >
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}