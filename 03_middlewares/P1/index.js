// used npm i express 

// Let's create a middleware named logger.

import express from "express";

const app = express();
const port = 3000;

// define all the middlewares---

function logger(req, res, next) {
    console.log("reqest method :-" + req.method);
    console.log("reqest url :-" + req.url);
    console.log("reqest params :-" + req.params);
    console.log("reqest query :-" + req.query);
    console.log("reqest body :-" + req.body);
    next();
}

// using all the middlewares ---

app.use(logger);

app.get("/", (req,res) =>{
    res.send("hello world");
});

app.listen(port, ()=>{
    console.log("The server is listening at port " + port);
});
