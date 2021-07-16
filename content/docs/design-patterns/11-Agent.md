---
title: 代理模式
slug: 代理模式
date: '2021-07-15T11:24:03.097Z'
lastmod: '2021-07-15T11:24:03.591Z'
---
## 代理模式定义

代理模式为另一个对象提供一个代理以控制对这个对象的访问。代理模式可以用来控制对象的访问，比如控制对象的访问权限。

被代理的对象可以是：

- 远程的对象，比如网络服务器，远程的数据库，远程的文件系统，远程的计算机网络等。
  - 远程代理控制访问远程对象
- 创建开销大的对象
  - **虚拟代理** 控制访问创建开销大的资源
  - **虚拟代理** 经常到我们真正需要一个对象的时候才创建它
  - 当对象没有准备就绪时，代理可以替代该对象，提供一个默认的行为
    - 可以配合状态模式使用
- 需要安全控制的对象，比如密码，密钥，签名等。
  - 保护代理基于权限控制对资源的访问

## 存在的问题

- 网络和 I/O 是有风险的，随时可能抛出异常。
- 如何让客户使用代理，而不是真正的对象
  > 可以提供一个工厂，用代理包装真正的类，然后再返回给客户。

## 代理模式示例

### 远程代理

```java
import java.rmi.*;

// 一个远程接口必须扩展 java.rmi.Remote 接口
public interface MyRemote extends Remote {
    public String sayHello() throws RemoteException;
}

// 远程服务实现
// 要创建一个远程对象，可以扩展 UnicastRemoteObject 类
// 必须实现刚刚定义的 MyRemote 接口
public class MyRemoteImpl extends UnicastRemoteObject implements MyRemote {

    transient private String name; // 不会
    // 由于超类构造器声明了异常，必须写一个构造器，因为这个构造器正在调用不安全的超类构造器
    public MyRemoteImpl() throws RemoteException { }
    // 必须实现所有的接口方法，这里不需要声明 RemoteException
    public String sayHello() {
        return "Hello, world!";
    }

    public static void main(String[] args) {
        try {
            MyRemote remote = new MyRemoteImpl();
            Naming.registerObject("MyRemote", remote);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

完整的客户代码

```java
import java.rmi.*;

public class MyRemoteClient {
    public static void main(String[] args) {
        new MyRemoteClient().go();
    }
    public void go() {
        try {
            // 客户取到 stub 对象，在客户端必须有 stub 类
            MyRemote remote = (MyRemote)Naming.lookup("rmi://localhost/MyRemote");

            String s = remote.sayHello();
            System.out.println("s = " + s);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### 动态代理

保护代理通常使用动态代理的方式实现，java 在 `java.lang.reflect` 包中有自己的代理支持。用这个包可以在运行时动态地创建代理类，将方法调用转发给真正的对象。

创建调用处理器
当代理的方法被调用时，代理会把这个调用转发给 `InvocationHandler`，`InvocationHandler` 是一个接口，它定义了 一个`invoke()`方法，该方法是被代理方法的调用转发给真正的对象的。

不管代理被调用的是那种方法，处理器被调用的一定是 `invoke()` 方法。

```java
public class MyInvocationHandler implements InvocationHandler {
    private Object target;
    public MyInvocationHandler(Object target) {
        this.target = target;
    }
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("invoke method " + method.getName() + " on " + target);
        return method.invoke(target, args);
    }
}
```

创建代理

```java
Object getProxy(Object target ) {
    return java.lang.reflect.Proxy.newProxyInstance(
            target.getClass().getClassLoader(),  // 反射的类加载器
            target.getClass().getInterfaces(),   // 反射的接口
            new MyInvocationHandler(target)     // 反射的代理类
    );
}
```

## 相关的模式

装饰者模式 Decorator

- 装饰者为对象增加行为
- 代理模式则控制对象的访问
- 装饰器不会实例化对象

适配器模式 Adapter

- 适配器模式改变对象适配的接口
- 代理模式实现相同的接口

外观模式 Facade

- 为复杂的子系统提供一个简单接口（包装许多对象以简化他们的接口）

## 更多的代理

- 防火墙代理（FirewallProxy）
  控制网络资源的访问
- 智能引用代理 (SmartReferenceProxy)
  当主题被引用时，进行额外的动作，例如计算对象被引用的次数
- 缓存代理 (CacheProxy)
  为开销大的运算结果提供缓存
- 同步代理 (SyncProxy)
  在多线程环境中，使用同步锁来控制访问
- 复杂隐藏代理 (ComplexHideProxy)
  隐藏复杂度，同时进行访问控制
- 写入时复制代理 (CopyOnWriteProxy)
  延迟对象的复制，直到访问时才进行复制
