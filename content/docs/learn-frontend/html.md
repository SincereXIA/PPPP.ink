---
title: HTML 基础
date: 2021-06-08T12:59:06.273Z
slug: html-基础
lastmod: 2021-06-08T12:59:08.520Z
---

## 骨架

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<title>Test Vue</title>
</head>
<body>
    <h1>我的第一个标题</h1>
    <p>我的第一个段落。</p>
    <div id="app">
        {{ message }}
    </div>
</body>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            message: 'Hello Vue!'
        }
    })
</script>
</html>
```

HTML 页面骨架构成：

- 文档类型声明：`<!DOCTYPE html>`

- HTML 总框架 `<html>`

- 头部元素：`<head>`

- 可见页面 `<body>`

## 语法

### 注释

```html
<!-- 这是一个注释 -->
```

### 头部：

可以添加在头部区域的元素标签为: `<title>, <style>, <meta>, <link>, <script>, <noscript> 和 <base>`。

- Style:  `<style>` 标签定义了HTML文档的样式文件引用地址.

  ```html
  <head>
  <style type="text/css">
  body {background-color:yellow}
  p {color:blue}
  </style>
  </head>
  ```

### 可见：

- 链接

  ```html
  <a href="url">链接文本</a>
  ```

- 图像

  ```html
  <img src="url" alt="some_text">
  <img src="pulpit.jpg" alt="Pulpit rock" width="304" height="228">
  ```

- 表格

  ```html
  <table border="1">
      <tr>
          <th>Header 1</th>
          <th>Header 2</th>
      </tr>
      <tr>
          <td>row 1, cell 1</td>
          <td>row 1, cell 2</td>
      </tr>
      <tr>
          <td>row 2, cell 1</td>
          <td>row 2, cell 2</td>
      </tr>
  </table>
  ```

- 列表

  ```html
  <!-- 无序 -->
  <ul>
  <li>Coffee</li>
  <li>Milk</li>
  </ul>
  
  <!-- 有序 （数字编号） -->
  <ol>
  <li>Coffee</li>
  <li>Milk</li>
  </ol>
  ```

- 表单

  ```html
  <form action="demo_form.php" method="post/get">
  <input type="text" name="email" size="40" maxlength="50">
  <input type="password">
  <input type="checkbox" checked="checked">
  <input type="radio" checked="checked">
  <input type="submit" value="Send">
  <input type="reset">
  <input type="hidden">
  <select>
  <option>苹果</option>
  <option selected="selected">香蕉</option>
  <option>樱桃</option>
  </select>
  <textarea name="comment" rows="60" cols="20"></textarea>
   
  </form>
  ```

  

### 不可见

- 组合剂

  - 内联组合（组合前后不换行）：

    ```
    <span> </span>
    ```

  - 块级组合（组合前后换行）：

    ```
    <div>
    </div>
    ```

    