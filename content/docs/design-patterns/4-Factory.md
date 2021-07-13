---
title: 工厂模式（Factory）
date: '2021-07-10T02:02:14.529Z'
lastmod: '2021-07-10T02:02:14.764Z'
draft: false
---

针对抽象编程，不要针对具体类编程

## 工厂模式

工厂（factory）处理 **创建对象的细节**

- 工厂模式中，一个工厂可能有很多的客户，通过工厂，可以在这些地方将具体判断需要实例化哪个类的代码抽离。
- 可以用静态的方法定义一个工厂（静态工厂），但这样不能通过继承来改变创建方法的行为

## 工厂方法模式

工厂方法模式（Factory Method Pattern）通过让子类决定该创建的对象是什么，来达到将对象的创建过程封装的目的

工厂方法模式定义了一个创建对象的接口，但由子类决定要实例化的类是哪一个。工厂方法让类把实例化推迟到子类

> 当不知道将来需要实例化哪些具体类时，使用工厂方法

- 一群子类来负责所需对象的实例化，实例化对象的责任被转移到这些子类的 **方法** 中，这个方法就如同一个 **工厂**
- 工厂方法用例处理对象的创建，这样，客户程序中关于超类的代码，就和子类对象创建代码解耦了
  
```java
abstract Product factoryMethod(string type);
```

1. 工厂方法是抽象的，依赖子类来处理对象的创建
2. 工厂方法必须返回一个产品
3. 工厂方法可能需要参数来指定所需要的产品

**工厂方法模式的组成元素：**

- 创建者（Creator）类：抽象创建者类，定义了一个抽象工厂方法，让子类实现此方法制造产品

  ```java
  public abstract class Creator {
      abstract Product create(string type);
      public void otherFunc() {
          ...
      }
  }
  ```

- 工厂子类：

  ```java
  public class ConcreteCreator {
      public Product create(string type) {
          if (type == "a") {
              return new ProductA();
          } else {
              ...
          }
      }
  }
  ```

- 产品类：

  ```java
  public class Product {

  }
  public class ProductA {

  }
  ```

### 简单工厂

- 将具体实例化类的代码抽离出来，建立一个新的类来封装这些代码，需要一个实例时，调用该封装类的方法获得具体实例

- 简单工厂把实例化代码的所有工作，在一个地方都做完了，然而工厂方法是创建一个框架，让子类决定如何去实现，简单工厂不具备工厂方法的弹性，因为简单工厂不能变更正在创建的产品。

## 抽象工厂

提供一个用来创建一个 **产品家族** 的抽象类型

- 抽象工厂允许客户使用抽象的接口来创建 **一组相关的产品**，这样一来，客户就从具体的产品中解耦。

> 当需要创建产品家族，让制造的相关产品集合起来时，使用抽象工厂

### 抽象工厂实现

1. 定义一个 interface，这个接口包含 **一组** 方法来生产产品

   ```java
   interface AbstractFactory {
       public ProductA CreateProductA() {

       }
       public ProductB CreateProductB() {

       }
   }
   ```

2. 实现具体工厂：

   ```java
   public class ConcreteFactory {
       public ProductA CreateProductA() {

       }
       public ProductB CreateProductB() {

       }
   }
   ```
  
3. 客户端代码中，只涉及到抽象工厂，运行时将自动使用实际的工厂

   ```java
   public class Client {
     AbstractFactory factory;
     void prepare() {
       a = factory.CreateProductA();
       b = factory.CreateProductB();
     }
     
   }
   ```

## 工厂方法和抽象工厂的区别  

- 工厂方法和抽象工厂都用于创建对象
  - 工厂方法，使用继承的方式创建对象 （扩展 Creator 类，覆盖他的工厂方法来创建具体对象）
    对象的创建整个委托给子类，需要在子类中具体创建出来对象实例
  - 抽象工厂：使用组合的方式创建对象，使用抽象工厂时，先实例化一个抽象工厂，**然后将工厂传入另一个 Client 对象**
    对象的创建实现在工厂接口暴露出来的方法中，Client 也不需要具体去指明实例类型，构造 Client 时需要传入一个工厂
- 工厂方法：只能创建同类的产品；抽象工厂：可以创建整个相关产品家族（不同类型）

## 设计原则

- **依赖倒置原则：** 要依赖抽象，而不要依赖具体类
  - 不能让高层组件依赖于低层组件，而且，不管是高层组件还是低层组件，两者都应该依赖于抽象。
  - 若高层组件依赖了具体的低层类，即使为底层类创建了抽象，该抽象的作用仍然有限。
  - 如何避免违反依赖倒置原则：
    - 变量不可以持有具体类的引用：
      > 如果使用 new ，直接初始化对象，就会持有具体类的引用，可以使用工厂避免
    - 不要让类派生自具体类，要派生自一个抽象（接口、抽象类）
    - 不要覆盖基类中已经实现的方法
