const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

require("./server/routes")(app);
app.get("*", (req, res) => {
  res.status(200).send({ message: "This route doesn't go anywhere, please enter a correct route" });
});

module.exports = app;
