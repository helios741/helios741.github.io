var gesPWD = document.getElementById('gesPWD'),
	msg = document.getElementById('msg'),
	aboutPWD = document.getElementById('aboutPWD'),
	radio = aboutPWD.getElementsByTagName('input'),
	radioLen = radio.length;


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
function chooseItem(event) {
	var target = Event.getTarget(event);
	if(target.nodeName.toLowerCase() !== 'span') {
		return ;
	}
	Class.addClass(target,'active');
	//target.style.background = 'rgba(255,177,38,.5)';
}
Event.addEvent(aboutPWD,checkOpt,'touchstart');
Event.addEvent(aboutPWD,checkOpt,'click');

Event.addEvent(gesPWD,chooseItem,'touchstart');
// Event.addEvent(gesPWD,chooseItem,'click');

