import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";

const PORT = process.env.PORT || 5500;
const db_user = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const DB_CON_URL = `mongodb+srv://${db_user}:${db_password}@cluster0.fu2jd.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(process.env.PORT);

const app = express();

/* Root Route */
app.get("/", function (req, res) {
  res.send("Hello World From Server");
});

/* Posts Routes */
app.use("/posts", postRoutes);

/* mongodb connection */
mongoose
  .connect(DB_CON_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      return console.log("🚀 Server Is Up & Running On Port : " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
