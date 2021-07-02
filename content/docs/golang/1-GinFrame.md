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

## 使用 Go 通过 http 发送文件

1. 使用 request.Body 直接发送：

   ```go
   func TestJointStorageInterface_PutObject(t *testing.T) {
   	bodyBuf := new(bytes.Buffer)
   	fh, err := os.Open("../test/test.txt")
   	if err != nil {
   		t.Errorf("error opening file")
   	}
   	io.Copy(bodyBuf, fh)
   	req, err := http.NewRequest("PUT", "/test.txt", bodyBuf)
   	recorder := httptest.NewRecorder()
   	JSI.ServeHTTP(recorder, req)
   	if recorder.Code != http.StatusOK {
   		t.Fatalf("http code incorrect")
   	}
   }
   ```

2. 使用 Multipart form 表单发送：

   ```go
   func postFile(filename string, filepath string, target_url string, token string) (*http.Request, error) {
   	body_buf := bytes.NewBufferString("")
   	body_writer := multipart.NewWriter(body_buf)
   
   	// use the body_writer to write the Part headers to the buffer
   	writer, _ := body_writer.CreateFormField("token")
   	writer.Write([]byte(token))
   	_, err := body_writer.CreateFormFile("file", filename)
   	if err != nil {
   		fmt.Println("error writing to buffer")
   		return nil, err
   	}
   
   	// the file data will be the second part of the body
   	fh, err := os.Open(filepath)
   	if err != nil {
   		fmt.Println("error opening file")
   		return nil, err
   	}
   	// need to know the boundary to properly close the part myself.
   	boundary := body_writer.Boundary()
   	//close_string := fmt.Sprintf("\r\n--%s--\r\n", boundary)
   	close_buf := bytes.NewBufferString(fmt.Sprintf("\r\n--%s--\r\n", boundary))
   
   	// use multi-reader to defer the reading of the file data until
   	// writing to the socket buffer.
   	request_reader := io.MultiReader(body_buf, fh, close_buf)
   	fi, err := fh.Stat()
   	if err != nil {
   		fmt.Printf("Error Stating file: %s", filename)
   		return nil, err
   	}
   	req, err := http.NewRequest("POST", target_url, request_reader)
   	if err != nil {
   		return nil, err
   	}
   
   	// Set headers for multipart, and Content Length
   	req.Header.Add("Content-Type", "multipart/form-data; boundary="+boundary)
   	req.ContentLength = fi.Size() + int64(body_buf.Len()) + int64(close_buf.Len())
   	return req, nil
   }
   ```

   

