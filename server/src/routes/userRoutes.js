const express = require("express");
const { validate, userValidation } = require("../middlewares/validation");

const router = express.Router();

const {
  createUser,
  verifyEmail,
  deleteUser,
} = require("../controllers/userController");
// const { userMiddleware } = require("../middlewares/userMiddlewares");

const userMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(201).json({ error: "Email/Password is missing" });
  }

  next();
};

router.post("/create", userValidation, validate, createUser);
router.post("/verify-email", verifyEmail);

router.get("/about", deleteUser);

module.exports = router;
