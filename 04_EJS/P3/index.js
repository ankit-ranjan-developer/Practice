import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended : true }));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.post("/submit", (req,res) => {

    console.log(req.body);

    const name = req.body.fname + req.body.lname; 
    const len = name.length; 

    res.render("index.ejs", {
        Name : name,
        length : len
    });
});

app.listen(port, () => {
    console.log("the server is listening at port " + port);
});