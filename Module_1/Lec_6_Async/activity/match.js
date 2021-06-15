const fs = require("fs");
const Cheerio = require("cheerio");
const request = require("request");


// let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
// getMatchDetail(matchLink);

let leaderboard = [];

function getMatchDetail(matchLink){
    request(matchLink, function(err, res, data){
        processData(data);
    })
}

function processData(html){
    let myDocument = Cheerio.load(html);
    let bothInnings = myDocument(".card.content-block.match-scorecard-table .Collapsible");
    for(let i = 0; i < bothInnings.length; i++){
        let oneInning = myDocument(bothInnings[i]);

        let teamName = oneInning.find("h5").text();
        teamName = teamName.split("INNING")[0].trim();
        console.log(teamName);

        let allTrs = myDocument(oneInning).find(".table.batsman tbody tr");
        for(let j = 0; j < allTrs.length - 1; j++){
            let allTds = myDocument(allTrs[j]).find("td");
            if(allTds.length > 1){
              // batsman Name : allTds[0]
              let batsmanName = myDocument(allTds[0]).text().trim();

              // runs : allTds[2]
                let runs = myDocument(allTds[2]).text().trim();
              //  Balls : allTds[3]
                let balls = myDocument(allTds[3]).text().trim();
              // fours : allTds[5]
                let fours = myDocument(allTds[5]).text().trim();
              // sixes : allTds[6]
                let sixes = myDocument(allTds[6]).text().trim();
              // strike rate : allTds[7]
              let StrikeRate = myDocument(allTds[7]).text().trim();
              // console.log(`Name : ${batsmanName} Runs : ${runs} Balls : ${balls} Fours : ${fours} Sixes : ${sixes} Strike Rate ${StrikeRate}`);
              // processDetails(teamName, batsmanName, balls, runs, fours, sixes, StrikeRate);
            }
        } 
    }
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
}

module.exports = getMatchDetail;