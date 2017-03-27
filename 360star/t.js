window.some = {};
var script = document.createElement('script');
script.type= 'text/javascript'; 
script.src = './a.js';

document.body.appendChild(script);

script.addEventListener('onload',function(){
	some.say();
},false);
// some.say();