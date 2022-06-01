require("dotenv").config();

const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/errorHandler");
require("express-async-errors");

require("./db");

const PORT = 5000;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
