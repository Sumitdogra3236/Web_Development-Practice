const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request");
const getMatchDetail = require("./match.js");

function getAllMatches(allMatchLink){
    request(allMatchLink, function(err, res, data){
        processData(data);  
    })
}


function processData(data){
    let myDocument = cheerio.load(data);
    let allTags = myDocument('a[data-hover="Scorecard"]');
    for(let i =0; i < allTags.length; i++){
        let matchLink ="https://www.espncricinfo.com" + myDocument(allTags[i]).attr("href");        
        // getPlayerDetail(matchLink);
        getMatchDetail(matchLink);
        
    }
}

module.exports = getAllMatches;


// function getPlayerDetail(matchLink){
//     request(matchLink, function(err, res, data){
//         getDetails(data);
//     })

    // function getDetails(data){
    //     let myDocument = cheerio.load(data);
    //     let bothBatsmanTable = myDocument(".table.batsman");
    //     for(let i =0; i< bothBatsmanTable.length; i++){
    //         let oneBatsmanTable = bothBatsmanTable[i];
    //         let allTrs = myDocument(oneBatsmanTable).find("tbody tr");
    //         for(let j =0; j < allTrs.length; j++){
    //             let allTds = myDocument(allTrs[j]).find("td");
    //             if(allTds.length > 1){
    //                 let batsmanName = myDocument(allTds[0]).text();
    //                 let batsmanRuns = myDocument(allTds[2]).text();
    //                 let balls = myDocument(allTds[3]).text();
    //                 let fours = myDocument(allTds[5]).text();
    //                 let sixes = myDocument(allTds[6]).text();
    //                 let sr = myDocument(allTds[7]).text();
    //                 console.log("Name : " + batsmanName + "  Runs : " + batsmanRuns + "  Balls Played :" + balls + "  Fours : " + fours + "  Sixes"  + sixes + "  Strike Rate : " + sr);
    //             }

    //         }
    //     }
    // }
// }
