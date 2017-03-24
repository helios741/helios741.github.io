;(function(){
	function line(w,h,item) {
		var itemArr = [];
		for (var i = 0; i < item.length; i++) {
			itemArr.push({
				left: item[i].offsetLeft,
				top: item[i].offsetTop
			});
		}
		this.x = 0;
		this.y = 0;
		this.w = w;
		this.h = h;
		this.item = item;
		this.itemW = 30;
		this.itemH = 30;
		this.arr = itemArr;
		this.len = itemArr.length;
		this.isDone = true;
		this.color = 'rgb(224,43,27)';
	};
	line.prototype = {
		constructor: line,
		touchStart: function(e) {
			// line.call(this);
			console.log(this);
			e.preventDefault();
			var touch = e.touches[0] || {}, 
			    x = touch.clientX || e.clientX,
			    y = touch.clientY || e.clientY;
			console.log(x,y); console.log("---",this.len);
			for (var i = 0; i < this.len; i++) {
				console.log(arr.left,arr.top);
				if( x < arr.left || x > arr.left+this.itemW) {
					continue;
				} else if(y < arr.top || y > arr.top + this.itemH) {
					continue;
				}
				Class.addClass(item[i],'active');
				this.x = x,
				this.y = y;
				this.isDone = false;
			}

		},
		touchMove: function(e,cobj) {
			if(this.isDone) return ;
			e.preventDefault();
			var touch = e.touches[0];
			cobj.clearRect(0,0,this.w,this.h);
			cobj.lineWidth = 6;
			cobj.beginPath();
			cobj.moveTo(this.x, this.y);
			cobj.lineTo(touch.pageX,touch.pageY);
			cobj.stroke();
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