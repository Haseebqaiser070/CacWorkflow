import React, { useState } from "react";
import "../css/styles.css";
import { Link, Outlet } from "react-router-dom";
import AvatarMenu from "../AuxillaryComponents/AvatarMenu";

import {
  BsFillPersonPlusFill,
  BsFiles,
  BsBuilding,
  BsFillGearFill,
  BsFillPeopleFill,
  BsFillBookFill,
  BsFillHouseDoorFill,
  BsFillBookmarkPlusFill,
  BsListCheck,
  BsFillFilePdfFill,
  BsFillFolderFill,
} from "react-icons/bs";
import useAuth from "../../MyHooks/useAuth";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FacultyNavigation() {
  const [openFolders, setOpenFolders] = React.useState(false);
  const [Folders, setFolders] = React.useState([]);
  const [openSdebar, setopenSdebar] = useState(false);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  React.useEffect(() => {
    getData();
  }, []);
  //console.log("folders in evaluator nav",Folders);
  const getData = async () => {
    const res = await axios.get("http://localhost:4000/EvalFolders/showAll");
    console.log("Folders", res.data);

    setFolders([...res.data]);
  };
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
            <b>Evaluator DASHBOARD</b>
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
      <div id="layoutSidenav">
        <div
          
          className={!openSdebar ? "d-none d-lg-block" : "d-block  overSidebar"}
          id="layoutSidenav_nav "
        >
          <nav class="sb-sidenav accordion bg" id="sidenavAccordion">
            <div
              style={{
                height: "calc(100vh - 57px)",
                overflow: "auto",
              }}
              class="sb-sidenav-menu"
            >
              <div class="nav" style={{ position: "relative" }}>
                <div class="sb-sidenav-menu-heading"></div>
                <Link class="nav-link sidenavtext " to="Dashboard">
                  <div class="sb-nav-link-icon">
                    <BsBuilding color="#fff" />
                  </div>
                  Dashboard
                </Link>

                <div
                  onClick={() => {
                    openFolders ? setOpenFolders(false) : setOpenFolders(true);
                  }}
                  style={{ cursor: "pointer" }}
                  class="nav-link sidenavtext"
                >
                  <div class="sb-nav-link-icon">
                    <BsFillBookFill color="#fff" />
                  </div>
                  Evaluate Folders
                  <div style={{ marginLeft: "auto" }} class="sb-nav-link-icon">
                    {openFolders ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </div>
                </div>
                {openFolders &&
                  Folders.length > 0 &&
                  Folders.map((i) => {
                    console.log("dsds", i);
                    return (
                      <>
                        {(i.Folder.Round1 == true &&
                          i.Folder.Evaluated == true) ||
                        (i.Folder.Round2 == true &&
                          i.Folder.Evaluated == true) ||
                        i.Folder.Revision == true ||
                        i.Folder.Evaluated != true ? (
                          <div
                            style={{
                              marginLeft: "12px",
                              fontSize: "14px",
                              cursor: "pointer",
                            }}
                            class="nav-link sidenavtext "
                            onClick={() => {
                              if (i.Folder.LabTheory == "Theory") {
                                navigate(
                                  `/Evaluator/FolderTemplete/${i._id}`,
                                  { state: { i } },
                                  {
                                    replace: true,
                                  }
                                );
                              }
                              if (i.Folder.LabTheory == "Lab") {
                                navigate(
                                  `/Evaluator/FolderTemplete/${i._id}`,
                                  { state: { i } },
                                  {
                                    replace: true,
                                  }
                                );
                              }
                            }}
                          >
                            <div class="sb-nav-link-icon">
                              <BsListCheck color="#fff" />
                            </div>
                            {i.Folder?.Course?.Code} {i.Folder?.Course?.Name}{" "}
                            {i.Folder?.LabTheory == "Lab" &&
                              "(" + i.Folder?.LabTheory + ")"}
                          </div>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}

                <Link class="nav-link sidenavtext " to="FoldersInRevision">
                  <div class="sb-nav-link-icon">
                    <BsBuilding color="#fff" />
                  </div>
                  Folders In Revision
                </Link>

                <Link class="nav-link sidenavtext " to="EvaluatedFolders">
                  <div class="sb-nav-link-icon">
                    <BsBuilding color="#fff" />
                  </div>
                  Evaluated Folders
                </Link>
                <div
                  style={{ position: "absolute", left: "0px", bottom: "-260px" }}
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