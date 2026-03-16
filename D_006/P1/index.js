import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import {dirname} from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const app = express();
const port = 3000;
const __filepath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filepath);

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

// OTHER CONSTANTS

const API_URL = "https://secrets-api.appbrewery.com/";

const userName = "ankitranjan";
const password = "ankit123";
const apiKey = "e166026b-149a-46a1-8b78-74a3c87210bf";
const token = "f7f81fb8-8a76-43f8-8d5b-adc605c6f177";

app.get("/", (req,res) => {
    res.render("index.ejs", {content : "API response!!!"});
})

app.get("/noAuth", async(req,res) => {
    try {
        const response = await axios.get(API_URL + "random");
        // console.log(response);
        const result = response.data;
        console.log(result);

        res.render("index.ejs", {content: JSON.stringify(result)});
    } catch (error) {
        console.log("failed to fetch request : ", error.message);
        res.status(404).send("failed to fetch activity");
    }
});

app.get("/basicAuth", async(req,res) => {
    try {
        const response = await axios.get(API_URL + "all?page=1", {
            auth: {
                username : userName,
                password : password
            }
        });
        const result = response.data;
        console.log(result);
        res.render("index.ejs", {content : JSON.stringify(result)});
    } catch (error) {
        console.log("falied to fetch request : " + error.message);
        res.status(404).send("failed to fetch activity");
    }
});

app.get("/apiKey", async(req,res) => {
    try {
        const response = await axios.get(API_URL + "filter", {
            params: {
                score : 5,
                apiKey : apiKey,
            }
        });
        const result = response.data;
        console.log(result);
        res.render("index.ejs", {content : JSON.stringify(result)});
    } catch (error) {
        console.log("failed to fetch request : ", error.message);
        res.status(404).send("failed to fetch activity");
    }
});

app.get("/bearerToken", async(req,res) => {
    try {
        const response = await axios.get(API_URL + "user-secrets", {
            headers: {
                Authorization : `Bearer ${token}`,
            }
        });
        const result = response.data;
        console.log(result);
        res.render("index.ejs", {content : JSON.stringify(result)});
    } catch (error) {
        console.log("failed to fetch request : ", error.message);
        res.status(404).send("failed to fetch activity!!!");
    }
});

app.listen(port, () => {
    console.log("the server is running at port " + port);
});
