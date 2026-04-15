import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import {dirname} from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __filepath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filepath);

// PRACTICING DIFFRENT DIFFRENT TAGS.

const data = {
    tittle : "Ejs Tags",
    seconds: new Date().getSeconds(),
    items : ["apples", "banana" , "cherry"],
    htmlcontent: "<strong> text </strong>"
}

app.get("/", (req,res) => {
    res.render("index.ejs", data);
});

app.get("/files", (req,res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/s-files", (req,res) => {
    res.send("hello! we can send only one res object per route");
});

app.listen(port, () => {
    console.log("the server is listening at port " + port);
});