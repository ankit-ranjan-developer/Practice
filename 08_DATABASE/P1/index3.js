import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import {dirname} from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;
const __filepath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filepath);

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.use(bodyParser.json());
app.set("view engine", "ejs");

const db = new pg.Client({
    user : "postgres",
    host : "localhost",
    database : "Mydatabase",
    password : "Ankit@369", 
    port : "5432"
});

db.connect();

db.query("SELECT * FROM flags", (err, res) => {
    if (err) {
        console.error("Error executing query", err.stack);
    } else {
        console.log("user data : ", res.rows);
    }

    db.end();
});

app.listen(port, () => {
    console.log("the server is listening at port " + port);
});