// multiple files
// async code
// F1kaData >> F2kaData >> F3kaData

// -> This callBack fn. inside callBack fn. forms callBack Hell.
const fs = require("fs");

console.log("Start");

fs.readFile("./f1.txt", function (error, data) {
  console.log(data + "");
  fs.readFile("./f2.txt", function (error, data) {
    console.log(data + "");
    fs.readFile("./f3.txt", function (error, data) {
      // console.log(err);
      console.log(data + "");
    })
  })
})



console.log("End");