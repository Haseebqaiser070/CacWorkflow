import React,{useState} from "react";
import "../css/styles.css";
import "../css/Navigation.css";
import { Link, Outlet } from "react-router-dom";
import AvatarMenu from "../AuxillaryComponents/AvatarMenu";
import {
  BsFilePersonFill,
  BsFiles,
  BsFillCalendarWeekFill,
  BsFillFilterCircleFill,
  BsFillHouseDoorFill,
  BsFillBookmarkPlusFill,
  BsCalendarMonthFill,
  BsStickyFill,
} from "react-icons/bs";



export default function CACnav() {

  const [openSdebar, setopenSdebar] = useState(false);

  return (
    <React.Fragment>
      <div
        class="bg"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
          borderBottom: "1px solid #fff",
        }}
      >
          <nav className="d-flex align-items-center navbar-expand navbar-dark  ">
          <a className="navbar-brand ps-3" to="/Dashboard">
            <b>CAC DASHBOARD</b>
          </a>
          
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
              <div className="nav" style={{position:"relative"}}>
                <div class="sb-sidenav-menu-heading"></div>
                <Link class="nav-link sidenavtext " to="Dashboard">
                  <div class="sb-nav-link-icon">
                    <BsFillHouseDoorFill color="#fff" />
                  </div>
                  Dashboard
                </Link>

                <Link class="nav-link sidenavtext" to="CacCourseTask">
                  <div class="sb-nav-link-icon">
                    <BsFilePersonFill color="#fff" />
                  </div>
                  Courses Assigned
                </Link>

                <Link class="nav-link sidenavtext" to="CacSosTask">
                  <div class="sb-nav-link-icon">
                    <BsStickyFill color="#fff" />
                  </div>
                  SOS Assigned
                </Link>

                <Link class="nav-link sidenavtext" to="CacCdfTask">
                  <div class="sb-nav-link-icon">
                    <BsStickyFill color="#fff" />
                  </div>
                  CDF Assigned
                </Link>

                <Link class="nav-link sidenavtext" to="CacSyllabusTask">
                  <div class="sb-nav-link-icon">
                    <BsFiles color="#fff" />
                  </div>
                  Syllabus Assigned
                </Link>

                <Link class="nav-link sidenavtext" to="FacultyMeeting">
                  <div class="sb-nav-link-icon">
                    <BsCalendarMonthFill color="#fff" />
                  </div>
                  Meetings
                </Link>
                <Link class="nav-link sidenavtext" to="SetAvailability">
                  <div class="sb-nav-link-icon">
                    <BsFillCalendarWeekFill color="#fff" />
                  </div>
                  Set/Edit Availability
                </Link>
                <div
              
              style={{ position: "absolute", left: "0px", bottom: "-110px" }}
              class="sb-sidenav-footer sidenavtext"
              >
                Comsats University Islamabad
              </div>
              </div>
              
            </div>
          </nav>
        </div>

        <div
          style={{
            width: "100%",
            height: "calc(100vh - 58px)",
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