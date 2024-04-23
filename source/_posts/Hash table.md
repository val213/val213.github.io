---
title: Hash Table
tags: 
	- Data structure
	- Hash Table
categories: 知识分享
cover: https://th.bing.com/th/id/R.3cf25f238fe62f4ba589c2beb3b206de?rik=VNE3N0GCslIkqw&riu=http%3a%2f%2fimg3.sycdn.imooc.com%2f5d8a1cfd00013cf210220722.jpg&ehk=Gto1O8jFdsMgEo1Egnb6E3JawISzVtR8x1Lgf7tzmVw%3d&risl=&pid=ImgRaw&r=0
---
***本博客为哈佛大学的CS50 Introduction to Computer Science中数据结构哈希表这一节的笔记，我按照自己的理解排布了结构，进行了翻译并加上了自己的理解作为补充。致谢为这门课付出并公开的所有人***

## What is Hash Table?
哈希表是两种我们非常熟悉的东西的结合体。
- 第一个是哈希函数，它能把输入的内容经过处理后，返回一个特定的称为哈希码的非负整数值。
- 第二个是一个能够存储我们希望放入数据结构中的数据类型的数组。*（例如普通的数组或者是一个Vector，总之是一个能够存放“值”的容器。哈希表中的数组可以是普通的数组、向量、链表、链表数组等不同数据结构，具体取决于哈希表的实现方式。）*

* 在哈希表中，数组的每个位置都可以存储一个键值对（key-value pair），其中“键”是用来查找值的标识符，而“值”则是我们实际想要存储的数据。通过哈希函数，我们可以将键映射到数组的索引位置上，然后将值存储在对应的位置，以便能够高效地检索和操作数据。所以，这句话的意思是在哈希表中，我们使用数组来存储键值对中的值部分。*

>A hash table amounts to a combination of two things with which we’re quite familiar.
 >- First, a hash function, which returns an nonnegative integer value called a hash code.
 >- Second, an array capable of storing data of the type we wish to place into the data structure

哈希表的运作原理就是，我们把输入的数据传递给哈希函数，然后把将函数返回的哈希码存储在数组元素中。
>The idea is that we run our data through the hash function, and then store the data in the element of the array represented by the returned hash code

