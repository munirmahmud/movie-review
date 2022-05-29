const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });

  const isUniqueUser = await User.findOne({ email });

  if (isUniqueUser) {
    res.status(401).json({ error: "This email is already in used." });
  }

  await newUser.save();
  res.json({ user: newUser });
};

exports.deleteUser = (req, res) => {
  res.send("User deleted");
};
