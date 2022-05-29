const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Db is connected");
  })
  .catch((err) => {
    console.log("DB failed");
  });
