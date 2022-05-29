const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");

dotenv.config();

require("./db");

const PORT = 5000;

app.use(express.json());

app.use("/api/user", userRouter);

app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
