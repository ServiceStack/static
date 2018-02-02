//Usage: node gen.js > static.js

const fs = require("fs");

var tpl = `(function(){
    var root = this;

    var HEROS = [HEROS];
    var baseUrl = "https://servicestack.github.io/static/";
    var daysCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    function dayOfYear(d) {
        return daysCount[d.getMonth()] + d.getDate();
    };
    function hourOfYear(d) {
        return dayOfYear(d) * 24 + d.getHours();
    }
    function hashCode(s){
        if (!s)
            return 0;
        if (typeof s != 'string')
            s = s.toString();
        var hash = 0;
        for (var i = 0; i < s.length; i++) {
            var c = s.charCodeAt(i);
            hash = ((hash<<5)-hash)+c;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }
    var $static = {
        baseUrl: baseUrl,
        heros: HEROS,
        getRandomHero: function() {
            return baseUrl + "hero/" + HEROS[Math.floor(Math.random() * HEROS.length)];
        },
        getActiveHero: function(d) {
            return baseUrl + "hero/" + HEROS[hourOfYear(d || new Date()) % HEROS.length];
        },
        getStaticHero: function(str, modifier) {
            return baseUrl + "hero/" + HEROS[(hashCode(str) + (modifier || 0)) % HEROS.length];
        }
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = $static;
        }
        exports = $static;
    } else {
        root.$static = $static;
    }
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
