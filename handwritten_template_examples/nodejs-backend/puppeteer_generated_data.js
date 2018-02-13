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

exports.DROPVALS = 
{
    drop1: "drop1",
    drop2: "drop2",
    drop3: "drop3",
    drop4: "drop4"
}

var wsclients = [];

exports.init = function(app)
{
    // load the defaults, the application should overwrite these after this function, if values are persisted
    // server -> client
    var chroma = require("chroma-js");
    module.exports.data = {
        tab1: {
            Group1: {
                rotxt: data_model.Datum(5, (val) => 
                {
                    var obj = {
                        tab1: {
                            Group1: {
                                rotxt: val
                            }
                        }
                    }
                    for(var i in wsclients)
                    {
                        if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
                    }
                }),
                rochk: data_model.Datum(true, (val) => 
                {
                    var obj = {
                        tab1: {
                            Group1: {
                                rochk: val
                            }
                        }
                    }
                    for(var i in wsclients)
                    {
                        if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
                    }
                }),
                roradio: data_model.Datum(module.exports.RORADIOVALS.roradio_3, (val) => 
                {
                    var obj = {
                        tab1: {
                            Group1: {
                                roradio: val
                            }
                        }
                    }
                    for(var i in wsclients)
                    {
                        if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
                    }
                }),
                roslide: data_model.Datum(80, (val) => 
                {
                    var obj = {
                        tab1: {
                            Group1: {
                                roslide: val
                            }
                        }
                    }
                    for(var i in wsclients)
                    {
                        if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
                    }
                }),
                rwtxt: data_model.Datum("", (val) => 
                {
                    var obj = {
                        tab1: {
                            Group1: {
                                rwtxt: val
                            }
                        }
                    }
                    for(var i in wsclients)
                    {
                        if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
                    }
                }),
                rwchk: data_model.Datum(true, (val) => 
                {
                    var obj = {
                        tab1: {
                            Group1: {
                                rwchk: val
                            }
                        }
                    }
                    for(var i in wsclients)
                    {
                        if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
                    }
                }),
                rwradio: data_model.Datum(module.exports.RWRADIOVALS.rwradio_0, (val) => 
                {
                    var obj = {
                        tab1: {
                            Group1: {
                                rwradio: val
                            }
                        }
                    }
                    for(var i in wsclients)
                    {
                        if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
                    }
                }),
                rwslide: data_model.Datum(5.5, (val) => 
                {
                    var obj = {
                        tab1: {
                            Group1: {
                                rwslide: val
                            }
                        }
                    }
                    for(var i in wsclients)
                    {
                        if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
                    }
                }),
            },
            Group2: {
                history: data_model.HistoryData(0, 100, (val) => 
                {
                    var obj = {
                        tab1: {
                            Group2: {
                                history: [val]
                            }
                        }
                    }
                    for(var i in wsclients)
                    {
                        if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
                    }
                }),
                drop: data_model.Datum(module.exports.DROPVALS.drop3, (val) =>
                {
                    var obj = {
                        tab1: {
                            Group2: {
                                drop: val
                            }
                        }
                    }
                    for(var i in wsclients)
                    {
                        if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
                    }
                }),
            },
        },
        tab2: {
            subtab1: {
                multihistory0: data_model.HistoryData(0, 100, (val) => 
                {
                    var obj = {
                        tab2: {
                            subtab1: {
                                multihistory0: [val]
                            }
                        }
                    }
                    for(var i in wsclients)
                    {
                        if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
                    }
                }),
                multihistory1:  data_model.HistoryData(0, 100, (val) => 
                {
                    var obj = {
                        tab2: {
                            subtab1: {
                                multihistory1: [val]
                            }
                        }
                    }
                    for(var i in wsclients)
                    {
                        if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
                    }
                }),
                multihistory2: data_model.HistoryData(0, 100, (val) => 
                {
                    var obj = {
                        tab2: {
                            subtab1: {
                                multihistory2: [val]
                            }
                        }
                    }
                    for(var i in wsclients)
                    {
                        if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
                    }
                }),
            },
            subtab2: {
                roclr: data_model.Datum(chroma('red'), (val) => 
                {
                    var obj = {
                        tab2: {
                            subtab2: {
                                roclr: val.hex()
                            }
                        }
                    }
                    for(var i in wsclients)
                    {
                        if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
                    }
                }),
                rwclr: data_model.Datum(chroma('red'), (val) => 
                {
                    var obj = {
                        tab2: {
                            subtab2: {
                                rwclr: val.hex()
                            }
                        }
                    }
                    for(var i in wsclients)
                    {
                        if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
                    }
                }),
            },
            subtab3: {
                Subpage1: {
                    roslide: data_model.Datum(15, (val) =>
                    {
                        var obj = {
                            tab2: {
                                subtab3: {
                                    Subpage1: {
                                        roslide: val
                                    }
                                }
                            }
                        }
                        for(var i in wsclients)
                        {
                            if(wsclients[i].readyState===wsclients[i].OPEN) wsclients[i].send(JSON.stringify(obj));
                        }
                    }),
                },
            },
        },  
    }

    var expressWs = require('express-ws')(app);

    app.ws('/wsevents', function (ws, req) {        
        wsclients.push(ws);
        console.log("new wsclient!");

        var data = {
            tab1: {
                Group1: {
                    rotxt: module.exports.data.tab1.Group1.rotxt.value,
                    rochk: module.exports.data.tab1.Group1.rochk.value,
                    roradio: module.exports.data.tab1.Group1.roradio.value,
                    roslide: module.exports.data.tab1.Group1.roslide.value,
                    rwtxt: module.exports.data.tab1.Group1.rwtxt.value,
                    rwchk: module.exports.data.tab1.Group1.rwchk.value,
                    rwradio: module.exports.data.tab1.Group1.rwradio.value,
                    rwslide: module.exports.data.tab1.Group1.rwslide.value,
                },
                Group2: {
                    drop: module.exports.data.tab1.Group2.drop.value,  
                    history: module.exports.data.tab1.Group2.history.history,
                }
            },
            tab2: {
                subtab1: {
                    multihistory0: module.exports.data.tab2.subtab1.multihistory0.history, 
                    multihistory1: module.exports.data.tab2.subtab1.multihistory1.history, 
                    multihistory2: module.exports.data.tab2.subtab1.multihistory2.history,
                },
                subtab2: {
                    roclr: module.exports.data.tab2.subtab2.roclr.value.hex(),
                    rwclr: module.exports.data.tab2.subtab2.rwclr.value.hex(),
                },
                subtab3: {
                    Subpage1: {
                        roslide: module.exports.data.tab2.subtab3.Subpage1.roslide.value,
                    },
                },
            },
        };

        ws.send(JSON.stringify(data));

        ws.on('message', function(msg) {
            var obj = JSON.parse(msg);

            if(typeof obj.tab1 !== 'undefined')
            {
                if(typeof obj.tab1.Group1 !== 'undefined')
                {
                    console.log(obj);
                    if(typeof obj.tab1.Group1.rwtxt !== 'undefined') 
                    {
                        module.exports.data.tab1.Group1.rwtxt.value = obj.tab1.Group1.rwtxt;
                    }
                    if(typeof obj.tab1.Group1.rwchk !== 'undefined')
                    {
                        module.exports.data.tab1.Group1.rwchk.value = obj.tab1.Group1.rwchk;
                    }
                    if(typeof obj.tab1.Group1.rwradio !== 'undefined')
                    {
                        module.exports.data.tab1.Group1.rwradio.value = obj.tab1.Group1.rwradio;
                    }
                    if(typeof obj.tab1.Group1.rwslide !== 'undefined')
                    {
                        module.exports.data.tab1.Group1.rwslide.value = obj.tab1.Group1.rwslide;
                    }
                }
                if(typeof obj.tab1.Group2 !== 'undefined')
                {
                    if(typeof obj.tab1.Group2.drop !== 'undefined')
                    {
                        module.exports.data.tab1.Group2.drop.value = obj.tab1.Group2.drop;
                    }
                }
            }
            if(typeof obj.tab2 !== 'undefined')
            {
                if(typeof obj.tab2.subtab2 !== 'undefined')
                {
                    if(typeof obj.tab2.subtab2.rwclr !== 'undefined')
                    {
                        module.exports.data.tab2.subtab2.rwclr.value = chroma(obj.tab2.subtab2.rwclr);
                    }
                }
            }
        });

        ws.on('close', () => {
            console.log("Bye wsclient!");
            wsclients.splice(wsclients.indexOf(ws), 1);
        });
    });
}