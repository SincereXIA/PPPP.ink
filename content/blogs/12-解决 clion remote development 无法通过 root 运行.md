---
title: 解决 clion remote development 无法通过 root 运行
date: '2025-7-11T15:49:30.841Z'
autoIgnore: true
categories:
    - 帮助中心
tags:
    - blog
keywords:
    - 开发
---

## 1. 现象

使用 Clion 远程开发（remote development) 时，Run/Debug 设置中若勾选了 `Run with root privileges `， 会出现报错：`Elevation for remote process doesn't work : Failed to launch elevation service using 'pkexec':`

![](attachments/Pasted%20image%2020250711155929.png)

## 2. 解决方案

在 Jetbrains 中已有相同问题反馈：https://youtrack.jetbrains.com/issue/IJPL-170313/Elevation-for-remote-process-doesnt-work-Failed-to-launch-elevation-service-using-pkexec

评论区有人提供了解法，经测试有效

> Issue still occurs on CLion 2025.1 Build #JBC-251.23774.442, built on April 14, 2025, with Ubuntu 24.04.2 LTS.  
> 2025 年 4 月 14 日构建，搭载 Ubuntu 24.04.2 LTS 的 CLion 2025.1 Build #JBC-251.23774.442 上仍然存在问题。

An **insecure workaround** (**@André Lanouette**) for this issue is creating a polkit rule in `/etc/polkit-1/rules.d` allowing the action `org.freedesktop.policykit.exec`. In my case, I created the file `10-allow-root-all-insecure.rules` with the content:  

此问题的**不安全解决方法** （**@André Lanouette**） 是在 `/etc/polkit-1/rules.d` 中创建一个 polkit 规则，允许该作 `org.freedesktop.policykit.exec` 。就我而言，我创建了 `10-allow-root-all-insecure.rules` 包含以下内容的文件：

```JavaScript
polkit.addRule(function(action, subject) {
    if (action.id == "org.freedesktop.policykit.exec") {
        return polkit.Result.YES;
    }
})
```

The rule can (and **definitely should!!!**) be made more restrictive, as this would grant everybody access to `pkexec` run any command as root. I would recommend at least including `&& subject.user == "<USERNAME>"` in the conditional to restrict access to those who normally already have root access.  
该规则可以（ **并且绝对应该!!**）变得更加严格，因为这将授予每个人以 root 身份运行 `pkexec` run 任何命令的权限。我建议至少在条件中包含 `&& subject.user == "<USERNAME>"` 限制访问，以限制通常已经具有 root 访问权限的人。

This is how my file looks now, with more restrictive rules and is a bit more secure:  
这是我的文件现在的样子，规则更严格，安全性更高一些：

```
polkit.addRule(function(action, subject) {
    if (action.id == "org.freedesktop.policykit.exec" && 
        action.program == "/home/<USERNAME>/.cache/JetBrains/RemoteDev/dist/<ID>_CLion-2025.1/jbr/bin/java" &&
        subject.user == "<USERNAME>") {
        return polkit.Result.YES;
    }
})
```

## 3. 问题可能的原因

### 背景 

1. **pkexec**：是PolicyKit（现在称为Polkit）的一个工具，允许授权用户以其他用户身份（通常是root）执行命令。它提供了一个图形化或文本界面的认证对话框，要求用户输入密码以确认权限

2. **Polkit**：是一个用于在Unix-like操作系统中控制系统范围权限的组件。它为非特权进程与特权进程通信提供了一种机制。Polkit定义了一系列动作（actions），每个动作对应一个需要特权的操作，并指定了哪些用户（或组）可以执行这些动作，以及是否需要认证（如密码）。


在远程开发环境中，当CLion尝试以root权限运行程序时，它会调用pkexec来提升权限。但是，可能因为CLion的远程代理进程（在远程机器上运行）无法弹出认证对话框，导致提权失败


具体来说，错误信息Failed to launch elevation service using 'pkexec'表明CLion试图通过pkexec启动一个提升权限的服务，但Polkit拒绝了该请求。

### 解决方案原理

 解决方案中，我们通过创建一个Polkit规则（放在`/etc/polkit-1/rules.d/`目录下）来允许特定的动作（`org.freedesktop.policykit.exec`）在特定条件下自动被授权（返回`polkit.Result.YES`），而不需要密码认证。