const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req,res,next)=>{
    const{ authorization}=req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try{
        const {id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({ id }).select('id')
        req.user_id=id
        next()
    }catch(error){
        res.status(401).json({error: 'Request is not Authorized'})
    }
}

module.exports = requireAuth