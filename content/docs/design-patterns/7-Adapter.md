---
title: 适配器模式
date: '2021-07-13T02:37:41.186Z'
lastmod: '2021-07-13T02:37:41.566Z'
draft: false
---

## 适配器模式定义

适配器模式将一个类的接口，**转换为客户期望的另一个接口**，让原本接口不兼容的类可以合作使用。

- 适配器对一个类进行适配，被适配者的任何子类，都可以搭配适配器使用

### 类适配器

类适配器不是使用组合来适配，而是继承被适配者和目标类（多重继承）

## 外观模式 Facade-Pattern

> 将一个或数个类的复杂的一切都隐藏在背后，只显露出一个干净美好的外观

- 外观的意图是简化接口，适配器的意图是将接口转换为不同接口

外观模式提供了一个统一的接口，用来访问子系统中的一群接口，外观定义了一个高层接口，让子系统更容易使用。

## 设计原则

最少知识原则：要减少对象之间的交互，只留下几个“密友”

- 不要让太多的类耦合在一起

在对象的方法内，我们只应该调用属于以下范围的方法：

- 该对象本身
- 被当做方法的参数传入的对象
- 此方法创建或实例化的任何对象
- 对象的任何组件