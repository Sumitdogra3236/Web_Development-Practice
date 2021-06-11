const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request");

function getTopicProjects(topicName, topicLink){
    request(topicLink, function(err, res, data){
        processData(topicName, data);
    })
}

function processData(topicName , data){
    let myDocument = cheerio.load(data);
    let projectFile = [];
    let topicFolderPath = `./Topics/${topicName}`;
    let allProjectsH1Tag = myDocument(".d-flex.flex-justify-between.my-3 .f3 ");
    for(let i = 0 ; i < 10; i++){
      let ProjectsH1Tag = allProjectsH1Tag[i];
      let ProjectATag = myDocument(ProjectsH1Tag).find("a")[1];
      let ProjectName = myDocument(ProjectATag).text().split("\n")[1].trim();
      let ProjectLink = "https://github.com" + myDocument(ProjectATag).attr("href");
      projectFile.push({ProjectName, ProjectLink});
    }
    fs.writeFileSync(`${topicFolderPath}/project.json`, JSON.stringify(projectFile));
    
}

module.exports = getTopicProjects;