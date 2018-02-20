var websocket;

function puppeteerInit()
{
    generatedInputHandlerFn();
    generatedGridFn();
    generatedDialFn();
    generatedGraphFn();

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
    });

    $(".tabs").tabs();
    $(".tabs").on("tabsactivate", function( event, ui ) { generatedGraphFn()});
    
    var loc = window.location, new_uri;
    if (loc.protocol === "https:") {
        new_uri = "wss:";
    } else {
        new_uri = "ws:";
    }
    new_uri += "//" + loc.host;
    new_uri += "/wsevents";

    websocket = new WebSocket(new_uri);

    websocket.onerror = function(event) {
        //alert(event);
    };

    websocket.onopen = function(event) {
    };

    websocket.onmessage = (event) => {
        obj = $.parseJSON(event.data);
        generatedUpdateFn(obj);
    };
}

function initResizable(div, minW = 0, aspect = undefined)
{
  var minDivWidth = Math.max(div.width(), div.parent().width(), minW);
  var minDivHeight = aspect ? aspect * minDivWidth : div.height();
  div.resizable({
      minHeight: minDivHeight,
      minWidth: minDivWidth
    });
  div.width(minDivWidth);
  div.height(minDivHeight);
}

function initCell(selector, cellWidth, cellHeight, aspect = undefined, minW = 0, )
{
  var div = $(selector);
  var cell = $(".grid-stack-item:has(" + selector + ")");
  var minDivWidth = 0;
  div.parent().children().each(function() {
    var child = $(this);
    minDivWidth += Math.max(minDivWidth, child.outerWidth(true));
  });
  minDivWidth = Math.max(div.width(), minW);

  var minDivHeight = 0;
  div.parent().children().each(function() {
    var child = $(this);
    if(child.is("h2"))
    {
      minDivHeight += child[0].scrollHeight * calculateWordWrap(child);
    }
    else
    {
      minDivHeight += child[0].scrollHeight;
    }
  });
  
  var tmpHeight = aspect ? aspect * minDivWidth : minDivHeight;

  if(tmpHeight < minDivHeight)
  {
    minDivWidth = minDivHeight / aspect;
  }
  else
  {
    minDivHeight = tmpHeight;
  }

  var numCellsX = Math.max(1, Math.min(Math.ceil(minDivWidth / (cellWidth + 20), 12)));
  var numCellsY = Math.max(1, Math.ceil(minDivHeight / (cellHeight + 20)));

  cell.attr('data-gs-width', numCellsX)
      .attr('data-gs-height', numCellsY);

  return cell;
}

function initCellStatic(cell, width, height, cellWidth, cellHeight)
{
  var numCellsX = Math.max(1, Math.min(Math.ceil(minDivWidth / cellWidth), 12));
  var numCellsY = Math.max(1, Math.ceil(minDivHeight / cellHeight));

  cell.attr('data-gs-width', numCellsX)
      .attr('data-gs-height', numCellsY);
}

function layoutCells(cells)
{
  var x = 0;
  var y = 0;
  var maxy = 0;

  _.forEach(cells, function(value) {
    var width = parseInt(value.attr('data-gs-width'));
    var height = parseInt(value.attr('data-gs-height'));
    if(12 <= x + width)
    {
      x = 0;
      y = maxy+1;
    }
    if(y + height > maxy)
    {
      maxy = y + height;
    }
    value.attr('data-gs-x', x);
    value.attr('data-gs-y', y);
    x = x + width;
  });
}

function initDial(input, min, max, step, readOnly, callback=undefined)
{
    input.knob({
        min: min,
        max: max,
        step: step,
        readOnly: readOnly,
        angleOffset: -125,
        angleArc: 250,
        fgColor:"#33b5e5",
        bgColor:"#2f2d2d",
        change: callback,
        draw: function () {

            // "tron" case
            if(this.$.data('skin') == 'inputdial') {

                this.cursorExt = 0.3;

                var a = this.arc(this.cv)  // Arc
                        , pa                   // Previous arc
                        , r = 1;

                this.g.lineWidth = this.lineWidth;

                if (this.o.bgColor !== "none") {
                    this.g.beginPath();
                    this.g.strokeStyle = this.o.bgColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, this.endAngle - 0.00001, this.startAngle + 0.00001, true);
                    this.g.stroke();
                }

                if (this.o.displayPrevious) {
                    pa = this.arc(this.v);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                    this.g.stroke();
                }

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, this.startAngle, this.endAngle, false);
                this.g.stroke();

                this.g.save();
                  this.g.fillStyle = this.o.fgColor;
                  this.g.translate(this.xy, this.xy);
                  this.g.rotate(a.e);
                  this.g.fillRect(this.radius-(this.lineWidth + 20), -10, this.lineWidth + 15, 10);
                  this.g.fillStyle = "#000000";
                  this.g.fillRect(this.radius-(this.lineWidth+12.5), -5, this.lineWidth, 2);
                  this.g.fillStyle = this.pColor;//"#102945";
                  this.g.fillRect(this.radius-(this.lineWidth+12.5), -5, this.lineWidth, 2);
                this.g.restore();

                return false;
            }
        }
    });
}

function initHistory(div, historyData, yMax, colors=undefined)
{
  var plot = $.plot(div, [ historyData ], 
    {
      colors: colors,
      yaxis: 
      { 
        max: yMax
      },
      grid: 
      {
				hoverable: true
			},
      crosshair:
      {
        mode: "x"
      },
      lines:
      {
        show: true,
        fill: true,
        fillColor:  {colors:  [{ opacity: 0.1 }, { opacity: 0.1 }] }
      }
    }
  );

  $("<div id='" + div[0].id + "_tooltip'></div>").css({
    position: "absolute",
    display: "none",
    border: "1px solid #666666",
    padding: "2px",
    "background-color": "#000000",
    opacity: 0.80
  }).appendTo("body");

  var selector = "#" + div[0].id.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&") + "_tooltip";

  div.bind("plothover", function (event, pos, item) 
  {
    if (item) {
      var x = item.datapoint[0].toFixed(2),
        y = item.datapoint[1].toFixed(2);

      $(selector).html("(" + x + ", " + y + ")")
        .css({top: item.pageY+5, left: item.pageX+5})
        .fadeIn(200);
    } else {
      $(selector).hide();
    }
  });
  return plot;
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

function calculateWordWrap(div) 
{
  div.addClass("textDimensionCalculation");

  var ratio = Math.ceil(div[0].scrollWidth / div.width());

  div.removeClass("textDimensionCalculation");

  return ratio;
}