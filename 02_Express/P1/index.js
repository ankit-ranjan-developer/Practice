// used npm i express 

import express from "express";

const app = express();
const port = 3000;

app.listen(port, ()=>{
    console.log("The server is listening at port " + port);
});

// output 

// Cannot GET / 
// -- reason, I haven't written any backend logic for get route on 3000. That's way, it provides this message. Computer is like, WHAT TO DO WHEN I SEE THE get.