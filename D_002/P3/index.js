//  This exercise is for praticing a tool called postman.
import express from "express";

const app = express();
const port = 3000;

app.get("/", (req,res) =>{
    res.status(200).send("<h1>home page!!</h1>");
});
app.post("/register", (req,res) =>{
    res.status(200).send("registered!");
});
app.put("/users/ankit", (req,res) =>{
    res.sendStatus(200);
});
app.patch("/users/ankit", (req,res) =>{
    res.sendStatus(200);
});
app.delete("/users/ankit", (req,res) =>{
    res.sendStatus(200);
});

app.listen(port, ()=>{
    console.log("the server is listening at port " + port);
});
