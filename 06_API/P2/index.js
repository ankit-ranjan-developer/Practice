import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const API_URL = "https://secrets-api.appbrewery.com/";
const token = "f7f81fb8-8a76-43f8-8d5b-adc605c6f177";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "waiting for data!!!" });
});

app.post("/get-secret", async (req, res) => {
  const secretId = req.body.id;
  console.log(secretId);
  try {
    const response = await axios.get(API_URL + "secrets/" + secretId, config);
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.log("failed to fetch request : " + error);
    res.render("index.ejs", { content: JSON.stringify(error) });
  }
});

app.post("/post-secret", async (req, res) => {
  const secretId = req.body.id;
  const secretinput = req.body.secret;
  const secretscore = req.body.score;

  console.log(secretId);
  console.log(secretinput);
  console.log(secretscore);

  try {
    const response = await axios.post(API_URL + "secrets/", req.body, config);
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error) });
  }
});

app.post("/put-secret", async (req, res) => {
  const secretId = req.body.id;
//   console.log(req.body);
  try {
    const response = await axios.put(
      API_URL + "secrets/" + secretId,
      req.body,
      config
    );
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.log("failed to fetch request : " + error);
    res.render("index.ejs", { content: JSON.stringify(error) });
  }
});

app.post("/patch-secret", async(req,res) => {
    const secretId = req.body.id;
    try {
        const response = await axios.patch(API_URL + "secrets/" + secretId, req.body, config);
        const result = response.data;
        res.render("index.ejs", {content : JSON.stringify(result)});
    } catch (error) {
      console.log("failed to fetch request : " + error);
      res.render("index.ejs", { content: JSON.stringify(error) });
    }
});

app.post("/delete-secret", async(req,res) => {
    const secretId = req.body.id;
    try {
        const response = await axios.get(API_URL + "secrets/" + secretId, config);
        const result =  response.data;
        res.render("index.ejs", {content : JOSN.stringify(result)});
    } catch (error) {
        console.log("failed to fetch request : " + error);
        res.render("index.ejs", {content : JOSN.stringify(result)});
    }
});

app.listen(port, () => {
  console.log("the server is running at port " + port);
});
