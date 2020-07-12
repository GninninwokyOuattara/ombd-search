const express = require("express"),
    bodyParser = require("body-parser"),
    request = require("request"),
    xml = require("xml");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/search", (req, res) => {
    var queryString = "http://www.omdbapi.com/?";
    var r = req.query;
    if (r.t !== "") {
        queryString += `apikey=${process.env.API_KEY}&s=${r.t}&y=${r.y}&plot=${r.plot}&r=${r.r}`;
    }
    request(queryString, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            if (r.r == "json") {
                res.render("result", { data: JSON.parse(body) });
            } else {
                res.set("Content-Type", "text/xml");
                res.send(body);
            }
        }
    });
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});
