import React, { useState, useEffect } from "react";
import "../css/styles.css";
import axios from "axios";

export default function CourseRepo() {
    const [RepoCourse, setRepoCourse] = useState([]);

    useEffect(() => {
      getRepoCourse();
    }, []);
  
    const getRepoCourse = async () => {
      const response = await axios.get("http://localhost:4000/CoursesCreate/get", {
        withCredentials: true,
      });
      setRepoCourse(response.data);
    };
    
    return (
      <div class="container" style={{ height: 700, width: "100%", padding: 20 }}>
        <h1 class="mt-4">Course Assigned</h1>
  
        
        <table style={{ textAlign: "center" }} class="table" id="list">
          <thead>
            <tr>
              <th class="col-2" scope="col">
                Cource Code
              </th>
              <th class="col-4" scope="col">
                Course Name
              </th>
              <th class="col-4" scope="col">
                Delete Repo
              </th>
            </tr>
          </thead>
          <tbody>
            {RepoCourse &&
              RepoCourse.map((cor) => {
                return (
                  <tr scope="row" key={cor._id}>
                    <td>{cor.Code}</td>
                    <td>{cor.Name}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
  