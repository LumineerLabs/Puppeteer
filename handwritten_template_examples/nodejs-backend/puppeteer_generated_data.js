const data_model = require("./puppeteer_data_model");
const SSE = require("sse-node");

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

var clients = [];

exports.init = function(app)
{
    // load the defaults, the application should overwrite these after this function, if values are persisted
    // server -> client
    module.exports.data = new Map();
    module.exports.data["history"] = data_model.HistoryData(0, 100, (val) => 
    {
        var obj = {
            id: "history",
            history: val
        }
        for(var i in clients)
        {
            clients[i].send(obj, "Update");
        }
    });
    module.exports.data["rotxt"] = data_model.Datum(5, (val) => 
    {
        var obj = {
            id: "rotxt",
            rotxt: val
        }
        for(var i in clients)
        {
            clients[i].send(obj, "Update");
        }
    });
    module.exports.data["rochk"] = data_model.Datum(true, (val) => 
    {
        var obj = {
            id: "rochk",
            rochk: val
        }
        for(var i in clients)
        {
            clients[i].send(obj, "Update");
        }
    });
    module.exports.data["roradio"] = data_model.Datum(module.exports.RORADIOVALS.roradio_3, (val) => 
    {
        var obj = {
            id: "roradio",
            roradio: val
        }
        for(var i in clients)
        {
            clients[i].send(obj, "Update");
        }
    });
    module.exports.data["roslide"] = data_model.Datum(80, (val) => 
    {
        var obj = {
            id: "roslide",
            roslide: val
        }
        for(var i in clients)
        {
            clients[i].send(obj, "Update");
        }
    });

    // client -> server
    module.exports.data["rwtxt"] = data_model.Datum("", (val) => 
    {
        var obj = {
            id: "rwtxt",
            rwtxt: val
        }
        for(var i in clients)
        {
            clients[i].send(obj, "Update");
        }
    });
    module.exports.data["rwchk"] = data_model.Datum(true, (val) => 
    {
        var obj = {
            id: "rwchk",
            rwchk: val
        }
        for(var i in clients)
        {
            clients[i].send(obj, "Update");
        }
    });
    module.exports.data["rwradio"] = data_model.Datum(module.exports.RWRADIOVALS.rwradio_0, (val) => 
    {
        var obj = {
            id: "rwradio",
            rwradio: val
        }
        for(var i in clients)
        {
            clients[i].send(obj, "Update");
        }
    });
    module.exports.data["rwslide"] = data_model.Datum(5.5, (val) => 
    {
        var obj = {
            id: "rwslide",
            rwslide: val
        }
        for(var i in clients)
        {
            clients[i].send(obj, "Update");
        }
    });

    app.get("/sse", (req, res) => {
        const client = SSE(req, res);

        // send all current data
        // add individual elements
        var data = {
            history: module.exports.data["history"].history,
            rotxt: module.exports.data["rotxt"].value,
            rochk: module.exports.data["rochk"].value,
            roradio: module.exports.data["roradio"].value,
            roslide: module.exports.data["roslide"].value,
            rwtxt: module.exports.data["rwtxt"].value,
            rwchk: module.exports.data["rwchk"].value,
            rwradio: module.exports.data["rwradio"].value,
            rwslide: module.exports.data["rwslide"].value
        }

        client.send(data, "Connect");

        clients.push(client);
        
        client.onClose(() => {
            console.log("Bye client!");
            clients.splice(clients.indexOf(client), 1);
        });
    });
}