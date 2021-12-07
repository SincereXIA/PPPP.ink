---
title: 题目模板
date: '2021-09-17T11:43:09.007Z'
lastmod: '2021-12-07T12:02:17.256Z'
draft: true
publish: false
---

### 示例题目

> 这里是题目的简单介绍
> introduce 

- LeetCode 地址： [292. Nim游戏](https://leetcode-cn.com/problems/nim-game/)
- 难度：简单 :green_circle: 中等 :yellow_circle: 难 :red_circle:
- 题解思路：
  - 模拟游戏流程：
    - 石子数量为 1，2，3 时必赢
    - 由于每人最多取三颗石子，当石子数量 - 1 ~ 3 范围内均为赢时，则必输
    - 因此，输的情况 4 轮 1 循环
- 遇到的问题：
  - 无
  - 不要陷入动态规划
- 代码实现：
