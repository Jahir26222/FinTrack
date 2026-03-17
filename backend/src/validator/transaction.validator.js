import { body, validationResult } from "express-validator";


export function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    next()
}


export const transactionValidator = [

    body("title")
        .trim()
        .notEmpty().withMessage("Title is Required")
        .isLength({ min: 3, max: 30 }).withMessage("Title must be between 3 and 30 characters"),
        

    body("amount")
        .trim()
        .notEmpty().withMessage("Amount is Required")
        .isInt({ gt: 0 }).withMessage("Amount must be greater than zero"),



    validate


]
