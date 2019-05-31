require('colors');
const request = require('request');
const cheerio = require('cheerio');
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'remotemysql.com',
  user     : 'ssTkfsMy3H',
  password : 'xWzeQdWtXd',
  database : 'ssTkfsMy3H'
});
 
connection.connect();


let url = 'https://otakuindo.co/daftar-komik/';
getManga()

function getMangaList(myurl) {
    console.log("typeof "+ typeof myurl)
    request(myurl, function (err, res, body) {
        if (err && res.statusCode !== 200) throw err;

        let $ = cheerio.load(body);
        $('div#animelist ol').each((i, value) => {
            $(value).find('a').each((j, data) => {
                var curentUrl = $(data).attr("href");
                var curentTitle = $(data).text();
                if (typeof curentUrl !== "undefined") {
                    // process.stdout.write( curentUrl + '\n');
                    save(curentUrl,curentTitle)
                }
            });
            // process.stdout.write('\n');
        });
    });
}

function getCapterList(manga) {
    manga.forEach(function (el, i) {
        console.log()
        reqGetCapter(el)
    })
}

function reqGetCapter(el) {
    request(el.manga_url, function (err, res, body) {
        if (err && res.statusCode !== 200) throw err;
        let $ = cheerio.load(body);
        $('table.chapter tr ').each((i, value) => {
            $(value).find('td.judulseries').each((j, data) => {
                saveCapter(el.manga_id,$(data).find("a").attr("href"),$(data).find("a").text())
            });
        });

    })
}


function getManga() {
    connection.query({
        sql : "SELECT * FROM manga"
    }, function (error, results, fields) {
        if (error) {
            console.log(error)
        }else{
            getCapterList(results) 
        }
    })
}

var index = 0;
function save(curentUrl,curentTitle) {
    var id = "MGN-"+Date.now()+ Math.floor(Math.random(1000000,1000000000)* 100000000000);
    console.log(id, curentUrl);

    connection.query({
        sql : "INSERT INTO manga SET ?",
        values : [
            {
                "manga_id" : id,
                "manga_title" : curentTitle,
                "manga_url" : curentUrl,
                "manga_cover" : "abc",
            }
        ]
    }, function (error, results, fields) {
        if (error) {
            console.log(error)
        }else{
            console.log('saved '+ index++)
        }
    })
}


function saveCapter(manga_id,curentUrl,curentTitle) {
    var id = "MGCAP-"+Date.now()+ Math.floor(Math.random(1000000,1000000000)* 100000000000);
    console.log(id, curentUrl);

    connection.query({
        sql : "INSERT INTO manga_episode SET ?",
        values : [
            {
                "manga_episode_id" : id,
                "manga_id" : manga_id,
                "manga_episode_title" : curentTitle,
                "manga_episode_url" : curentUrl,
            }
        ]
    }, function (error, results, fields) {
        if (error) {
            console.log(error)
        }else{
            console.log('saved'+ index++)
        }
    })
}

