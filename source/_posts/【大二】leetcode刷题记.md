---
title: LeetCode刷题记
tags: 
	- data structure
categories: 复习笔记
---

## linked list
### 2. Add Two Numbers
> You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
> 
> You may assume the two numbers do not contain any leading zero, except the number 0 itself.

这道题原理很简单，就是基础的带进位的加法器，但是需要注意的是链表的使用。

虚拟头节点、指向虚拟头节点的指针`dummy`和临时节点`temp`.

在进入加法循环之前，先利用`ListNode`的无参构造函数创建一个虚拟头指针作为起点，然后再定义一个临时指针`temp`，将`temp`指针初始化为`dummy`指针，即让`temp`指向`dummy`所指向的节点。

也就是说，同一个虚拟头节点拥有两个指向它的指针`dummy`和`temp`，后续`temp`作为临时指针不断移动到下一个新的有效节点，而`dummy`一直指向最开始的虚拟头节点不变。所以最后返回`dummy->next`的时候就是从第一个有效结点开始的链表全体了。


*解决方案的代码由@m_isha_125的回答提供。*
```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* dummy=new ListNode();
        ListNode* temp=dummy;
        int carry=0;
        while(l1!=NULL || l2!=NULL || carry){
            int sum=0;
            if(l1!=NULL){
                sum+=l1->val;
                l1=l1->next;
            }
            if(l2!=NULL){
                sum+=l2->val;
                l2=l2->next;
            }
            sum+=carry;
            carry=sum/10;
            ListNode* newnode=new ListNode(sum%10);
            temp->next=newnode;
            temp=temp->next;
        }
        return dummy->next;
    }
};
```
#### 内存泄漏的问题
在C++中，`new`和`delete`是成对出现的，如果在使用`new`之后没有使用`delete`，就会造成内存泄漏。在这道题中，如果不使用`delete`，就会造成内存泄漏。
修改：
```cpp
class Solution {
public:
	ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
		ListNode* dummy=new ListNode();
		ListNode* temp=dummy;
		int carry=0;
		while(l1!=NULL || l2!=NULL || carry){
			int sum=0;
			if(l1!=NULL){
				sum+=l1->val;
				l1=l1->next;
			}
			if(l2!=NULL){
				sum+=l2->val;
				l2=l2->next;
			}
			sum+=carry;
			carry=sum/10;
			ListNode* newnode=new ListNode(sum%10);
			temp->next=newnode;
			temp=temp->next;
		}
		ListNode* ans=dummy->next;
		delete dummy;
		return ans;
	}
};
```

### 19. Remove Nth Node From End of List
> Given the head of a linked list, remove the nth node from the end of the list and return its head.      
```C++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode *fast = head, *slow = head;
        for (int i = 0; i < n; i++) fast = fast->next;
        if (!fast) return head->next;
        while (fast->next) fast = fast->next, slow = slow->next;
        slow->next = slow->next->next;
        return head;
    }
};
```
这道题有两个思路。一个是单指针遍历两次链表，但是不太好控制改变后继节点的是哪一个，各种情况很难有一个通用的循环格式（至少我尝试了一会没能成功）；第二种就是双指针，快慢指针，快指针先走n步，然后快慢指针一起走，当快指针走到链表尾部的时候，慢指针就是要删除的节点的前驱节点，然后改变后继节点即可。有一点需要注意就是，fast先走n步是绝对不会越界的，正数倒数都大于等于n个结点。

### 21. Merge Two Sorted Lists
> Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.

原来思路是挨个元素提取出来排序再放回一个新的链表里，但是……

*你的代码有一些错误，我可以帮你指出并改正。首先，你的代码没有考虑两个链表为空的情况，这可能导致空指针异常。其次，你的代码使用了一个额外的 vector 容器来存储两个链表中的元素，然后对其进行排序，这增加了空间复杂度和时间复杂度。最后，你的代码在遍历 vector 时没有创建新的节点，而是直接修改了原来的节点的值，这可能破坏了原来的链表结构，并且可能导致内存泄漏。*

建议答案：
```C++
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // 如果两个链表都为空，直接返回空指针
        if (list1 == nullptr && list2 == nullptr) return nullptr;
        // 创建一个哑节点作为结果链表的头节点
        ListNode* dummy = new ListNode();
        // 创建一个指针指向结果链表的当前节点
        ListNode* curr = dummy;
        // 当两个链表都不为空时，比较它们的头节点的值，将较小的节点添加到结果链表中，并移动对应的指针
        while (list1 != nullptr && list2 != nullptr) {
            if (list1->val < list2->val) {
                curr->next = list1;
                list1 = list1->next;
            } else {
                curr->next = list2;
                list2 = list2->next;
            }
            curr = curr->next;
        }
        // 当跳出循环时，说明有一个链表已经为空，将另一个链表剩余的部分直接接到结果链表中
        curr->next = list1 == nullptr ? list2 : list1;
        // 返回结果链表的头节点
        return dummy->next;
    }
};
```
这个代码的时间复杂度是 O(n+m)，其中 n 和 m 分别是两个链表的长度。空间复杂度是 O(1)，只需要常数级别的额外空间.


