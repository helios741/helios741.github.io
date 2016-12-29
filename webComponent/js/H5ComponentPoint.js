/*散点图对象的控制内容*/
var H5ComponentPoint = function(name,cfg){
    var component = new H5ComponentBase(name,cfg);
    var base = cfg.data[0][1];
    /*output point*/
    $.each(cfg.data,function(index,item){
        var point = $('<div class="point point_'+index+'">');
        var scales = (item[1]/base*100) + "%";
        var name = $("<div class='name'>"+item[0]+"</div>");
        var pre = $("<div class='pre'>"+scales+"</div>");
        name.append(pre);
        point.append(name);
        point.css("color","#fff");
        point.width(scales).height(scales);
        if(item[2]) point.css("background",item[2]);
        if(item[3] != undefined && item[4]!=undefined) {
            point.css({
                "left":item[3],
                "top":item[4]
            });
        }
        component.append(point);
    })

    return component;
}
