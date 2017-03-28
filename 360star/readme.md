## 360前端星计划任务

### 文件结构

- css
	- normalize.css 通过各个浏览器中样式
	- style.css 书写的样式文件
- js
	- tmpmain.js 整个工程的入口文件，负责获取`DOM`,创建并实例化`unloakUI`组件
	- event.js 包含这个工程中对事件的所有操作 (addEvent,removeEvent,preventDefault,getTarget)
	- Class.js 包含这个工程中对class的所有操作(hasClass,addClss,removeClass) 
	- storage.js 包含工程中对`localstorage`的操作(support,savePWD,getPWD,removePWD)
	- line.js 进行滑动的主要文件，包含使用`canvas`进行划线

### 设计思路
1. 为了减少文件中代码过多难以维护，所以在每个文件中只是写一个模块的代码
2. 为了对全局变量的污染，所以(event,Class,storage,line)文件都是挂载在`unloadUI`的`prototype`下面的，实现的方法是通过在`tmpmain.js`中动态去创建`script`标签去加载各个文件,为什么要动态创建?
	- 因为`tmpmian.js`和其他的文件是相互依赖的，所以在哪个文件写在前面都是不合适的
	- 在初始化组件的时候,去动态的去加载所有文件，这样就消除了上面的问题
	- 因为`script`动态加载是一个异步的过程，多有使用的迭代器的方式把异步转换为同步
	- 这样做虽然减少了全局变量的污染，但是对代码压缩很不友好，所以在配置中有一个字段判断是否压缩,也在代码中判断了是否进行压缩，
3. 在进行手触摸划线的时候，通过监听`touchstart` , `touchmove` , `touchend`事件进行划线
	- 触发`touchstart` 判断如果点击的位置是在九个圆点的位置，那么就记录下来这个圆的中心位置(this.x,this.y)，并且记录这个点是第几个原点(_start)
	- 触发`touchmove`,如果没有滑动在按钮上或者按钮已经被滑动过了，就是线跟随触点移动的效果，如果经过的原点被访问过那么就更新(this.x,this.y)并且从这个点继续移动,当然要判断首尾相连的点中有没有没有被访问过的点，如果有的话(这个点设为k)那么`ans[i][j] = ans[i][k] + ans[k][j]`
	- 触发`touchend`的时候，通过`_start`深度优先遍历得到滑动输入的数组
4. 当在验证的情况下的时候，对每一次输入的答案和`localstorage`中的答案进行比对，如果不一样的在下方表现出对应的信息，如果是匹配上了，也显示匹配成功的信息

### 使用方法
在页面中底部加载`mian.js`文件，然后把其他的四个文件放入和`main.js`同级的目录里面
1. 在`box`中增加`data-unloack` 这个字段即可，使用的是默认的样式
2. 在一个新的js文件中 `new unloakUI(cfg)`,可用的参数有下面几个
```javascript
var UIMain = new unloakUI({
	canvasW:"", //表示画布的宽度
	canvasH:300, //表示画布的高度
	itemH:30,    // 表示一个圆圈的宽度
	itemW:30,    // 表示一个圆圈的高度
	lineColor:'blue',  // 连线的颜色
	lineSize: 5 ,   //连线的尺寸
	minPointSum : 4, //画的最小点的数量
	compress: false // 是否进行压缩，默认是不进行压缩的
});
```