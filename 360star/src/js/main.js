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
	line = new Line(gesPWDWidth, gesPWDHeight, item,cobj);


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
/**
* addEventListener 中会改变this要进行bind
**/
Event.addEvent(canvas,line.touchStart.bind(line),'touchstart');
Event.addEvent(canvas,line.touchStart.bind(line),'mousedown');
Event.addEvent(canvas,line.touchMove.bind(line),'touchmove');
Event.addEvent(canvas,line.touchMove.bind(line),'mousemove');
Event.addEvent(canvas,line.touchEnd.bind(line),'touchend');
Event.addEvent(canvas,line.touchEnd.bind(line),'mouseup');


cobj.beginPath();
cobj.moveTo(0,0);
cobj.lineTo(45,126); //133
cobj.stroke();