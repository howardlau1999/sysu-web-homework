/*
    esversion: 6
*/
var http = require('http'),
    fs = require('fs'),
    url = require('url');

var data = [{
    "username": "test",
    "stuid": 17343000,
    "phone": 18500000000,
    "email": "test@example.com"
}];

function parse_query(query) {

    var obj = {};
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; ++i) {
        pair = pairs[i].split("=");
        obj[pair[0]] = pair[1];
    }
    return obj;
}
fs.writeFileSync("users.json", JSON.stringify(data));
var server = http.createServer((request, response) => {
    response.writeHead(200, "OK");
    var query = url.parse(request.url).query;
    if (query) {
        var GET = parse_query(query);
        var detail_template = fs.readFileSync("./public/detail.html").toString();
        var user = {};
        for (var i = 0; i < data.length; ++i) {
            if (data[i].username == GET.username) {
                user = data[i];

                break;
            }
        }
        for (const key in user) {
            if (user.hasOwnProperty(key)) {
                const element = user[key];
                detail_template = detail_template.replace("{{" + key + "}}", element);
            }
        }
        response.write(detail_template);
    }


    response.end();
});

server.listen(8080);
console.log("Server listening on port 8080");