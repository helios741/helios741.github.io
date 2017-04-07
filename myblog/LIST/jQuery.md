# jQuery

## on,bind

- on可以组织冒泡
- bind可能出现冒泡

on还可以执行时间委托，如下：
```javascript
$('#foo').on("click", "a", function(){ 
    alert("Goodbye!");
});
```
表示只有点击id为`foo`元素下面的a标签的时候才会进行回调函数


## jQuery中原生中操作DOM的方法

### jQuery

1. `append()`,向选中的元素中添加内容`$(selector).append(content)`
2. `appendTo()` 把元素添加到选中的元素中`$(html).appendTo(selector)`
3. `prepend``$(selector).prepend(content)`
4. `after`和`before` `$(selector).after(content)`向选中的元素后面添加元素，不是内部
5. `clone` `$('body').append($('div').clone());`
6. `replaceWith`，`replaceAll`选中的元素被替换`$(selector).replaceWith(content)`,用content的内容去替换选中的,后者则是相反的`$(content).replaceAll(selector)`

### 原生js

1. document.createElement('div');
2. 后面添加`document.getElementById('1').insertAdjacentHTML('afterend', '<div id="1.1"></div>');`
3. 移动元素`document.getElementById('1').insertAdjacentHTML('afterend', '<div id="1.1"></div>');`
4. `insertBefore` 相当于jQuery中的`$('#parent').prepend($('#orphan'));`
5. 移除元素：`document.getElementById('foobar').parentNode.removeChild(document.getElementById('foobar'));`
6. 增加样式`document.getElementById('foo').className += 'bold';`
7. 删除样式 `document.getElementById('foo').className = document.getElementById('foo').className.replace(/^bold$/, '');`
8. 改变属性 `document.getElementById('foo').setAttribute('role', 'button');`
9. 删除属性`document.getElementById('foo').removeAttribute('role');`

## jQuery怎么实现优化

1. 使用最新版本的jQuery ( 现在最新的版本是3.2
2. 使用`jQuery`中调用原生的选择器，如：`$("#div"),$("div"),`,`$(".foo")`这样class选择器在`IE8`一下会很慢因为没有原生方法`getElementByClassName()`,最慢是选择器就是伪类选择器($(':hidden')``)和属性选择器`$('[attribute=value]')`
3. 尽量适应原生的方法
4. 多做一些缓存`jQuery('#top').find('p.classA')`;`jQuery('#top').find('p.classB');`减少这样的重复使用
5. 使用链式的写法，因为`jQuery`会自动缓存每一步之后的结果
6. 多用事件委托，不用所有的时间都要绑定事件，下面的做法是最好的了
```javascript
　　$(document).on("click", "td", function(){
　　　　$(this).toggleClass("click");
　　});
```
7. 将css的样式合并为一个class插入，合并DOM之后在插入
8. 尽量使用工具方法，例如`$.data(elem[0],key,value);`不要使用`elem.data(key,value);`，这是因为`elem.data`是定义在jQuery对象的prototype上面的，而`$.data`是定义在`jQuery`对象上面的，减少了原型链的查找
9. 尽少量的新增`jQuery`对象
10. 可以考虑使用延时对象

## jQuery中ready和onload的区别

- 触发的机制不一样
这两个事件的出发机制是不一样的，我们先看一下文档的加载过程

1. 解析`HTML`结构
2. 加载外部的样式和脚本
3. 解析并且执行脚本代码
4. DOM树简历完成
5. 加载图片等外部文件
6. 页面加载完毕

总的来说`DOMContentLoad`是DOM加载完毕只运行到第四步，`window.onload`是指的页面加载完毕运行到最后

## jQuery自定义事件

```javascript
$('#foo').bind("a",function(){});
$('#foo').trigger('a');
```

## jQuery中选择器的实现
`jQuery`要先进行一个词法分析，比如`div#box > .title`
会解析为
```javascript
[
{type:"TAG",value:"div"},
{type:"#",value:"box"},
{type:">",value:">"}
{type:".",value:"title"}
]
```
然后通过find去找

## jQuery流程

1. 在`$`或者`$.fn`上面添加有个方法(也就是插件的名字
```javascript
jQuery.fn.myPlugin = function() {
    // 插件的具体内容放在这里

};
```

2. 闭包里面的this不是jQuery对象是DOM元素 (this指向调用插件的jQuery对象
```javascript
(function( $ ){
    $.fn.myPlugin = function() {
        // 没有必要再作 $(this) ，因为"this"已经是 jQuery 对象了
        // $(this) 与 $($('#element')) 是相同的
        this.fadeIn('normal', function(){
            // 在这里 this 关键字指向 DOM 元素
        });		    		    
    };  		
})( jQuery );

   
$('#element').myPlugin();
```
3. 设置默认值和选项并进行扩展
```javascript
 var settings = $.extend( {
  'location'         : 'top',
  'background-color' : 'blue'
}, options);
```
4. 书写私有成员，对外开放的成员



 