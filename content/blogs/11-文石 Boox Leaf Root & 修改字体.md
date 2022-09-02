---
title: 文石 Boox Leaf 获取 Root 权限 & 修改系统字体
date: 2022-09-01T12:12:02.874Z
autoIgnore: true
categories:
  - 帮助中心
tags:
  - blog
keywords:
  - 阅读器
  - Android
  - 字体
lastmod: 2022-09-02T03:04:28.729Z
publish: true
---

万物 Magisk

![2022-09-02-1662087856-zBW1I2](https://static.sumblog.cn/Pic/2022-09-02-1662087856-zBW1I2.png)

<!-- more -->

## 起因

四月初想买个墨水屏阅读器玩玩，当时也调研了好久，考虑了阅读器的系统，屏幕尺寸，阅读场景，以及我钱包的承受能力，最终入手了文石的 Boox Leaf，一块七英寸的墨水屏。

文石的阅读器直接使用了 Android 系统，完全开放，可以安装第三方 Android APP，甚至还自带 Google 框架，十分贴心。书籍的传输也非常方便，文石自带的 “互传”，可以通过 <https://send2boox.com/> 快速推送文件到阅读器上，甚至在同一子网中时，可以直接从浏览器里管理阅读器内部的文件。

对于本地书籍的格式支持也很全面，渲染排版引擎可调节的选项很多，最新的系统版本支持书籍内图片的灰度抖动渲染，断层现象终于少了很多。但新的图像渲染方式只有系统自带的阅读工具支持，第三方 APP 完全没有优化。对于 PDF 的排版上，文石支持自动裁边，以及文字重排。自动裁边很好用，但文字重排经常会把排版弄乱，可能对于纯文本类的扫描版 PDF 书籍会有点用。

然而，令人不解的是，文石的系统字体居然默认是圆体，而且系统不支持自定义字体，这就让人很难受，不知道他们为什么要把字体做成圆体，实在欣赏不来，文石不但改了 Android 的默认字体，而且自带的字体居然是单字重的！对于调用了系统自带字体的 APP，阅读体验很差。

![2022-09-01-1662035336-3wphsR](https://static.sumblog.cn/Pic/2022-09-01-1662035336-3wphsR.png)

虽然可以使用 “隐藏的设置项” 等 APP，调用原生 Android 的系统设置，但仍然无法调节系统默认字体，因此尝试获取 Leaf 的 Root 权限，通过 Magisk 模块的方式，修改系统字体。

## 0. Root 前的准备

1. 下载 App：“隐藏的设置项” 进入 AOSP 系统设置，多次点击设备版本号，打开开发者模式，并且启用 USB 调试
2. 数据线接上 PC，装好 ADB 驱动和环境，输入命令：`adb devices` 查看连接状态
3. 使用命令 `adb reboot bootloader` 重启进入 fastboot 模式
4. `fast boot flashing unlock` 检查 bootloader 锁是否解除，文石 Boox 3.2.3 Android 10 的版本出场 bootloader 就没有上锁，非常适合折腾，十分好评

## 1. 下载固件，提取 boot.img

文石的固件很独特，从服务器下载到的固件是加密的，而且官网也不给出最新固件的下载地址。github 有大佬给出了一个固件下载的接口，我们访问这个网址：

```
http://data.onyx-international.cn/api/firmware/update?where={%22buildNumber%22:0,%22buildType%22:%22user%22,%22deviceMAC%22:%22%22,%22lang%22:%22zh_CN%22,%22model%22:%22Leaf%22,%22submodel%22:%22%22,%22fingerprint%22:%22%22}
```

会得到以下结果：

![2022-09-02-1662086513-R2EZOv](https://static.sumblog.cn/Pic/2022-09-02-1662086513-R2EZOv.png)

其中，`downloadUrlList` 字段记录了固件的下载链接。

可以将其中的 "model" 属性值调整为其他设备的 ID，就可以下载到其他设备的最新固件

固件下载好后，来这里下载好解密脚本：<https://github.com/Hagb/decryptBooxUpdateUpx> 装好 python 环境

终端执行：`python DeBooxUpx.py leaf update.upx` 解密固件包，解密出 zip 格式压缩包。但该压缩包在 macos 中无法直接解压，需要使用 Keka 进行解压。

解压后就拿到了我们需要的 boot.img

![2022-09-01-1662036275-vgRxrn](https://static.sumblog.cn/Pic/2022-09-01-1662036275-vgRxrn.png)

## 2. 使用 Magisk 修补 boot.img 

1. 给任意一台 Android 设备安装好 Magisk APP: <https://github.com/topjohnwu/Magisk/releases>
2. 将上文提取出的 boot.img 发送给 Android 设备，打开手机 Magisk 应用 > 安装 > 选项中只勾选保持系统分区加密 > 选择并修补一个文件 > 选择复制进去的 boot.img > 开始。等待滚动的命令行显示 All Done
3. 将生成的 `magisk_patched-xxxxxx.img` 发送给 PC

## 3. 使用修补过的 boot.img 引导启动文石阅读器

1. 文石 Leaf 进入 fastboot 模式，`fastboot boot magisk_patched-xxxxxxx.img`，等待设备重新启动
2. 重启之后进入 magisk，可以看到现在设备已经获得了 root 权限，但这只是临时的
3. 确认启动引导没有问题后，打开 Magisk App 中选择安装 > 直接安装，永久修补 boot 镜像。

至此，文石 leaf Root 成功

![2022-09-02-1662087429-O2pwcq](https://static.sumblog.cn/Pic/2022-09-02-1662087429-O2pwcq.png)

## 4. 修改系统字体

拥有 Magisk 之后，修改系统字体就很简单，只需要找一些包含多字重的字体模块刷入即可，一些字体模块可以在这里下载：<https://magisk.suchenqaq.club/MagiskModule/Font.php>

![2022-09-02-1662087378-gaOOyG](https://static.sumblog.cn/Pic/2022-09-02-1662087378-gaOOyG.png)