let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const { data } = require("cheerio/lib/api/attributes");

request(matchLink, function (error, response, data){
    gethighestSixes(data);
})

function gethighestSixes(data){
    let ch = cheerio.load(data);
    let allBowlingTables = ch(".table.batsman");
    let highestSixes;
    let highestSixerName;
    let StrikeRate;
    for(let i = 0; i < allBowlingTables.length;i++){
        let oneBatsManTable = ch(allBowlingTables[i]);
        let allTrs = ch(allBowlingTables[i]).find("tbody tr");
        // let allTrs = oneBatsManTable.find("tbody tr");
        
        for(let j = 0; j < allTrs.length; j++){
            let allTds = ch(allTrs[j]).find("td");
            if(allTds.length > 1){
                if(i ==0 && j ==0){
                    highestSixerName = ch(allTds[0]).text();
                    highestSixes = ch(allTds[6]).text();
                    StrikeRate = ch(allTds[7]).text();
                }
                else {
                    let currentSixes = ch(allTds[6]).text();
                    let currentStrikeRate = ch(allTds[7]).text();
                    if(currentSixes > highestSixes || (currentSixes == highestSixes && currentStrikeRate > StrikeRate)){
                        highestSixerName = ch(allTds[0]).text();
                        highestSixes = ch(allTds[6]).text();
                        StrikeRate = ch(allTds[7]).text();
                    }
                }
            }
        }
    }
    console.log("Highest Sixer Name = " + highestSixerName);
    console.log("Highest Sixes = " + highestSixes);
    console.log("Strike Rate = " + StrikeRate);

}