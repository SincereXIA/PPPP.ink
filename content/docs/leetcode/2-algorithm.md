---
title: 刷题之 - 算法
date: '2021-09-17T11:43:09.007Z'
lastmod: '2021-12-07T12:20:08.224Z'
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

## 深度优先搜索

### 边界着色

> 二维矩阵表示一个图，给出图中一个坐标，用给定颜色为连通分量的边界着色。

- LeetCode 地址： [1034. 边框着色](https://leetcode-cn.com/problems/coloring-a-border/)
- 难度：中等 :yellow_circle: 
- 题解思路：
  - 深度优先搜索或广度优先搜索
- 遇到的问题：
  - 标记边界之后，不能直接退出，防止出现起始点就是边界的情况
  - 可以在递归调用之前，先标记已经访问过
- 代码实现：

```python
class Solution:
    def colorBorder(self, grid: List[List[int]], row: int, col: int, color: int) -> List[List[int]]:
        dr = [-1, 1, 0, 0]
        dc = [0, 0, -1, 1]

        def out_edge(x, y):
            if x < 0 or y < 0 or x >= len(grid) or y >= len(grid[0]):
                return True
            return False

        def dfs(visit, row: int, col: int, color: int, new_color: int):
            if out_edge(row, col) or visit[row][col]:
                return
            pc = grid[row][col]
            if pc != color:
                return
            visit[row][col] = 1
            for i in range(4):
                x = row + dr[i]
                y = col + dc[i]
                if out_edge(x, y) or (not visit[x][y] and grid[x][y] != color):
                    grid[row][col] = new_color
                    break

            for i in range(4):
                x = row + dr[i]
                y = col + dc[i]
                dfs(visit, x, y, color, new_color)
        
        visit = [ [0 for _ in grid[0]] for _ in grid ]
        new_color = color
        color = grid[row][col]
        dfs(visit, row, col, color, new_color)
        return grid
```
