const Chapter =require('../models/chapterModel')
const mongoose = require('mongoose')
//get all chapters
const getChapters = async (req,res)=>{
    const user_id= req.user_id

    const chapters= await Chapter.find({user_id}).sort({createdAt: -1})
    res.status(200).json(chapters)
}

//get a specific chapter
const getChapter=async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error :"Invalid ID" })
    }

    const chapter = await Chapter.findById(id)

    if(!chapter){
        return res.status(400).json({error: "No such Chapter"})
    }
    res.status(200).json(chapter)
}
//create new chapter
const newChapter = async(req,res)=>{
    const { title,content }= req.body

    let emptyfield=[]
    if(!title){
        emptyfield.push('title')
    }
    if(!content){
        emptyfield.push('content')
    }
    if(emptyfield.length>0){
        return res.status(400).json({error: 'Please fill in all the fields ', emptyfield})
    }

    //adding to db
    try{
        const user_id = req.user_id
        const chapter=await Chapter.create({title,content, user_id})
        res.status(200).json(chapter)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a chapter
const deleteChapter = async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"Invalid ID"})
    }
    const chapter=await Chapter.findByIdAndDelete(id)
    if(!chapter){
        return res.status(400).json({error:"No such Chapter"})
    }
    res.status(200).json(chapter)
}

//Edit a Chapter
const editChapter = async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"Invalid ID"})
    }
    const chapter = await Chapter.findByIdAndUpdate(id,req.body)
    if(!chapter){
        return res.status(400).json({error:"No such Chapter"})
    }
    res.status(200).json(chapter)
}
module.exports = {newChapter,
    getChapters,
    getChapter,
    deleteChapter,
    editChapter
}