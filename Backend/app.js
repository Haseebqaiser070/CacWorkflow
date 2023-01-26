var express = require("express");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var cors = require("cors");

var AuthRouter = require("./Routes/AuthRoutes/Auth");
var CourseRouter = require("./Routes/AdminRoutes/Courses");
var FacultyRouter = require("./Routes/AdminRoutes/Faculty");
var UserRouter = require("./Routes/AdminRoutes/User");
var MeetingRouter = require("./Routes/MeetingRoute/MeetingRoute");
var CategoryRouter = require("./Routes/AdminRoutes/Category")
var SOSRouter = require("./Routes/AdminRoutes/SOS")
var RepoRouter = require("./Routes/AdminRoutes/Repo")
var CourseVersion = require("./Routes/CAC/CourseVersion")
var TaskRouter = require("./Routes/AdminRoutes/Task")
var CourseCreationRouter = require("./Routes/CAC/CoursesCreation")
var SOSCreationRouter = require("./Routes/CAC/SOSCreation")
var SOSVerisonRouter = require("./Routes/CAC/SOSVerison")
var ProgramRouter = require("./Routes/AdminRoutes/Program")
var ProgramCoursesRouter = require("./Routes/AdminRoutes/ProgramCourses")
var CDFRouter = require("./Routes/CAC/CDFCreation")
var CDFVersionRouter = require("./Routes/CAC/CDFVersion")
var SyllabusCreationRouter = require("./Routes/CAC/SyllabusCreation")
var SyllabusVersionRouter = require("./Routes/CAC/SyllabusVersion")
var SOBTLRouter = require("./Routes/AdminRoutes/SOBTL")
var CDFReturnedRouter = require("./Routes/AdminRoutes/CDF")
var SyllabusRouter = require("./Routes/AdminRoutes/Syllabus")
var AssignFoldersRouter = require("./Routes/Folders/AssignFolders")
var UserAssigedFolders = require("./Routes/Folders/UserAssigedFolders")
var ContentFolder = require("./Routes/AdminRoutes/FolderContents")
var FacultyFolders = require("./Routes/Folders/FacultyFolders")
var EvalFolders = require("./Routes/Folders/EvaluatorFolder")
var SOSpage1 = require("./Routes/CAC/SOSFirstPage")

var { getUser } = require("./Middleware/User");

var app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false }));

app.use(cookieParser());

app.use("/Auth", AuthRouter);
app.use("/Course", getUser, CourseRouter);
app.use("/User", getUser, UserRouter);
app.use("/Faculty", getUser, FacultyRouter);
app.use("/Program", getUser, ProgramRouter);
app.use("/Meeting", getUser, MeetingRouter);
app.use("/Category", getUser, CategoryRouter);
app.use("/SOS", getUser, SOSRouter);
app.use("/CDF", getUser, CDFReturnedRouter);
app.use("/Syllabus",  getUser, SyllabusRouter);
app.use("/RepoCourse", getUser, RepoRouter);
app.use("/CourseVersion", getUser, CourseVersion);
app.use("/Task", getUser, TaskRouter);
app.use("/CoursesCreate", getUser, CourseCreationRouter);
app.use("/SOSCreate", getUser, SOSCreationRouter);
app.use("/SOSVerison", getUser, SOSVerisonRouter);
app.use("/ProgramCourses",getUser,ProgramCoursesRouter);
app.use("/CDFCreate", getUser, CDFRouter);
app.use("/CDFVerison", getUser, CDFVersionRouter);
app.use("/SyllabusCreate", getUser, SyllabusCreationRouter);
app.use("/SyllabusVerison", getUser, SyllabusVersionRouter);
app.use("/SOBTL", getUser, SOBTLRouter);
app.use("/AssginFolders", getUser, AssignFoldersRouter);
app.use("/UserAssigedFolders", getUser, UserAssigedFolders);
app.use("/Content", getUser, ContentFolder);
app.use("/Folders", getUser, FacultyFolders);
app.use("/EvalFolders", getUser, EvalFolders);
app.use("/SOSpage1", getUser, SOSpage1);

const start = async () => {
  try {
    await mongoose.connect("mongodb+srv://AhmedAli:LpYmvUSfw3ESnL3R@cac.psfpu.mongodb.net/?retryWrites=true&w=majority");
    app.listen(process.env.PORT || 4000, () =>
      console.log("Listening on port 4000")
    );
  } catch (error) {
    console.log(error);
  }
};

start();
