const { body, validationResult } = require("express-validator");

const userValidationRules = [
  body("name").trim().notEmpty().withMessage("Please provide a name"),
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*\d).+$/),
]

function validateRequest(rules) {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Send error response
    }

    next();
  };
}

module.exports = validateRequest(userValidationRules)
