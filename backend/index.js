const express = require("express");
const cors = require("cors");
const app = express();

app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

require("./server/routes")(app);
app.get("*", (req, res) => {
  res.status(200).send({
    message: "This route doesn't go anywhere, please enter a correct route",
  });
});

module.exports = app;
