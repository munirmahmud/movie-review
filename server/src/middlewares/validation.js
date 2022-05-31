const { check, validationResult } = require("express-validator");

exports.userValidation = [
  check("name").trim().not().isEmpty().withMessage("Name is required"),
  check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email is required"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5, max: 20 })
    .withMessage("Password must be between 5-20 characters."),
];

exports.validatePassword = [
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5, max: 20 })
    .withMessage("Password must be between 5-20 characters."),
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();

  if (error.length) {
    return res.json({ error: error[0].msg });
  }

  next();
};
