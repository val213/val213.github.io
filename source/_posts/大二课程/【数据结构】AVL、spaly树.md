---
title: 【数据结构】AVL树+splay树
tags:    
    - Data structure
    - 树
categories: 复习笔记
mathjax: true
---
## AVL树
### 前置知识
- 二叉排序树：左子树的所有节点都小于根节点，右子树的所有节点都大于根节点
- 平衡二叉树：左右子树的高度差不超过1的二叉排序树
- 二叉树的高度：根节点到叶子节点的最长路径
- 二叉树的深度：根节点到叶子节点的最短路径
- 二叉树的平衡因子：左子树的高度减去右子树的高度

### AVL树的定义
- AVL树是一棵空树或者它的**左右两个子树的高度差的绝对值不超过1**，并且左右两个子树都是一棵平衡二叉树的二叉排序树。

### AVL树的调整
- LL型单旋：右旋
- RR型单旋：左旋
- LR型双旋：先左旋再右旋
- RL型双旋：先右旋再左旋
- tips：旋转之后，根节点的平衡因子为0，左右子树的平衡因子为1或者-1


#### 图解：


#### AVL树的插入
按照**常规的二叉排序树的插入方法**插入节点，然后从插入节点开始向上**回溯**，找到**第一个平衡因子的绝对值大于1的节点**，然后根据该节点的平衡因子和插入节点的值的大小关系，进行旋转操作。

#### AVL树的删除
如果删除的节点是叶子节点，直接删除即可。如果删除的节点不是叶子节点，那么需要找到**该节点的前驱或者后继节点**来**替换该节点**，**然后删除前驱或者后继节点**。删除之后，从删除节点的父节点开始向上**回溯**，找到**第一个平衡因子的绝对值大于1的节点**，然后根据该节点的平衡因子和插入节点的值的大小关系，进行旋转操作。

## splay树
- Splay trees tend to be balanced

M operations takes time O(M log N) for M > N operations on N items. (proof is difficult)

Amortized O(log n) time.

- Splay trees have good “locality” properties
Recently accessed items are near the root of the tree.

Items near an accessed one are pulled toward the root.


### splay
[![spaly.png](https://img1.imgtp.com/2023/09/18/4AU1Bf0C.png)](https://img1.imgtp.com/2023/09/18/4AU1Bf0C.png)
#### zig-zag（之字形)
Parent and grandparent in different directions.

其实就是LR。先右旋，再左旋。
#### zig-zig(一字形)
Parent and grandparent in same direction.

其实就是RR。先左旋，再左旋。