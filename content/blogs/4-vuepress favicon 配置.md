---
title: VuePress favicon 配置
date: '2021-07-07T12:16:11.903Z'
autoIgnore: true
categories:
        - 帮助中心
tags:
        - blog
---

推荐一个生成网站 favicon 的好工具：<https://realfavicongenerator.net/>

## favicon 制作

该网站支持各个平台 favicon 的生成，甚至支持效果预览：

![2021-07-07-1625662550-n14V0r](https://static.sumblog.cn/Pic/2021-07-07-1625662550-n14V0r.png)

对 favicon 的详细介绍可以看这里 [详细介绍HTML favicon尺寸 格式 制作等相关知识](https://www.zhangxinxu.com/wordpress/2019/06/html-favicon-size-ico-generator/)

## VuePress 如何使用

使用该网站生成的 favicon 时，需要在网页的 `<head>` 中加入这些内容：

```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d55b98">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">
```

若使用 VuePress 搭建博客时，可以在 `config.js` 中加入以下内容：

```javascript
module.exports = {
  "head": [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: "#d55b98"}],
    ['meta', { name: 'msapplication-TileColor', content: '#da532c'}],
    ['meta', { name: 'theme-color', content: '#ffffff'}],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
}
```

以上内容是本网站的 favicon 配置示例，请注意部分颜色值需要根据你自己的设定进行修改。
