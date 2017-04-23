二叉树镜像翻转

## javascript翻转字符串
s.split('').reverse().join('');

## 手写原生的ajax

``` javascript
	let req;
	
	if(window.XMLHttpRequest) {
		req = new XMLHTTPRequest();
	} else {
		req = new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	let url = '';
	
	req.open('GET',url,true);
	
	req.send();
	
	req.onreadyStateChange = function() {
		if(req.readyState === 4 ) {
			// TODO	
		}
	}
```

## 