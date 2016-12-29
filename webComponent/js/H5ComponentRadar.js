var H5ComponentRadar = function(name,cfg) {
    var component = new H5ComponentBase(name,cfg);
    //绘制网格线 背景层
    var Width = cfg.width,
        Height = cfg.height;
    //新建一个画布 （背景）
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");
    canvas.width = ctx.width = Width;
    canvas.height = ctx.height = Height;
    component.append(canvas);

    var r = Width/2-8,
        step = cfg.data.length;
    //绘制网格
    var isBlue  =false;
    for(var s=10;s>0;s--) {
        ctx.beginPath();
        for(var i=0;i<step;i++) {
            var rad = (2*Math.PI/360) *(360/step) *i,
                x   = r + Math.sin(rad)*r*(s/10),
                y   = r + Math.cos(rad)*r*(s/10);
            ctx.lineTo(x,y);
        }
        ctx.closePath();isBlue = !isBlue;
        ctx.fillStyle = isBlue?"#99c0ff":"#f1f9ff";
        ctx.fill();
    }
    //绘制伞骨
    for(var i=0;i<step;i++) {
        var rad = (2*Math.PI/360) *(360/step) *i,
            x   = r + Math.sin(rad)*r,
            y   = r + Math.cos(rad)*r;
        ctx.moveTo(r,r);
        ctx.lineTo(x,y);
        //输出文字
        var text = $('<div class="text">');
        text.text(cfg.data[i][0]);
        text.css('transition','all .5s '+i*.1+'s');
        if(x>Width/2) text.css("left",x/2);
        else text.css("right",(Width-x)/2);
        if(y>Height/2) text.css("top",y/2);
        else text.css("bottom",(Height-y)/2);
        if(cfg.data[i][2]) text.css("color",cfg.data[i][2]);
        text.css("opacity","0");
        component.append(text);
    }
    ctx.strokeStyle = "#e0e0e0";
    ctx.stroke();

    //数据层的开发
    //新建一个画布 （数据）
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");
    canvas.width = ctx.width = Width;
    canvas.height = ctx.height = Height;
    component.append(canvas);
    //绘制线
    var draw = function(per){
        if(per>=1) component.find(".text").css("opacity",1);
        if(per<1) component.find(".text").css("opacity",0);

        ctx.clearRect(0,0,Width,Height);
        ctx.fillStyle = "#ff7676";
        for(var i=0;i<step;i++) {
            var rad = (2*Math.PI/360) *(360/step) *i,
                x   = r + Math.sin(rad)*r*cfg.data[i][1]*per,
                y   = r + Math.cos(rad)*r*cfg.data[i][1]*per;
            ctx.arc(x,y,5,0,Math.PI*2);

            ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.stroke();

        for(var i=0;i<step;i++) {
            var rad = (2*Math.PI/360) *(360/step) *i,
                x   = r + Math.sin(rad)*r*cfg.data[i][1]*per,
                y   = r + Math.cos(rad)*r*cfg.data[i][1]*per;
            ctx.beginPath();
            ctx.arc(x,y,5,0,Math.PI*2);
            ctx.fill();
            ctx.closePath();
        }
    }

    component.on('onLoad',function(){
        //折线图生长动画
        var s = 0;
        for(var i=0;i<100;i++) {
            setTimeout(function(){
                s+=0.01;
                draw(s);
            },i*10);
        }
    });
    component.on('onLeave',function(){
        //折线图退场动画
        var s = 1;
        for(var i=0;i<100;i++) {
            setTimeout(function(){
                s-=0.01;
                draw(s);
            },i*10+500);
        }
    });

    return component;
}
