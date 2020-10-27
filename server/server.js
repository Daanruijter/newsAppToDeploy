// Server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

//Middleware
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

// app.use("/", require("./worldNewsUrls.ts"));

//Handle production
if (process.env.NODE_ENV === "production") {
  console.log("handlethis");
  //Static folder
  app.use(express.static(__dirname, +"/public/worldnews-apptest"));

  // app.use(express.static(path.join(__dirname, "server", "public")));

  //Handle Single Page Application
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

//Connect to MongoDB
const db =
  "mongodb+srv://dr:sSXGDQnstqEWcLHx@cluster0-4ie2c.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: "bookstore-app",
  })
  .then(() => console.log("Connection to Mongo DB established"))
  .catch((err) => console.log(err + "There is no connection"));

mongoose.set("debug", true);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
