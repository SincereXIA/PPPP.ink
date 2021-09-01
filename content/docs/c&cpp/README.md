---
title: C++ 指北
date: 2021-06-30T08:52:47.887Z
lastmod: 2021-06-30T08:52:49.305Z
draft: false
---

## 数据类型

### 变量

#### 字符串

字符串转数字：

```c++
int i = std::stoi(s);
```

字符串的分割：

- 通过 `stringstream` 实现
  stringstream为字符串输入输出流，继承自iostream，stingstream的使用需要包含sstream头文件。

```c++
vector<string> split3(const string &str, const char pattern)
{
    vector<string> res;
    stringstream input(str);   //读取str到字符串流中
    string temp;
    //使用getline函数从字符串流中读取,遇到分隔符时停止,和从cin中读取类似
    //注意,getline默认是可以读取空格的
    while(getline(input, temp, pattern))
    {
        res.push_back(temp);
    }
    return res;
}
```

### 常量

## 数据结构

### 哈希表

C++ STL中，哈希表对应的容器是 `unordered_map`（since C++ 11）。根据 C++ 11 标准的推荐，用 `unordered_map` 代替 `hash_map`。

> 哈希表的一个重要问题就是如何解决映射冲突的问题。常用的有两种：开放地址法 和 链地址法。

使用示例：

``` c++
#include <iostream>
#include <unordered_map>
#include <string>
int main(int argc, char **argv) {
    std::unordered_map<int, std::string> map;
    map.insert(std::make_pair(1, "Scala"));
    map.insert(std::make_pair(2, "Haskell"));
    map.insert(std::make_pair(3, "C++"));
    map.insert(std::make_pair(6, "Java"));
    map.insert(std::make_pair(14, "Erlang"));
    std::unordered_map<int, std::string>::iterator it;
    if ((it = map.find(6)) != map.end()) {
        std::cout << it->second << std::endl;
    }
    return 0;
}
```

使用哈希表解两数之和问题

```c++
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); i++) {
            int num = nums[i];
            unordered_map<int, int> :: iterator it;
            if (( it = map.find(target - num)) != map.end()) {
                return vector<int>{it->second, i};
            }
            map.insert(make_pair(nums[i], i));
        }
        return vector<int>{-1, -1};
    }
};
```

## 关键字和运算符

## 流程控制

### 循环

### 条件

### 异常

## 输入输出

## 库

### 排序

sort() 函数位于 `<algorithm>` 头文件中

```c++
#include <algorithm>
//对 [first, last) 区域内的元素做默认的升序排序
void sort (RandomAccessIterator first, RandomAccessIterator last);
//按照指定的 comp 排序规则，对 [first, last) 区域内的元素进行排序
void sort (RandomAccessIterator first, RandomAccessIterator last, Compare comp);
```

如何定义排序规则

```c++
//以普通函数的方式实现自定义排序规则
bool mycomp(int i, int j) {
    return (i < j); // 从小到大排序
}

//以函数对象的方式实现自定义排序规则
class mycomp2 {
public:
    bool operator() (int i, int j) {
        return (i < j);
    }
};

```

```c++
int main() {
    std::vector<int> myvector{ 32, 71, 12, 45, 26, 80, 53, 33 };
    //调用第一种语法格式，对 32、71、12、45 进行排序
    std::sort(myvector.begin(), myvector.begin() + 4); //(12 32 45 71) 26 80 53 33
    //调用第二种语法格式，利用STL标准库提供的其它比较规则（比如 greater<T>）进行排序
    std::sort(myvector.begin(), myvector.begin() + 4, std::greater<int>()); //(71 45 32 12) 26 80 53 33
   
    //调用第二种语法格式，通过自定义比较规则进行排序
    std::sort(myvector.begin(), myvector.end(), mycomp2());//12 26 32 33 45 53 71 80
    //输出 myvector 容器中的元素
    for (std::vector<int>::iterator it = myvector.begin(); it != myvector.end(); ++it) {
        std::cout << *it << ' ';
    }
    return 0;
}
```

## 面向对象

## 高级编程

### 多线程
