//Usage: node gen.js > static.js

const fs = require("fs");

var tpl = `window.$static = (function(){
    var HEROS = [HEROS];
    var baseUrl = "https://servicestack.github.io/static/";
    var daysCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    function dayOfYear(d) {
        return daysCount[d.getMonth()] + d.getDate();
    };
    function hourOfYear(d) {
        return dayOfYear(d) * 24 + d.getHours();
    }
    return {
        baseUrl: baseUrl,
        heros: HEROS,
        getRandomHero: function() {
            return baseUrl + "hero/" + HEROS[Math.floor(Math.random() * HEROS.length)];
        },
        getActiveHero: function(d) {
            return baseUrl + "hero/" + HEROS[hourOfYear(d || new Date()) % HEROS.length];
        }
    };
})();`

var HEROS = "[";

const items = fs.readdirSync("hero");

for (var i=0; i<items.length; i++) {
    if (items[i].endsWith(".js"))
        continue;

    if (i > 0)
    HEROS += ',\n';

    HEROS += `"${items[i]}"`;
}

HEROS += "]";

var js = tpl.replace("[HEROS]", HEROS);

console.log(js);
