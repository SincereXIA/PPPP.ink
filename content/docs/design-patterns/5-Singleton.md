---
title: 单件模式（Singleton Pattern）
date: '2021-07-11T02:33:31.419Z'
lastmod: '2021-07-11T02:33:31.686Z'
draft: false
---


## 单件模式定义

单件模式确保 **一个类只有一个实例**，并提供一个 **全局访问点**。

- 当需要实例时，向类查询，他会返回单个实例。

### 单件模式实现

同步模式：可以提供多线程安全保证，但是会造成获取对象时的性能大量下降。

```java
public class Singleton {
    private static Singleton uniqueInstance; // 私有静态变量，保存单例

    private Singleton() {} // 私有构造函数

    public static synchronized Singleton getInstance() {
        if (uniqueInstance == null) {
            uniqueInstance = new Singleton();
        }
        return uniqueInstance;
    }
}
```

急切模式：可以提供多线程安全保证，但需要 JVM 在加载这个类时马上创建单件实例

```java
public class Singleton {
    private static Singleton uniqueInstance = new Singleton(); // 私有静态变量，保存单例

    private Singleton() {} // 私有构造函数

    public static Singleton getInstance() {
        return uniqueInstance;
    }
}
```

双重检查模式：可以提供多线程安全保证，需要检查两次，在对象尚未创建时，才进行同步。

```java
public class Singleton {
    private static Singleton uniqueInstance; // 私有静态变量，保存单例

    private Singleton() {} // 私有构造函数

    public static Singleton getInstance() {
        if (uniqueInstance == null) {
            synchronized (Singleton.class) {
                if (uniqueInstance == null) { // 第二次检查
                    uniqueInstance = new Singleton();
                }
            }
        }
        return uniqueInstance;
    }
}
```

## 使用 GO 实现的单例模式

```go
package singleton

import (
    "sync"
)

type singleton struct {}

var instance *singleton
var once sync.Once

func GetInstance() *singleton {
    once.Do(func() {
        instance = &singleton{}
    })
    return instance
}
```
