const fs = require("fs");
const Cheerio = require("cheerio");
const request = require("request");


// let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
// getMatchDetail(matchLink);

let leaderboard = []; 
let countofRequests = 0;


function getMatchDetail(matchLink){
    console.log("Sending request", countofRequests);
    countofRequests++;

    // Async Call
    request(matchLink, function(err, res, data){
      countofRequests--;
        processData(data);
        console.log("CallBack", countofRequests);

        if(countofRequests == 0){
          console.table(leaderboard);
          console.log(typeof leaderboard);
        }
    })
}

function processData(html){
    let myDocument = Cheerio.load(html);
    let bothInnings = myDocument(".card.content-block.match-scorecard-table .Collapsible");
    for(let i = 0; i < bothInnings.length; i++){
        let oneInning = myDocument(bothInnings[i]);

        let teamName = oneInning.find("h5").text();
        teamName = teamName.split("INNING")[0].trim();
        // console.log(teamName);

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
              processLeaderBoard(teamName, batsmanName, balls, runs, fours, sixes );

            }
        } 
    }
    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
}

function processLeaderBoard(teamName, batsmanName, balls, runs, fours, sixes ){
  runs = Number(runs);
  balls = Number(balls);
  fours = Number(fours);
  sixes = Number(sixes);

  for(let i = 0; i < leaderboard.length; i++){
    let batsmanObject = leaderboard[i];

      if (
        batsmanObject.Team == teamName &&
        batsmanObject.Batsman == batsmanName
      ) {
                batsmanObject.Runs +=    runs;
                batsmanObject.Balls += balls;
                batsmanObject.Fours += fours;
                batsmanObject.Sixes += sixes;
        return;
      }
  }

  let batsmanObject = {
    Team: teamName,
    Batsman: batsmanName,
    Runs: runs,
    Balls: balls,
    Fours: fours,
    Sixes: sixes,
  };
  leaderboard.push(batsmanObject);
}

module.exports = getMatchDetail;