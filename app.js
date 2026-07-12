const express = require("express")
const ErrorHandeler = require("./src/middleware/error.middleware")
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express()



const authRoutes = require("./src/routes/auth.routes")

const taskRoute = require("./src/routes/task.route")




const limiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 100,

    message: "Too many requests, try again later."

});


app.use(helmet());

app.use(cors({
    origin: "http://localhost:5000",
    credentials: true
}));




app.use(express.json())
app.use("/api/auth",authRoutes);


//sequirty

app.use(helmet());
app.use(cors());
app.use(limiter);


app.use("/api/tasks/",taskRoute);




app.use(ErrorHandeler)


module.exports = app 

