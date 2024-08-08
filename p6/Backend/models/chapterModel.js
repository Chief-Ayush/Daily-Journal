const mongoose=require('mongoose')
const schema= mongoose.Schema

const chapterSchema=new schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    user_id:{
        type:String,
        required: true
    }
},{timestamps:true})

module.exports=mongoose.model('Chapter',chapterSchema)
