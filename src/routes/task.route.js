const express = require("express")
const router = express.Router()


const protect = require("../middleware/auth.middleware")

const {creatTask,getTasks,getTask,updateTask,deleteTask} = require("../controllers/task.controller")

const validate = require("../middleware/validation.middleware");

const { createTaskValidation } = require("../validators/task.validator");


router.post("/",protect , creatTask)
router.get("/",protect , getTasks)
router.get("/:id",protect , getTask)
router.put("/:id",protect,updateTask)
router.delete("/:id",protect,deleteTask)

router.post("/",protect , createTaskValidation ,validate ,creatTask)


module.exports = router ;