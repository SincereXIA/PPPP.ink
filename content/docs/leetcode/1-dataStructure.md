---
title: 刷题之 - 数据结构
date: '2021-09-17T11:43:09.007Z'
lastmod: '2021-10-17T02:05:43.543Z'
draft: true
publish: false
---

## 二叉树

### 判断是否为平衡二叉树

- 自底向上递归
  - 对于当前遍历的节点，递归判断左右子树是否平衡，再判断当前节点为根的子树是否平衡
  - **树高度同时代表是否平衡** 若平衡，返回当前节点的高度，若不平衡，返回-1

### 二叉树中的最大路径和

- LeetCode 地址： [124 二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/description/)
- 题解思路
  - 递归：自顶向下，包含当前节点的最大路径和，与左节点的最大路径和，与右节点的最大路径和有关
    - 对外提供的最大贡献值：从左子节点到根，或从右子节点到根，**或单独根**
    - 内部可能的最大路径和：从左子节点到根再到右子节点，此时需要一个全局变量对其进行记录
  - 使用全局变量，递归每一步时更新
- 遇到的问题
  - 没有考虑到子节点对外提供的最大贡献值为负数的情况
- 代码实现

```java
class Solution {
    Integer max  = null;
    public int pathSum(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int maxL = pathSum(root.left);
        int maxR = pathSum(root.right);
        if (maxL < 0) {
            maxL = 0;
        }
        if (maxR < 0) {
            maxR = 0;
        }
        int sum = maxL + maxR + root.val;
        if (max == null || max < sum) {
            max = sum;
        }
        return maxL > maxR ? maxL + root.val : maxR + root.val;
    }


    public int maxPathSum(TreeNode root) {
        // 左 + 根
        // 右 + 根
        // 左 + 根 + 右（end）
        max = null;
        int pathSum = pathSum(root);
        return max > pathSum ? max : pathSum;
    }
}
```

### 二叉搜索树中第 k 小的元素

- LeetCode 地址： [230. 二叉搜索树中第K小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)
- 难度：中等
- 标签：二叉树 中序遍历
- 题解思路
  - 因为二叉搜索树和中序遍历的性质，所以二叉搜索树的中序遍历是按照键增加的顺序进行的。于是，我们可以通过中序遍历找到第 kk 个最小元素。
- 遇到的问题
  - 使用迭代而不是递归，可以在找到答案后停止，不需要遍历整棵树
  - 没有想到中序遍历，而是复杂的使用了深度搜索
- 代码实现

```python
# 深度搜索
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        global rs
        rs = -1
        def find(root, fk):
            if not root.left:
                mk = fk + 1
            else:
                mk = find(root.left, fk) + 1
            if mk == k:
                global rs
                rs = root.val
                tk = mk
            if mk < k:
                if root.right:
                    tk = find(root.right, mk)
            else:
                tk = mk
            return tk
        find(root, 0)
        return rs

# 中序遍历解法
class Solution:
    def kthSmallest(self, root: TreeNode, k: int) -> int:
        stack = []
        while root or stack:
            while root:
                stack.append(root)
                root = root.left
            root = stack.pop()
            k -= 1
            if k == 0:
                return root.val
            root = root.right

```
