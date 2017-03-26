;(function(window){

	window.Storage = {
		_prefix: '360_',
		support: !!window.localStorage,
		savePWD: function(pwd) {
			var storage = window.localStorage;
			storage.setItem(this._prefix + 'pwd', pwd);
		},
		getPWD: function() {
			var storage = window.localStorage;
			return storage.getItem(this._prefix + 'pwd');
		},
		removePWD: function() {
			return storage.removeItem('pwd');
		}
	};
})(window);