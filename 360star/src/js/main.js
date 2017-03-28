;(function(window){
	/**
	* 项目的主要组件
	**/
	var box = document.getElementsByClassName('box')[0],
		gesPWD = document.getElementById('gesPWD'),
		item = gesPWD.getElementsByTagName('span'),
		msg = document.getElementById('msg'),
		aboutPWD = document.getElementById('aboutPWD'),
		canvas = document.getElementById('canvas'),
		pwdBtn = aboutPWD.getElementsByTagName('span'),
		radio = aboutPWD.getElementsByTagName('input'),
		radioLen = radio.length,
		itemLen = item.length,
		gesPWDWidth = gesPWD.offsetWidth,
		gesPWDHeight = gesPWD.offsetHeight,
		cobj = canvas.getContext('2d'),
		touchTot = 0,  // 1表示设置密码，2表示确认密码
		prePWD = '',
		eventArr = ['Class','event','line','storage'];

	var defaultItemWidth = 30,
		defaultItemHeight= 30,
		defaultLineSize = 2,
		defaultPointSum = 5,
		defaultCanvasW = window.innerWidth,
		defaultCanvasH = 300,
		defaultLineColor = 'rgb(224,43,27)';

	function createScript(name) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = './src/js/'+name+'.js';
		document.body.appendChild(script);
		return script;
	}
	/* 如果在配置中设置了每个点的大小，就对每个点进行重新设置宽高 */
	function renderItem(w,h) {
		for (var i = 0; i < itemLen; i++) {
			item[i].style.width = w+'px';
			item[i].style.height = h+'px';
		}
	}
	/* 通过传入的配置对象，进行标准化 */
	function setCfg(cfg) {
		cfg = cfg || {};
		cfg.canvasW = canvas.width = cfg.canvasW ? cfg.canvasW : defaultCanvasW;
		cfg.canvasH = canvas.height = cfg.canvasH ? cfg.canvasH : defaultCanvasH;
		cfg.itemW = cfg.itemW ? cfg.itemW : defaultItemWidth;
		cfg.itemH = cfg.itemH ? cfg.itemH : defaultItemHeight;
		cfg.lineSize = cfg.lineSize ? cfg.lineSize : defaultLineSize;
		cfg.lineColor = cfg.lineColor ? cfg.lineColor : defaultLineColor;
		cfg.minPointSum = cfg.minPointSum ? cfg.minPointSum : defaultPointSum;
		cfg.titleTop = canvas.offsetTop;
		return cfg;
	}
	function unloakUI(cfg) {
		this.line = {};
		cfg = setCfg(cfg)
		unloakUI.prototype.cfg = cfg;
		renderItem(cfg.itemW, cfg.itemH);
		unloakUI.prototype.init(pwdBtn[0]);
		// return new unloakUI.prototype.init(pwdBtn[0]);
		
	}
	unloakUI.fn = unloakUI.prototype;
	/* 适配手机和PC添加事件 */
	unloakUI.prototype.addUIEvent = function() {
		var line = new this.Line(item,cobj),
			me  = this;
		this.line = line;
		this.Event.addEvent(aboutPWD,me.checkOpt.bind(me),'touchstart');
		this.Event.addEvent(aboutPWD,me.checkOpt.bind(me),'click');
		this.Event.addEvent(canvas,line.touchStart.bind(line),'touchstart');
		this.Event.addEvent(canvas,line.touchStart.bind(line),'mousedown');
		this.Event.addEvent(canvas,line.touchMove.bind(line),'touchmove');
		this.Event.addEvent(canvas,line.touchMove.bind(line),'mousemove');
		this.Event.addEvent(canvas,line.touchEnd.bind(line),'touchend');
		this.Event.addEvent(canvas,line.touchEnd.bind(line),'mouseup');

		this.Event.addEvent(canvas,me.saveOrCheck.bind(me),'touchend');
		this.Event.addEvent(canvas,me.saveOrCheck.bind(me),'mouseup');
	}
	/* 初始化组件 */
	unloakUI.prototype.init = function(item) {
		// 判断是否进行过压缩
		if (this.cfg.compress || (this.line && this.storage && this.event && this.Class) ) {
			me.Class.addClass(item,'active');
			return;
		}
		var me = this;
		/*
		* 因为动态加载script是异步的过程，使用迭代器的方式转换为同步
		*/
		(function iterator(i){
			if (i >= eventArr.length ) {
				me.Class.addClass(item,'active');
				me.addUIEvent();
				return;
			}
			var script  = createScript(eventArr[i]);
			script.onload = function() {
				iterator(i+1);
				
			}
		})(0);
	}

	unloakUI.prototype.clearClass = function() {
		this.Class.removeClass(msg,'warning');
		this.Class.removeClass(msg,'info');
		this.Class.removeClass(msg,'error');
		this.Class.removeClass(msg,'success');
	}
	/* 进行设置或者验证密码的切换 */
	unloakUI.prototype.checkOpt = function(event) {
		// Event.preventDefault();
		var target = this.Event.getTarget(event);
		this.clearClass();
		if (target.parentNode.nodeName.toLowerCase() === 'label') {
			target = target.parentNode;
		}
		if (target.nodeName.toLowerCase() !== 'label' ) {
			return ;
		}
		var input = target.getElementsByTagName('input')[0];
		
		if (input['id'] === 'set-pwd') {
			this.Class.addClass(pwdBtn[0],'active');
			this.Class.removeClass(pwdBtn[1],'active');
			msg.innerHTML = '请设置密码';
		} else {
			this.Class.addClass(pwdBtn[1],'active');
			this.Class.removeClass(pwdBtn[0],'active');
			msg.innerHTML = '请输入您的密码';
		}
	}
	unloakUI.prototype.errLine = function(errpwd) {
		var len = errpwd.length;
		var me = this;
		for (var i=0; i < len; i++) {
			me.Class.addClass(item[errpwd[i]],' error ');
		}
		
		(function iterator(i){
			if(i === len) {
				return ;
			}
			setTimeout(function(){
				me.Class.removeClass(item[errpwd[i]],' error ');
				iterator(i+1);
			},500*(!i?1:0));
		})(0);
	}

	/**
	* 描述：手指(鼠标)抬起事件
	* 在设置密码的情况下，如果是第一次，就把当前密码存到tmpPWB中
	* 	如果是第二次，判断是否和上一次(tmpPWD)中的密码相同，相同进行保存
	* 在验证密码的情况下，每一次取出密码和输入的密码进行比对
	**/
	unloakUI.prototype.saveOrCheck = function() {
		var me = this,
			PWD = this.line.getPWD(),
			tmpPWD = PWD.join(',');
		me.clearClass();
		if (undefined === PWD[0]) return ;
		if (radio[0]['checked']) {
			touchTot++;
			if (touchTot == 1) {
				if (PWD.length < this.cfg.minPointSum) {
					touchTot = 0;
					msg.innerHTML ='密码至少' + this.cfg.minPointSum+'个点';
					me.Class.addClass(msg,'warning');
					return;
				}
				msg.innerHTML = '请确认密码';
				me.Class.addClass(msg, 'info');
				if (!me.Storage.support) {
					alert('您的浏览器不支持localstorage！');
					return;
				}
				prePWD = tmpPWD;
				return;
			}

			if (tmpPWD === prePWD){
				msg.innerHTML = '密码设置成功';
				me.Class.addClass(msg, 'success');
				me.Storage.savePWD(PWD);
			} else {
				msg.innerHTML = '密码不一样，请重新输入密码';
				me.Class.addClass(msg, 'error');
			}
			touchTot = 0;
		} else {
			if (tmpPWD === me.Storage.getPWD() ){
				msg.innerHTML = '验证成功，可重复尝试';
				me.Class.addClass(msg, 'success');
			} else {
				msg.innerHTML = '验证失败';
				me.errLine(tmpPWD.split(','));
				me.Class.addClass(msg, 'error');
			}
		}
	}
	// unloakUI.prototype.init.prototype = unloakUI.prototype;
	window.unloakUI = unloakUI; // 把组件挂载到全局作用域
	/*var UIMain = new unloakUI({
		canvasW:"",  //设置组件(canvas)的宽度
		canvasH:300, //设置组件(canvas)的高度
		itemH:30,    // 设置一个圆点的高度
		itemW:30,    // 设置一个圆点的宽度
		lineColor:'blue', // 设置线的颜色
		lineSize: 5,    // 设置线的宽度
		minPointSum : 4, // 设置密码最少几个点
		compress: false  // 使用压缩版本还是非压缩版本
	});	*/
	if (box.getAttribute('data-unloack') !== null ) {
		new unloakUI();
	}
})(window);