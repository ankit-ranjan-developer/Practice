import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import {dirname} from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const app = express();
const port =  3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

// OTHER CONSTANTS

const API_URL = "https://secrets-api.appbrewery.com/";

app.get("/", async(req,res) => {
    try {
        const response = await axios.get(API_URL + "random");
        const result = response.data;
        console.log(result);
        res.render("index.ejs", {res : result})
    } catch (error) {
        console.log("failed to fetch request : ", error);
        res.status(404).send("sorry! cann't fetch activity");
    }
});

app.listen(port, () => {
    console.log("the server is running at port " + port);
});