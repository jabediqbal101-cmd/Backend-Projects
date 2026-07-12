
 
 const mongoose = require("mongoose")

 const UserSchema = new mongoose.Schema({

      
     name : {
        type :String , 
        require :true,
        trim:true
     },

     email :{
        type :String ,
        required :true , 
        unique :true ,
        lowercase :true ,
        trim:true ,
         unique: [ true, "Email already exists." ]

     } ,


     password :{

        type :String , 
        required :true,
        minlength :6
     }

    },
    {
        timestamps :true 
    }

 )

  const Usermodel =  mongoose.model("user",UserSchema)

 module.exports = Usermodel