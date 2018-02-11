var websocket;

function puppeteerInit()
{
    generatedDialFn();
    generatedResizeFn();
    generatedGraphFn();
    generatedInputHandlerFn();

    $( ".ui-sortable" ).sortable();
    
    $( ".ui-sortable" ).disableSelection();

    $(".dropwdowns").selectmenu();
    
    $('.icheck').each(function(){
        var self = $(this),
        label = self.next(),
        label_text = label.text();
    
        label.remove();
        self.iCheck({
        checkboxClass: 'icheckbox_line-blue',
        radioClass: 'iradio_line-blue',
        insert: '<div class="icheck_line-icon"></div>' + label_text
        });

        self.on('ifChecked', function(event) {
            generatedCheckFunction(event);
        });
    });

    $(".tabs").tabs();

    //var es = new EventSource("/sse");
    //es.addEventListener("Connect", (ev) => { generatedConnectFn(ev.data) } );
    //es.addEventListener("Update", (ev) => { generatedUpdateFn(ev.data) } );
    
    var loc = window.location, new_uri;
    if (loc.protocol === "https:") {
        new_uri = "wss:";
    } else {
        new_uri = "ws:";
    }
    new_uri += "//" + loc.host;
    new_uri += loc.pathname + "wsevents";

    websocket = new WebSocket(new_uri);

    websocket.onerror = function(event) {
        //alert(event);
    };

    websocket.onopen = function(event) {
        console.log(event);
    };

    websocket.onmessage = (event) => {
        obj = $.parseJSON(event.data);
        switch(obj.type)
        {
            case "connect":
                generatedConnectFn(obj);
                break;
            case "update":
                generatedUpdateFn(obj);
                break;
        }
    };
    
    //TODO: remove this code, this is to drive the inputs on a timer.
    //window.setInterval(timer, 1000);
    //window.setInterval(history_timer, 200);
}

//TODO: remove this code, this is to drive the inputs on a timer.
function timer()
{
    var val = Math.floor((Math.random() * 10) + 1);
    $( ".randval" ).html(function ()
        {
            return val;
        }
    );

    dialVal = val * 5 + 25;
    $( "#roslide" ).val(dialVal).trigger('change');;

    if(val > 5)
    {
        $( "#rochk" ).removeClass("toggle-false");
        $( "#rochk" ).addClass("toggle-true");
    }
    else
    {
        $( "#rochk" ).removeClass("toggle-true");
        $( "#rochk" ).addClass("toggle-false");
    }
}

function history_timer()
{
    if (historyData.length > 0)
        historyData = historyData.slice(1);
        lastHistoryX += (2*Math.PI)/100;
        historyData.push([lastHistoryX, Math.sin(lastHistoryX) + 1]);
        historyPlot.setData([historyData]);
        historyPlot.setupGrid();
        historyPlot.draw();
        
}