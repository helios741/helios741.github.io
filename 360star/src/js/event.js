;(function(window){
	var event = {
		addEvent: function(elem, handler, type) {
			if(elem.addEventListener) {
				elem.addEventListener(type,handler,false);
			} else { // 在手机端就不用考虑低版本的浏览器了，这里省略了elem['on'+type]的判断 
				elem.attachEvent('on' + type, function() {
					handler.call(elem);
				})
			}
		},
		preventDefault: function(ev) {
			if(ev.preventDefault) {
				ev.preventDefault();
			} else {
				ev.returnValue = true;
			}
		},
		getTarget: function(ev) {
			return ev.target || ev.srcElement;
		}
	};
	window.Event = event;
})(window);
