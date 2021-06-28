let fs = require("fs"); 

let cheerio = require("cheerio");

let htmlData = fs.readFileSync("./index.html", "utf8");

let myDocument = cheerio.load(htmlData);
let myDocumentText = cheerio.load(htmlData).text();

let h1Data = myDocument("h1").text();
// let h2Data = myDocument("h2").text();
// console.log(h1Data);
// console.log(h2Data);


let ptagData = myDocument("p").text();
// console.log(ptagData);  
//  let secondPTag = myDocument("p")[1];
//  console.log(secondPTag.text()); --> doesn't work because text() function doesn't work in the nested object and only used with cheerio object 

// console.log(secondPTag);

// console.log(myDocument(secondPTag).text());


//Selectors
// console.log(myDocument("ul p").text()); // it will give all the p tags inside ul


// console.log(myDocument("a").text());
// console.log(myDocument("ul li a").text()); // - we will get all  a tags inside li

//only direct child!!
// console.log(myDocument("ul>a").text());


//classes and ids
// for classes => use dot .
// console.log(myDocument(".inside").text());

// console.log(myDocument(".inside.main").text());

// for id use => # 
console.log(myDocument("#main-heading").text());