[![链式哈希表](https://img1.imgtp.com/2023/08/15/EFS99ifw.png)](https://img1.imgtp.com/2023/08/15/EFS99ifw.png)

## Why Hash Table?

哈希表结合了数组的随机访问能力和链表的动态性。
>Hash tables combine the random access ability of an array with the dynamism of a linked list.

如果我们定义了一个优秀的哈希表，这意味着：
 - 插入操作的时间复杂度趋向于 O(1)
 - 删除操作的时间复杂度趋向于 O(1)
 - 查找操作的时间复杂度趋向于 O(1)

>This means (assuming we define our hash table well):
> - Insertion can start to tend toward O(1)
> - Deletion can start to tend toward O(1)
> - Lookup can start to tend toward O(1)

这就相当于是我们获得了两种类型数据结构的优点，同时避免了他们的一些缺点。
>We’re gaining the advantages of both types of data structure, while mitigating the disadvantages.

为了获得这种性能升级，我们创建了一个新的结构：当我们将数据插入到该结构中时，数据本身会告诉我们在哪里可以找到它自己，以便于我们的查找操作。
>To get this performance upgrade, we create a new structure whereby when we insert data into the structure, the data itself gives us a clue about where we will find the data, should we need to later look it up.

代价就是哈希表并不擅长对数据进行排序或排序，但如果我们不关心这一点，那么就没有任何问题
>The trade off is that hash tables are not great at ordering or sorting data, but if we don’t care about that, then we’re good to go

### 一个好的哈希函数应该做到：
 - **仅使用被哈希的数据**
*（哈希函数只应该考虑要被哈希的输入数据本身，而不考虑其他额外的信息。这意味着哈希函数的计算只取决于输入数据的内容，而不受其他上下文的影响。这可以确保哈希值只取决于输入数据，而不受其他因素的影响，从而保证了哈希函数的可靠性和预测性。）*

 - **使用所有被哈希的数据**
  *（哈希函数应该利用输入数据中的所有部分来计算哈希值。不应该只选择数据的一部分进行哈希计算，而是应该使用所有的数据，以确保不同的输入数据会生成不同的哈希值。这可以提高哈希函数的分散性，减少碰撞的发生。）*
  
  *以上这两个条件强调了一个好的哈希函数应该是独立于上下文的，只关注输入数据的内容，并且要充分利用所有输入数据以获得良好的散列效果。这样可以确保哈希函数在不同情况下都能够产生均匀、分散的哈希值，减少碰撞的可能性。*

 - **具有确定性**
 - **均匀分布数据**
 - **为非常相似的数据生成非常不同的哈希码**

>A good hash function should:
>- Use only the data being hashed
>- Use all of the data being hashed
>- Be deterministic
>- Uniformly distribute data
>- Generate very different hash codes for very similar data

### 一个哈希函数的实现示例：
```C++
unsigned int hash(char* str)
{
int sum = 0;
for (int j = 0; str[j] != ‘\0’; j++)
{
sum += str[j];
}
return sum % HASH_MAX;
}

```
## 解决碰撞（Resolving collisions）

碰撞指的就是，当两条数据拥有了相同的哈希码时发生了冲突。
*（为了避免碰撞，哈希函数的设计很重要）*

>A collision occurs when two pieces of data, when run through the hash function, yield the same hash code.

### 线性探测（Linear probing）
#### 线性探测如何解决碰撞问题

在此方法中，如果发生冲突，我们会尝试将数据放置在数组中的下一个连续元素中（如有必要，则环绕到开头），直到找到空位。
这样，如果我们在第一个位置没有找到我们要找的东西，至少希望该元素在附近的某个地方。

>In this method, if we have a collision, we try to place the data in the next consecutive element in the array (wrapping around to the beginning if necessary) until we find a vacancy.
>That way, if we don’t find what we’re looking for in the first location, at least hopefully the element is somewhere nearby

[![链式哈希表](https://img1.imgtp.com/2023/08/15/840JhDzJ.png)](https://img1.imgtp.com/2023/08/15/840JhDzJ.png)
#### 线性探测的不足

*线性哈希表在处理碰撞时存在一些不足之处，主要涉及到碰撞解决策略的选择。线性哈希表使用的碰撞解决策略是开放寻址法中的线性探测（Linear Probing），其基本思想是当发生碰撞时，顺序地检查哈希表中的下一个位置，直到找到一个空闲位置来存储冲突的元素。虽然线性探测在一些情况下是有效的，但它也有一些明显的不足：*

- *聚集问题（Clustering Problem）： 线性探测容易导致聚集问题，即连续的元素在哈希表中被存储在相邻的位置，从而导致新的插入操作更可能遇到碰撞。这会使得哈希表中的填充因子（负载因子）增加，进一步增加了碰撞的可能性，影响性能。*

- *二次聚集： 线性探测可能导致二次聚集问题，其中元素在连续的位置上形成一个二次形状的聚集区域，使得哈希表的效率下降。*

- *缓存不友好： 线性探测在缓存中的内存访问模式不太友好。由于线性探测存储元素在相邻的位置上，这可能导致在访问一个位置时，需要预取的数据不会处于相邻位置，从而影响缓存性能。*

- *删除操作困难： 在线性哈希表中执行删除操作可能会很复杂。因为线性探测依赖于连续的位置，删除一个元素可能需要对其后的元素进行移动，以保持连续性，这会导致删除操作的效率较低。*

### Chaining（链式哈希表）
#### 链式哈希表如何解决碰撞问题

- 我们消除了聚类。
- 我们从链表的经验中知道插入和创建（如果需要）到链表中的操作是 O(1) 的。
- 对于查找，我们只需要搜索一个小列表，因为我们正在将一个大列表分布在 n 个列表中。
  
>- we eliminated clustering.
>- We know from experience with linked lists that insertion (and creation, if necessary) into a linked list is an O(1) operation.
> - For lookup, we only need to search through what is hopefully a small list, since we’re distributing what would otherwise be one huge list across n lists.

[![链式哈希表](https://img1.imgtp.com/2023/08/15/zZTYLEyW.png)](https://img1.imgtp.com/2023/08/15/zZTYLEyW.png)