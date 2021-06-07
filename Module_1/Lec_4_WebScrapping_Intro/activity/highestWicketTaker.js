let matchLink =
  "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");

request(matchLink, cb);

function cb(error, response, data) {
  fs.writeFileSync("./match.html", data);
  getHighestWicketTaker(data);
}

// bothBowlingTables = {
// "0" : {bowling table},
// "1" : {bowling table}
// }
// fs.writeFileSync('./bowlingTables.html', bothBowlingTables+"");

function getHighestWicketTaker(data) {
  let htmlData = fs.readFileSync("./match.html", "utf-8");
  let myDocument = cheerio.load(htmlData);
  let bothBowlingTables = myDocument(".table.bowler");
  let highestWicketTakerName;
  let highestWicketTaken;

  let economyofHighestWicketTaker;

  for (let i = 0; i < bothBowlingTables.length; i++) {
    let bowlingTable = myDocument(bothBowlingTables[i]);
    let allTableRows = bowlingTable.find(".table.bowler tbody tr ");
    // console.log(allTableRows.text());

    for (let j = 0; j < allTableRows.length; j++) {
      let allTds = myDocument(allTableRows[j]).find("td");
      if (i == 0 && j == 0) {
        highestWicketTakerName = myDocument(allTds[0]).find("a").text();
        highestWicketTaken = myDocument(allTds[4]).text();
        economyofHighestWicketTaker = myDocument(allTds[5]).text();
      } else {
        let currentWickets = myDocument(allTds[4]).text();
        let currentEconomy = myDocument(allTds[5]).text;
       
        if (currentWickets > highestWicketTaken || (currentWickets == highestWicketTaken &&currentEconomy < economyofHighestWicketTaker)) {
          highestWicketTakerName = myDocument(allTds[0]).find("a").text();
          highestWicketTaken = myDocument(allTds[4]).text();
          economyofHighestWicketTaker = myDocument(allTds[5]).text();
        }
      }
    }

    // name : "0"
    // wicket : "4"
    // economy : "5"
  }
  console.log("Highest Wicket Taker Name : " + highestWicketTakerName);
  console.log("Wicket Taken : " + highestWicketTaken);
  console.log("Highest Wicket Taker Econmy" + economyofHighestWicketTaker);
}
