exports.Datum = function(initialValue, callback)
{
    var d = 
    { 
        v: initialValue,

        set value(val)
        {
            this.v = val;
            callback(val);
        },

        get value()
        {
            return this.v;
        }
    };
    return d;
}

exports.HistoryData = function(initialValue, length, callback)
{
    var d = 
    {
        d: new Array(length),
        start: 0,
        next: 1,
        length: length,

        get value() 
        {
            return this.d[this.start][1];
        },
        
        set value(val) 
        {
            this.d[this.next%this.length] = [this.next, val];
            callback([this.next, val]);
            this.next++;
        },

        get history()
        {
            // walk the circular buffer backwards
            var history = [];
            for(var i = 0; i < this.length; i++)
            {
                history.push(this.d[(this.next + i)%this.length])
            }
            return history;
        },

        set history(y) 
        {
            // don't do anything
        }, 
        setValue: function()
        {
            this.d[this.next%this.length] = [step, val];
            this.next++;
        }
    };

    for (var i = 0; i < length; i++)
    {
        d.d[i] = [0, initialValue];
    }
    return d;
}

/*exports.HistoryData.prototype.setValue = function(step, val)
{
    this.d[this.next%this.length] = [step, val];
    this.next++;
}*/