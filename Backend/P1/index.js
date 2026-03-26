console.log("Hello! I am learning Node.js");

import fs from "fs";

var data = "Hello! Node.js";

fs.writeFile("./P1/message.txt", data, err => {
    if (err) throw err;
    console.log("The file has been saved!");
});

fs.readFile("./P1/message.txt", "utf-8", (data,err) => {
    if (err) throw err;
    console.log(data);
});