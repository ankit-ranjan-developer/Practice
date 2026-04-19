import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const app = express();
const port = 5000;
const __filepath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filepath);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.set("view engine", "ejs");

const API_URL = "http://localhost:4000";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/allposts");
    const result = response.data;
    // console.log(result);
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.log("error fetching data : ", error.message);
    res.status(404).send("No response from server!!!");
  }
});

app.get("/new", (req, res) => {
  res.render("modify.ejs", {
    heading: "new post",
    submit: "create post",
  });
});

app.post("/newpost", async (req, res) => {
  try {
    console.log(req.body);
    const response = await axios.post(API_URL + "/newposts", req.body);
    const result = response.data;
    console.log(result);
    res.redirect("/");
  } catch (error) {
    console.log("error fetching data : ", error.message);
    res.status(404).send("No response from server!!!");
  }
});

// Updaqting data on blogpost.

app.get("/edit/:id", async (req, res) => {
    console.log(req.params.id);
  try {
    const response = await axios.get(
      API_URL + "/getspecificpost/" + req.params.id,
    );
    res.render("modify.ejs", {
      heading: "Edit post",
      submit: "update post",
      data: response.data,
    });
  } catch (error) {
    console.log("error fetching data : ", error.message);
    res.status(404).send("No response from server!!!");
  }
});

app.post("/changepost/:id", async(req,res) => {
    console.log("hello");
    try {
      const response = await axios.patch(API_URL + "/api/changepost/" + req.params.id, req.body);
      const result = response.data;
      res.redirect("/");
    } catch (error) {
      console.log("error fetching data : ", error.message);
      res.status(404).send("No response from API server!!!");
    }
})

app.get("/delete/:id", async(req,res) => {
  try {
    const response = await axios.delete(API_URL + "/deletepost/" + req.params.id);
    const result = response.data;
    res.redirect("/");
  } catch (error) {
    console.log("error fetching data : ", error.message);
    res.status(404).send("No response from API server!!!");
  }
});

app.listen(port, () => {
  console.log("the server is listening at port " + port);
});
