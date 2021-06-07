let matchlink =
  "https://www.espncricinfo.com/series/new-zealand-in-england-2021-1249202/england-vs-new-zealand-1st-test-1249210/full-scorecard";
let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");

request(matchlink, cb);

function cb(error, response , data){
    fs.writeFileSync("data.html", data);
    getHighestWicketTaker(data);
}



// let html = fs.readFileSync("./data.html", "utf-8");

// let data = cheerio.load(html);
 
// fs.writeFileSync("bowlingTable.html", bothbowlingTable+"");

// {
    //     "0" : {bowling Table},
    //     "1" : {bowling Table}
    // }
    
    function getHighestWicketTaker(data){
        let html = fs.readFileSync("./data.html", "utf-8");
        let ch = cheerio.load(html);
        let bothbowlingTable = ch(".table.bowler");


    let highestWicketTakerName;
    let highestWicketTaken;
    let highestWicketTakerEconomy;

for(let i = 0; i < bothbowlingTable.length; i++){
    let bowlingTable = ch(bothbowlingTable[i]);

    let allTableRows = bowlingTable.find(".table.bowler tbody tr");

    // {
    //     "0" : {tr},
    //     "1" : {tr},
    //     "2" : {tr}
    // }

    for(let j = 0; j < allTableRows.length; j++){
        let allTds = ch(allTableRows[j]).find("td");
        // { 0 : {}, 1 : {}, 2 : {} }

        if(i == 0 && j == 0){
            highestWicketTakerName = ch(allTds[0]).find("a").text();
            highestWicketTaken = ch(allTds[4]).text();
            highestWicketTakerEconomy = ch(allTds[5]).text();
        }
        else {
            let currentWickets = ch(allTds[4]).text();
            if(currentWickets > highestWicketTaken){
                // update if current bowler have high wicket !!
                highestWicketTakerName = ch(allTds[0]).find("a").text();
                highestWicketTaken = ch(allTds[4]).text();
                highestWicketTakerEconomy = ch(allTds[5]).text();
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
}