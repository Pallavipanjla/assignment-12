const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

const studentRoutes = require("./routes/studentRoutes");

app.use("/students", studentRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Student API is running." });
});

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
