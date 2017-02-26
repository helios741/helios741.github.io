# 本网站做的一些性能优化
## 1.减少http请求
我们都知道http请求是很耗费时间，要进行tcp的三次握手之类的，每次的时间都是相当“`巨大 `”的.下面说怎么较少http请求的在本网站的使用
- 把用到的背景图片合成spirte图，使用css中的属性`background-size`，`background-image`,`background-position`进行对图片中的定位，合成sprite图方法有下面几个
    + 使用ps (这个对于不会PS的新手来说，代价是有点大的。但是每一个前端都是会使用PS的，不是么
    + 使用Tencent前端团队开发的一个在线的工具，现在好像有点问题了[在线sprite图](http://alloyteam.github.io/gopng/)
    + 然后就是[csssprites](http://csssprites.com/) 网站但是不灵活
    + 下面介绍就是我用的在线工具了，也是比较灵活的[sprite](http://sjli.github.io/spritemaker_extjs/example.html)
    + 如果你会使用sass的话，sass能通过Compass编译为sprite图
    + 还有我知道的最后一种方法就是使用gulp自动化工具去生成 (但是亲测之后总是报错，就放弃了
- CSS文件和JS文件的压缩合并，把所有的js的css合并为一个，这样js和css对服务器分别进行一次请求了，下面介绍压缩合并的方法
    + 使用在线合并压缩工具 
    + 我是使用gulp进行合并压缩，我也觉得是最方便的，下面进行一些介绍
    ```javascript
    var gulp = require('gulp'),
    less = require("gulp-less"),
    rename = require("gulp-rename"),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require("gulp-concat");
    //上面的插件都是会用到的
    //下面先说对css的压缩合并
    gulp.task("css",function(){
        gulp.src("static/css/*.css") //源文件
            .pipe(concat("all.css")) //合并为的文件名
            .pipe(gulp.dest("static/public/css/")) //输出到哪个文件
             .pipe(rename({suffix: '.min'})) //添加后缀，变为all.min.css
            .pipe(minifyCSS())             //对css进行压缩
            .pipe(gulp.dest("static/public/css/"));  //输出
    });
    //下面是对js的压缩合并
    gulp.task("minifyjs",function(){
        gulp.src(["static/controllers/*.js","static/controllers/articleDetail/*.js"])
            .pipe(concat("all.js"))
            .pipe(gulp.dest("static/public/all/"))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest("static/public/all/"));
    
    });
    ```
- 在客户端添加缓存  (这个就不过多的进行赘述了
## 2.页面结构
- 将样式内容放在顶部，将脚本文件放在底部。使得页面能更好的加载出来
## 3.缓存利用
- 使用CDN，使用外部的js脚本和css文件，减少DNS的查找
