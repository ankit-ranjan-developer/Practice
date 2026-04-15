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
// app.use(bodyParser.json());

const API_URL = "http://localhost:4000/";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "posts");
    const result = response.data;
    res.render("index.ejs", { posts: result });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

app.get("/new", (req,res) => {
    res.render("modify.ejs", {
        heading : "New Post",
        submit : "Create Post",
    });
});

app.get("/edit/:id", async(req,res) => {
    try {
      const response = await axios.get(API_URL + "edit/" + req.params.id);
      const result = response.data;
      res.render("modify.ejs", {
      heading : "Edit Post",
      submit : "Update Post",
      post : result
    });
    } catch (error) {
      res.status(500).json({ message: "Error fetching post" });
    }
});

app.post("/api/posts", async(req,res) => {
  console.log(req.body);
  try {
    const response = await axios.post(API_URL + "posts", req.body);
    const result = response.data;
    res.render("index.ejs", {posts : result});
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

app.post("/api/posts/:id", async(req,res) => {
  try {
    console.log(req.body);
    console.log(req.params.id);
    const response = await axios.patch(API_URL + "posts/" + req.params.id, req.body);
    // const response = await axios.patch(API_URL + "posts/:id", req.body); Not allowed.
    const result = response.data;
    res.redirect("/");
  } catch (error) {
    res.status(500).json({message : "error fetching post"});
  }
});

app.get("/api/posts/delete/:id", async(req,res) => {
  try {
    const response = await axios.delete(API_URL + "delete/" + req.params.id, req.body);
    const result = response.data;
    console.log(result);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({message : "error fetching post"});
  }
});

app.listen(port, () => {
  console.log("there server is listening at port " + port);
});
