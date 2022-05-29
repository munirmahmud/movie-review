exports.userAuth = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(201).json({ error: "Email/Password is missing" });
  }

  next();
};
