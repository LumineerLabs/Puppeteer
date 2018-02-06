const express = require("express");

var generated = require("./puppeteer_generated_data");

exports.init = function()
{
    module.exports.generated = generated;
    var app = express();

    app.use(express.static('../static-frontend'));

    generated.init(app);

    app.listen(80);
}