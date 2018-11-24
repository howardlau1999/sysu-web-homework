function Router(pathname, callbacks) {
    this.pathname = pathname;
    this.callbacks = callbacks;

}

function MethodNotSupported(pathname, accept, received) {
    this.pathname = pathname;
    this.accept = accept;
    this.received = received;
}

Router.prototype = {
    accept: function (req, res) {
        let method = req.method;
        for (const key in this.callbacks) {
            if (this.callbacks.hasOwnProperty(method)) {
                this.callbacks[method](req, res);
                return;
            }
        }
        res.statusCode = 409;
        res.end("Method not supported");
        throw new MethodNotSupported(this.pathname, this.methods, method);
    }
}

module.exports = Router;