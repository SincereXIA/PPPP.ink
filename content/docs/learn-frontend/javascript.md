---
title: JS
date: 2021-06-08T12:59:06.273Z
slug: html-基础
lastmod: 2021-06-08T12:59:08.520Z
---

## 语法

- 分号用于分隔 JavaScript 语句。（可选）
- 注释：`//` 或 `/* */`

### 被 HTML 触发

- HTML 元素添加事件属性

  ```html
  <some-HTML-element some-event='JavaScript 代码'>
  <some-HTML-element some-event="JavaScript 代码">
  <button onclick="getElementById('demo').innerHTML=Date()">现在的时间是?</button>
  ```

  | 事件        | 描述                         |
  | :---------- | :--------------------------- |
  | onchange    | HTML 元素改变                |
  | onclick     | 用户点击 HTML 元素           |
  | onmouseover | 用户在一个HTML元素上移动鼠标 |
  | onmouseout  | 用户从一个HTML元素上移开鼠标 |
  | onkeydown   | 用户按下键盘按键             |
  | onload      | 浏览器已完成页面的加载       |

## 数据类型

### 字面量

JavaScript 中，常量（固定值）被称为字面量：

```javascript
3.14
1001
123e5

"John Doe"
'John Doe'

5 + 6
5 * 10

[40, 100, 1, 5, 25, 10]
// 对象字面量
{firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"}
// 函数字面量
function myFunction(a, b) { return a * b;}
```

### 变量

- 使用 `var` 来定义（声明）变量：

  ```javascript
  var x, length
  x = 5
  length = 6
  var length = 16;                                  // Number 通过数字字面量赋值
  var points = x * 10;                              // Number 通过表达式字面量赋值
  var lastName = "Johnson";                         // String 通过字符串字面量赋值
  var cars = ["Saab", "Volvo", "BMW"];              // Array  通过数组字面量赋值
  var person = {firstName:"John", lastName:"Doe"};  // Object 通过对象字面量赋值
  ```

- 也可以在声明时，对他赋值：`var x = 5;`

- 可以在一条语句中，声明多个变量：`var lastname="Doe", age=30, job="carpenter";`

- 未赋值前，变量的值将是 `undefined`

- **js 拥有动态类型，相同的变量，可以用作不同的类型：**

  ```html
  var x;               // x 为 undefined
  var x = 5;           // 现在 x 为数字
  var x = "John";      // 现在 x 为字符串
  ```

- 可以使用 new 来声明类型

  ```javascript
  var carname=new String;
  var x=      new Number;
  var y=      new Boolean;
  var cars=   new Array;
  var person= new Object;
  ```

- 可以通过将变量的值设置为 `null` 来清空变量。

- 你可以使用 typeof 操作符来检测变量的数据类型。

  ```javascript
  typeof {name:'John', age:34} == "object"
  
  typeof undefined             // undefined
  typeof null                  // object
  null === undefined           // false
  null == undefined            // true
  ```
  
#### 字符串

- 可以使用单引号或双引号

- 你可以使用索引位置来访问字符串中的每个字符：`name[7]`

- **计算长度：**使用内置属性 **length** 来计算字符串的长度：`name.length`

- 更多的字符串方法

  ::: details

  | 方法                | 描述                                                         |
  | :------------------ | :----------------------------------------------------------- |
  | charAt()            | 返回指定索引位置的字符                                       |
  | charCodeAt()        | 返回指定索引位置字符的 Unicode 值                            |
  | concat()            | 连接两个或多个字符串，返回连接后的字符串                     |
  | fromCharCode()      | 将 Unicode 转换为字符串                                      |
  | indexOf()           | 返回字符串中检索指定字符第一次出现的位置                     |
  | lastIndexOf()       | 返回字符串中检索指定字符最后一次出现的位置                   |
  | localeCompare()     | 用本地特定的顺序来比较两个字符串                             |
  | match()             | 找到一个或多个正则表达式的匹配                               |
  | replace()           | 替换与正则表达式匹配的子串                                   |
  | search()            | 检索与正则表达式相匹配的值                                   |
  | slice()             | 提取字符串的片断，并在新的字符串中返回被提取的部分           |
  | split()             | 把字符串分割为子字符串数组                                   |
  | substr()            | 从起始索引号提取字符串中指定数目的字符                       |
  | substring()         | 提取字符串中两个指定的索引号之间的字符                       |
  | toLocaleLowerCase() | 根据主机的语言环境把字符串转换为小写，只有几种语言（如土耳其语）具有地方特有的大小写映射 |
  | toLocaleUpperCase() | 根据主机的语言环境把字符串转换为大写，只有几种语言（如土耳其语）具有地方特有的大小写映射 |
  | toLowerCase()       | 把字符串转换为小写                                           |
  | toString()          | 返回字符串对象值                                             |
  | toUpperCase()       | 把字符串转换为大写                                           |
  | trim()              | 移除字符串首尾空白                                           |
  | valueOf()           | 返回某个字符串对象的原始值                                   |

  :::

