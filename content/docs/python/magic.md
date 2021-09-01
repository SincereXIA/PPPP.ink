---
title: Python Magic Methods
date: 2021-06-30T08:52:47.887Z
lastmod: 2021-06-30T08:52:49.305Z
draft: false
---

## 分割与合并

- 使用 `zip_longest` 同时取出两个数组在相同位置上的元素

    ```python
    for v1, v2 in zip_longest(a, b, fillvalue=0):
        print(v1, v2)
    ```
  
  若两个数组长度不同，可以使用默认值来补全