import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended : true }));
// app.use(bodyParser.urlencoded());
app.use(morgan("tiny"));
console.log("-----------------------------");
app.use(morgan("combined"));

console.log(__dirname);

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req,res) => {
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.surname);
    res.send("file saved!!");
});

app.listen(port, (req,res) => {
    console.log("the server is listening at port " + port);
});