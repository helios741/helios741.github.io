最近在升级HTTPS上踩了一些坑，在这里也介绍一下，希望能帮助看到的人

这里知识说的个人网站的升级也就是域名性证书(DV),如果想企业级的证书，就能移步了，哈哈。

## 申请SSL证书

我看了网上好多国外申请证书的流程，最开始是想搞的国外的`startSSL`结果，验证之后就一直登陆不上，又偶然间看到腾讯云也有，就搜了一下，结果评价还是不错的，就选择使用SSL的证书了，反正也是免费了。	
[申请腾讯云SSL地址](https://www.qcloud.com/product/ssl)  登录之后点免费申请就可以了，然后这都是套路。申请下来之后可以按照[腾讯云SSL证书部署](https://www.qcloud.com/document/product/400/4143) 里面有各种服务器的配置

## 在windows平台下Nginx部署之后还是不能访问HTTPS

我就这个问题困扰了我