---
title: 状态模式
date: '2021-07-13T12:25:20.388Z'
lastmod: '2021-07-13T12:25:21.081Z'
draft: false
---

## 状态模式定义

状态模式允许对象在内部状态改变时改变它的行为，对象看起来好像修改了它的类。

### 何时使用

* 当一个对象的行为取决于它的状态，并且你希望在不同的状态下表现不同的行为时。
* 代码中包含大量与对象状态有关的条件语句

## 状态模式实现

```java
// 上下文类，它可以拥有一些内部状态
public class Context {
    private State state;
    public void request() {
        // 不管什么时候，调用 request 方法，都会被委托到状态类来处理
        state.handle();
    }
    void setState(State state) {
        this.state = state;
    }
}

// State 类
public class State {
    public void handle() {
      ...
    }
}

// ConcreteState 类
public class ConcreteStateA extends State {
    Context context;
    ConcreteStateA(Context context) {
        this.context = context;
    }
    public void handle() {
        System.out.println("handle state A");
        context.setState(new ConcreteStateB(context));
    }
}

// ConcreteState 类
public class ConcreteStateB extends State {
    public void handle() {
        System.out.println("handle state A");
    }
}
```

## 问题

是谁来决定状态转移的逻辑

* 当状态转换是固定的时候，适合放在 Context 中
* 转换时动态的时候，适合放在状态类中 （根据运行时上下文中某些变量值来决定转换成什么状态）
  * 缺点：状态类之间产生了依赖

客户能直接和具体状态交互吗：不能

* 客户不能直接改变状态
* 客户根本不了解现在的具体状态
