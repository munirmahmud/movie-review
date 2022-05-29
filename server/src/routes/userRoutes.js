const express = require("express");
const router = express.Router();
const { createUser, deleteUser } = require("../controllers/userController");
// const { userMiddleware } = require("../middlewares/userMiddlewares");

const userMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(201).json({ error: "Email/Password is missing" });
  }

  next();
};

router.post("/create", userMiddleware, createUser);

router.get("/about", deleteUser);

module.exports = router;
