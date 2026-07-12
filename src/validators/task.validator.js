const { body } = require("express-validator");

const createTaskValidation = [

    body("title")
        .notEmpty()
        .withMessage("Title is required"),

    body("description")
        .notEmpty()
        .withMessage("Description is required"),

    body("category")
        .notEmpty()
        .withMessage("Category is required")

];

module.exports = {
    createTaskValidation,
};