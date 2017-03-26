;(function(){

	var _map = new Array(),
		_clickOne = false,
		_tar;
	function _initMap() {
		for (var i = 0; i < 10; i++) {
			_map[i] = new Array();
			for (var j = 0; j < 10; j++) {
				_map[i][j] = false;
			}
		}
	}
	function line(w,h,item,cbj) {
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
		this.cobj = cobj;
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
		DFSLine: function(st) {
			for (var i = 0;i < this.len; i++) {
				if(!_map[st][i]) {
					continue;
				}
				_map[st][i] = false;
				_map[i][st] = false;
				var sx = this.arr[i].left + this.itemW/4 +5,
					sy = this.arr[i].top + this.itemH/4;
				this.cobj.lineTo(sx, sy, i);
				this.DFSLine(i);
			}
		},
		renderAllLine: function(sze) {
			this.cobj.beginPath();
			this.cobj.lineWidth = 2;
			var flag = false;
			for (var i=0 ;i < this.len; i++) {
				for (var j = 0; j < this.len; j++) {
					if (!_map[i][j]) {
						continue;
					}
					var sx = this.arr[i].left + this.itemW/4 +5,
						sy = this.arr[i].top + this.itemH/4;
					this.cobj.moveTo(sx,sy);
					this.DFSLine(i);
					flag = true;
					break; 
				}
				if ( flag ) {
					break;
				}
			}
		},
		renderOneLine: function(sx,sy,ex,ey,sze) {
			this.cobj.beginPath();
			this.cobj.lineWidth = sze;
			this.cobj.moveTo(sx, sy);
			this.cobj.lineTo(ex, ey);
			this.cobj.stroke();
		},
		touchStart: function(e) {
			e.preventDefault();
			var touch = e.touches[0] || {}, 
			    x = touch.clientX || e.clientX,
			    y = touch.clientY || e.clientY;
			y-=84;

			for (var i = 0; i < this.len; i++) {
				if( x < this.arr[i].left || x > this.arr[i].left+this.itemW) {
					continue;
				} else if(y < this.arr[i].top || y > this.arr[i].top + this.itemH) {
					continue;
				}
				Class.addClass(this.item[i],'active');
				this.x = this.arr[i].left + this.itemW/4 +5;
				this.y = this.arr[i].top + this.itemH/4;
				this.isDone = false;
				_clickOne = true;
				_tar = i;
				_initMap();
			}
		},
		touchMove: function(e) {
			if (this.isDone) return ;
			e.preventDefault();
			var touch = e.touches[0],
				nx = touch.clientX,
				ny = touch.clientY - 84;
			if (_clickOne) {
				for (var i = 0; i < this.len; i++) {
					if( nx < this.arr[i].left || nx > this.arr[i].left+this.itemW) {
						continue;
					} else if(ny < this.arr[i].top || ny > this.arr[i].top + this.itemH) {
						continue;
					} else if(Class.hasClass(this.item[i],'active') ) {
						continue;
					}
					nx = this.arr[i].left + this.itemW/4 +5;
					ny = this.arr[i].top + this.itemH/4;
					Class.addClass(this.item[i],'active');
					this.renderOneLine(this.x, this.y, nx, ny);
					this.x = nx;
					this.y = ny;
					_map[_tar][i] = true;
					_map[i][_tar] = true;
				}
			}
			// this.cobj.clearRect(0,0,this.w,this.h);
			this.renderAllLine();
			this.renderOneLine(this.x, this.y, nx, ny,2);
		},
		touchEnd: function(e){
			this.isDone = true;
			e.preventDefault();
			_clickOne = false;
			_initMap();
			cobj.stroke();
			cobj.closePath();
			cobj.clearRect(0,0,this.w,this.h);
			for (var i = 0; i < this.len; i++ ) {
				Class.removeClass(this.item[i],'active');
			}
		}
	};
	window.Line = line;
})()