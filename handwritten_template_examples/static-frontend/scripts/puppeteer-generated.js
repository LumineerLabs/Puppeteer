// WARNING: This file is automatically generated by puppeteer. Any modifications made by hand will be lost if the generator is run again.
function generatedResizeFn()
{
    initResizable($("#tab1\\.Group1\\.rotxt_div"));
    initResizable($("#tab1\\.Group1\\.rwtxt_div"));
    initResizable($("#tab1\\.Group1\\.rwchk_div"));
    initResizable($("#tab1\\.Group1\\.roradio_div"));
    initResizable($("#tab1\\.Group1\\.rwradio_div"));
    initResizable($("#tab1\\.Group1\\.roslide_div"));
    initResizable($("#tab1\\.Group1\\.rwslide_div"));
    initResizable($("#tab2\\.subtab2\\.roclr_div"));
    initResizable($("#tab2\\.subtab2\\.rwclr_div"));
    initResizable($("#tab1\\.Group2\\.history_div"), 600, 1/3);
    initResizable($("#tab2\\.subtab1\\.multihistory_div"), 600, 1/3);
    $( ".tabs" ).css('height','auto');
}

function generatedDialFn()
{
  initDial($("#tab1\\.Group1\\.roslide"), 25, 100, 1, true);
  initDial($("#tab1\\.Group1\\.rwslide"), 0, 30, .1, false, function (v) { 
    var obj = {
      tab1: {
        Group1: {
          rwslide: v
        }
      }
    };
    websocket.send(JSON.stringify(obj));
  });
}

function generatedGraphFn()
{
  historyPlot = initHistory($("#tab1\\.Group2\\.history"), historyData, 2, ["#33b5e5"]);
  multiHistoryPlot = initHistory($("#tab2\\.subtab1\\.multihistory"), multiHistoryData);
}

function updatePlot(plot, data, index, newData)
{
  if (data[index].data.length > 0)
  {
    data[index].data = data[index].data.slice(newData.length);
    data[index].data = data[index].data.concat(newData);
  }
  else
    data[index].data = newData;
  plot.setData(data);
  plot.setupGrid();
  plot.draw();
}

function generatedUpdateFn(obj)
{
  if(typeof obj.tab1 !== 'undefined')
  {
    if(typeof obj.tab1.Group1 !== 'undefined')
    {
      if(typeof obj.tab1.Group1.rotxt !== 'undefined') 
      {
        $("#tab1\\.Group1\\.rotxt").html(obj.tab1.Group1.rotxt);
      }
      if(typeof obj.tab1.Group1.rwtxt !== 'undefined') 
      {
        $("#tab1\\.Group1\\.rwtxt").html(obj.tab1.Group1.rwtxt);
      }
      if(typeof obj.tab1.Group1.rwchk !== 'undefined')
      {
        if(obj.tab1.Group1.rwchk)
        {
          $( "#tab1\\.Group1\\.rwchk" ).removeClass("toggle-false");
          $( "#tab1\\.Group1\\.rwchk" ).addClass("toggle-true");
        }
        else
        {
          $( "#tab1\\.Group1\\.rwchk" ).removeClass("toggle-true");
          $( "#tab1\\.Group1\\.rwchk" ).addClass("toggle-false");
        }
      }
      if(typeof obj.tab1.Group1.rochk !== 'undefined')
      {
        if(obj.tab1.Group1.rochk)
        {
          $( "#tab1\\.Group1\\.rochk" ).removeClass("toggle-false");
          $( "#tab1\\.Group1\\.rochk" ).addClass("toggle-true");
        }
        else
        {
          $( "#tab1\\.Group1\\.rochk" ).removeClass("toggle-true");
          $( "#tab1\\.Group1\\.rochk" ).addClass("toggle-false");
        }
      }
      if(typeof obj.tab1.Group1.rwradio !== 'undefined')
      {
        $( "#tab1\\.Group1\\." + obj.tab1.Group1.rwradio ).iCheck('check');
      }
      if(typeof obj.tab1.Group1.roradio !== 'undefined')
      {
        $( "#tab1\\.Group1\\." + obj.tab1.Group1.roradio ).iCheck('check');
      }
      if(typeof obj.tab1.Group1.rwslide !== 'undefined')
      {
        $( "#rswlide" ).val(obj.tab1.Group1.rwslide).trigger('change');
      }
      if(typeof obj.tab1.Group1.roslide !== 'undefined')
      {
        $( "#tab1\\.Group1\\.roslide" ).val(obj.tab1.Group1.roslide).trigger('change');
      }
    }
    if(typeof obj.tab1.Group2 !== 'undefined')
    {
      if(typeof obj.tab1.Group2.drop !== 'undefined')
      {
        $('#tab1\\.Group2\\.drop').val(obj.tab1.Group2.drop);
        $("#tab1\\.Group2\\.drop").selectmenu("refresh");
      }
      if(typeof obj.tab1.Group2.history !== 'undefined')
      {
        updatePlot(historyPlot, historyData, 0, obj.tab1.Group2.history);
      }
    }
  }
  if(typeof obj.tab2 !== 'undefined')
  {
    if(typeof obj.tab2.subtab1 !== 'undefined')
    {
      if(typeof obj.tab2.subtab1.multihistory0 !== 'undefined')
      {
        updatePlot(multiHistoryPlot, multiHistoryData, 0, obj.tab2.subtab1.multihistory0);
      }
      if(typeof obj.tab2.subtab1.multihistory1 !== 'undefined')
      {
        updatePlot(multiHistoryPlot, multiHistoryData, 1, obj.tab2.subtab1.multihistory1);
      }
      if(typeof obj.tab2.subtab1.multihistory2 !== 'undefined')
      {
        updatePlot(multiHistoryPlot, multiHistoryData, 2, obj.tab2.subtab1.multihistory2);
      }
    }
    if(typeof obj.tab2.subtab2 !== 'undefined')
    {
      if(typeof obj.tab2.subtab2.roclr !== 'undefined')
      {
        $( "#tab2\\.subtab2\\.roclr" ).css('background', obj.tab2.subtab2.roclr);
      }
      if(typeof obj.tab2.subtab2.rwclr !== 'undefined')
      {
        $("rwclr").colpickSetColor(obj.tab2.subtab2.rwclr);
      }
    }
  }
}

