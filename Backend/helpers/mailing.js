const nodemailer = require("nodemailer");
require("dotenv").config();

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "cacfyp@gmail.com",
    pass: "wchaurlbodzacfam",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports.signupMail = (email, password) => {
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Signup Successful",
    text:
      "Your account has been created. Below are your login credentials. \n\nLogin Credentials " +
      "\nUserID: " +
      email +
      "\nPassword: " +
      password,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.TaskAssigned = (e, email) => {
  console.log("sfs", e);
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Task Assignment",
    text:
      "You have been assigned to a new task. Please login to your dashboard to check the details\n\n" +
      "Assigned Task Type :" +
      e.taskType +
      "\n Assigned Course : " +
      e.Course?.Name +
      "\n Deadline: " +
      e.Deadline,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.TaskEdited = (e,email) => {
  console.log("sfs", e);
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Task Updates",
    text:
      "Updated Task Type :" +
      e.taskType + "\n"+
      " Course : " +
      e.Course?.Name +"\n"+
      " Deadline: " +
      e.Deadline,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};


module.exports.TaskReturned = (e,email) => {
  console.log("sssfs", e);
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Task Returned",
    text: "Returned Task : " + e.taskType +"\n"+ " Status : " + e.Status,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.TaskLock = (e, email) => {
  console.log("sfs", e);
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Task Lock",
    text: "Task : " + e.taskType +"\n"+" Status : " + e.Status,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.CourseAssign = (e, email) => {
  console.log("sfs", e);
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Course Assigned",
    text:
      "Assigned Course: " +
      e.Course +"\n"+
      " Program : " +
      e.Program +"\n"+
      " Section : " +
      e.Section,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.ResetAvailability = (email) => {
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Reset Availability",
    text: "New Semester has Started"+"\n"+"Please Set Your Availabilities",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};



module.exports.TaskLock= (e,email) => {
  console.log("sfs", e);
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Task Revision",
    text:
      "Returned Task For Revision : " + e.taskType +"\n"+ " Status : " + e.Status,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.MeetingDetails = (email, time, title) => {
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Meeting Scheduled",
    text: "Meeting Title :" + title +"\n"+ " Meeting Time : " + time,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.AvailabilityDetails= (email,uemail,time) => {
  console.log("easmai",email)
  console.log("uasmai",uemail)
  console.log("time",time)

  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Availability details",
    text:
      "CAC member :" +
      uemail +"\n"+"Availabilities:"+"\n"+"Monday: "+time.mon+"\n"+"Tuesday: "+time.tue+"\n"+
      "Wednesday: "+time.wed+"\n"+"Thursday: "+time.thur+"\n"+"Friday: "+time.fri+"\n"+"Saturday: "+time.sat,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.MeetingUpdates = (email,time,title) => {
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Meeting Updated Scheduled",
    text:
      "Meeting Title :" +
      title +"\n"+
      " Meeting Time : " +
      time
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.Meetingdeleted = (email,time,title) => {
  console.log("emails",email+time,title)
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Meeting Scheduled Cancelled",
    text:
      "Meeting Title :" +
      title +"\n"+
      " Meeting Time : " +
      time
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};


module.exports.reportMail = (email, path) => {
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Report Email",
    attachment: path,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.declineMail = (email) => {
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Declined Rebuttle Email",
    text: "Your Rebuttle has been Declined by the Supervisor"+"\n"+" Contact Office for further details",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.resetPasswordMail = (email, token) => {
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Reset Password",
    html: `<p>You requested for reset password, kindly use this <a href="${process.env.REACT_APP_URL}/ResetPassword/${token}">link</a> to reset your password</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.CourseDeadlines= (email,type,round,time) => {
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Deadlines",
    text:
      "Folder :" +
      type +"\n"+
      ", Round : " +
      round+"\n"+
      ", Deadline : " +
      time
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.DeadlineExtended= (email,type,round,Name) => {
 
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Deadlines Extention Request",
    text:
    "You have a Request fot Folder Deadline Extension "+
      "Folder :" +
      type +"\n"+
      ", Round : " +
      round+"\n"+
      " has been Made by "+
      Name
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.DeadlineRequest= (email,type,round,user) => {
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Deadlines Request",
    text:
    "You Got Deadline request from "+
      user +"\n"+
      "For Folder :" +
      type +"\n"+
      ", Round : " +
      round
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.FolderSubmit= (email,user,course) => {
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Folder Submission",
    text:
    "Folder for "+
      course +"\n"+
      "has been Submitted by :" +
      user 
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.FolderEvaluated= (email,course) => {
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Folder Evaluated",
    text:
    "Folder "+
      course +
      "has been Evaluated"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.FolderRevision= (email,course) => {
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Folder Revision",
    text:
    "Folder "+
      course +
      "has been sent for Revision"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.TaskDeadlineOne = (e, email) => {
  console.log("sfs", email);
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Task Deadline Reminder",
    text:
      "Your task submission deadline is tomorrow, make sure to Submit \n\n" +
      "Assigned Task Type :" +
      e.taskType +
      "\n Assigned Course : " +
      e.Course?.Name +
      "\n Deadline: " +
      e.Deadline,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.MeetingReminder = (email, time, title) => {
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Meeting Reminder",
    text: "Meeting Title :" + title + "\n"+" Meeting Time : " + time,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports.MeetingReminder = (email) => {
  var mailOptions = {
    from: "cacfyp@gmail.com",
    to: email,
    subject: "Submission Reminder",
    text: "Submission Reminder to Submit your Documents before the Deadline"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("sdada", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};