let matchlink =
  "https://www.espncricinfo.com/series/new-zealand-in-england-2021-1249202/england-vs-new-zealand-1st-test-1249210/full-scorecard";
let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");

// request(matchlink, cb);

// function cb(error, response , data){
//     fs.writeFileSync("data.html", data);
// }

let html = fs.readFileSync("./data.html", "utf-8");

let data = cheerio.load(html);
 
let bothbowlingTable = data(".table.bowler");
// fs.writeFileSync("bowlingTable.html", bothbowlingTable+"");

// {
//     "0" : {bowling Table},
//     "1" : {bowling Table}
// }

let highestWicketTakerName;
let highestWicketTaken;
let highestWicketTakerEconomy;

for(let i = 0; i < bothbowlingTable.length; i++){
    let bowlingTable = data(bothbowlingTable[i]);

    let allTableRows = bowlingTable.find(".table.bowler tbody tr");

    // {
    //     "0" : {tr},
    //     "1" : {tr},
    //     "2" : {tr}
    // }

    for(let j = 0; j < allTableRows.length; j++){
        let allTds = data(allTableRows[j]).find("td");
        // { 0 : {}, 1 : {}, 2 : {} }

        if(i == 0 && j == 0){
            highestWicketTakerName = data(allTds[0]).find("a").text();
            highestWicketTaken = data(allTds[4]).text();
            highestWicketTakerEconomy = data(allTds[5]).text();
        }
        else {
            let currentWickets = data(allTds[4]).text();
            if(currentWickets > highestWicketTaken){
                // update if current bowler have high wicket !!
                highestWicketTakerName = data(allTds[0]).find("a").text();
                highestWicketTaken = data(allTds[4]).text();
                highestWicketTakerEconomy = data(allTds[5]).text();
            }
        }
    }

    // wicket : "4"
    // name : "0"
    // economy : "5"
    
}

console.log("Name : " + highestWicketTakerName);
console.log("Wicket Taken  : " + highestWicketTaken);
console.log("Economy of Highest Wicket Taker : " + highestWicketTakerEconomy);  