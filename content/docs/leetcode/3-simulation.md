---
title: 刷题之 - 模拟、数学、博弈
date: '2021-09-17T11:43:09.007Z'
lastmod: '2021-10-08T02:52:16.897Z'
draft: true
publish: false
---

## 博弈

### Nim 游戏（取石游戏）

> 你和你的朋友，两个人一起玩 Nim 游戏：
> 桌子上有一堆石头。
> 你们轮流进行自己的回合，你作为先手。
> 每一回合，轮到的人拿掉 1 - 3 块石头。
> 拿掉最后一块石头的人就是获胜者。
> 假设你们每一步都是最优解。请编写一个函数，来判断你是否可以在给定石头数量为 n 的情况下赢得游戏。如果可以赢，返回 true；否则，返回 false 。


- LeetCode [292. Nim游戏](https://leetcode-cn.com/problems/nim-game/)
- 难度：简单 :green_circle:
- 题解思路：
  - 模拟游戏流程：
    - 石子数量为 1，2，3 时必赢
    - 由于每人最多取三颗石子，当石子数量 - 1 ~ 3 范围内均为赢时，则必输
    - 因此，输的情况 4 轮 1 循环
- 遇到的问题：
  - 无
  - 不要陷入动态规划
- 代码实现：

```java
class Solution {
    public boolean canWinNim(int n) {
        return ! (n % 4 == 0);
    }
}
```

## 模拟

### 模拟两整数之和

- LeetCode: [371. 两整数之和](https://leetcode-cn.com/problems/sum-of-two-integers/)
- 概述：给你两个整数 a 和 b ，不使用 运算符 + 和 - ​​​​​​​，计算并返回两整数之和。
- 难度：中等
- 解题思路：
  - 我的思路：
    - 模拟计算机全加器，实现加法：
      - 半加器：
        ![2021-09-26-1632624396-5h9Rxy](https://static.sumblog.cn/Pic/2021-09-26-1632624396-5h9Rxy.png)
      - 全加器：
        ![2021-09-26-1632624436-GDkDq1](https://static.sumblog.cn/Pic/2021-09-26-1632624436-GDkDq1.png)
- 代码实现：

```cpp
#include <bitset>

class Solution {
public:
    int subadd(int a, int b, int &co) {
        int s = a ^ b;
        co = a & b;
        return s;
    }
    int add(int a, int b, int c, int &co) {
        int co1;
        int s = subadd(a, b, co1);
        int co2;
        s = subadd(s, c, co2);
        co = co1 | co2;
        return s;
    }
    void print2(int a) {
        std::bitset<32> x(a);
        std::cout << x << '\n';
    }
    int getSum(int a, int b) {
        int i = 0;
        int co = 0;
        int rs = 0;
        unsigned int mask = 1;
        print2(a);
        print2(b);

        while (i < 32)
        {
            cout << "mask: ";
            print2(mask);
            int bita = a & mask;
            int bitb = b & mask;
            co = co << 1;
            cout << "mask "<< mask<< " a: " << bita << " b: " << bitb << " co: " << co << endl;
            int r = add(bita, bitb, co, co);
            rs |= r;
            print2(rs);
            i += 1;
            mask = mask << 1;
        }
        return rs;
    }
};
```

- 优秀解法：
  - 新的概念：无进位加法、总进位结果
  - 可以发现，对于整数 a 和 b：
    - 在不考虑进位的情况下，无进位加法结果为 a⊕b
    - 而所有需要进位的位为 `a & b` 进位后的进位结果为 `(a & b) << 1`

```cpp
int getSum(int a, int b) 
{
    int sum, carry; 
    sum = a ^ b;  //异或这里可看做是相加但是不显现进位，比如5 ^ 3
                 /*0 1 0 1
                   0 0 1 1
                 ------------
                   0 1 1 0      
              上面的如果看成传统的加法，不就是1+1=2，进1得0，但是这里没有显示进位出来，仅是相加，0+1或者是1+0都不用进位*/
    
    carry = (a & b) << 1;
    
                //相与为了让进位显现出来，比如5 & 3
                /* 0 1 0 1
                   0 0 1 1
                 ------------
                   0 0 0 1
              上面的最低位1和1相与得1，而在二进制加法中，这里1+1也应该是要进位的，所以刚好吻合，但是这个进位1应该要再往前一位，所以左移一位*/
    
    if(carry != 0)  //经过上面这两步，如果进位不等于0，那么就是说还要把进位给加上去，所以用了尾递归，一直递归到进位是0。
    {
        return getSum(sum, carry);
    }
    return sum;
}
```

## 哈希表

### 重复的 DNA 序列 —— 寻找固定长度的重复子串

> 编写一个函数来找出所有目标子串，目标子串的长度为 10，且在 DNA 字符串 s 中出现次数超过一次。

- LeetCode [187. 重复的DNA序列](https://leetcode-cn.com/problems/repeated-dna-sequences/)
- 难度：中等 :yellow_circle:
- 题解思路：
  - 哈希表，滑动窗口，窗口每次循环右移一位，出现在窗口中的字符串加入哈希表统计次数
  - 降低空间复杂度：将窗口内的字符串转换为二进制，用一个数字来代替整个字符串
- 遇到的问题：
  - 无

> **如何使用位运算截取数字的二进制位** : `n = n & ( (1 << k) - 1 )` ，k 为需要截取后 k 位

- 代码：

```python
TO_BIN = {'A': 0, 'T': 1, 'C': 2, 'G': 3}

class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        i = 0
        wind = s[i:i+9]
        wind_bin = 0
        for w in wind:
            wind_bin = (wind_bin << 2) | TO_BIN[w]
        count = defaultdict(int)
        i = 9
        rs = []
        while i < len(s):
            w = s[i]
            wind_bin = ((wind_bin << 2) | TO_BIN[w]) & ( (1 << 20) - 1 )
            i += 1
            count[wind_bin] += 1
            if count[wind_bin] == 2:
                rs.append(s[i-10:i])
        return rs
```
