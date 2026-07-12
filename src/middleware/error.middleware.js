


const errorHandeler = (err , req ,res , next) =>{


   res.status(500).json({


    success :false,

    message :err.massage
   })


}

module.exports = errorHandeler


//profession production version 


// const errorHandler = (err, req, res, next) => {

//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

//     res.status(statusCode).json({

//         success: false,

//         message: err.message,

//         stack: process.env.NODE_ENV === "production" ? null : err.stack

//     });

// };

// module.exports = errorHandler;