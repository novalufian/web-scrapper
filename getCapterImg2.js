require('colors');
const request = require('request');
const cheerio = require('cheerio');

const fs = require("fs");

let url = 'https://otakuindo.co/daftar-komik/';
let manga = [];

fs.readFile('manga.json', 'utf8', function(err, contents) {
    contents = JSON.parse(contents)
    console.log(contents.length);
        for(var k = 0, length3 = 1; k < length3; k++){
            getEpisodeLink(contents[k]['manga-url'], contents[k]);
        }
});

function getEpisodeLink(mylink, mangaData) {
    request(mylink, function (err, res, body) {
        if (err && res.statusCode !== 200) throw err;
        let $ = cheerio.load(body);

        $('table.chapter tr ').each((i, value) => {
        var capter = [];
            $(value).find('td.judulseries').each((j, data) => {
                getImg($(data).find("a").attr("href"), function (dataImg) {
                    var capterData = {
                        "capter-title" : $(data).find("a").text(),
                        "capter-url" : $(data).find("a").attr("href"),
                        "capter-img" : dataImg
                    }
                    capter.push(capterData);
                })
            });
            mangaData['manga-capter'].push(capter)
        });

       manga.push(mangaData);
       writeJSON(JSON.stringify(manga));

    })
}

function getImg(capterLink, cb) {
    request(capterLink, function (err, res, body) {
        if (err && res.statusCode !== 200) throw err;
        let $ = cheerio.load(body);
        var img = []
        $('div#readerareaimg p').each((i, value) => {
            $(value).find('img').each((j, data) => {
               img.push($(data).attr("src"))
            });
            console.log(img)
            cb(img)
        });

    })
}

function writeJSON(data) {
    fs.writeFile("manga-capter-img.json", data, (err) => {
      if (err) console.log(err);
      console.log("Successfully Written to File.");
    });
}