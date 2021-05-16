let fs = require("fs");

let cheerio = require("cheerio");

let htmlData = fs.readFileSync("./index.html", "utf8");

let myDocument = cheerio.load(htmlData);
let myDocumentText = cheerio.load(htmlData).text();

let h1Data = myDocument("h1").text();
// let h2Data = myDocument("h2").text();
console.log(h1Data);
// console.log(h2Data);


let ptagData = myDocument("p").text();
console.log(ptagData);  


