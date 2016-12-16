var Handlebars = require('handlebars-template-loader/runtime');

Handlebars.registerHelper("round", function (value, symbols) {
    var x = Math.pow(10, symbols);
    return Math.round(value * x) / x;
});