// fs => file System

const fs = require("fs");
// console.log(fs);

// utf-8 => format for plain text !! 

let f1data = fs.readFileSync("./f1.txt", "utf-8");

// console.log(f1data + "");

// fs.writeFileSync("f1.txt", "Learning fs.writeFileSync module of Node");

// fs.writeFileSync("../activity/activity.txt", "Hello from facts");

// let data = fs.readFileSync("../activity/activity.txt", "utf-8");
// console.log(data);

``