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
		eventArr = ['event','Class','line','storage'];


	
	function createScript(name) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = './src/js/'+name+'.js';
		document.body.appendChild(script);
		return script;
	}



	function unloakUI() {
		return new unloakUI.prototype.init(pwdBtn[0]);
	}
	unloakUI.fn = unloakUI.prototype;
	unloakUI.prototype.init = function(item) {
		var me = this;
		(function iterator(i){
			if (i >= eventArr.length ) return;
			var script  = createScript('Class');
			script.onload = function() {
				iterator(i+1);
				me.Class.addClass(item,'active');
			}
		})(0);
	}
	unloakUI.prototype.clearClass = function() {
		this.Class.removeClass(msg,'warning');
		this.Class.removeClass(msg,'info');
		this.Class.removeClass(msg,'error');
		this.Class.removeClass(msg,'success');
	},
	unloakUI.prototype.checkOpt= function(event) {
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

	unloakUI.prototype.init.prototype = unloakUI.prototype;
	window.unloakUI = unloakUI;
	new unloakUI();
})(window);