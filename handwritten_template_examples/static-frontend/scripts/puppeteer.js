function puppeteerInit()
{
    generatedDialFn();
    generatedResizeFn();
    generatedGraphFn();

    $( ".ui-sortable" ).sortable();
    
    $( ".ui-sortable" ).disableSelection();
    
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

    var es = new EventSource("/sse");
    es.addEventListener("Connect", (ev) => { generatedConnectFn(ev.data) } );
    es.addEventListener("Update", (ev) => { generatedUpdateFn(ev.data) } );
    ///ev.addEventListener("eventName", function)
    /*es.onmessage = function(ev) {
        alert(ev.data); //will output 'Hello world!' 
    };*/
    
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