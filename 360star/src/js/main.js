var gesPWD = document.getElementById('gesPWD'),
	item = gesPWD.getElementsByTagName('span'),
	msg = document.getElementById('msg'),
	aboutPWD = document.getElementById('aboutPWD'),
	canvas  = document.getElementById('canvas'),
	radio = aboutPWD.getElementsByTagName('input'),
	radioLen = radio.length,
	itemLen = item.length,
	gesPWDWidth = gesPWD.offsetWidth,
	gesPWDHeight = gesPWD.offsetHeight,
	cobj = canvas.getContext('2d'),
	line = new Line(gesPWDWidth, gesPWDHeight, item,cobj),
	touchTot = 0;


function checkOpt(event) {
	// Event.preventDefault();
	var target = Event.getTarget(event);
	if(target.nodeName.toLowerCase() !== 'label') {
		return ;
	}
	var input = target.getElementsByTagName('input')[0];
	
	if (input['id'] === 'set-pwd') {
		msg.innerHTML = '请设置密码';
	} else {
		msg.innerHTML = '请输入您的密码';
	}
}
function saveOrCheck() {
	var PWD = line.getPWD(),
		tmpPWD = PWD.join(',');
	if (radio[0]['checked']) {
		touchTot++;
		if (touchTot == 1) {
			tmpPWD = PWD;
			if (PWD.length < 5) {
				touchTot = 0;
				msg.innerHTML ='密码至少五个点';
				return;
			}
			msg.innerHTML = '请确认密码';
			if (!Storage.support) {
				alert('您的浏览器不支持localstorage！');
				return;
			}
			Storage.savePWD(PWD);
			return;
		}
		if (tmpPWD === Storage.getPWD() ){
			msg.innerHTML = '密码设置成功';
		} else {
			msg.innerHTML = '密码不一样，请重新输入密码';
		}
		touchTot = 0;
	} else {
		if (tmpPWD === Storage.getPWD() ){
			msg.innerHTML = '验证成功，可重复尝试';
		} else {
			msg.innerHTML = '验证失败';
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