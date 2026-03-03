import { body, validationResult } from 'express-validator'

const registerValidation = [
    // name validation
    body("name")
        .trim()
        .notEmpty().withMessage("name is required")
        .escape(),

    // email validation
    body("email")
        .notEmpty().withMessage("email is required")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),

    // password validation
    body("password")
        .notEmpty().withMessage("password is required")
        .isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minUppercase: 0,
            minNumbers: 1,
            minSymbols: 0
        }).withMessage("Password must contain at least one letter and one number"),

    // error handling
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })

        }
        next();

    }

]

export { registerValidation }