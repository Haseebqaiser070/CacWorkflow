const Versionodoc=require("../../../Models/SyallabusModels/SyllabusVersion")
module.exports.Add= async (req,res)=>{
    try {
        const user = req.user
        if(!user) return res.status(401).json("unAutherized")  
        console.log(req.body) 
        const Version = await Versionodoc.create(req.body) 
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
        const Version = await Versionodoc.find({Code:req.params.Code})
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
        const Version = await Versionodoc.find({Code:req.params.Code})
        if(!Version)return res.status(404).json("Not Found")
        const obj = Version[Version.length - 1]
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
        const Version = await Versionodoc.findOne({_id:req.params.id})
        if(!Version)return res.status(404).json("Not Found")
        console.log("Version1",Version)
        await res.status(200).json(Version)
    }
    catch(err){
        await res.status(400).json(err)
    }
}
