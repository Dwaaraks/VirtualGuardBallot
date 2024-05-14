const express = require("express");
const connectDB = require("./backend/config/db.js");
const cors = require("cors");
const bodyParser = require("body-parser");

const UserRoutes = require("./backend/routes/UserRoutes.js");

connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api/v1/user", UserRoutes);

app.listen(8080, () => {
  console.log("Server Working");
});
