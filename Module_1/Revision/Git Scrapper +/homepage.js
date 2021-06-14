//  Work -> Top 10 issues name and Links

const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request");
let getTopicProjects = require("./getTopicProjects");

let link = "https://github.com/topics";

request(link, function (err, res, data) {
  processData(data);
});

// let githubTopics = [];

function processData(html) {
  let myDocument = cheerio.load(html);
  let allTopics = myDocument(".topic-box");

  for (let i = 0; i < allTopics.length; i++) {
    let topic = myDocument(allTopics[i]).find("a");
    // let topicName = myDocument(topic).text();
    // topicName = topicName.trim().split("\n")[0];
    let topicName = topic.find(".f3").text().split("\n")[1].trim();
    let topicLink = "https://github.com" + myDocument(topic).attr("href");
    // console.log(`Name : ${topicName} Link : ${topicLink} `);
    let topicFolderPath = `./Topics/${topicName}`;
    fs.mkdirSync(topicFolderPath);

    getTopicProjects(topicName, topicLink);
  }
}
