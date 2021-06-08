const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request");


function getAllMatches(allMatchLink){
    request(allMatchLink, function(err, res, data){
        processData(data);  
    })
}


module.exports = getAllMatches;