/*
    esversion: 6
*/
var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    render = require('./utils/render'),
    database = require('./utils/database'),
    views = require('./views'),
    routers = require('./server/routers'),
    querystring = require('querystring');

router = [
    routers.serve_static,
    routers.serve_dynamic(views),
    routers.fallback
];

function process(req, res, i) {
    if (i >= router.length)
        return;

    router[i](req, res, () => process(req, res, i + 1));
}

var server = http.createServer((req, res) => {
    process(req, res, 0);
});

server.listen(8080);
console.log("Server listening on port 8080");