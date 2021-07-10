---
title: 观察者模式
date: '2021-07-09T23:10:18.878Z'
lastmod: '2021-07-09T23:10:18.878Z'
draft: false
---

## 设计原则

- 为了对象之间的松耦合而努力
- 动静分离：观察者的具体实现和数量可能变化，从主题中独立出来，可以改变依赖于主题的对象，却不必改变主题
- 针对接口：观察者是一个超类型，观察者利用主题的接口向主题注册，而主题利用观察者接口通知观察者。
- 多用组合：观察者组合成了观察者列表，观察者和主题间没有继承关系，对象之间的关系是在运行时利用主题的方式产生的

## 什么是观察者模式

观察者模式定义了对象之间的 **一对多依赖**，当一个对象**改变状态**时，他的所有依赖者都会**收到通知并自动更新**。

- 这样，对于所有需要知晓数据的观察者，他们不再需要直接控制同一份数据，可以得到更干净的 OO 设计。
- 观察者模式提供了一种对象设计，让主题和观察者之间松耦合。
  - 主题不需要知道观察者的具体类是谁
  - 任何时候都可以增加新的观察者
  - 新类型的观察者不需要修改主题的代码
  - 可以独立复用主题或观察者
- 主题使用观察者提供的统一接口来调用每一个不同的观察者
- 使用观察者模式时，可以推或者拉数据，推的方法可能更为正确
- 多个观察者之间的通知次序较难保证

## 观察者模式的实现

1. 主题接口（Subject）:

   ```java
   public interface Subject {
       public void registerObserver(Observer o);
       public void removeObserver(Observer o);
       public void notifyObservers();
   }
   ```

2. 观察者接口（Observer）:

    ```java
    public interface Observer {
        public void update(Data d);
    }
    ```

3. 主题实现：

   ```java
   public class WeatherData implements Subject {
       private ArrayList observers;
       public WeatherData () {
           observers = new ArrayList();
       }

       public void registerObserver(Observer o) {
           observers.add(o);
       }

       public void notifyObservers(Observer o) {
           for (int i = 0; i < observers.size(); i++>) {
               Observer observer = (Observer)observers.get(i);
               observer.update();
           }
       }
   }
   ```

4. 观察者实现：

   ```java
   public class Client implements Observer, OtherAPIInterface {
       private Subject subject;

       public Client(Subject subject) {
           this.subject = subject;
           subject.registerObserver(this);
       }

       public void update() {
           ...
       }
   }
   ```

   - 与策略模式相比，观察者是在初始化时主动调用主题的 `registerObserver` 方法完成注册，是在**订阅者的构造函数中完成** 。
   - 观察者需要保存对 `Subject` 的引用。

### java 内置观察者模式

`java.util` 包中有最基本的 Observer 接口和 `Observable` 类，可以定义自己的类，扩展 `observable`，观察者需要实现 `Observer` 接口。

1. 对象变成观察者：实现 `update(Observable o, Object arg)` 方法
2. 观察者送出通知：调用 `setChanged()` 方法，然后调用 `notifyObservers()` 或 `notifyObservers(Object arg)` 中的任一个。