### 1071.Greatest Common Divisor of Strings
>For two strings s and t, we say "t divides s" if and only if s = t + ... + t (i.e., t is concatenated with itself one or more times).
>
>Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

```C++
class Solution {
public:
    string gcdOfStrings(string str1, string str2) {
        return (str1 + str2 == str2 + str1)? 
        str1.substr(0, gcd(size(str1),size(str2))): "";
    }
};
```
这道题的思路是，如果两个字符串存在最大公约数，那么这个最大公约数一定是两个字符串的前缀，所以只需要找到两个字符串的最大公约数的长度，然后截取其中一个字符串的前缀即可。

>断更了几个月，最近“金三银四”，惊觉自己还没准备好，有的同学准备蓝桥杯已经刷了不少题了，我也打算回来抽空刷刷题。


# Hot 100
## 哈希
1. 两数之和
2. 字母异位词分组
3. 最长连续序列
## 双指针
1. 移动零
2. 盛最多水的容器
>这道题非常适合使用双指针技巧来解决。这里的双指针主要指的是左右指针。你可以考虑以下思路：
>1. **初始化**：左指针`left`置于数组的开始位置，右指针`right`置于数组的末尾位置。这代表了容器的最大宽度。
>2. **移动规则**：比较左右指针指向的高度，移动较短的一端。因为容器的容量受限于较短的边，移动较长的边不会增加容器的容量，反而可能减少容量，因为容器的宽度在减小。
>3. **计算容量**：在每次指针移动后，计算当前指针所围成的容器的容量，更新最大容量。
>4. **终止条件**：当左指针和右指针相遇时，所有可能的容器都已经考虑过了，算法结束。
>这个方法的关键在于理解为什么移动较短的边可以保证不会错过最大容量的容器。这是因为，如果移动较长的边，无论较长的边的后续高度如何，由于宽度的减少，不可能得到更大的容量。而移动较短的边，有可能会遇到更高的边，从而增加容量。
3. 接雨水
> 方法三：双指针
动态规划的做法中，需要维护两个数组 leftMax 和 rightMax，因此空间复杂度是 O(n)。是否可以将空间复杂度降到 O(1)？
注意到下标 i 处能接的雨水量由 leftMax[i] 和 rightMax[i] 中的最小值决定。由于数组 leftMax 是从左往右计算，数组 rightMax 是从右往左计算，因此可以使用双指针和两个变量代替两个数组。
维护两个指针 left 和 right，以及两个变量 leftMax 和 rightMax，初始时 left=0,right=n−1,leftMax=0,rightMax=0。指针 left 只会向右移动，指针 right 只会向左移动，在移动指针的过程中维护两个变量 leftMax 和 rightMax 的值。
当两个指针没有相遇时，进行如下操作：
使用 height[left] 和 height[right] 的值更新 leftMax 和 rightMax 的值；
如果 height[left]<height[right]，则必有 leftMax<rightMax，下标 left 处能接的雨水量等于 leftMax−height[left]，将下标 left 处能接的雨水量加到能接的雨水总量，然后将 left 加 1（即向右移动一位）；
如果 height[left]≥height[right]，则必有 leftMax≥rightMax，下标 right 处能接的雨水量等于 rightMax−height[right]，将下标 right 处能接的雨水量加到能接的雨水总量，然后将 right 减 1（即向左移动一位）。
当两个指针相遇时，即可得到能接的雨水总量。
作者：力扣官方题解
链接：https://leetcode.cn/problems/trapping-rain-water/solutions/692342/jie-yu-shui-by-leetcode-solution-tuvc/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 滑动窗口
1. 无重复字符的最长子串
2. 找到字符串中所有字母异位词

滑动窗口类型的题目，通常都是在一个字符串（或数组）上通过滑动窗口来求解的。滑动窗口的思路是这样的：
1. 在字符串上使用两个指针，一个左指针和一个右指针，通常初始化为字符串的开头。
2. 移动右指针，直到找到一个符合条件的窗口，然后移动左指针，直到窗口不再符合条件。
3. 重复第 2 步，直到右指针到达字符串的末尾。

窗口滑动的过程中，需要维护一些数据结构，比如哈希表，来记录窗口中的一些信息。这些信息可以帮助我们判断窗口是否符合条件，以及在滑动窗口的过程中更新答案。

## 子串
1. 和为K的子数组
2. 滑动窗口最大值
>暴力法复杂度是O(n*K)，TLE了，使用双端队列优化，使得每个元素只被操作一次，复杂度是O(n)。
>双端队列的作用是存储当前窗口的最大值的下标，双端队列的头部是当前窗口的最大值的下标。当窗口向右移动时，我们需要把双端队列的头部的元素去掉，直到队列为空或者队列的尾部的元素大于当前元素，然后把当前元素加入队列的尾部。这样，双端队列中的元素就是按照从大到小的顺序排列的，双端队列的头部元素就是当前窗口的最大值的下标。
>一共四步骤：
>1. 移除不在窗口内的元素
>2. 移除所有小于当前元素的值
>3. 添加当前元素索引
>4. 添加当前窗口的最大值
3. 最小覆盖子串
>引入了start，len和valid来判断窗口是否符合条件，以及在滑动窗口的过程中更新答案。

## 普通数组
1. 最大子数组和
2. 合并区间
