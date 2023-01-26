const ReturnCourse = require("../../Models/CourseModels/ReturnCourse");

module.exports.ViewOne= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status(401).json("unAutherized")      
        const rturn = await ReturnCourse.findOne({Code:req.params.Code}).populate('PreRequisites')
        console.log(rturn)
        if(!rturn)return res.status(404).json("Not Found")
        console.log("rturn",rturn)
        await res.status(200).json(rturn)
    }
    catch(err){
        await res.status(400).json(err)
    }
}
