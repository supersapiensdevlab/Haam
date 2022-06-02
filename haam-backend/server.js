const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");

const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
dotenv.config();

// For File Upload

app.use('/uploads', express.static('uploads'));

// Mongo DB conncetion
const database = process.env.MONGODB_URI;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Database connection...OK"))
  .catch((err) => console.log(err));

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  preflightContinue: true,
  maxAge: 600,
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.set("view engine", "ejs");
app.use("/", require("./routes/login"));

app.use("/api", apiRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

var router = express.Router();
module.exports = router;
