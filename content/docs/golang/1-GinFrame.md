---
title: Gin 框架使用
date: 2021-06-30T08:52:47.887Z
lastmod: 2021-06-30T08:52:49.305Z
draft: false
---

本文介绍 golang Gin 框架的基本使用，本文编写于笔者实现 *JointStorageInterface* —— 一个 「云际网盘」 的通用编程接口过程中。

<!-- more -->

## 构造路由器

```go
type JointStorageInterface struct {
    *gin.Engine
}

func NewInterface() *JointStorageInterface {
    var jsi JointStorageInterface
    engine := gin.Default()
    engine.Use(util.CORSMiddleware())
    jsi = JointStorageInterface{engine}
    // 匹配的 url 格式： *可选参数 :必选参数
    jsi.PUT("/*key", jsi.defaultReply)
    jsi.DELETE("/*key", jsi.defaultReply)
    jsi.GET("/", jsi.defaultReply)
    jsi.GET("/:key", jsi.defaultReply)
    return &jsi
}
```

要注意的是，可选参数会一直匹配到 Url 尾部，而必选参数会匹配到下一个分隔符为止。
在模拟 s3 接口的开发中，需要同时匹配 `GET /` 以及 `GET /path/to/object` 两者， 并且走不同的函数，可以这样实现：

```go
func NewInterface() *JointStorageInterface {
	var jsi JointStorageInterface
	engine := gin.Default()
	engine.Use(util.CORSMiddleware())
	jsi = JointStorageInterface{engine}
	jsi.PUT("/*key", jsi.defaultReply)
	jsi.DELETE("/*key", jsi.defaultReply)
	jsi.GET("/*key", jsi.defaultReply)
	return &jsi
}

func (jsi *JointStorageInterface) GetMethod(c *gin.Context) {
	key := c.Param("key")
	if key == "/" {
		jsi.defaultReply(c)
	}else {
		jsi.defaultReply(c)
	}
}
```

手动对匹配到的参数进行判断，并进行分流。
