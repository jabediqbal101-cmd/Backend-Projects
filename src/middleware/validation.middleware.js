const { validationResult } = require("express-validator");

const validate = (req, res, next) => {

    // Collect all validation errors
    const errors = validationResult(req);

    // If errors exist
    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            errors: errors.array()
        });

    }

    // No errors, continue
    next();
};

module.exports = validate;