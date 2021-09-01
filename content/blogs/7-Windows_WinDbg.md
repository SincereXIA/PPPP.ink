---
title: 使用 WinDbg 分析 Windows 系统蓝屏日志
date: '2021-08-19T01:51:40.246Z'
autoIgnore: true
categories:
    - 帮助中心
tags:
    - blog
keywords:
    - Windows
lastmod: '2021-08-19T02:58:35.290Z'
---

记录一次因为驱动问题引发 Windows 蓝屏的排查过程

![](https://i.loli.net/2021/08/19/nuTkm8G1HesO6KM.png)

<!-- more -->

## 起因

假期最近在家使用电脑时，电脑频繁出现死机蓝屏状况，为了定位蓝屏原因，需要分析操作系统崩溃时产生的 Dump 文件。

## 背景

### Windows 蓝屏时，Windows 在做什么

> 当 Microsoft Windows 10 系统遇到影响其自身安全运行的情况时，产品将自动停止运行。这种 “自动停止运行” 的现象被称为 “Bug Check” (中文名称为 “错误检查”、“系统崩溃”、“内核错误” 或 “停止错误”)。通常情况下，Windows 10 系统将会在自动停止运行前面向电脑屏幕显示 蓝色 背景颜色的错误提示信息，因此这种现象也被称为电脑 “蓝屏” 异常。

![](https://i.loli.net/2021/08/19/cFkN4fVnrPwjH2e.png)

在系统崩溃时，Windows 操作系统会收集当前内存中的进程信息，自动创建日志（Dump）文件，崩溃后的日志信息会记录在：`C:\Windows\Minidump` 目录下。当开启了 “崩溃转储” 功能后，系统还会生成 `C:\WINDOWS\MEMORY.DMP` 文件，该文件包含了系统当前内存（&虚拟内存）中的全部有效数据，该 Dump 文件体积通常较大，可以看到，我这次系统崩溃创建出的内存镜像高达 1.8 GB

![Memory.dmp](https://i.loli.net/2021/08/19/um6d2FvBo7cLjnl.png)

记录 MEMORY.DMP 的方法为：控制面板\所有控制面板项\系统  高级系统设置→启动和故障修复 的 ‘设置’→勾选‘将事件写入系统日志’

### Dump 文件

> Dump 文件又叫内存转储文件或者叫内存快照文件。是一个进程或系统在某一给定的时间的快照。比如在进程崩溃时或则进程有其他问题时，甚至是任何时候，我们都可以通过工具将系统或某进程的内存备份出来供调试分析用。dump文件中包含了程序运行的模块信息、线程信息、堆栈调用信息、异常信息等数据。

Dump 文件还可进一步分为 Full Dump 和 Mini Dump。 上文中提到的 `C:\Windows\Minidump` 目录下的 dump 文件，属于 Mini Dump

> - Minidump 
>   随着Windows XP，微软发布了一组新的被称为“minidump”的崩溃转存技术。Minidump很容易定制。按照最常用的配置，一个minidump只包括了最必要的信息，用于恢复故障进程的所有线程的调用堆栈，以及查看故障时刻局部变量的值。这样的dump文件通常很小（只有几K字节）。所以，很容易发送给软件开发人员。一旦需要，minidump甚至可以包含比原来的crash dump更多的信息。

### 分析 Dump 文件 —— WinDbg

WinDbg 是对 KD（内核调试器）以及 NTSD（用户模式调试器）的图形化封装。
关于调试工具的更详细介绍，可以查阅 [Microsoft 文档](https://docs.microsoft.com/zh-cn/windows-hardware/drivers/debugger/)

WinDbg 可以从 [这里](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/debugger-download-tools) 下载：

![](https://i.loli.net/2021/08/19/t2EWhPMraoTZmj8.png)

目前，WinDbg 推出了 Preview 版本，改版本已经上架到了 Win10 应用商店。后文将使用 Preview 版本的 WinDbg 进行 Dump 文件的分析。


## 蓝屏 Dump 文件的分析

### 符号文件设置

从蓝屏状态恢复后，启动 WinDbg 工具，在进行调试之前，需要先为 WinDbg 设置符号文件地址

> 如果想更有效的调试，你需要符号文件。符号文件可以是老式的COFF格式或者就是PDB格式。PDB就是程序数据库文件并且包含了公有符号。这些调试器内，你可以使用一系列的地址来让调试器寻找已经加载的二进制文件的符号。

操作系统的符号文件一般存储在 `%SYSTEMDIR%Symbols` 目录。驱动程序的符号文件(.DBG或.PDB)一般存储在和驱动文件(.sys 文件)相同的目录下。

为了更详细的分析，需要引入网络上的符号文件，因此，将 `.sympath` 设置为 `SRV*C:\Symbols*http://msdl.microsoft.com/download/symbols`

![](https://i.loli.net/2021/08/19/sietgAwSEq2KIvb.png)

### 加载 Dump 文件

打开目录 `C:\Windows\Minidump` 找到发生蓝屏时的 Dump 文件
由于权限问题，我们先把需要调试的文件复制到用户权限目录下，之后，使用 WinDbg 工具加载该 Dump 文件。

第一次加载 Dump 文件时，WinDbg 会联网下载需要的符号文件，耐心等待。

当所需符号文件加载完毕后，会给出一个初步的诊断结果:

![](https://i.loli.net/2021/08/19/yUVWu4PcATHlvq2.png)

结果中给出了引发崩溃的具体汇编代码，但对于定位问题几乎毫无帮助。这时，我们点击输出窗口中的蓝色 `!analyze -v` 链接，会触发详细信息输出。

![](https://i.loli.net/2021/08/19/OXcUeVaWSJjPE4s.png)

首先工具会给出一个错误代码，在这里给出的是 `DRIVER_IRQL_NOT_LESS_OR_EQUAL (d1)`，并且在下方给出了该错误代码的具体说明：

```text
An attempt was made to access a pageable (or completely invalid) address at an
interrupt request level (IRQL) that is too high.  This is usually
caused by drivers using improper addresses.
```

这次蓝屏的具体原因由此找到，驱动程序尝试访问一个终端请求级别更高的内存地址，引发了内核的保护导致蓝屏。

具体的驱动程序是哪个呢？继续向下浏览，我们可以看到：

![](https://i.loli.net/2021/08/19/xjqWVuObK4drCIy.png)

罪魁祸首找到了！正是 `rtux64w10` 这个内核模块。

该内核模块是 Realtek USB Ethernet Controller （USB无线网卡）的驱动程序。我们打开设备管理器再次确认：

![](https://i.loli.net/2021/08/19/KMdJos917L4DG3O.png)

确凿无误了，正是有线网卡驱动引发的蓝屏问题，难怪蓝屏常常发生在下载文件的过程中。

前往 Realtek 官网下载最新版的网卡驱动解决问题： [Realtek USB FE / GBE / 2.5G / Gaming Ethernet Family Controller Software](https://www.realtek.com/en/component/zoo/category/network-interface-controllers-10-100-1000m-gigabit-ethernet-usb-3-0-software)


## 后记

### 常见错误驱动程序名称对照表

| **错误驱动程序名称**                                         | **对 应**                        | **修复方案**                                                 |
| ------------------------------------------------------------ | -------------------------------- | ------------------------------------------------------------ |
| ntkrnlmp.exe                                                 | Windows 系统内核                 | 通过官方渠道重新安装电脑所有主要硬件 (包括 BIOS、独立和核心显卡、有线和无线网卡、声卡等) 的驱动程序。 |
| nvlddmkm.sys、dxgmms2.sys、igdkmd64.sys 等                   | 电脑显卡硬件相关驱动程序         | 通过官方渠道重新安装独立显卡和核心显卡的硬件驱动程序。       |
| NETIO.SYS、tcpip.sys、vwififlt.sys、wdiwifi.sys、rt640x64.sys 等 | 电脑网卡硬件相关驱动程序         | 通过官方渠道重新安装有线网卡和无线网卡的硬件驱动程序。       |
| iaStorAC.sys                                                 | Intel 快速存储技术驱动程序       | 通过官方渠道重新安装 “Intel 快速存储技术” 驱动程序。         |
| topsecpf.sys                                                 | “天融信” 厂商旗下应用程序        | 卸载电脑中的 “天融信” 厂商旗下软件。                         |
| 360Hvm64.sys                                                 | 360 安全卫士 (360 杀毒) 应用程序 | 卸载电脑中的 “360” 厂商旗下软件。                            |
| TesSafe.sys                                                  | 腾讯电脑管家、腾讯游戏等应用程序 | 卸载电脑中的 “腾讯” 厂商旗下软件。                           |
| aida64.exe                                                   | “AIDA 64” 硬件检测工具           | 卸载电脑中的 AIDA 64 工具。                                  |
| xlwfp.sys                                                    | “迅雷” 厂商旗下应用程序          | 卸载电脑中的 “迅雷” 厂商旗下软件。                           |
| chrome.exe                                                   | “谷歌” 旗下 Chrome 浏览器        | 卸载电脑中的 Google Chrome 浏览器。                          |

### 《Windows 蓝屏通用修复方案操作指南》

[「Windows 10 | 技术文章」当电脑出现 “蓝屏” 异常问题时，应当如何处理？](https://answers.microsoft.com/zh-hans/windows/forum/all/windows-10/c19cca52-9b8f-44e3-abfa-fbea7db68f48)
