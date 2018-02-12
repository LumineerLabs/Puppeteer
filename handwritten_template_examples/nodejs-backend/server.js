var puppeteer = require("./puppeteer");
var chroma = require("chroma-js");

puppeteer.init();

if (!String.prototype.format) {
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
      });
    };
  }

// app specific stuff goes here!
var lastHistoryX = 0;

setInterval(() => {
    // update numbers
    puppeteer.generated.data["tab1"]["Group1"]["rotxt"].value = Math.floor((Math.random() * 10) + 1);
    puppeteer.generated.data["tab1"]["Group1"]["rochk"].value = Math.random() > .5;

    var roll = Math.random();
    if(roll > .75)
    {
        puppeteer.generated.data["tab1"]["Group1"]["roradio"].value = puppeteer.generated.RORADIOVALS.roradio_3;
    }
    else if(roll > .5)
    {
        puppeteer.generated.data["tab1"]["Group1"]["roradio"].value = puppeteer.generated.RORADIOVALS.roradio_2;
    }
    else if(roll > .25)
    {
        puppeteer.generated.data["tab1"]["Group1"]["roradio"].value = puppeteer.generated.RORADIOVALS.roradio_1;
    }
    else
    {
        puppeteer.generated.data["tab1"]["Group1"]["roradio"].value = puppeteer.generated.RORADIOVALS.roradio_1;
    }

    puppeteer.generated.data["tab1"]["Group1"]["roslide"].value = Math.floor((Math.random() * 75) + 25);

    puppeteer.generated.data["tab2"]["subtab2"]["roclr"].value = chroma.random();

    console.log("rwtxt: {0}\trwchk: {1}\trwradio: {2}\trwslide: {3}\trwclr: {4}".format(puppeteer.generated.data["tab1"]["Group1"]["rwtxt"].value,
                                                                                        puppeteer.generated.data["tab1"]["Group1"]["rwchk"].value,
                                                                                        puppeteer.generated.data["tab1"]["Group1"]["rwradio"].value,
                                                                                        puppeteer.generated.data["tab1"]["Group1"]["rwslide"].value,
                                                                                        puppeteer.generated.data["tab2"]["subtab2"]["rwclr"].value.hex()));

}, 1000);

setInterval(() => {
    // update history
    lastHistoryX += (2*Math.PI)/100;
    puppeteer.generated.data["tab1"]["Group2"]["history"].value = Math.sin(lastHistoryX) + 1;
    puppeteer.generated.data["tab2"]["subtab1"]["multihistory0"].value = Math.sin(lastHistoryX + Math.PI / 4) + 1;
    puppeteer.generated.data["tab2"]["subtab1"]["multihistory1"].value = Math.sin(lastHistoryX + Math.PI / 2) + 1;
    puppeteer.generated.data["tab2"]["subtab1"]["multihistory2"].value = Math.sin(lastHistoryX + 3 * Math.PI / 4) + 1;
}, 200);