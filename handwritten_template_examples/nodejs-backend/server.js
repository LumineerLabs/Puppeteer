const SSE = require("sse-node"),
      express = require("express"),
      sleep = require("sleep");

var app = express();

app.use(express.static('../static-frontend'));

var lastHistoryX = 0;

app.get("/sse", (req, res) => {
    const client = SSE(req, res);
    var running = true;

    // send all current data
    // build history
    var historyData = [];
    for(var i = 0; i < 2 * Math.PI; i+= (2*Math.PI)/100)
    {
        historyData.push([i, Math.sin(i) + 1]);
        lastHistoryX = i;
    }
    // add individual elements
    var data = {
        history: historyData,
        rotxt: 5,
        rochk: false,
        roradio: "roradio_2",
        roslide: 80
    }

    client.send(data, "Connect");
    
    client.onClose(() => {
        console.log("Bye client!");
        running = false;
    });

    setInterval(() => {
        // update numbers
        var obj = {
            id: "rotxt",
            rotxt: Math.floor((Math.random() * 10) + 1)
        }
        client.send(obj, "Update");

        obj = {
            id: "rochk",
            rochk: Math.random() > .5
        }
        client.send(obj, "Update");

        obj = {
            id: "roradio",
            roradio: null
        }
        var roll = Math.random();
        if(roll > .75)
        {
            obj.roradio = "roradio_3";
        }
        else if(roll > .5)
        {
            obj.roradio = "roradio_2";
        }
        else if(roll > .25)
        {
            obj.roradio = "roradio_1";
        }
        else
        {
            obj.roradio = "roradio_0";
        }
        client.send(obj, "Update");

        obj = {
            id: "roslide",
            roslide: Math.floor((Math.random() * 75) + 25)
        }
        roslide: 80
        client.send(obj, "Update");
    }, 1000);

    setInterval(() => {
        // update history
        lastHistoryX += (2*Math.PI)/100;
        var obj = {
            id: "history",
            history: [lastHistoryX, Math.sin(lastHistoryX) + 1]
        }
        client.send(obj, "Update");
    }, 200);
});

app.listen(80);