#### 数字 Num

- JavaScript **只有一种数字类型**

  ```javascript
  var x1=34.00;      //使用小数点来写
  var x2=34;         //不使用小数点来写
  ```

- 取整数： `parseInt(3.14)`

#### 布尔

- 两个值：true 或 false。

#### 数组

``` JavaScript
var cars=new Array();
cars[0]="Saab";
cars[1]="Volvo";
cars[2]="BMW";

var cars=new Array("Saab","Volvo","BMW");
var cars=["Saab","Volvo","BMW"];
```

- 获取数组长度：
  
  ``` JavaScript
  var a = [];  //声明空数组
  a[100] = 2;
  console.log(a.length);  //返回101
  ```

- 遍历数组：

  ```javascript
  for (x in person)  // x 为属性名
  {
      txt=txt + person[x];
  }
  
  for (const v of arr) {
      console.log(v);
  }
  
  arr.forEach((v, i) => console.log(v));
  
  ```

#### 对象

- 定义：

  ```javascript
  var person={
  firstname : "John",
  lastname  : "Doe",
  id        :  5566
  };
  ```

- 寻址：

  ```javascript
  name=person.lastname;
  name=person["lastname"];
  ```

- 对象方法

  - 对象的方法定义了一个函数，并作为对象的属性存储。

  - 对象方法通过添加 () 调用 (作为一个函数)。`name = person.fullName();`

  - 创建对象方法

    ```javascript
    var person={
    firstname : "John",
    methodName : function() {
        // 代码 
    }
    };
    person.methodName()
    ```

- 在方法中，this 表示该方法所属的对象。

### 类型转换

Number() 转换为数字， String() 转换为字符串， Boolean() 转换为布尔值。

```javascript
String(123)       // 将数字 123 转换为字符串并返回
(123).toString()

Number("3.14")    // 返回 3.14
var y = "5";      // y 是一个字符串
var x = + y;      // x 是一个数字
```

## 函数

```javascript
function myFunction(a, b) {
    return a * b;                                // 返回 a 乘以 b 的结果
}
```

- 在 JavaScript 函数内部声明的变量（使用 var）是*局部*变量，所以只能在函数内部访问它
- 在函数外声明的变量是*全局*变量，网页上的所有脚本和函数都能访问它。

## 流程控制

### 条件

```javascript
if (condition1)
{
    当条件 1 为 true 时执行的代码
}
else if (condition2)
{
    当条件 2 为 true 时执行的代码
}
else
{
  当条件 1 和 条件 2 都不为 true 时执行的代码
}

switch(n)
{
    case 1:
        执行代码块 1
        break;
    case 2:
        执行代码块 2
        break;
    default:
        与 case 1 和 case 2 不同时执行的代码
}
```

### 循环

```javascript
for (var i=0; i<5; i++)
{
      x=x + "该数字为 " + i + "<br>";
}

var person={fname:"Bill",lname:"Gates",age:56}; 
for (x in person)  // x 为属性名
{
    txt=txt + person[x];
}

while (i<5)
{
    x=x + "The number is " + i + "<br>";
    i++;
}

do
{
    x=x + "The number is " + i + "<br>";
    i++;
}
while (i<5);
```

- 可以使用 break 和 continue
