const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const signup = async (req, res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json({
                    message:"User already exists, you can login",
                    success:false
                });
        }
        const userModel = new UserModel({name,email,password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
            .json({
            message:"Signup successfully",
            success:true
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
        console.log(err)

    } 
      
}

const login = async (req,res)=>{
    try {
        const {email,password}= req.body;
         user = await UserModel.findOne({email})
        const errmsg = "Auth failed email or password is wrong"
        if(!user){
            res.status(403)
            .json({
                message:errmsg,
                success:false
            })
        }
        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
            return res.status(403)
                .json({ message: errmsg, success: false });}

        const jwtToken = jwt.sign({
            email:user.email,
            id:user._id}
            ,process.env.JWT_SECRET
            ,{expiresIn:'24h'})
        res.status(200)
        .json({
            message:"Login Success",
            success:true,
            jwtToken,
            email,
            name:user.name,
            id:user.id
        })

         } catch (error) {
            console.error(error)
        res.status(500)
            .json({
                message: error,
                success: false
            })
    }
    
    
}



module.exports={
    signup,
    login,
   
}