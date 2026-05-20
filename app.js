const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const studentRoutes = require("./routes/studentRoutes");

app.use("/students", studentRoutes);

app.get("/", (req, res) => {
    res.redirect("/students");
});

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});