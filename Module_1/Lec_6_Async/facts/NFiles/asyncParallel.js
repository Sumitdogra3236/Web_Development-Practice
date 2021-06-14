// async code 
// simultaneous process
const fs = require('fs');
let files = ['../f1.txt', '../f2.txt', '../f3.txt'];

console.log("Start")

for(let i = 0; i < files.length; i++){
    fs.readFile(files[i], function(err, data){
        console.log(data + "");
    })
}

console.log("End");