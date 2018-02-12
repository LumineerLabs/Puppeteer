const data_model = require("./puppeteer_data_model");

// enum values
exports.RWRADIOVALS = 
{
    rwradio_0: "rwradio_0",
    rwradio_1: "rwradio_1",
    rwradio_2: "rwradio_2",
    rwradio_3: "rwradio_3"
}

exports.RORADIOVALS = 
{
    roradio_0: "roradio_0",
    roradio_1: "roradio_1",
    roradio_2: "roradio_2",
    roradio_3: "roradio_3"
}

var wsclients = [];

exports.init = function(app)
{
    // load the defaults, the application should overwrite these after this function, if values are persisted
    // server -> client
    var chroma = require("chroma-js");
    module.exports.data = new Map();
    module.exports.data["tab1"] = new Map();
    module.exports.data["tab2"] = new Map();
    module.exports.data["tab1"]["Group1"] = new Map();
    module.exports.data["tab1"]["Group2"] = new Map();
    module.exports.data["tab2"]["subtab1"] = new Map();
    module.exports.data["tab2"]["subtab2"] = new Map();
    module.exports.data["tab2"]["subtab3"] = new Map();
    module.exports.data["tab2"]["subtab3"]["Subpage1"] = new Map();

    module.exports.data["tab1"]["Group2"]["history"] = data_model.HistoryData(0, 100, (val) => 
    {
        var obj = {
            type: "update",
            id: "history",
            history: val
        }
        for(var i in wsclients)
        {
            if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
        }
    });
    module.exports.data["tab2"]["subtab1"]["multihistory0"] = data_model.HistoryData(0, 100, (val) => 
    {
        var obj = {
            type: "update",
            id: "multihistory0",
            multihistory0: val
        }
        for(var i in wsclients)
        {
            if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
        }
    });
    module.exports.data["tab2"]["subtab1"]["multihistory1"] = data_model.HistoryData(0, 100, (val) => 
    {
        var obj = {
            type: "update",
            id: "multihistory1",
            multihistory1: val
        }
        for(var i in wsclients)
        {
            if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
        }
    });
    module.exports.data["tab2"]["subtab1"]["multihistory2"] = data_model.HistoryData(0, 100, (val) => 
    {
        var obj = {
            type: "update",
            id: "multihistory2",
            multihistory2: val
        }
        for(var i in wsclients)
        {
            if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
        }
    });
    module.exports.data["tab1"]["Group1"]["rotxt"] = data_model.Datum(5, (val) => 
    {
        var obj = {
            type: "update",
            id: "rotxt",
            rotxt: val
        }
        for(var i in wsclients)
        {
            if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
        }
    });
    module.exports.data["tab1"]["Group1"]["rochk"] = data_model.Datum(true, (val) => 
    {
        var obj = {
            type: "update",
            id: "rochk",
            rochk: val
        }
        for(var i in wsclients)
        {
            if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
        }
    });
    module.exports.data["tab1"]["Group1"]["roradio"] = data_model.Datum(module.exports.RORADIOVALS.roradio_3, (val) => 
    {
        var obj = {
            type: "update",
            id: "roradio",
            roradio: val
        }
        for(var i in wsclients)
        {
            if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
        }
    });
    module.exports.data["tab1"]["Group1"]["roslide"] = data_model.Datum(80, (val) => 
    {
        var obj = {
            type: "update",
            id: "roslide",
            roslide: val
        }
        for(var i in wsclients)
        {
            if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
        }
    });

    // client -> server
    module.exports.data["tab1"]["Group1"]["rwtxt"] = data_model.Datum("", (val) => 
    {
        var obj = {
            type: "update",
            id: "rwtxt",
            rwtxt: val
        }
        for(var i in wsclients)
        {
            if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
        }
    });
    module.exports.data["tab1"]["Group1"]["rwchk"] = data_model.Datum(true, (val) => 
    {
        var obj = {
            type: "update",
            id: "rwchk",
            rwchk: val
        }
        for(var i in wsclients)
        {
            if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
        }
    });
    module.exports.data["tab1"]["Group1"]["rwradio"] = data_model.Datum(module.exports.RWRADIOVALS.rwradio_0, (val) => 
    {
        var obj = {
            type: "update",
            id: "rwradio",
            rwradio: val
        }
        for(var i in wsclients)
        {
            if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
        }
    });
    module.exports.data["tab1"]["Group1"]["rwslide"] = data_model.Datum(5.5, (val) => 
    {
        var obj = {
            type: "update",
            id: "rwslide",
            rwslide: val
        }
        for(var i in wsclients)
        {
            if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
        }
    });
    module.exports.data["tab2"]["subtab2"]["roclr"] = data_model.Datum(chroma('red'), (val) => 
    {
        var obj = {
            type: "update",
            id: "roclr",
            roclr: val.hex()
        }
        for(var i in wsclients)
        {
            if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
        }
    });
    module.exports.data["tab2"]["subtab2"]["rwclr"] = data_model.Datum(chroma('red'), (val) => 
    {
        var obj = {
            type: "update",
            id: "rwoclr",
            rwclr: val.hex()
        }
        for(var i in wsclients)
        {
            if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
        }
    });

    var expressWs = require('express-ws')(app);

    app.ws('/wsevents', function (ws, req) {        
        wsclients.push(ws);
        console.log("new wsclient!");

        var data = {
            type: "connect",
            history: module.exports.data["tab1"]["Group2"]["history"].history,
            multihistory: [module.exports.data["tab2"]["subtab1"]["multihistory0"].history, 
                           module.exports.data["tab2"]["subtab1"]["multihistory1"].history, 
                           module.exports.data["tab2"]["subtab1"]["multihistory2"].history],
            rotxt: module.exports.data["tab1"]["Group1"]["rotxt"].value,
            rochk: module.exports.data["tab1"]["Group1"]["rochk"].value,
            roradio: module.exports.data["tab1"]["Group1"]["roradio"].value,
            roslide: module.exports.data["tab1"]["Group1"]["roslide"].value,
            rwtxt: module.exports.data["tab1"]["Group1"]["rwtxt"].value,
            rwchk: module.exports.data["tab1"]["Group1"]["rwchk"].value,
            rwradio: module.exports.data["tab1"]["Group1"]["rwradio"].value,
            rwslide: module.exports.data["tab1"]["Group1"]["rwslide"].value,
            roclr: module.exports.data["tab2"]["subtab2"]["roclr"].value.hex(),
            rwclr: module.exports.data["tab2"]["subtab2"]["rwclr"].value.hex()
        }

        ws.send(JSON.stringify(data));

        ws.on('message', function(msg) {
            var obj = JSON.parse(msg);

            if(typeof obj.rwtxt !== 'undefined') module.exports.data["tab1"]["Group1"]["rwtxt"].value = obj.rwtxt;
            if(typeof obj.rwchk !== 'undefined') module.exports.data["tab1"]["Group1"]["rwchk"].value = obj.rwchk;
            if(typeof obj.rwradio !== 'undefined') module.exports.data["tab1"]["Group1"]["rwradio"].value = obj.rwradio;
            if(typeof obj.rwslide !== 'undefined') module.exports.data["tab1"]["Group1"]["rwslide"].value = obj.rwslide;
            if(typeof obj.rwclr !== 'undefined') module.exports.data["tab2"]["subtab2"]["rwclr"].value = chroma(obj.rwclr);
        });

        ws.on('close', () => {
            console.log("Bye wsclient!");
            wsclients.splice(wsclients.indexOf(ws), 1);
        });
    });
}