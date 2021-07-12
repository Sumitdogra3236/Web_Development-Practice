let MatchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request");

const getAllMatches = require("./allMatches");
 request(MatchLink, function(err, req, data){
     processData(data);
 })

 function processData(data){
    let myDocument = cheerio.load(data);
    let aTag = myDocument('a[data-hover="Fixtures and Results"]');
    let allMatchLink ="https://www.espncricinfo.com" + aTag["0"].attribs.href;
    getAllMatches(allMatchLink);
 }

//  const a = require('./IPL/Chennai Super Kings/Ambati Rayudu.json');
//  console.table(a);
