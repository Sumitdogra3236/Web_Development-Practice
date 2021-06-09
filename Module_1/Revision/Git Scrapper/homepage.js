const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request");

let link = "https://github.com/topics";

request(link, function(err, res, data){
    processData(data);
})


function processData(html){
let myDocument = cheerio.load(html);
let allTopics = myDocument(".topic-box");

for(let i =0; i< allTopics.length; i++){
    let topic =  myDocument(allTopics[i]).find("a");
    let topicName = myDocument(topic).text();
    topicName = topicName.trim().split("\n")[0];
    let topicLink = "https://github.com" + myDocument(topic).attr("href");
    console.log(`Name : ${topicName} ${topicLink} `); 
}

}