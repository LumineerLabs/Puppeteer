// WARNING: This file is automatically generated by puppeteer. Any modifications made by hand will be lost if the generator is run again.

function generatedGridFn()
{
  initResizable($());
  var cellHeight = 30;
  var cellWdith = 0;

  var cells = [];
  cellWidth = $(".grid-stack").eq(0).width() / 12;
  cells.push(initCell("#tab2\\.subtab3\\.Subpage1\\.roslide_div", cellWidth, cellHeight, 1));
  layoutCells(cells);

  var grids = $('.grid-stack').gridstack({
    cellHeight: cellHeight,
    animate: true
  });
}

function generatedDialFn()
{
  initDial($("#tab2\\.subtab3\\.Subpage1\\.roslide"), 25, 100, 1, true);
}

function generatedGraphFn()
{
}

function generatedUpdateFn(obj)
{
  if(typeof obj.tab2 !== 'undefined')
  {
    if(typeof obj.tab2.subtab3 !== 'undefined')
    {
      if(typeof obj.tab2.subtab3.Subpage1 !== 'undefined')
      {
        if(typeof obj.tab2.subtab3.Subpage1.roslide !== 'undefined') 
        {
          $( "#tab2\\.subtab3\\.Subpage1\\.roslide" ).val(obj.tab2.subtab3.Subpage1.roslide).trigger('change');
        }
      }
    }
  }
}

function generatedInputHandlerFn()
{
}