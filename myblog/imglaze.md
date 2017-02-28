  ## 什么是图片的延时加载
  在一个很长的页面中，比如说淘宝的页面，有的时候我们是不需要看下面的图片的。如果一次性加载进来就会影响带宽和进行过多的http请求，这是很不利于优化的。所以我们要在用这张图片的时候在进行加载。起始是很简单的只需要知道下面的几个东西就可以了。
  - 当前图片到最上面的高度，`offsetparent`在位定位的时候是选择的根元素(html或者body)。如果有定位可以这样获得,这样也是兼容的写法
    ```javascript
    do{
      	top+=imgT.offsetTop;  
     }while((imgT=imgT.offsetParent).nodeName!='BODY'); 
    ```
- 页面滑过的高度 `scrollTop` 
- 当前窗口的可是高度 `clientHeight`
- 还要最重要的一点就是，一定是要在有服务器的情况下使用

## 实现
首先先看`html`元素,我们最简单的先放几个`img`
```html
<img src="images/loading.gif" data-src="http://img05.tooopen.com/images/20140524/sy_61761371996.jpg">
<img src="images/loading.gif" data-src="http://img05.tooopen.com/images/20140524/sy_61761371996.jpg">
<img src="images/loading.gif" data-src="http://img05.tooopen.com/images/20140524/sy_61761371996.jpg">
<img src="images/loading.gif" data-src="http://img05.tooopen.com/images/20140524/sy_61761371996.jpg">
```
然后来看我js的文件
```javascript
function imgLazy(){
	this.imgs = document.getElementsByTagName("img");
	this.len = this.imgs.length;
}
imgLazy.prototype.getImgTop = function(imgT) {
	var top = 0;
	do{
      	top+=imgT.offsetTop;  
     }while((imgT=imgT.offsetParent).nodeName!='BODY'); 
 
	return top;
};

imgLazy.prototype.watch = function(){
	var top = document.body.scrollTop || document.documentElement.scrollTop,
		clientH= document.body.clientHeight || document.documentElement.clientHeight;
	for(var i=0;i<this.len;i++){
		var imgSrc = this.imgs[i].getAttribute("data-src");
		if(imgSrc === this.imgs[i].src) continue;
		var imgTop = this.getImgTop(this.imgs[i]);
		if(imgTop>=top && imgTop<=(top+clientH) )
			this.imgs[i].src = imgSrc;
	}
}
var lazyImg = new imgLazy();
lazyImg.watch();
window.onscroll = function(){
	lazyImg.watch();
}
```
没毛病，就这这么简单的几行就实现了页面的延时加载这么一个前端性能优化。