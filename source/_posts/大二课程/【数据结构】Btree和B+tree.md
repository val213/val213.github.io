---
title: 【数据结构】Btree家族
tags:    
    - Data structure
    - 树
categories: 复习笔记
mathjax: true
---
## Btree
### Btree 介绍
- Btree 是一种多路搜索树，每个节点可以存储多个元素，每个元素可以有多个子节点。
- 对于一棵M阶的B树，每个节点最多有M个子节点，最少有⌈M/2⌉个子节点（⌈x⌉为向上取整符号）；最多有M-1个元素，最少有⌈M/2⌉-1个元素。（B+树也是一样）
- 2-3树是一种特殊的 btree，**2-3树的阶数为 3**，每个节点最多有 2 个元素，最多有 3 个子节点。（其中“2-3”代表的是该树允许的子节点个数范围）
- 同样地，对于一棵**4阶的2-3-4树**，每个节点最多有4个子节点，最多有3个元素。每个节点最少有2个子节点，最少有1个元素。
### Btree 特性
1.关键字集合分布在整颗树中；

2.任何一个关键字出现且只出现在一个结点中；

3.搜索有可能在非叶子结点结束；

4.其搜索性能等价于在关键字全集内做一次二分查找；

### Btree 的插入
- 插入的时候，先找到插入的位置，然后插入到叶子节点中。
- 如果插入之后，叶子节点的元素个数大于 m，那么就需要进行分裂操作。
- 分裂操作：将叶子节点的元素分成两部分，左边的元素个数为 (m+1)/2，右边的元素个数为 m-(m+1)/2，然后将左边的元素放到左边的节点中，右边的元素放到右边的节点中，然后将中间的元素插入到父节点中。
- 如果父节点的元素个数大于 m，那么就需要继续进行分裂操作。

### Btree 的删除
- 删除的时候，先找到删除的位置，然后删除该元素。
- 如果删除之后，叶子节点的元素个数小于 m/2，那么就需要进行合并操作。
- 合并操作：将叶子节点的元素合并成一个节点，然后将父节点中的元素删除，然后将合并后的节点插入到父节点中。
- 如果父节点的元素个数小于 m/2，那么就需要继续进行合并操作。

## B+tree
B+树的非叶子节点**只是用来索引的**，它们的值是它们的子树中的最大（或最小）关键字，而不是数据本身。**数据只存储在叶子节点中**，**每个叶子节点包含一个数据指针，指向磁盘上的真实记录**。因此，B+树中的一个值可能同时出现在非叶子节点和叶子节点中，但非叶子节点的值只是为了控制查找，而叶子节点的值才是真正的数据。
### B+tree和Btree的区别
如果叶节点作为链表连接，则B树称为B+树。


- B+tree 的非叶子节点只存储索引，不存储数据，而 Btree 的非叶子节点既存储索引也存储数据。
- B+tree 的叶子节点之间有一个链表，而 Btree 的叶子节点之间没有链表。
- B+tree 的叶子节点存储的数据是有序的，而 Btree 的叶子节点存储的数据是无序的。
- B+tree 的叶子节点存储的数据是可重复的，而 Btree 的叶子节点存储的数据是不重复的。

B+树支持range-query(区间查询)非常方便，而B树不支持。这是数据库选用B+树的最主要原因。

### 插入删除操作示例：
[![B+.png](https://drive.google.com/file/d/1pPxcUyyeKA2tb14APbCmcA1QwkOswmVQ/view?usp=drive_link)](https://drive.google.com/file/d/1pPxcUyyeKA2tb14APbCmcA1QwkOswmVQ/view?usp=drive_link)
## B* 树
在B+树基础上，是B+树的变体，在B+树的非根和非叶子结点再增加指向兄弟的指针，将结点的最低利用率从1/2提高到2/3

## LLRB(left-leaning red-black tree)
*以下这段话来自CS61b的文档。*
>We said in the previous section that we really like 2-3 trees because they always remain balanced, but we also don't like them because they are hard to implement. But why not both? Why not create a tree that is implemented using a BST, but is structurally identical to a 2-3 tree and thus stays balanced? (Note that in this chapter we will be honing in on 2-3 Trees specifically, not 2-3-4 trees)
>
>Enter the Red-Black Tree
>
>We are going to create this tree by looking at a 2-3 tree and asking ourselves what kind of modifications we can make in order to convert it into a BST.
>
>For a 2-3 tree that only has 2-nodes (nodes with 2 children), we already have a BST, so we don't need to make any modifications!
>
>However, what happens when we get a 3-node?
>
>One thing we could do is create a "glue" node that doesn't hold any information and only serves to show that its 2 children are actually a part of one node.
>
>However, this is a very inelegant solution because we are taking up more space and the code will be ugly. So, instead of using glue nodes we will use glue links instead!
>
>We choose arbitrarily to make the left element a child of the right one. This results in a left-leaning tree. We show that a link is a glue link by making it red. Normal links are black. Because of this, we call these structures left-leaning red-black trees (LLRB). We will be using left-leaning trees in 61B.
>
>Left-Leaning Red-Black trees have a 1-1 correspondence with 2-3 trees. Every 2-3 tree has a unique LLRB red-black tree associated with it. As for 2-3-4 trees, they maintain correspondence with standard Red-Black trees.
>LLRBs maintain correspondence with 2-3 tree, Standard Red-Black trees maintain correspondence with 2-3-4 trees.