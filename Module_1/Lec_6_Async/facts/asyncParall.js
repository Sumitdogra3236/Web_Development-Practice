const fs = require("fs");

console.log("Start");

fs.readFile('./f1.txt', function (error , data){
    console.log(data+"");
})

fs.readFile('./f2.txt', function (error, data){
    console.log(data + "");
})

fs.readFile('./f3.txt', function (error , data){
    // console.log(err);
    console.log(data + "");
})
console.log("End");
