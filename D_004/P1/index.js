import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));

const num = 1;


app.get("/", (req,res) => {
    // res.sendFile(__dirname + "/public/index.html");
    // res.sendFile(__dirname + "/public/index.html");
    // res.render("index.ejs"); 
    // these two will not execute, it can only send on res object back to client. 
    let mess = ""; // both are block- specific. one (let) can change but other (const) cann't. 
    
    if(num == 1) {
        // const today = new Date; 
        // console.log(today);
        // console.log(today.getDay());
        // const day = today.getDay();
        
        //  the diff btw var, let and const. 
        
        // var mess = ""; for entire block 
        
        // both let and const are block- specific. one (let) can change but other (const) cann't
        // const mess = ""; --> error! cann't be changed later. 
        // let mess = ""; --> cann't place let here. since mess is outside if-else block. 
        
        const today = 0;
        if(today == 0 || today == 6){
            mess = "it's a weekend! enjoy it"
        } else {
            mess = "It's just a normal day. Get to work!";
        }
    }
    res.render("index.ejs", {message : mess});
});

app.listen(port, ()=>{
    console.log("the server is listening at port " + port);
});

