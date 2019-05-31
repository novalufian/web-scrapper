require('colors');
const request = require('request');
const cheerio = require('cheerio');

let url = 'https://otakuindo.co/daftar-komik/';
getMangaList(url)
function getMangaList(myurl) {
    console.log("typeof "+ typeof myurl)
    request(myurl, function (err, res, body) {
        if (err && res.statusCode !== 200) throw err;

        let $ = cheerio.load(body);
        $('div#animelist ol').each((i, value) => {
            $(value).find('a').each((j, data) => {
                var curentUrl = $(data).attr("href");
                if (typeof curentUrl !== "undefined") {
                    getEpisodeLink(curentUrl)
                }
                process.stdout.write(curentUrl + '\n');
            });
            process.stdout.write('\n');
        });
    });
}

function getEpisodeLink(mylink) {
    request(mylink, function (err, res, body) {
        if (err && res.statusCode !== 200) throw err;

        let $ = cheerio.load(body);
        let capter = [];
        $('table.chapter tr ').each((i, value) => {
            $(value).find('td.judulseries').each((j, data) => {
                return process.stdout.write('---'+$(data).find("a").attr("href") + '\n');
            });


        });
        
    })
}

function writeJSON(data) {
    fs.writeFile("manga.json", data, (err) => {
      if (err) console.log(err);
      console.log("Successfully Written to File.");
    });
}

// Username: ssTkfsMy3H
// Database name: ssTkfsMy3H
// Password: xWzeQdWtXd
// Server: remotemysql.com
// Port: 3306