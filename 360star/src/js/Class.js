;(function(unloakUI){
	var Class = {
		hasClass: function(elem,CN) {
			return !!elem.className.match(new RegExp('(\\s|^)' + CN.trim() + '(\\s|$)'));
		},
		addClass: function(elem, CN) {
			if(!this.hasClass(elem, CN)) {
				elem.className+=' '+CN.trim();
			}
		},
		removeClass: function(elem, CN) {
			if(this.hasClass(elem, CN.trim())) {
				var reg = new RegExp('(\\s|^)' + CN.trim() + '(\\s|$)');
				elem.className = elem.className.replace(reg,' ').trim()+' ';
			}
		} 
	}
	unloakUI.Class = Class;
})(unloakUI.fn);