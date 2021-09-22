---
title: 刷题之 - 算法
date: '2021-09-17T11:43:09.007Z'
lastmod: '2021-09-20T12:07:37.914Z'
draft: true
publish: false
---

## 动态规划

### 最长递增子序列的个数

- leetcode 地址：[673. 最长递增子序列的个数](https://leetcode-cn.com/problems/number-of-longest-increasing-subsequence/)
- tags: `DP` `子数组`
- 难度： 困难
- 解题思路：
  - **双动态规划**
    - `dp 数组`: `dp[i]` 表示以 `nums[i]` **结尾**的最长递增子序列的长度
    - `cnt 数组`: `cnt[i]` 表示以 `nums[i]` 结尾的最长递增子序列的个数
    - 状态转移：
      - `dp[i] = max(dp[j]) + 1` 当 `nums[i] > nums[j]`
      - `cnt[i] = sum(cnt[j])` 当 `dp[i] == dp[j] + 1` 最长递增子序列的个数，等于 长度 -1 的递增子序列的和
  - 动态规划并不能直接产生结果，需要在计算过程中不断更新最长递增子序列的长度和个数
- 遇到的问题：
  - 陷入使用动态规划直接求解的胡同
  - 可能会在动态规划过程中，出现多次相同的最大长度，需要对其进行加和
  - 搞清楚转移的具体含义
  - 转移计算的最后一个值，不一定就是所求值
- 代码实现：
```java
class Solution {
    public int findNumberOfLIS(int[] nums) {
        int[] dp = new int[nums.length];
        int[] cnt = new int[nums.length];
        dp[0] = 1;
        cnt[0] = 1;
        int rs = 1;
        int max_len = 1;
        for (int i = 1; i < nums.length; i++){
            int num = nums[i];
            int max = 1; //
            cnt[i] = 1; // 
            for (int j = 0; j < i; j++) {
                int c = 0;
                if (num > nums[j]) {
                    c = dp[j] + 1;
                    if (c > max) {
                        max = c;
                        cnt[i] = cnt[j];
                    } else if (c == max) {
                        cnt[i] += cnt[j];
                    }
                } 
            }
            dp[i] = max;
            if (dp[i] > max_len) { // 后处理
                max_len =dp[i];
                rs = cnt[i];
            } else if (dp[i] == max_len) {
                rs += cnt[i];
            }
        }
        return rs;
    }
}
```
