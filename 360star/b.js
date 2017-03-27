;(function(){
	var oDiv  = document.getElementById('box');
	for(var i=0;i<1000;i++) {
		oDiv.style.width = '200px';
		oDiv.style.height = '200px';
		oDiv.innerHTML = i;
		console.log(i);
	}
})();