---
title: 装饰者模式（Decorator）
date: '2021-07-10T02:02:14.529Z'
lastmod: '2021-07-10T02:02:14.764Z'
draft: false
---

> 使用继承设计子类的行为，是在编译时静态决定的，而且所有的子类都会继承到相同的行为。
> 然而，利用组合的方法扩展对象的行为，就可以在运行时动态的进行扩展。

## 设计原则

类应该对扩展开放，对修改关闭

- 类要容易扩展，在不修改现有代码的情况下，就可以搭配新的行为。

## 装饰者模式

装饰者模式动态地将责任附加到对象上，提供了比继承更有弹性的扩展功能替代方案。

- 装饰者和被装饰对象拥有相同的超类型，因此一般是透明的
- 可以用一个或多个装饰者来包裹一个对象
- 装饰者可以在被装饰者的行为之前/之后，加上自己的行为
- 对象可以在任何时候被装饰

在装饰者模式中，装饰者和被装饰者必须继承自同一个父类，拥有共同的超类，我们使用继承为了达到 **类型匹配** 的目的。行为来自装饰者和基础组件，或者是装饰者之间的组合关系。

### 装饰者模式的问题

- 若代码依赖于具体的组件类型（子类类型），经过装饰者装饰的类，类型将会改变，使用装饰者模式必须针对抽象组件类型编程
- 装饰者模式较难知道其他装饰者的存在
- 会在设计中加入大量的小类
- 增加代码复杂度，不仅需要实例化组件，还需要显式将实例包装进装饰者中

## 装饰者模式的实现

1. 定义抽象类和该类的方法

   ```java
   public abstract class Component {
       public abstract double cost();
   }
   ```

2. 定义装饰者类

   ```java
   public abstract class Decorator extends Component {
   }

3. 实现一个具体类

   ```java
   public class Espresso extends Component {
       public double cost() {
           return 1.99;
       }
   }
   ```

4. 实现一个装饰者

   ```java
   public class Mocha extends Decorator {
       Component component;

       public double cost() {
           return .20 + component.cost();
       }
   }
   ```

   - 用一个实例变量来记录被装饰者
