const ReturnSOS = require("../../Models/SOSModels/ReturnSOS");
const SOSCoursedoc=require("../../Models/CourseModels/SOSCourse")
var coursedoc = require("../../Models/CourseModels/Course");

module.exports.ViewOne= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status(401).json("unAutherized")      
        const retun = await ReturnSOS.findOne({Program:req.params.Program}).populate("Page1")
        .populate({path:"Categories",populate:{path:"Courses",model:"SOSCourse"
        ,populate:{path: 'PreRequisites', model: 'Repo'}}})
        var cats  = await Promise.all(retun.Categories.map(async(x)=>{
            console.log("lats")
            var Cs =  await Promise.all(x.Courses.map(async(i)=>{
                console.log("latsasd")
                var abc = await coursedoc.findOne({Code:i.Code})         
                if(abc&&(i.catalogue!=abc.catalogue||
                    i.objectiveList!=abc.objectiveList||
                    i.Books!=abc.Books)){   
                        var objs= {
                        _id:i._id,
                        Program:i.Program,
                        Code:i.Code,
                        Name:i.Name,
                        Credit:i.Credit,
                        LectureHoursWeek:i.LectureHoursWeek,
                        LabHoursWeek:i.LabHoursWeek,
                        PreRequisites:i.PreRequisites,
                        catalogue:abc.catalogue,
                        objectiveList:abc.objectiveList,
                        Books:abc.Books
                        }                 
                        var aa= await SOSCoursedoc.findByIdAndUpdate(i._id,objs).populate("PreRequisites")                        
                        return aa
                    
                }
                else{
                    return i
                }
            }))
            x.Courses = Cs 
            console.log("x.Courses",x.Courses)
            return x
        }))
        console.log("cats",cats)
        retun.Categories=cats
        if(!retun)return res.status(404).json("Not Found")
        console.log("retun1",retun)
        await res.status(200).json(retun)
        
    }
    catch(err){
        await res.status(400).json(err)
    }
}
