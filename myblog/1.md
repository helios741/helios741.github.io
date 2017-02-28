采用的版本是jQuery2.0.3这个版本进行分析的。
jQuery的的最外层是通过一个闭包实现的，形如下面的结构：
```javascript
(function(window,undefiend){
			
})(window);
```
传递`window`这个对象有两个好处
- 因为`jQuery`要把一些属性或者方法挂载到`window`上,为了节省效率 ( 因为js是`由小到大`执行的。如下：
    ```javascript
    (function(window,undefiend){
		window.$ = $;
	})(window);
    ```
- 为了提高网站的性能，上线之前一般会把js文件进行压缩，这样的话`window`对象就能被压缩为别的对象了，如e

传递`undefined`因为`undefined`不是保留字，有的浏览器会对`undefined`进行修改，jQuery为了使用的是不被修改的undefined
```javascript
var undefined = 10;//在外部对undefined进行修改不会影响jQuery内部
```
