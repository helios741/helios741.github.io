/**
 * Created by Helios on 2016/12/28.
 */
/*基本图文组件对象*/
var H5ComponentBase =function (name,cfg) {
    var cfg =  cfg||{};
    /*only ID*/
    var id = ( "h5_c_"+Math.random() ).replace(".","_");
    /*component type*/
    var className = "h5_component_"+cfg.type;
    /*component name */
    var typeClassName = "h5_component_name_"+name;
    /*define component */
    var component = $('<div class="h5_component '+typeClassName+" "+className+'" id="'+id+'">');
    cfg.text && component.text(cfg.text);
    cfg.width && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);
    cfg.css && component.css(cfg.css);
    cfg.bg && component.css("backgroundImage",'url("'+cfg.bg+'")');

    /*true is content center*/
    if(cfg.center === true) {
        component.css({
            "left":"50%",
            "marginLeft":-1*cfg.width/4+'px'
        });
    }

    if( typeof cfg.onclick == "function") {
        component.on("click",cfg.onclick);
    }

    component.on("onLoad",function(){
        setTimeout(function(){
            component.addClass(className+'_load').removeClass(className+'_leave');
            cfg.animateIn && component.animate(cfg.animateIn);
        },cfg.delay || 0);
        return false;
    });
    component.on("onLeave",function(){
        setTimeout(function(){
            component.addClass(className+'_leave').removeClass(className+'_load');
            cfg.animateOut && component.animate(cfg.animateOut);
        },cfg.delay || 0);
        return false;
    });
    return component;
}
