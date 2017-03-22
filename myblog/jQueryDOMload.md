这篇文章主要说的是`jQuery`中`$(function(){})`执行的一系列的过程。
当我们使用`$()`的时候，起始里面能够传的参数有很多比如
1. $("div")  //选中元素
2. $("<div></div>") //创建元素
3. $("<div></div><div></div>") //创建多个元素
4. $(function(){})    //传的是函数

我们在源码中第**110行**就能看到对括号里面的元素进行判断，首先判断是不是`string`,然后判断是不是元素节点,最后判断就是是不是函数**184行**。 
### $(function(){})的转换
当我们传递是函数是时候是进行的`return rootjQuery.ready( selector );`这个函数。在这个函数中我们可能对`rootjQuery`不是很了解，起始在源码中的第**866行**我们就能知道`rootjQuery = jQuery(document);` 所以当我们执行`$(function(){})`的时候调用的时候`$(document).ready(function(){})`
### jQuery中ready的使用
那么现在就转换为`jQuery`中`ready`方法是做什么的呢？
我们在**240**找到`ready`方法的源码，我们就能看到,`ready`方法执行了下面的方法`jQuery.ready.promise().done( fn );`,那么我们就要知道`jQuery.ready.promise()`这个函数是做什么用的，如果对ES6或者nodejs有一些了解的看到这个是挺熟悉的，在源码的**819行**就能看到这个方法，在源码**827行**我们看到` document.readyState === "complete" `的时候就表示页面已经加载完了，所以在`else`的时候**834行**就会绑定`DOMContentLoaded`事件 [点击了解DOMContentLoaded](http://www.shangyilong.cn/#!/detail/91740)
<hr>
反正不管进入if还是else都是会执行`$.ready()`这个函数是在**382行**在这个函数的内部我们能够看到在第**398行**的时候`readyList.resolveWith( document, [ jQuery ] );`这个就代表能够执行`done`里面的fn函数了。

## 分步骤来说
下面我们来分步骤的说一下在`jQuery`中如何加载`DOM`的:
1. `$(function(){})` 你的代码中调用
2. 调用`$(document).ready( selector );`  *185行*
3. 调用`jQuery.ready.promise().done( fn );` *242行* 这是一个延时对象会在必要的时候出发fn函数
4. 执行步骤3中的函数，如果`DOM`没有加载完，加载`DOM`然后执行`$.ready()`方法。如果`DOM`加载完了之后就会直接调用`$.ready()`方法，***注意*** `$.ready()`和`$(XX).ready()`不是一样的，前者应该叫工具方法，后者应该叫执行(类)方法。自创勿喷
5. 执行`$.ready()`方法，调用的时候会触发*398行*的`readyList.resolveWith( document, [ jQuery ] );`来调用步骤3中的`fn`
6. 结束


