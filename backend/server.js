const express = require("express");
const cors = require("cors");

const contactRoute = require("./routes/contact");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/contact", contactRoute);

app.use("/api/comments", require("./routes/comments"));

app.listen(5000, () => {
    console.log("Server: http://localhost:5000");
});