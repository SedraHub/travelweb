const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/travelweb";
mongoose.connect(mongoUri)
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB:", err));

const contactRoute = require("./routes/contact");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/contact", contactRoute);

app.use("/api/comments", require("./routes/comments"));

app.listen(5000, () => {
    console.log("Server: http://localhost:5000");
});