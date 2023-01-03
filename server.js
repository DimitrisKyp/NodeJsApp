const fs = require("fs");
const data = fs.readFileSync('words.json');
const words = JSON.parse(data);

const express = require('express');
const { response } = require("express");
const app = express();
const server = app.listen(3000, listening);
function listening(){
    console.log('listening..');
}

app.use(express.json())
  
app.use(express.static('website'));

app.get('/add/:word/:score?', addWord);

function addWord(request, response){
var data = request.params;
var word = data.word;
var score = Number(data.score);
var reply ;
if(!score) {
     var reply = {
        msg: "Score is required"
    }
    response.send(reply);
} else {
    words[word] = score;
    var data = JSON.stringify(words, null, 2);
    fs.writeFile('words.json', data, finished);

    function finished(err) {
        console.log('all set.');
        reply = {
            word: word,
            score: score,
            status: "success"
        }
        response.send(reply);
    }
}
}

app.get('/all', sendAll);
function sendAll(request, response){
    response.send(words);
}

app.get('/search/:word/', searchWord);

function searchWord (request, response){
    var word = request.params.word;
    var reply;
    if (words[word]){
        reply = {
        status: "found",
        word: word,
        score: words[word]
        }
    } else {
        reply = {
            status: "Not found",
            word: word
        }
    }
    response.send(reply);
}