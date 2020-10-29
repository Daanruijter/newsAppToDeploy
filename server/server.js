// Server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Handle production
if (process.env.NODE_ENV === "production") {
  //Static folder
  app.use(express.static(__dirname + "/public/"));

  //Create routing
  app.use("/", require("./worldNewsUrls.js"));

  //Handle Single Page Application
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html/"));
}

//Listen to the port
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

//Connect to MongoDB (maybe using this Mongo connection later on)
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
