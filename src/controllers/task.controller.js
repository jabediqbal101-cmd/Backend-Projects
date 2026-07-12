const Task = require("../models/task");
const asyncHandler = require("express-async-handler");

// ================= CREATE TASK =================
const creatTask = asyncHandler(async (req, res) => {

    const { title, description, category } = req.body;

    const createdTask = await Task.create({
        title,
        description,
        category,
        user: req.user._id,
    });

    res.status(201).json({
        message: "Task Created Successfully",
        task: createdTask,
    });
});

// ================= GET ALL TASKS =================
const getTasks = asyncHandler(async (req, res) => {

    const filter = {
        user: req.user._id,
    };

    // Filter by Status
    if (req.query.status) {
        filter.status = req.query.status;
    }

    // Filter by Category
    if (req.query.category) {
        filter.category = req.query.category;
    }

    // Search by Title
    if (req.query.search) {
        filter.title = {
            $regex: req.query.search,
            $options: "i",
        };
    }

    // Sort
    let sort = {};

    if (req.query.sort === "latest") {
        sort.createdAt = -1;
    }

    if (req.query.sort === "oldest") {
        sort.createdAt = 1;
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const tasks = await Task.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    res.status(200).json({
        tasks,
    });
});

// ================= GET SINGLE TASK =================
const getTask = asyncHandler(async (req, res) => {

    const task = await Task.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!task) {
        return res.status(404).json({
            message: "Task Not Found",
        });
    }

    res.status(200).json({
        task,
    });
});

// ================= UPDATE TASK =================
const updateTask = asyncHandler(async (req, res) => {

    const task = await Task.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!task) {
        return res.status(404).json({
            message: "Task Not Found",
        });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.category = req.body.category || task.category;
    task.status = req.body.status || task.status;

    const updatedTask = await task.save();

    res.status(200).json({
        message: "Task Updated Successfully",
        task: updatedTask,
    });
});

// ================= DELETE TASK =================
const deleteTask = asyncHandler(async (req, res) => {

    const task = await Task.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!task) {
        return res.status(404).json({
            message: "Task Not Found",
        });
    }

    await task.deleteOne();

    res.status(200).json({
        message: "Task Deleted Successfully",
    });
});

module.exports = {
    creatTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
};