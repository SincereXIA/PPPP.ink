---
title: Valine Admin 无限重定向问题解决方法
date: 2021-06-29T00:59:48.537Z
autoIgnore: true
categories:
        - 帮助中心
tags:
        - blog
---

## 起因

最近使用 Valine 评论系统，发现不支持评论验证码和反垃圾功能，于是需要为 Valine 增加一个管理后台——[Valine Admin](https://github.com/DesertsP/Valine-Admin)

## 问题描述

但是，在部署过程中遇到了问题，按照 Valine Admin 在 Github Readme 中给出的部署方法在 LeanCloud 中进行部署，到达评论管理，设置管理员信息这一步时，遇到了无限重定向的问题。

> **评论管理**
> 首先需要设置管理员信息。访问管理员注册页面 <https://云引擎域名/sign-up>，注册管理员登录信息，如：<https://deserts-io.avosapps.us/sign-up>

问题表现如下：
![2021-06-29-1624928829-iLfeUR](https://static.sumblog.cn/Pic/2021-06-29-1624928829-iLfeUR.png)

当访问 Valine Admin 后台时，不断重定向到 https 协议访问链接，即使是使用 https 协议直接访问也是如此。

搜索全网，似乎只有[这位老哥](https://reinness.com/views/technology-sharing/vuepress/#%E5%AE%8C%E7%BB%93%E6%92%92%E8%8A%B1)遇到了和我一样的问题：
![2021-06-29-1624929439-8jdkeT](https://static.sumblog.cn/Pic/2021-06-29-1624929439-8jdkeT.png)

## 原因排查

在多次确认我的部署方案以及变量配置无误的情况下，搜索全网似乎没有解决方案，不得已浏览作者源码排查问题，发现在 `app.js` 文件中出现了这样一段代码：

``` javascript
app.enable('trust proxy');
// 需要重定向到 HTTPS 可去除下一行的注释。
app.use(AV.Cloud.HttpsRedirect());
```

这段代码没有判断当前客户端是否在使用 https 协议访问，而是将所有请求直接通过 `AV.Cloud.HttpsRedirect()` 重定向到 https，但好像其他人之前很少遇到过无限重定向的问题。

推测可能是因为 LeanCloud 对这个方法的行为进行了修改，不再自动对用户协议进行判断，而要开发者手动判断是否正在使用 https 协议访问。LeanCloud 官方文档中有这样的说明：

> **如何判断请求是通过 HTTPS 还是 HTTP 访问的？**
> 因为 HTTPS 加密是在负载均衡层面处理的，所以通常部署在云引擎上的 web 框架获取的请求 URL 总是使用 HTTP 协议，建议通过 X-Forwarded-Proto HTTP 头来判断原请求是通过 HTTP 还是 HTTPS 访问的。


## 解决办法

修改 `app.js` 27 到 29 行，注释掉 `HttpsRedirect()` 如下：

```javascript
app.enable('trust proxy');
// 需要重定向到 HTTPS 可去除下一行的注释。
// app.use(AV.Cloud.HttpsRedirect());
```

你可以从 `DesertsP/Valine-Admin` 仓库中 fork 一份进行修改，也可以在一键部署时，直接使用我修改好的 git 仓库：`https://github.com/SincereXIA/Valine-Admin.git`

重新部署之后，问题解决：

![2021-06-29-1624929827-VAE3xw](https://static.sumblog.cn/Pic/2021-06-29-1624929827-VAE3xw.png)
