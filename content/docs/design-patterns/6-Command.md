---
title: 命令模式 封装调用（Method invocation）
date: '2021-07-11T02:33:58.350Z'
lastmod: '2021-07-11T02:33:58.648Z'
draft: false
---

## 命令模式定义

命令模式将 **请求** 封装成 **对象**，以便使用不同的请求、队列、或者日志来参数化其他对象。命令模式也支持可撤销的操作。

- 请求：命令对象 （Client） 在**特定接受者（receiver）**上绑定**一组动作**，这个封装出的对象称为 **请求**
  - 这个对象只暴露出一个 `execute()` 方法，该方法调用的时候，接收者就会进行这些动作。
  - 其他对象不知道究竟哪个接收者进行了哪些动作

- 请求调用者 （invoker）和请求接受者（Receiver）之间是解耦的
  - invoker 不知道 receiver 的具体类型，不知道 receiver 如何工作，只是单纯取出请求调用 Receiver
  - Receiver 不知道 invoker 的具体类型，不在意是谁调用了他，也不提供确定的接口
  - 命令对象 Client，了解 Receiver 的具体细节

### 参与角色

- client：命令对象，客户，负责创建一个具体的 Command，并设置其接受者 receiver。
- Command：请求，包含一组动作，和一个特定接受者（receiver），包含 `execute`、`undo` 方法
- invoker：请求调用者，持有一个命令对象（command）在某个时间节点上调用命令对象的 execute 方法。
- Receiver：请求接受者，他可以是任何类，不需要实现什么特定的接口，包含一组具体的 `action` 方法，他知道如何进行必要的操作，实现这个请求。

## 命令模式实现

```java
public interface Command {
    public void execute();
    public void undo();
}

public class XCommand implements Command {
    Receiver object;

    public XCommand(Receiver object) {
        this.object = object;
    }
    
    public void execute() {
        object.doSth();
    }
}

public class Invoker {
    Command command;
    public Invoker() {
        command  = new XCommand(receiver);
    }
    public run() {
        this.command.execute();
    }
}
```

## 命令模式的作用

- 命令可以支持撤销，实现一个 undo 方法，来回到 execute 被执行前的状态
- 命令模式可以实现工作队列，能够有效地把运算限制在固定数目的线程中执行
- 命令模式可以实现日志记录，每一次操作记录在日志中，达成事务处理。
