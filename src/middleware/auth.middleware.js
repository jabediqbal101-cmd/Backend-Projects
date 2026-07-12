// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// const protect = async (req, res, next) => {

//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//         return res.status(401).json({
//             message: "No Token"
//         });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(
//         token,
//         process.env.JWT_SECRET
//     );

//     const user = await User.findById(decoded.id);

//     req.user = user;

//     next();
// };



// module.exports = protect ; 

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        console.log("Header:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No Token"
            });
        }

        const token = authHeader.split(" ")[1];

        console.log("Token:", token);
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded:", decoded);

        const user = await User.findById(decoded.id);

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: error.message
        });
    }
};

module.exports = protect;