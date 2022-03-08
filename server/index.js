import express from "express";
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World From Server");
});

app.listen(5500);
