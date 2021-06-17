let fs =  require("fs");
let cheerio = require("cheerio");
let request = require("request");
let link = "https://www.cuchd.in/";
request(link, function(err, res, data){
    process(data);
    // console.log(data);
})

function process(data){
    let myDocument = cheerio.load(data);
    let ul = myDocument(
      ".container-fluid .navbar-right.megamenu.row .navbar-right.megamenu.row .whatsapp.d-flex li"
    );
    console.log(ul.length);

}