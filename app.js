const express = require("express"),
    bodyParser = require("body-parser"),
    request = require("request");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});
