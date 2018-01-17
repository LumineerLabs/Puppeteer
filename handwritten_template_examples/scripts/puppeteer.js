function puppeteerInit()
{
    $( ".panel" ).resizable();

    $( ".ui-sortable" ).sortable();
    
    $( ".ui-sortable" ).disableSelection();

    window.setInterval(timer, 1000);
}

function timer()
{
    $( ".randval" ).html(function ()
        {
            return Math.floor((Math.random() * 10) + 1);
        }
    );
}