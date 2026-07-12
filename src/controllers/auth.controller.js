
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")






const registerUser = async(req, res)=>{

    
    const  {name , email , password} = req.body

    const existEmail = await User.findOne({email})

    if(existEmail){
        return res.status(400).json
    ({
    message : "email already exist"
    
})   
}



//gernarate salt 
 const salt = await bcrypt.genSalt(10)

 const hashedpassword = await bcrypt.hash(password , salt)


    const user =await User.create({
        name , 
        email,
        password :hashedpassword
    });



    res.status(201).json({
    
         message:"user register"

    })
}


//login user

const loginUser = async(req ,res)=> {


    const {email , password}  =req.body 

    const user = await User.findOne({email});

    if(!user){

        return res.status(404).json({
            message :"user not found"
        })
    }
    

    
const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
    return res.status(401).json({
        message: "Invalid Password"
    });
}

const token = jwt.sign(
    {
        id: user._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
);

res.status(200).json({
    message: "Login Successful",
    token
});
}

module.exports ={

    registerUser,
    loginUser
}