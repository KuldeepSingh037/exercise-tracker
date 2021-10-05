const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// new version of express already contains the bodyParser
// const bodyParser = require("body-parser");

require("dotenv").config();
const app = express();
const port = process.env.port || 5000;

app.use(cors);
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established securely.");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
