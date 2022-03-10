import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const PORT = process.env.PORT || 5500;
const db_user = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const DB_CON_URL = `mongodb+srv://${db_user}:${db_password}@cluster0.fu2jd.gcp.mongodb.net/mern-with-next?retryWrites=true&w=majority`;

const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(cors());

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
