const Versionodoc=require("../../../Models/SOSModels/SOSVersions")
const SOSCoursedoc=require("../../../Models/CourseModels/SOSCourse")
var coursedoc = require("../../../Models/CourseModels/Course");
var SOSPage1 = require("../../../Models/SOSModels/SOSFirstPage");

module.exports.Add= async (req,res)=>{
    try {
        const user = req.user
        if(!user) return res.status(401).json("unAutherized")  
        console.log(req.body) 
        const Pag1 = await SOSPage1.create({Program:req.body.Program,Year:req.body.Year,
            CoveredCategories:req.body.CoveredCategories,DomainCategories:req.body.DomainCategories
        });
        const cats = await Promise.all(req.body.Categories.map(async(e) => {
           const cors = await Promise.all(e.Courses.map(async(i) => {
                delete i._id
                // const old = await SOSCoursedoc.find({Code:i.Code,Program:req.body.Program})
                // console.log(old)
                // if(old.length>0){
                //     console.log("here")
                //     const doc = SOSCoursedoc.findOneAndUpdate({Code:i.Code,Program:req.body.Program},i)
                //     return await doc
                // }
                // else{
                //     console.log("here2")
                    i.Program=req.body.Program
                    const doc = await SOSCoursedoc.create(i)   
                    return await doc
                //}
            })
            )
            console.log("cors",cors)
            e.Courses = cors
            return await e
        }))
        console.log("cats",cats)
        req.body.Categories=cats
        const Version = await Versionodoc.create({
            Page1:Pag1,
            Program:req.body.Program,
            Year:req.body.Year,
            Categories:req.body.Categories}) 
        console.log("NewVersion",Version)
        await res.status(201).json(Version)
    }
    catch(err){
        console.log(err)
        await res.status(400).json(err)
    }
}
module.exports.ViewAll= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status(401).json("unAutherized")      
        const Version = await Versionodoc.find({Program:req.params.Program}).populate({path:"Categories"
        ,populate:{path:"Courses",model:"SOSCourse",
        populate:{path:'PreRequisites',model:'Course'}}}).populate("Page1");
        if(!Version)return res.status(404).json("Not Found")
        console.log("Versions",Version)
        await res.status(200).json(Version)
    }
    catch(err){
        console.log(err)
        await res.status(400).json(err)
    }
}
module.exports.Latest= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status(401).json("unAutherized")      
        console.log("sas")
        const Version = await Versionodoc.find({Program:req.params.Program}).populate("Page1")
        .populate({path:"Categories",populate:{path:"Courses",model:"SOSCourse"
        ,populate:{path: 'PreRequisites', model: 'Repo'}}})
        if(!Version)return res.status(404).json("Not Found")
        const obj = Version[Version.length - 1]
        console.log("obj",obj)
        var cats  = await Promise.all(obj.Categories.map(async(x)=>{
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
        console.log("catssss ")
        
        console.log("cats",cats)
        obj.Categories=cats
        
        console.log("Latest",obj)
        await res.status(200).json(obj)
    }
    catch(err){
        await res.status(400).json(err)
    }
}
module.exports.ViewOne= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status(401).json("unAutherized")      
        const Version = await Versionodoc.findOne({_id:req.params.id}).populate("Page1")
        .populate({path:"Categories",populate:{path:"Courses",model:"SOSCourse"
        ,populate:{path: 'PreRequisites', model: 'Repo'}}})
        var cats  = await Promise.all(Version.Categories.map(async(x)=>{
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
        Version.Categories=cats
        if(!Version)return res.status(404).json("Not Found")
        console.log("Version1",Version)
        await res.status(200).json(Version)
    }
    catch(err){
        await res.status(400).json(err)
    }
}
// var objs= {
                    //     _id:i._id,
                    //     Program:i.Program,
                    //     Code:i.Code,
                    //     Name:i.Name,
                    //     Credit:i.Credit,
                    //     LectureHoursWeek:i.LectureHoursWeek,
                    //     LabHoursWeek:i.LabHoursWeek,
                    //     PreRequisites:i.PreRequisites,
                    //     catalogue:abc.catalogue,
                    //     objectiveList:abc.objectiveList,
                    //     Books:abc.Books
                    //     }