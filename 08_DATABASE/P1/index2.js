import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;
const __filepath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filepath);

const db = new pg.Client({
    user : "postgres",
    host : "localhost",
    database : "Mydatabase",
    password : "Ankit@369", 
    port : "5432"
});

db.connect();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.use(bodyParser.json());
app.set("view engine", "ejs");

db.query("SELECT * FROM capitals", (err,res) => {
    if (err) {
        console.log("error executing query : ", err.stack);
    } else {
        console.log("user data: ", res.rows);
    }

    db.end();
});


app.listen(port, ()=> {
    console.log("the server is listening at port " + port);
})