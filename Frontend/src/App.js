import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Forgot from "./components/AuxillaryComponents/Forgot";
import CACRoutes from "./components/Routes/CACRoutes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider";
import Home from "./components/AuxillaryComponents/Home";
import AdminRoutes from "./components/Routes/AdminRoutes";
import ProtrctedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import PersistLogin from "./components/ProtectedRoutes/PersistLogin";
import FacultyRoutes from "./components/Routes/FacultyRoutes";
import EvaluatorRoutes from "./components/Routes/EvaluatorRoutes";
import Profile from "./components/AuxillaryComponents/UserProfile";
import ResetPassword from "./components/AuxillaryComponents/ResetPassword";
import SOSfinal from "./components/DocumentsEvaluatorandFaculty/SOSfinal";
import Page404 from "./components/AuxillaryComponents/404page";
function App() {
  return (
    <React.Fragment>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ViewSOS/:Program/:Year" element={<SOSfinal />} />
            <Route path="/forgotpassword" element={<Forgot />} />
            <Route path="/ResetPassword/:token" element={<ResetPassword />} />
            <Route element={<PersistLogin />}>
              <Route path="/UserProfile" element={<Profile />} />
              <Route element={<ProtrctedRoutes allowedRoles={"Admin"} />}>
                <Route path="/Admin/*" element={<AdminRoutes />} />
              </Route>
              <Route element={<ProtrctedRoutes allowedRoles={"CAC"} />}>
                <Route path="/CAC/*" element={<CACRoutes />} />
              </Route>
              <Route element={<ProtrctedRoutes allowedRoles={"Faculty"} />}>
                <Route path="/Faculty/*" element={<FacultyRoutes />} />
              </Route>
              <Route element={<ProtrctedRoutes allowedRoles={"Evaluator"} />}>
                <Route path="/Evaluator/*" element={<EvaluatorRoutes />} />
              </Route>
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </AuthProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
