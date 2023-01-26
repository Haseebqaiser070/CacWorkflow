import FacultyNavigation from "../Faculty/FacultyNavigation";
import FacultyDashboard from "../Faculty/FacultyDashboard";

import { Route, Routes } from "react-router-dom";

import Sos from "../PdfTemplates/Sos";
import CourseFolder from "../Faculty/CourseFolder";
import AllAssignedCourses from "../Faculty/AllAssignedCourses";
import LabFolder from "../Faculty/LabFolder";
import ReturnedFolders from "../Faculty/ReturnedFolder";
import ReturnedPage from "../Faculty/ReturnedPageF";
import FolderInRevision from "../Faculty/FolderInRevision";
import Courses from "../DocumentsEvaluatorandFaculty/CourseFinal"
import CDF from "../DocumentsEvaluatorandFaculty/CDFfinal"
import Syllabus from "../DocumentsEvaluatorandFaculty/Syllabusfinal"
function FacultyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FacultyNavigation />}>
        <Route path="/Dashboard" element={<FacultyDashboard />} />
        <Route path="/Sos" element={<Sos />} />
        <Route path="/ReturnedFolders" element={<ReturnedFolders />} />
        <Route path="/FolderInRevision" element={<FolderInRevision />} />

        <Route path="/Courses/:Program/:Code" element={<Courses />} />
        <Route path="/CDF/:Program/:Code" element={<CDF />} />
        <Route path="/Syllabus/:Program/:Code" element={<Syllabus />} />
        
        <Route path="/CourseFolder/:id" element={<CourseFolder />} />
        <Route path="/LabFolder/:id" element={<LabFolder />} />
        <Route path="/Returned" element={<ReturnedPage />} />

        <Route path="/AllCoursesAssigned">
          <Route path=":id" element={<AllAssignedCourses />} />
          <Route index element={<AllAssignedCourses />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default FacultyRoutes;
