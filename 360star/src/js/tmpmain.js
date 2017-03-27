;(function(){
	var gesPWD = document.getElementById('gesPWD'),
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
		// line = new Line(gesPWDWidth, gesPWDHeight, item,cobj),
		touchTot = 0,
		prePWD = '',
		eventArr = ['Class','event','line','storage'];


	
	function createScript(name) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = './src/js/'+name+'.js';
		document.body.appendChild(script);
		return script;
	}



	function unloakUI() {
		unloakUI.prototype.init(pwdBtn[0]);
		
	}
	unloakUI.fn = unloakUI.prototype;
	unloakUI.prototype.addUIEvent = function() {
		var line = new this.Line(380,320,item,cobj);
		this.Event.addEvent(aboutPWD,this.checkOpt,'touchstart');
		this.Event.addEvent(aboutPWD,this.checkOpt,'click');
		/**
		* addEventListener 中会改变this要进行bind
		**/
		this.Event.addEvent(canvas,line.touchStart.bind(line),'touchstart');
		this.Event.addEvent(canvas,line.touchStart.bind(line),'mousedown');
		this.Event.addEvent(canvas,line.touchMove.bind(line),'touchmove');
		this.Event.addEvent(canvas,line.touchMove.bind(line),'mousemove');
		this.Event.addEvent(canvas,line.touchEnd.bind(line),'touchend');
		this.Event.addEvent(canvas,line.touchEnd.bind(line),'mouseup');

		this.Event.addEvent(canvas,this.saveOrCheck,'touchend');
	}
	unloakUI.prototype.init = function(item) {
		var me = this;
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
	unloakUI.prototype.checkOpt = function(event) {
		// Event.preventDefault();
		var target = Event.getTarget(event);
		this.clearClass();
		if(target.nodeName.toLowerCase() !== 'label') {
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
	unloakUI.prototype.saveOrCheck = function() {
		var me = this,
			PWD = me.line.getPWD(),
			tmpPWD = PWD.join(',');
		me.clearClass();
		if (radio[0]['checked']) {
			touchTot++;
			if (touchTot == 1) {
				if (PWD.length < 5) {
					touchTot = 0;
					msg.innerHTML ='密码至少五个点';
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
				me.Class.addClass(msg, ' error ');
			}
		}
	}
	//unloakUI.prototype.init.prototype = unloakUI.prototype;
	window.unloakUI = unloakUI;
	var UIMain = new unloakUI();	
	
})(window);