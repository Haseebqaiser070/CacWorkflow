const ReturnCourse = require("../../Models/CDFModels/ReturnCDF");

module.exports.ViewOne= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status(401).json("unAutherized")      
        const rturn = await ReturnCourse.findOne({Code:req.params.Code}).
        populate({path:"CLOs",populate:{path:"BTL",model:"BTL"}})
        .populate({path:"CLOs",populate:{path:"So",model:"SOO"}}) 
        console.log(rturn)
        if(!rturn)return res.status(404).json("Not Found")
        console.log("rturn",rturn)
        await res.status(200).json(rturn)
    }
    catch(err){
        console.log(err)
        await res.status(400).json(err)
    }
}
