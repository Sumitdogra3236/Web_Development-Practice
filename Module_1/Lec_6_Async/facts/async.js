
// GEC -> Global Execution Context -> where js code runs in the stack
// Node API -> Where the callBack functions executes
// Waiting Queue -> CallBack function are pushed to Waiting queue after their execution(i.e. fetching of the data from the files), for the further operation in GEC
// Event Loop -> It checks whether the GEC is empty or not, if empty then only it sends the callBack functin for further execution from the Waiting Queue


const fs = require("fs");

console.log("start");

fs.readFile("./f1.txt", getData);

function getData(error, data) {
  console.log(data + "");
}

console.log("end");
