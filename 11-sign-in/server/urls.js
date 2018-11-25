function Router(pathname, callbacks, middlewares) {
    this.pathname = pathname;
    this.callbacks = callbacks;
    this.middlewares = middlewares || null;
    this.methods = Object.keys(this.callbacks);
}

module.exports = Router;