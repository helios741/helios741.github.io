;(function(){
	function line(w,h,item,cbj) {
		var itemArr = [];
		for (var i = 0; i < item.length; i++) {
			itemArr.push({
				left: item[i].offsetLeft,
				top: item[i].offsetTop
			});
		}
		this.tar = {};
		this.x = 0;
		this.y = 0;
		this.w = w;
		this.h = h;
		this.cobj = cobj;
		this.item = item;
		this.itemW = 30;
		this.itemH = 30;
		this.arr = itemArr;
		this.len = itemArr.length;
		this.isDone = true;
		this.color = 'rgb(224,43,27)';
		for(var i=0;i<this.len;i++) {
			console.log(this.arr[i].left,this.arr[i].top);
		}
	};
	line.prototype = {
		constructor: line,
		touchStart: function(e) {
			e.preventDefault();
			var touch = e.touches[0] || {}, 
			    x = touch.clientX || e.clientX,
			    y = touch.clientY || e.clientY;
			for (var i = 0; i < this.len; i++) {
				if( x < this.arr[i].left || x > this.arr[i].left+this.itemW) {
					continue;
				} else if(y < this.arr[i].top || y > this.arr[i].top + this.itemH) {
					continue;
				}
				Class.addClass(item[i],'active');
				console.log(x,y);
				this.cobj.beginPath();
				this.cobj.moveTo(x,y-200);
				this.cobj.lineTo(0,0);
				this.cobj.stroke();
				var cnt = i == 2 ? 8 :0;
				this.x = (this.arr[i].left + this.itemW/4);
				this.y =this.arr[i].top + this.itemH/4;
				this.tar.y = i;
				this.tar.x = cnt - (i/3)*19
				this.isDone = false;
				break;
			}

		},
		touchMove: function(e) {
			if(this.isDone) return ;
			e.preventDefault();
			var touch = e.touches[0];
			this.cobj.clearRect(0,0,this.w,this.h);
			this.cobj.lineWidth = 6;
			this.cobj.beginPath();
			// debugger;
			this.cobj.moveTo(this.x+this.tar.x , this.y-((this.tar.y%3)+2)*52 );
			this.cobj.lineTo(touch.pageX+this.tar.x,(touch.pageY-((this.tar.y%3)+2)*52)/1.5 );
			this.cobj.stroke();
		},
		touchEnd: function(e){
			this.isDone = true;
			e.preventDefault();
			cobj.stroke();
			cobj.closePath();
			cobj.clearRect(0,0,this.w,this.h);
		}
	};
	window.Line = line;
})()