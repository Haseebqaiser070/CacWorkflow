import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <>
      <div>
        <div
          class="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div>
            <h1 style={{ fontSize: "120px", fontFamily: "" }}>404</h1>
            <h2>PAGE NOT FOUND</h2>

            {/* <Link className="my-4 btn btn-primary" to="/">
              BACK TO HOME
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}