var historyData = [{data: []}];
var lastHistoryX = 2*Math.PI;
var historyPlot = null;

var multiHistoryData = [{data: []},{data: []},{data: []}];
var multiHistoryPlot = null;

function fetchHistoryData()
{
  for(var i = 0; i < 2 * Math.PI; i+= (2*Math.PI)/100)
  {
    historyData.push([i, Math.sin(i) + 1]);
  }
  return historyData;
}

function generatedInputHandlerFn()
{
  $("#tab1\\.Group1\\.rwtxt").change(function()
  {
    var obj = {
      tab1: {
        Group1: {
          rwtxt: $("#tab1\\.Group1\\.rwtxt")[0].value
        }
      }      
    };
    websocket.send(JSON.stringify(obj));
  });

  $("#tab1\\.Group1\\.rwchk").change(function()
  {
    var obj = {
      tab1: {
        Group1: {
          rwchk: $("#tab1\\.Group1\\.rwchk")[0].checked
        }
      }
    };
    websocket.send(JSON.stringify(obj));
  });

  $("#tab1\\.Group1\\.rwradio_0").on('ifChecked', function()
  {
    var obj = {
      tab1: {
        Group1: {
          rwradio: "rwradio_0"
        }
      }
    };
    websocket.send(JSON.stringify(obj));
  });

  $("#tab1\\.Group1\\.rwradio_1").on('ifChecked', function()
  {
    var obj = {
      tab1: {
        Group1: {
          rwradio: "rwradio_1"
        }
      }
    };
    if($("#tab1\\.Group1\\.rwradio_1")[0].checked) websocket.send(JSON.stringify(obj));
  });

  $("#tab1\\.Group1\\.rwradio_2").on('ifChecked', function()
  {
    var obj = {
      tab1: {
        Group1: {
          rwradio: "rwradio_2"
        }
      }
    };
    if($("#tab1\\.Group1\\.rwradio_2")[0].checked) websocket.send(JSON.stringify(obj));
  });

  $("#tab1\\.Group1\\.rwradio_3").on('ifChecked', function()
  {
    var obj = {
      tab1: {
        Group1: {
          rwradio: "rwradio_3"
        }
      }
    };
    if($("#tab1\\.Group1\\.rwradio_3")[0].checked) websocket.send(JSON.stringify(obj));
  });

  $( "#tab1\\.Group2\\.drop" ).on( "selectmenuchange", function(event, ui)
  {
    var obj = {
      tab1: {
        Group2: {
          drop: ui.item.value
        }
      }
    }
    websocket.send(JSON.stringify(obj));
  });

  $('#tab2\\.subtab2\\.rwclr').colpick({
    color: '#0000ff',
    flat: true,
    colorScheme: 'dark',
    submit: 0,
    onChange: function (col, hex, rgb) {
      var obj = {
        tab2: {
          subtab2: {
            rwclr: '#'+hex
          }
        }
      }
      websocket.send(JSON.stringify(obj));
    }
  });
}