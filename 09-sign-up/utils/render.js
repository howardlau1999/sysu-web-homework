const fs = require("fs");
module.exports = (template_path, data, callback) => {
    let reg = /\{\{(\w+)\}\}/g;
    let template = fs.readFileSync(template_path).toString();
    let rendered = template.replace(reg, (_, key) => (data[key] || ""));
    return rendered;
}
