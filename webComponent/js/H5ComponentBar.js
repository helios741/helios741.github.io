
var H5ComponentBar = function(name,cfg){
    var component = new H5ComponentBase(name,cfg);
    $.each(cfg.data,function(index,item ){
        var line = $('<div class="line"></div>'),
            name = $('<div class="name"></div>'),
            rate = $('<div class="rate"></div>'),
            per  = $('<div class="per"></div>');
        var width = item[1]*100 + "%";
        var bgStyle = "";
        if(item[2]) bgStyle = 'style="background:'+item[2]+'"';
        rate.html('<div class="bg" '+bgStyle+'></div>');
        rate.width(width);
        name.text(item[0]);
        per.text(width);
        line.append(name).append(rate).append(per);
        component.append(line);
    });
    return component;
}
