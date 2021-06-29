const fs = require('fs'); 
const { getMaxListeners } = require('process');

let obj ={
    Name : "Sumit Dogra",
    Mail : "sumitdogra3236@gmaail.com",
    GitHub : "SumitDogra3236"
}

// fs.writeFileSync('./js.json', JSON.stringify(obj));
let file = fs.readFileSync("./js.json", "utf8");
console.log(JSON.parse(file));