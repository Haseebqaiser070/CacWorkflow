import Navigation from "../Navigation";
import Dashboard from "../Dashboard";
import Register from "../AuxillaryComponents/Register";
import Users from "../Users";
import AllCategories from "../AllCategories";
import EditCourseForm from "../EditCourseForm";
import AllSchemeofStudies from "../AllSchemeofStudies";
import Sos from "../PdfTemplates/Sos";
import CreateTasks from "../CreateTasks";
import Tasks from "../Tasks";
import ReturnedTasks from "../ReturnedTasks";
import AddNewCourse from "../AddNewCourse";
import CourseFolder from "../Faculty/CourseFolder";
import CourseFinal from "../Admin/CourseFinal";
import { Route, Routes } from "react-router-dom";
import CourseRepo from "../Admin/CourseRepo";
import FacultyMembers from "../FacultyMember";
import CourseFolderReport from "../PdfTemplates/CourseFolderReport";
import Profile from "../AuxillaryComponents/UserProfile";

import CourseReturnedView from "../Admin/CourseReturnedView";
import InitializeTask from "../InitializeTask";
import ViewCacAvailability from "../ViewCacAvailability";
import AddProgram from "../AddProgram";
import Evaluators from "../Evaluators";
import CreateNewMeeting from "../CreateNewMeeting";
import PendingDeadlineRequests from "../PendingDeadlineRequests";
import CreateSOS from "../SOSCreation/CreateSOS";
import AllCourses from "../AllCourses";
import SOSReturnedView from "../Admin/SOSReturnedView";
import SOSFinal from "../Admin/SOSfinal";
import CDFReturnedView from "../Admin/CDFReturnedView";
import AllCDFs from "../AllCDFs";
import CDFFinal from "../Admin/CDFfinal";
import SyllabusReturnedView from "../Admin/SyllabusReturnedView";
import AllSyllabus from "../AllSyllabus";
import SyllabusFinal from "../Admin/Syllabusfinal";
import CourseFolderTheory from "../CourseFolderTheory";
import CourseFolderLab from "../CourseFolderLab";
import BTLLevel from "../BTLLevel";
import SO_Level from "../SOAndBTLLevel";
import CreateSOS1 from "../SOSCreation/CreateSos1";
import AllCourseFolder from "../AllCourseFolder";
import Returned from "../ReturnedPage";
import LateSub from "../LateSubmissions";
import CloDomains from "../CloDomains";
import BtlDictionary from "../BTLDictionary";
import OngoingTasks from "../PdfTemplates/OngoingTasks";
import IndiviualTask from "../PdfTemplates/IndiviualTask";
import CompletedTasks from "../CompletedTasks";
import AdminFolderInRevision from "../AdminFolderInRevision ";
import ReturnedPageAdmin from "../ReturnedPageAdmin";
import CourseReport from "../PdfTemplates/CourseReport";
import CoursesNotPrereq from "../PdfTemplates/CoursesNotPrereq";
import CoursesPrereq from "../PdfTemplates/CoursesPrereq";
import Courseswithcd from "../PdfTemplates/Courseswithcd";
import Courseswithoutcd from "../PdfTemplates/Courseswithoutcd";
import AvailableCodes from "../PdfTemplates/AvailableCodes";
import ProgramReport from "../PdfTemplates/ProgramReport";
import FacultyCourseReport from "../PdfTemplates/FacultyCourseReport";
import EvaluatorCourseReport from "../PdfTemplates/EvaluatorCourseReport";
import ReturnedPage from "../Faculty/ReturnedPageEvaluator";
import CourseFolderCombinedReport from "../PdfTemplates/CourseFolderCombinedReport";
import Programcoursesall from "../Admin/Programcourses";
import Gensyllabusall from "../Admin/Syllabusgen";
import GenCDFall from "../Admin/CDFgeneral";
import ProgramcorseShow from "../Admin/ProgramcorseShow";
import CDFgenshow from "../Admin/CDFgenshow";
import SyllabusgenShow from "../Admin/SyllabusgenShow";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AllCategories" element={<AllCategories />} />
        <Route path="/AddNewCourse" element={<AddNewCourse />} />
        <Route path="/AllCourses" element={<AllCourses />} />
        
        <Route path="/ProgramCourseView/:id" element={<ProgramcorseShow />} />
        <Route path="/genCDFsView/:Code/:id" element={<CDFgenshow />} />
        
        <Route path="/SyllabusgenView/Code/id" element={<SyllabusgenShow />} />

        
        <Route path="/AllProgramCourses" element={<Programcoursesall />} />
        
        <Route path="/Gensyllabusall" element={<Gensyllabusall />} />
        <Route path="/GenCDFall" element={<GenCDFall />} />
        
        <Route path="/CourseView/:id" element={<CourseFinal />} />
        <Route path="/AllCourses" element={<AllCourses />} />
        <Route path="/CourseFolderReport" element={<CourseFolderReport />} />
        <Route path="/CourseFolderCombinedReport" element={<CourseFolderCombinedReport />}/>

        <Route path="/ReturnedEvaluation" element={<ReturnedPage />} />

        <Route path="/CourseReport" element={<CourseReport />} />
        <Route path="/CoursesNotPrereq" element={<CoursesNotPrereq />} />
        <Route path="/CoursesPrereq" element={<CoursesPrereq />} />
        <Route path="/Courseswithcd" element={<Courseswithcd />} />
        <Route path="/Courseswithoutcd" element={<Courseswithoutcd />} />
        <Route path="/AvailableCodes" element={<AvailableCodes />} />

        <Route path="/FacultyCourseReport" element={<FacultyCourseReport />} />
        <Route
          path="/EvaluatorCourseReport"
          element={<EvaluatorCourseReport />}
        />

        <Route path="/Returned" element={<Returned />} />
        <Route path="/OngoingTasks" element={<OngoingTasks />} />
        <Route path="/IndiviualTask/:tid" element={<IndiviualTask />} />
        <Route path="/FolderInRevisionA" element={<AdminFolderInRevision />} />
        <Route path="/Returned" element={<ReturnedPageAdmin />} />
        <Route
          path="/CourseReturnedView/:Code"
          element={<CourseReturnedView />}
        />
        <Route path="/SOSReturnedView/:Program" element={<SOSReturnedView />} />
        <Route path="/CDFReturnedView/:Code" element={<CDFReturnedView />} />
        <Route
          path="SyllabusReturnedView/:Code"
          element={<SyllabusReturnedView />}
        />
        <Route path="/EditCourse/:id" element={<EditCourseForm />} />
        <Route path="/CreateNewMeeting" element={<CreateNewMeeting />} />
        <Route path="/AllSyllabus" element={<AllSyllabus />} />
        <Route path="/AllCourseFolder" element={<AllCourseFolder />} />
        <Route
          path="/SyllabusView/:Program/:Code/:id"
          element={<SyllabusFinal />}
        />
        <Route
          path="/ViewCacMemberAvailabilty"
          element={<ViewCacAvailability />}
        />
        <Route path="/AllSchemeofStudies" element={<AllSchemeofStudies />} />
        <Route path="/CourseFolderTheory" element={<CourseFolderTheory />} />
        <Route path="/CourseFolderLab" element={<CourseFolderLab />} />
        <Route path="/AllCDFs" element={<AllCDFs />} />
        <Route path="/SOSView/:id" element={<SOSFinal />} />
        <Route path="/CDFsView/:Program/:Code/:id" element={<CDFFinal />} />
        <Route path="/Sos" element={<Sos />} />
        <Route path="/InitCourse" element={<CourseRepo />} />
        {/*<Route path="/CdfandSyllabus">
                  <Route path=":id" element={<CourseDescription />} />
                  <Route index element={<CdfandSyllabus />} />
                </Route>
              */}
        <Route path="/Users" element={<Users />} />
        <Route path="/FacultyMembers" element={<FacultyMembers />} />
        <Route path="/Evaluators" element={<Evaluators />} />
        <Route path="/CourseFolder" element={<CourseFolder />} />

        <Route path="/AddProgram" element={<AddProgram />} />
        <Route path="/AddProgram/report/:Degree" element={<ProgramReport />} />

        <Route path="/SO" element={<SO_Level />} />
        <Route path="/BTLLevel" element={<BTLLevel />} />
        <Route path="/CloDomains" element={<CloDomains />} />
        <Route path="/BtlDictionary" element={<BtlDictionary />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/InitializeTask" element={<InitializeTask />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/CreateSOS" element={<CreateSOS />} />
        <Route
          path="/PendingDeadlineRequests"
          element={<PendingDeadlineRequests />}
        />
        <Route path="/LateSubmissions" element={<LateSub />} />
        <Route path="/ReturnedTasks" element={<ReturnedTasks />} />
        <Route path="/CompletedTasks" element={<CompletedTasks />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
