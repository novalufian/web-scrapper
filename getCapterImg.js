require('colors');
const request = require('request');
const cheerio = require('cheerio');

const fs = require("fs");

let url = 'https://otakuindo.co/daftar-komik/';
let manga = [];

fs.readFile('manga-capter.json', 'utf8', function(err, contents) {
    contents = JSON.parse(contents)
        for(var k = 0, length3 = 1; k < length3; k++){
            getEpisodeLink(contents[k]['manga-url'], contents[k]);
        }
});

function getEpisodeLink(mylink, mangaData) {
    console.log(mangaData['manga-capter'])
    // request(mylink, function (err, res, body) {
    //     if (err && res.statusCode !== 200) throw err;
    //     let $ = cheerio.load(body);

    //     $('table.chapter tr ').each((i, value) => {
    //         var capter = [];
    //         $(value).find('td.judulseries').each((j, data) => {
    //             var capterData = {
    //                 "capter-title" : $(data).find("a").text(),
    //                 "capter-url" : $(data).find("a").attr("href"),
    //                 "capter-img" : []
    //             }
    //             capter.push(capterData);
    //             // console.log(capterData["capter-url"])
    //         });
    //         mangaData['manga-capter'].push(capter)
    //         getEpisodeImg(mangaData['manga-capter'], mangaData)
    //         // getEpisodeImg(capter["capter-url"], capter)
    //     });

    //    // manga.push(mangaData);
    //    // writeJSON(JSON.stringify(manga));
    // })
}

function writeJSON(data) {
    fs.writeFile("manga-capter-img.json", data, (err) => {
      if (err) console.log(err);
      console.log("Successfully Written to File.");
    });
}

// Username: ssTkfsMy3H
// Database name: ssTkfsMy3H
// Password: xWzeQdWtXd
// Server: remotemysql.com
// Port: 3306