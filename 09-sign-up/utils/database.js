const fs = require('fs');

function NotFoundError(key) {
    this.key = key;
}

function Model(json_path) {
    this._data = null;
    this._json_path = json_path;
}

Model.prototype = {
    load_json: function()  {
        this._data = JSON.parse(fs.readFileSync(this._json_path).toString());
    },
    write_json: function()  {
        fs.writeFileSync(this._json_path, JSON.stringify(this._data));
    },
    get: function(id)  {
        this.load_json();
        let data = this._data[id] || undefined;
        if (typeof data === undefined) throw new NotFoundError(id);
        return data;
    },
    update: function(id, new_val) {
        let data = this.get(id); // only to check if user exist
        this._data[id] = new_val;
        this.write_json();
    },
    insert: function(new_val)  {
        this.load_json();
        this._data.push(new_val);
        this.write_json();
    },
    find_one: function (key, value) {
        this.load_json();
        let index = this.find_one_index(key, value);
        return this._data[index];
    },
    find_one_index: function(key, value) {
        this.load_json();
        let index = this._data.findIndex((obj) => (obj[key] === value));
        if (index < 0) throw new NotFoundError({key: key, value: value});
        return index;
    },
}

function User() {
    Model.call(this, "./data/users.json");
}

User.prototype = Object.create(Model.prototype);
User.prototype.constructor = User;

module.exports.User = new User();
module.exports.NotFoundError = NotFoundError;