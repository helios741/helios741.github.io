;(function(unloakUI){
	var _map = new Array(),  //二维数组，_map[i][j]=true表示第i个和第j个相连
		_tar,                // Number 记录当前选中的这个所在的位置
		_start,              // Number 记录第一个所在的位置
		PWD = new Array(),   
		_tmpMap = new Array(), // 二维数组 _tmpMap[i][j]表示第i和第j个是否被使用过
		// _tmpMap 和_map的区别是：比如第1个没有被访问过，当手指(鼠标)从0到2的时候
		// 那么_tmpMap[0][2] = true _tmpMap[0][1] = fasle,_tmpMap[1][2] = fasle
		// 但是 _map[0][2] = fasle _map[0][1] = true,_map[1][2] = true,
		_visMap = new Array();  // 一维数组 _visMap[i]表示i已经被访问过
	function _initMap() {
		for (var i = 0; i < 10; i++) {
			_map[i] = new Array();
			_tmpMap[i] = new Array();
			for (var j = 0; j < 10; j++) {
				_map[i][j] = false;
				_tmpMap[i][j] = false;
			}
		}
	}
	function _initTmpMap() {
		for (var i = 0; i < 10; i++) {
			_tmpMap[i] = new Array();
			for (var j = 0; j < 10; j++) {
				_tmpMap[i][j] = false;
			}
		}
	}
	function _initVisMap() {
		for (var i = 0; i < 10; i++) {
			_visMap[i] = false;
		}
	}
	_initMap();
	function line(item,cobj) {
		var itemArr = [];
		item = item || [];
		for (var i = 0; i < item.length; i++) {
			itemArr.push({
				left: item[i].offsetLeft,
				top: item[i].offsetTop
			});
		}
		this.x = 0;
		this.y = 0;
		this.lineSize = unloakUI.cfg.lineSize;
		this.titleTop = unloakUI.cfg.titleTop;
		this.w = unloakUI.cfg.canvasW ;
		this.h = unloakUI.cfg.canvasH ;
		this.cobj = cobj;
		this.item = item;
		this.itemW = unloakUI.cfg.itemW;
		this.itemH = unloakUI.cfg.itemH;
		this.arr = itemArr;
		this.len = itemArr.length;
		this.isDone = true;
		this.color = unloakUI.cfg.lineColor;
	};
	line.prototype = {
		constructor: line,
		_DFSLine: function(st) {
			for (var i = 0;i < this.len; i++) {
				if(!_map[st][i] || _visMap[i]) {
					continue;
				}
				_visMap[i] = true;
				PWD.push(i);
				var sx = this.arr[i].left + this.itemW/4 +5,
					sy = this.arr[i].top + this.itemH/4;
				this.cobj.lineTo(sx, sy);
				this._DFSLine(i);
			}
		},
		_checkMidLine: function() {
			if (_tmpMap[0][6]  ) {
				_map[0][6] = _map[0][6] = false;
				var flag  =false;
				for(var i = 0; i < this.len; i++) {
					if(_map[3][i]) {
						flag = true;
						break;
					}
				}
				if(!flag) {
					unloakUI.Class.addClass(this.item[3],'active');
					_map[0][3] = _map[3][0] = _map[3][6] = _map[6][3] = true;
				} else {
					_map[0][6] = _map[0][6] = true;
				}
				
			}
			if (_tmpMap[0][2]) {
				_map[0][2] = _map[2][0] = false;
				var flag  =false;
				for(var i = 0; i < this.len; i++) {
					if(_map[1][i]) {
						flag = true;
						break;
					}
				}
				if (!flag) {
					unloakUI.Class.addClass(this.item[1],'active');
					_map[0][1] = _map[1][0] = _map[2][1] = _map[1][2] = true;
				} else {
					_map[0][2] = _map[2][0] = true;
				}
				
			}
			if (_tmpMap[1][7]) {
				_map[1][7] = _map[7][1] = false;
				var flag  =false;
				for(var i = 0; i < this.len; i++) {
					if(_map[4][i]) {
						flag = true;
						break;
					}
				}
				if (!flag) {
					unloakUI.Class.addClass(this.item[4],'active');	
					_map[1][4] = _map[4][1] = _map[4][7] = _map[7][4] = true;
				} else {
					_map[1][7] = _map[7][1] = true;
				}
			}
			if (_tmpMap[2][6]) {
				_map[2][6] = _map[6][2] = false;
				var flag  =false;
				var t;
				for(var i = 0; i < this.len; i++) {
					if(_map[4][i]) {
						flag = true;
						break;
					}
				}
				if (!flag) {
					unloakUI.Class.addClass(this.item[4],'active');
					_map[2][4] = _map[4][2] = _map[4][6] = _map[6][4] = true;
				} else {
					_map[2][6] = _map[6][2] = true;
				}
			}
			if (_tmpMap[2][8] ) {
				_map[2][8] = _map[8][2] = false;
				var flag  =false;
				for(var i = 0; i < this.len; i++) {
					if(_map[5][i]) {
						flag = true;
						break;
					}
				}
				if (!flag) {
					unloakUI.Class.addClass(this.item[5],'active');
					_map[2][5] = _map[5][2] = _map[5][8] = _map[8][5] = true;
				} else {
					_map[2][8] = _map[8][2] = true;
				}
			}
			if (_tmpMap[0][8] ) {
				_map[0][8] = _map[8][0] = false;
				var flag  =false;
				for(var i = 0; i < this.len; i++) {
					if(_map[4][i]) {
						flag = true;
						break;
					}
				}
				if (!flag) {
					unloakUI.Class.addClass(this.item[4],'active');
					_map[0][4] = _map[4][0] = _map[4][8] = _map[8][4] = true;
				} else {
					_map[0][8] = _map[8][0] = true;
				}
			}
			if (_tmpMap[6][8] ) {
				_map[6][8] = _map[8][6] = false;
				var flag  =false;
				for(var i = 0; i < this.len; i++) {
					if(_map[7][i]) {
						flag = true;
						break;
					}
				}
				if (!flag) {
					unloakUI.Class.addClass(this.item[7],'active');
					_map[6][7] = _map[7][6] = _map[7][8] = _map[8][7] = true;
				} else {
					_map[6][8] = _map[8][6] = true;
				}
			}
		},
		renderAllLine: function(sze) {
			this.cobj.beginPath();
			this.cobj.lineWidth = sze;
			_initVisMap();
			// this._checkMidLine();
			_visMap[_start] = true;
			var sx = this.arr[_start].left + this.itemW/4 +5,
				sy = this.arr[_start].top + this.itemH/4;
			this.cobj.moveTo(sx,sy);
			this._DFSLine(_start);
			this.cobj.stroke();
		},
		renderOneLine: function(sx,sy,ex,ey,sze) {
			this.cobj.beginPath();
			this.cobj.lineWidth = sze;
			this.cobj.strokeStyle =this.color;
			this.cobj.moveTo(sx, sy);
			this.cobj.lineTo(ex, ey);
			this.cobj.stroke();
		},
		touchStart: function(e) {
			e.preventDefault();
			var touch = e.touches ? e.touches[0] : {}, 
			    x = touch.clientX || e.clientX,
			    y = touch.clientY || e.clientY;
			y-=this.titleTop;

			for (var i = 0; i < this.len; i++) {
				if( x < this.arr[i].left || x > this.arr[i].left+this.itemW) {
					continue;
				} else if(y < this.arr[i].top || y > this.arr[i].top + this.itemH) {
					continue;
				}
				unloakUI.Class.addClass(this.item[i],'active');
				this.x = this.arr[i].left + this.itemW/4 +5;
				this.y = this.arr[i].top + this.itemH/4;
				this.isDone = false;
				_tar = i;
				_start = i;
				_initMap();
			}
		},
		touchMove: function(e) {
			if (this.isDone) return ;
			e.preventDefault();
			var touch = touch = e.touches ? e.touches[0] : {},
				nx = touch.clientX || e.clientX,
				ny = (touch.clientY || e.clientY) - this.titleTop;
			if (!this.isDone) {
				for (var i = 0; i < this.len; i++) {
					if( nx < this.arr[i].left || nx > this.arr[i].left+this.itemW) {
						continue;
					} else if(ny < this.arr[i].top || ny > this.arr[i].top + this.itemH) {
						continue;
					} else if(unloakUI.Class.hasClass(this.item[i],'active') ) {
						continue;
					}
					nx = this.arr[i].left + this.itemW/4 +5;
					ny = this.arr[i].top + this.itemH/4;
					unloakUI.Class.addClass(this.item[i],' active');
					this.renderOneLine(this.x, this.y, nx, ny);
					this.x = nx;
					this.y = ny;
					_map[_tar][i] = true;
					_map[i][_tar] = true;
					_tmpMap[_tar][i] = true;
					_tmpMap[i][_tar] = true;
					// Class.addClass(this.item[3],'active');
					// _map[0][6] = _map[6][0] = true;
					this._checkMidLine();
					_initTmpMap();
					_tar = i;
				}
			}
			this.cobj.clearRect(0,0,this.w,this.h);
			this.renderAllLine(this.lineSize);
			this.renderOneLine(this.x, this.y, nx, ny,this.lineSize);
		},
		touchEnd: function(e){
			this.isDone = true;
			e.preventDefault();
			_clickOne = false;
			_initVisMap();
			PWD = [_start];
			_visMap[_start] = true;
			this._DFSLine(_start);
			_initMap();
			this.cobj.stroke();
			this.cobj.closePath();
			this.cobj.clearRect(0,0,this.w,this.h);
			for (var i = 0; i < this.len; i++ ) {
				unloakUI.Class.removeClass(this.item[i],'active');
			}
		},
		getPWD: function() {
			return PWD;
		}
	};
	unloakUI.Line = line;
})(unloakUI.fn)