;(function(){
	var Class = {
		hasClass: function(elem,CN) {
			return !!elem.className.match(new RegExp('(\\s|^)' + CN + '(\\s|$)'));
		},
		addClass: function(elem, CN) {
			if(!this.hasClass(elem, CN)) {
				elem.className+=' '+CN;
			}
		},
		removeClass: function(elem, CN) {
			if(this.hasClass(elem, CN)) {
				var reg = new RegExp('(\\s|^)' + CN + '(\\s|$)');
				elem.className = elem.className.replace(reg,'');
			}
		} 
	}
	window.Class = Class;
})();