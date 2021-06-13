const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request");

function getTopicProjects(topicName, topicLink) {
  request(topicLink, function (err, res, data) {
    processData(topicName, data);
  });
}

function processData(topicName, data) {
  let myDocument = cheerio.load(data);
  let allProjectsH1Tag = myDocument(".d-flex.flex-justify-between.my-3 .f3 ");
  for (let i = 0; i < 10; i++) {
    let ProjectsH1Tag = allProjectsH1Tag[i];
    let ProjectATag = myDocument(ProjectsH1Tag).find("a")[1];
    let ProjectName = myDocument(ProjectATag).text().split("\n")[1].trim();
    let ProjectLink = "https://github.com" + myDocument(ProjectATag).attr("href");
    // console.log(ProjectLink);
    
    process(ProjectName, ProjectLink);
  }
}

function process(ProjectName,ProjectLink){
    request(ProjectLink, function(err, res, data){
        getIssues(ProjectName,data);
        // console.log(data);
    })
}

function getIssues(ProjectName, data){
    let myDocument = cheerio.load(data);
    let issueLink = myDocument(".UnderlineNav-body.list-style-none .d-flex");
    let issueTag = myDocument(issueLink).find("a")[1];
    let link = "https://github.com" + myDocument(issueTag).attr("href");
    // console.log(link);
    Link(link);
    
}

 function Link(link){
    request(link, function(err, res , data){
        processLink(data);
    })
}

function processLink(data){
    let myDocument = cheerio.load(data);
    let issues = myDocument("flex-auto min-width-0 p-2 pr-3 pr-md-2");
    console.log(issues.length);
}
module.exports = getTopicProjects;
