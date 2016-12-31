var H5ComponentPie = function(name,cfg) {
    var component = new H5ComponentBase(name,cfg);
    var Width = cfg.width,
        Height = cfg.height;
    //新建一个画布 （背景）
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");
    canvas.width = ctx.width = Width;
    canvas.height = ctx.height = Height;
    component.append(canvas);

    var r = Width/2,
        step = cfg.data.length;
    ctx.fillStyle = "#eee";
    ctx.strokeStyle="#eee";
    ctx.lineWidth = 2;
    ctx.arc(r,r,r,0,Math.PI*2);
    ctx.fill();
    ctx.stroke();

    var colors = ["green","#565656","blue","orange","#000"],
        startAngle = 1.5*Math.PI,
        endAngle = 0,
        TotalAngle = Math.PI*2;
    for(var i=0;i<step;i++) {
        var item = cfg.data[i];
        ctx.beginPath();
        ctx.fillStyle = item[2] || (item[2]=colors.pop() );
        ctx.strokeStyle=item[2];
        ctx.lineWidth = .2;
        endAngle = startAngle + item[1]*TotalAngle;
        ctx.moveTo(r,r);
        ctx.arc(r,r,r,startAngle,endAngle);
        ctx.fill();
        ctx.stroke();
        startAngle = endAngle;

        var text = $('<div class="text">'),
            per = $('<div class="per">');
        text.text(item[0]);
        per.text( (item[1]*100) +"%");
        text.append(per);
        var x = r + Math.sin(.6*Math.PI - startAngle)*r,
            y = r + Math.cos(.6*Math.PI - startAngle)*r;
        if(x>Width/2) text.css("left",x/2);
        else text.css("right",(Width-x)/2);
        if(y>Height/2) text.css("top",y/2);
        else text.css("bottom",(Height-y)/2);
        if(item[2]) text.css("color",item[2]);
        text.css("opacity","0");
        component.append(text);
    }

    canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");
    canvas.width = ctx.width = Width;
    canvas.height = ctx.height = Height;
    component.append(canvas);

    ctx.fillStyle = "#eee";
    ctx.strokeStyle="#eee";
    ctx.lineWidth = .2;

    function draw(per){
        ctx.clearRect(0,0,Width,Height);
        ctx.beginPath();
        ctx.moveTo(r,r);
        if(per<=0) {
            component.find(".text").css("opacity","0");
            ctx.arc(r,r,r,0,Math.PI*2);
        }
        else{
            component.find(".text").css("transition","all 0s 0s");
            H5ComponentPie.reSort(component.find(".text"));
            component.find(".text").css("transition","all 1s .5s");
            component.find(".text").css("opacity","1");
            ctx.arc(r,r,r,startAngle,startAngle+Math.PI*2*per,true);
        }

        ctx.fill();
        ctx.stroke();
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
};
H5ComponentPie.reSort  = function( list ){
    //检测相交
    var cmp = function(domA,domB){
        var offSetA = $(domA).offset(),
            offSetB = $(domB).offset();
        var shadowA_x = [offSetA.left,offSetA.left+$(domA).width()],
            shadowA_y = [offSetA.top,offSetA.top+$(domA).height()];
        var shadowB_x = [offSetB.left,offSetB.left+$(domB).width()],
            shadowB_y = [offSetB.top,offSetB.top+$(domB).height()];
        //检测x和y是否相交
        var intersectX = (shadowA_x[0]>shadowB_x[0] && shadowA_x[0] < shadowB_x[1]) ||
            (shadowA_x[1]>shadowB_x[0] && shadowA_x[1] < shadowB_x[1]);
        var intersectY = (shadowA_y[0]>shadowB_y[0] && shadowA_y[0] < shadowB_y [1]) ||
            (shadowA_y[1]>shadowB_y[0] && shadowA_y[1] < shadowB_y[1]);
        return intersectX && intersectY;
    };
    // 错开重排
    var reset = function(domA,domB){
        if($(domA).css("bottom")!="auto") {
            $(domA).css("bottom",parseInt($(domA).css("bottom"))+$(domB).height());
        }
        if($(domA).css("top")!="auto") {
            $(domA).css("top",parseInt($(domA).css("top"))+$(domB).height());
        }
    }

    //将以前相互覆盖的元素进行重新排列
    var willReset = [list[0]];
    $.each(list,function(i,domTarget){
       // console.log(cmp(willReset[willReset.length-1],domTarget));
        /*if(cmp(willReset[willReset.length-1],domTarget)){
            willReset.push(domTarget);
        }*/
    });
    if(willReset.length >1 ){
        $.each(willReset,function(i,domA){
            if(willReset[i+1]) reset(domA,willReset[i+1]);
        });
        H5ComponentPie.reSort(willReset);
    }
};
