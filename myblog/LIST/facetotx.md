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

## 常见状态码
|Type|Reason-phrase|Note|
| :-------- | :--------:| :--: |
|1XX|Informational|信息性状态码，表示接受的请求正在处理|
|2XX|Success|成功状态码，表示请求正常处理完毕|
|3XX|Redirection|重定向状态码，表示需要客户端需要进行附加操作|
|4XX|Client Error|客户端错误状态码，表示服务器无法处理请求|
|5XX|Server Error|服务器错误状态码，表示服务器处理请求出错|

下面是几个重要的状态码：
- `301/302`(重定向)请求的URL已经移走，应答中包含一个`Location URL`,说明你请求的资源现在的位置
- `304`(未修改) 客户端的缓存资源是最新的，要客户端使用缓存

### 304是什么意思？有没有方法不请求不经过服务器直接使用缓存
- 304(未修改) 自从上次请求后，请求的网页未修改过。服务器返回相应的时候,不会放回网页的内容
- 设置`Cache-Control`和`Expires`等缓存

## 浏览器的缓存

### HTTP缓存机制
- Last-Modified
- ETag
- Expires
- Cache-Control

#### Last-Modified

![](https://p4.ssl.qhimg.com/t01950c0bd84370e345.png)

#### ETag

![](https://p5.ssl.qhimg.com/t01655b435da1b936de.png)

#### Expires

![](https://p5.ssl.qhimg.com/t015a7b93580aeb2800.png)

#### Cache-Control

![](https://p1.ssl.qhimg.com/t01b69cfbcb3b5f3e0c.png)


#### meta

```<META HTTP-EQUIV="Pragma" CONTENT="no-cache">```

**注**
- `Cache-control` 和`Expires`同时设置的话，`Cache-control`优先级高

#### http2.0对1.1的改进
|类型|http1.1|http 2.0|
| :-------- | :--------:| :--: |
|多路复用|多路复用允许通过单一的http的2.0连接发送多重的请求-响应信息|客户端在同一个时间，请对同一个域名下的请求数量是有限制，超过数量的请求是会被阻塞的|
|二进制分帧|在应用层(http/2)和传输层之间增加了二进制分帧层，在二进制分帧里面，HTTP/2会把所有的传输信息分割为更小的消息和帧，并对他们采用二进制格式的编码|HTTP首部会封装到头部当中，数据信息会放在body中|
|性能方面的优化|HTTP/2通过让所有的数据流共用同一个连接，可以更高效的使用TCP连接，让高宽带服务于HTTP服务|性能优化不是在高宽带而是在低延迟，起初会限制最大速度，如果成功会增加(TCP的慢启动)，但是由于这种原因，让原本就具有突发性和短时性的HTTP连接变得十分低效|
|首部压缩|支持首部压缩使用的是HPACK算法|不支持首部压缩|
|服务器推送|在客户端请求之前发送数据的机制(服务端无需通知客户端，想客户端推送想要的文件)，但是还是有一些缺点比如说何时去push，浏览器也可以主动取消push|不支持服务器推送|
