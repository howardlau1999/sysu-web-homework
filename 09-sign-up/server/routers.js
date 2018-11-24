
const path = require('path'),
      url = require('url'),
      fs = require('fs');
const serve_static = function (req, res, next) {
    let url = req.url;
    let que = url.indexOf('?'),
        pathname;
    if (que != -1) url = url.substring(0, que);
    
    if (url == '/')
        pathname = path.resolve('./public/index.html');
    else
        pathname = path.resolve('./public' + url);

    let ext = path.extname(pathname);
    
    const contentTypes = {
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
        '.htm': 'text/htm',
        '.ico': 'image/x-icon',
        '.svg': 'image/svg+xml',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.doc': 'application/msword',
        '.pdf': 'application/pdf',
        '.json': 'application/json',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mp3'
    };

    fs.exists(pathname, function (exist) {
        if (!exist) {
            next();
            return;
        }

        if (fs.statSync(pathname).isDirectory()) {
            res.statusCode = 403;
            res.end('Forbidden');
            return;
        }

        fs.readFile(pathname, function (err, data) {
            if (err) {
                res.statusCode = 500;
                res.end('Server error');
                console.log(err);
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', contentTypes[ext] || 'text/plain');
                res.end(data);
            }
        });
    });
};

const serve_dynamic = routers => function (req, res, next) {
    let parsed = url.parse(req.url || '/');
    for (let router of routers) {
        if (router.pathname && parsed.pathname != router.pathname) {
            continue;
        }

        router.accept(req, res);
        return;
    }
    next();
}

const fallback = function (req, res, next) {
    res.statusCode = 404;
    res.end('Path not found');
}

module.exports = {
    serve_static,
    serve_dynamic,
    fallback
};