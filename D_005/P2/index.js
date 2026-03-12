import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import {dirname} from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static("public"));

// Other constants 

const API_URL = "https://bored-api.appbrewery.com";
var result;

app.get("/", async (req,res) => {
    try {
        const response = await axios.get(API_URL + "/random");
    // console.log(response);
        console.log(response.data);
        result = response.data;
        res.render("index.ejs", {
            data : result,
        });
} catch (error) {
    console.log("failed to fetch request: " + error.message)
    res.render("index.ejs", {
        error: error.message,
    });
    }
});

app.post("/", async (req,res) => {
    // REQUEST TYPES
    console.log(req.method);
    console.log(req.url);
    console.log(req.params);
    console.log(req.query);
    console.log(req.headers);
    console.log("_______________");
    console.log(req.body);

    const type = req.body.type;
    const partcipants = req.body.participants;
    
    try{
        const response = await axios.get(API_URL + "/?type=" + type + "&" + "?participants=" + partcipants);
        result = response.data;
        res.render("index.ejs", {data : result});
    }catch(error) {
        console.log("failed to fetch request: " + error.message)
        res.render("index.ejs", {
            error: "failed to match cirteria!",
        });
    }
});

app.listen(port, () => {
    console.log("the server is listening at port " + port);
});