在96行之前都是说的把`window`或者`document`下面的变量挂载到了闭包里面，这样的好处一是**利于进行代码压缩**二是**挂载之后变短了方便书写**。
从第100行开始是`init`方法也就是我们常用的`$("")`方法，我们先看下面的一条`jQuery`语句：
`$("li").css("color","red")`
这句话的意思是选中页面中`li`然后把字体的颜色变为红色，如果我们使用原生`javascript`会用下面的方式进行书写。
```javascript
var div  = document.getElementsByTagName("li");
for(var i=0,len = div.length;i<len;i++){
    div[i].style.background = "red";
}
```
起始这样写是等价的。
我们使用`$("")`的时候无非就下面的几种方式。
1. $("div") , $(".na") ,  $("div ul")
2. $("#box")
3. $("<li>") $("<li>a</li><li>b</li>")
4. $(this) , $(document)