var H5ComponentPolyLine = function(name,cfg) {
    var component = new H5ComponentBase(name, cfg);

    //绘制网格线 背景层
    var Width = cfg.width,
        Height = cfg.height;
    //新建一个画布
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");
    canvas.width = ctx.width = Width;
    canvas.height = ctx.height = Height;
    component.append(canvas);

    window.ctx = ctx;

    // 水平网格线
    var step = 10;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";
    for (var i = 0; i < step + 1; i++) {
        var y = (Height / step) * i;
        ctx.moveTo(0, y);
        ctx.lineTo(Width, y);
    }
    //垂直网格线，要根据项目的个数进行分
    step = cfg.data.length + 1;
    var textW = (Width / step) >> 0;
    for (var i = 0; i < step + 1; i++) {
        var x = (Width / step) * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, Height);
        if (cfg.data[i]) {
            var text = $("<div class='text'>");
            text.text(cfg.data[i][0]);
            text.width(textW / 2).css("left", x / 2 + textW / 4);
            component.append(text)
        }

    }
    ctx.stroke();
    //绘制折线图  表示(数据)层
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");
    canvas.width = ctx.width = Width;
    canvas.height = ctx.height = Height;
    component.append(canvas);
    /**
     * 折线图生长动画
     * @param 长度的百分比
     */
    function draw(per){
        ctx.clearRect(0,0,Width,Height);
        //绘制折线数据
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ff8878";
        //画点
        var x,
            y,
            row_w = Width / (cfg.data.length + 1);
        for (i in cfg.data) {
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = Height - (Height* item[1] *per);
            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = item[2] ? item[2] : "#595959";
            ctx.fillText(( (item[1] * 100) >> 0 ) + "px", x - 10, y - 10);
        }
        ctx.stroke();
        //连线
        ctx.moveTo(row_w, Height * (1 - cfg.data[0][1]));
        for (i in cfg.data) {
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = Height - (Height* item[1] *per);
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(255,136, 120,0)';
        ctx.lineTo(x, Height);
        ctx.lineTo(row_w, Height);
        ctx.fillStyle = 'rgba(255,136, 120,0.2)';
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
}
