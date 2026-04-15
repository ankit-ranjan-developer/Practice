import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const app = express();
const port = 3000;
const __filepath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filepath);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const API_URL = "http://localhost:4000";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/posts");
    const result = response.data;
    res.render("index.ejs", { posts: result });
  } catch (error) {
    res.status(500).json({ message: "error fetching posts" });
  }
});

app.get("/new", (req, res) => {
  res.render("modify.ejs", {
    heading: "New Post",
    submit: "Create Post",
  });
});

app.post("/api/posts", async (req, res) => {
  console.log(req.body);
  try {
    const response = await axios.post(API_URL + "/newPosts", req.body);
    const result = response.data;
    console.log("the things changes : " + result);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "error fetching message" });
  }
});

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/edit/" + req.params.id);
    const result = response.data;
    console.log("result : ", result);
    res.render("modify.ejs", {
      heading: "Edit Post",
      post: result,
      submit : "Change Post"
    });
  } catch (error) {
    res.status(500).json({ message: "error fetching messages" });
  }
});

app.post("/api/posts/:id", async(req,res)=> {
    console.log(req.body);
    try {
        const response = await axios.patch(API_URL + "/posts/edit/" + req.params.id, req.body);
        const result = response.data;
        console.log(result);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({message : "error fetching posts"});
    }
});

app.get("/api/posts/delete/:id", async(req,res) => {
    try {
        const response = await axios.delete(API_URL + "/posts/delete/" + req.params.id);
        const result = response.data;
        console.log(result);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({message : "error fetching posts"});
    }
});

app.listen(port, () => {
  console.log("the server is listening at port " + port);
});

