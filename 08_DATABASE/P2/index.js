// this execise will extend my preparation of the "making tables" in postgresql.

import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import {dirname} from "path";
import { fileURLToPath } from "url";
import pg from "pg";

// CONTANTS

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

// MIDDLEWARES

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());

// OTHER CONTANTS

let quiz = [];
let totalCorrect = 0;
let currentQuestion = {};

// db queries:- 

db.query("SELECT * from countries", (err, res) => {
    if(err) {
        console.log("Error executing qurry :- ", err.stack);
    } else {
        quiz = res.rows;
    }
    db.end();
});

function nextQuestion() {
    const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
    console.log(currentQuestion);
    currentQuestion = randomCountry;
}

app.get("/", async(req,res) => {
    await nextQuestion();
    console.log(currentQuestion);
    res.render("index.ejs", {question : currentQuestion});
})

app.post("/submit", (req,res) => {
    let answer = req.body.answer.trim();
    let isCorrect = false;

    // if(currentQuestion.name.)
});

app.listen(port, ()=>{
    console.log("the server is listening at port " + port);
});