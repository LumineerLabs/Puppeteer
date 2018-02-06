var puppeteer = require("./puppeteer");

puppeteer.init();

// app specific stuff goes here!
var lastHistoryX = 0;

setInterval(() => {
    // update numbers
    puppeteer.generated.data["rotxt"].value = Math.floor((Math.random() * 10) + 1);
    puppeteer.generated.data["rochk"].value = Math.random() > .5;

    var roll = Math.random();
    if(roll > .75)
    {
        puppeteer.generated.data["roradio"].value = puppeteer.generated.RORADIOVALS.roradio_3;
    }
    else if(roll > .5)
    {
        puppeteer.generated.data["roradio"].value = puppeteer.generated.RORADIOVALS.roradio_2;
    }
    else if(roll > .25)
    {
        puppeteer.generated.data["roradio"].value = puppeteer.generated.RORADIOVALS.roradio_1;
    }
    else
    {
        puppeteer.generated.data["roradio"].value = puppeteer.generated.RORADIOVALS.roradio_1;
    }

    puppeteer.generated.data["roslide"].value = Math.floor((Math.random() * 75) + 25);

}, 1000);

setInterval(() => {
    // update history
    lastHistoryX += (2*Math.PI)/100;
    puppeteer.generated.data["history"].value = Math.sin(lastHistoryX) + 1;
}, 200);