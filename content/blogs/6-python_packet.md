---
title: 如何构建并且在 PyPi 发布你的 Python 库
date: '2021-07-27T03:04:03.946Z'
autoIgnore: true
categories:
    - 帮助中心
tags:
    - blog
slug: 如何构建并且在-pypi-发布你的-python-库
keywords:
    - python
---

最近网盘项目需要一个通用编程接口，因此写了一个 Python 库对网盘操作进行封装：[jcs-sdk](https://pypi.org/project/jcs-sdk/)，这里记录一下构建并发布一个 Python 库的方法。

![2021-07-27-1627356938-h7i6ra](https://static.sumblog.cn/Pic/2021-07-27-1627356938-h7i6ra.png)

<!-- more -->

## 写一个 python 库

### 目录结构

```shell
.
├── JointCloudStorage # 存放所有的代码 目录名即为 python 库名
│   ├── __init__.py # 初始化文件，注意，一个 python 库必须要有这个文件
│   ├── auth.py
│   ├── bucket.py
│   ├── exceptions.py
│   └── state.py
├── README.md # 项目详细介绍
├── examples # 代码示例
│   ├── tmp
│   └── use.py
├── requirements.txt # 依赖包
├── setup.py # 项目构建脚本
├── tests # 代码测试
│   └── test_jsi_pytest.py
```

### 模板代码

`__init__.py`

```python
from JointCloudStorage.auth import *
from JointCloudStorage.bucket import *
from JointCloudStorage.state import *
```

- `__init__.py` 该文件的作用就是相当于把自身整个文件夹当作一个包来管理，每当有外部import的时候，就会自动执行里面的函数。
- 通常使用该文件控制模块的导入，可以在 `__init__.py` 中指定默认导入的模块

> 有时候我们在做导入时会偷懒，将包中的所有内容导入
>
> ```python
> from mypackage import *
> ```
>
> 这是怎么实现的呢？ `__all__` 变量就是干这个工作的。
> `__all__` 关联了一个模块列表，当执行 from xx import * 时，就会导入列表中的模块。我们将 `__init__.py` 修改为 :
>
> ```python
> __all__ = ['subpackage_1', 'subpackage_2']
> ```
>
> 这样就可以导入 `subpackage_1` 和 `subpackage_2` 模块了。

`setup.py`

```python
from setuptools import find_namespace_packages, setup, find_packages

# 读取项目的readme介绍
with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name="jcs-sdk",
    version="1.7.26",
    author="sincerexia",  # 项目作者
    author_email="zhangjh@act.buaa.edu.cn",
    description="This is the official Python SDK for JointCloudStorage",
    long_description=long_description, # 长介绍，直接读取 markdown 文件
    long_description_content_type="text/markdown",
    url="https://www.jointcloudstorage.cn",
    packages=find_packages(),
    python_requires=">=3.6", # 该项目需要的python版本
    install_requires=[ # 依赖包
        "requests>=2.26.0",
    ],
)
```

## 发布

```shell
pip install twine
python setup.py develop
python setup.py sdist
python setup.py bdist_wheel
twine upload dist/*
```
