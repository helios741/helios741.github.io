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
	line = new Line(gesPWDWidth, gesPWDHeight, item),
	cobj = canvas.getContext('2d');


function checkOpt(event) {
	// Event.preventDefault();
	var target = Event.getTarget(event);
	if(target.nodeName.toLowerCase() !== 'label') {
		return ;
	}
	var input = target.getElementsByTagName('input')[0];
	
	if (input['id'] === 'set-pwd') {
		msg.innerHTML = "请设置密码";
	} else {
		msg.innerHTML = "请输入您的密码";
	}
}

Event.addEvent(aboutPWD,checkOpt,'touchstart');
Event.addEvent(aboutPWD,checkOpt,'click');
Event.addEvent(canvas,line.touchStart,'touchstart');
Event.addEvent(canvas,line.touchStart,'click');

