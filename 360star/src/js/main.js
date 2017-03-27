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
	line = new Line(gesPWDWidth, gesPWDHeight, item,cobj),
	touchTot = 0,
	prePWD = '';

function clearClass() {
	Class.removeClass(msg,'warning');
	Class.removeClass(msg,'info');
	Class.removeClass(msg,'error');
	Class.removeClass(msg,'success');
}
function init() {
	Class.addClass(pwdBtn[0],'active');
}
init();

function checkOpt(event) {
	// Event.preventDefault();
	var target = Event.getTarget(event);
	clearClass();
	if(target.nodeName.toLowerCase() !== 'label') {
		return ;
	}
	var input = target.getElementsByTagName('input')[0];
	
	if (input['id'] === 'set-pwd') {
		Class.addClass(pwdBtn[0],'active');
		Class.removeClass(pwdBtn[1],'active');
		msg.innerHTML = '请设置密码';
	} else {
		Class.addClass(pwdBtn[1],'active');
		Class.removeClass(pwdBtn[0],'active');
		msg.innerHTML = '请输入您的密码';
	}
}
function errLine(errpwd) {
	var len = errpwd.length;
	for (var i=0; i < len; i++) {
		Class.addClass(item[errpwd[i]],' error ');
	}
	(function iterator(i){
		if(i === len) {
			return ;
		}
		setTimeout(function(){
			Class.removeClass(item[errpwd[i]],' error ');
			iterator(i+1);
		},500*(!i?1:0));
	})(0);
	
}
function saveOrCheck() {
	var PWD = line.getPWD(),
		tmpPWD = PWD.join(',');
	clearClass();
	if (radio[0]['checked']) {
		touchTot++;
		if (touchTot == 1) {
			if (PWD.length < 5) {
				touchTot = 0;
				msg.innerHTML ='密码至少五个点';
				Class.addClass(msg,'warning');
				return;
			}
			msg.innerHTML = '请确认密码';
			Class.addClass(msg, 'info');
			if (!Storage.support) {
				alert('您的浏览器不支持localstorage！');
				return;
			}
			prePWD = tmpPWD;
			return;
		}

		if (tmpPWD === prePWD){
			msg.innerHTML = '密码设置成功';
			Class.addClass(msg, 'success');
			Storage.savePWD(PWD);
		} else {
			msg.innerHTML = '密码不一样，请重新输入密码';
			Class.addClass(msg, 'error');
		}
		touchTot = 0;
	} else {
		if (tmpPWD === Storage.getPWD() ){
			msg.innerHTML = '验证成功，可重复尝试';
			Class.addClass(msg, 'success');
		} else {
			msg.innerHTML = '验证失败';
			errLine(tmpPWD.split(','));
			Class.addClass(msg, ' error ');
		}
	}
}


Event.addEvent(aboutPWD,checkOpt,'touchstart');
Event.addEvent(aboutPWD,checkOpt,'click');
/**
* addEventListener 中会改变this要进行bind
**/
Event.addEvent(canvas,line.touchStart.bind(line),'touchstart');
Event.addEvent(canvas,line.touchStart.bind(line),'mousedown');
Event.addEvent(canvas,line.touchMove.bind(line),'touchmove');
Event.addEvent(canvas,line.touchMove.bind(line),'mousemove');
Event.addEvent(canvas,line.touchEnd.bind(line),'touchend');
Event.addEvent(canvas,line.touchEnd.bind(line),'mouseup');

Event.addEvent(canvas,saveOrCheck,'touchend');