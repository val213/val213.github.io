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


