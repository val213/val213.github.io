---
title: Trie
tags: 
	- Data structure
	- Trie
categories: 知识分享
cover: https://img1.imgtp.com/2023/08/20/yEDRCZaY.png
---
***本博客为哈佛大学的CS50 Introduction to Computer Science中数据结构 【Tries】这一节的笔记，我按照自己的理解排布了结构，进行了翻译并加上了自己的理解作为补充。致谢为这门课付出并公开的所有人***

## What is Trie

Trie以一种有趣的方式尝试将结构和指针组合在一起来存储数据。

• 要在Trie中搜索的数据是路线图。
• 如果您可以从头到尾遵循地图，则数据存在于Trie。
• 如果你不能，那就不存在。
• 与哈希表不同，Trie不存在冲突，也不存在两个数据块（除非它们相同）具有相同的路径

>Tries combine structures and pointers together to store data in an interesting way.
>• The data to be searched for in the trie is now a roadmap. 
>• If you can follow the map from beginning to end, the data exists in the trie.
>• If you can’t, it doesn’t.
>• Unlike with a hash table, there are no collisions, and no two pieces of data (unless they are identical) have the same path

Trie是一种这样的数据结果：键保证是唯一的，值可以是就像一个布尔值一样简单，告诉您数据是否存在于结构中。

>A data structure where the key is guaranteed to be unique, and the value could be as simple as a Boolean that tells you whether the data exists in the structure

[![Trie](https://img1.imgtp.com/2023/08/20/yEDRCZaY.png)](https://img1.imgtp.com/2023/08/20/yEDRCZaY.png)

*Trie（也称为前缀树或字典树）时，实际上是在讨论一种用于有效存储和检索字符串键值对的数据结构。Trie 在处理字符串数据时具有独特的优势，特别适用于搜索引擎、自动完成、拼写检查以及字典等应用领域。*

*Trie 的主要特点是将字符串键分解为一系列字符，然后将这些字符作为树的节点构建一个树状结构，使得具有共同前缀的键能够共享相同的节点。这样，Trie 在查找、插入和删除操作上具有很高的效率，因为它可以利用共享的前缀来避免不必要的比较。*

## 以下是 Trie 数据结构的主要特点和优势：

*前缀共享： Trie 能够有效地存储具有共同前缀的字符串。这减少了存储空间，并使得查找具有相同前缀的键非常高效。*

*快速搜索： 在 Trie 中查找操作的时间复杂度与键的长度相关，而与存储的键数量无关。这使得 Trie 在大量字符串的情况下仍然能够保持高效。*

*插入和删除： 向 Trie 插入和删除键都是高效的操作，因为 Trie 利用了共享的前缀。*

*自动完成和拼写检查： Trie 在自动完成和拼写检查等应用中非常有用。通过遍历 Trie，可以快速找到与用户输入相关的建议或纠正。*

*不足之处： 尽管 Trie 具有许多优点，但在存储大量键时，它可能会占用较大的内存空间。此外，对于分布广泛的数据集，Trie 的深度可能会变得较大，从而降低了效率。*

## 代码示例
### python
在这个例子中，我们首先定义了一个 TrieNode 类，它代表 Trie 的节点。然后，我们定义了 Trie 类，其中包含插入、搜索和以给定前缀开头的方法。我们使用这些方法来插入单词，搜索单词以及检查是否存在以特定前缀开头的单词。
```python
class TrieNode:
    def __init__(self):
        self.children = {}  # 字符到子节点的映射
        self.is_end_of_word = False  # 是否是一个单词的结束

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
    
    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word
    
    def starts_with(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True

# 使用示例
trie = Trie()
trie.insert("apple")
trie.insert("app")
print(trie.search("apple"))  # 输出: True
print(trie.search("app"))    # 输出: True
print(trie.search("ap"))     # 输出: False
print(trie.starts_with("app"))  # 输出: True

```


在 Python 中实现 Trie 时，由于 Python 是一种高级动态语言，它的对象模型和内存管理与 C++ 有很大的不同。Python 中的数据结构都是对象，而对象的引用计数和垃圾回收是由 Python 解释器自动管理的，而不需要像 C++ 那样手动管理内存和指针。因此，在 Python 中实现 Trie 时，我们可以使用字典（dict）数据结构来表示节点之间的连接，而不需要直接操作指针。

在 Python 示例中，我们使用了 dict 数据结构来存储子节点的连接，这与使用指针在 C++ 中表示连接的概念类似。Python 的字典允许我们使用键（在这里是字符）来访问值（在这里是子节点）。因此，Python 的字典可以看作是一种高级的键-值映射，与 C++ 中的指针类似，可以在不同节点之间建立关联。

综上所述，虽然 Python 中没有显式的指针概念，但使用字典数据结构可以在 Python 中实现 Trie 的节点连接，从而实现相似的功能。

### C++
```C++
#include <iostream>
#include <unordered_map>

class TrieNode {
public:
    std::unordered_map<char, TrieNode*> children;
    bool is_end_of_word;

    TrieNode() {
        is_end_of_word = false;
    }
};

class Trie {
private:
    TrieNode* root;

public:
    Trie() {
        root = new TrieNode();
    }

    void insert(const std::string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (node->children.find(c) == node->children.end()) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
        node->is_end_of_word = true;
    }

    bool search(const std::string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (node->children.find(c) == node->children.end()) {
                return false;
            }
            node = node->children[c];
        }
        return node->is_end_of_word;
    }

    bool startsWith(const std::string& prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (node->children.find(c) == node->children.end()) {
                return false;
            }
            node = node->children[c];
        }
        return true;
    }
};

int main() {
    Trie trie;
    trie.insert("apple");
    trie.insert("app");
    
    std::cout << std::boolalpha;
    std::cout << trie.search("apple") << std::endl;  // 输出: true
    std::cout << trie.search("app") << std::endl;    // 输出: true
    std::cout << trie.search("ap") << std::endl;     // 输出: false
    std::cout << trie.startsWith("app") << std::endl;  // 输出: true
    
    return 0;
}

```

#### Tips:

```C++
if (node->children.find(c) == node->children.end()) {
    node->children[c] = new TrieNode();
}

```
这段代码是用来在 Trie 数据结构中插入新的节点的逻辑。
在 Trie 数据结构中，每个节点都有一个 children 成员变量，它是一个哈希表（unordered_map）。这个哈希表用来存储当前节点与下一个可能的字符之间的连接关系。

让我们逐行解释这段代码：

node->children.find(c): 这一部分的意思是在当前节点的 children 哈希表中查找键为 c 的项。find(c) 返回一个迭代器，指向键为 c 的项，如果没有找到则返回迭代器指向 end()，表示没找到。

node->children.end(): 这表示当前节点的 children 哈希表中的末尾迭代器，用来表示哈希表中没有任何项了。

node->children.find(c) == node->children.end(): 这一部分是在检查当前节点的 children 哈希表中是否没有键为 c 的项，也就是检查是否需要为字符 c 创建一个新的节点。

如果上述条件成立，意味着当前节点的 children 哈希表中没有与字符 c 对应的节点，所以我们进入条件块。在条件块内，我们创建一个新的 TrieNode 节点，并将它与字符 c 建立连接，将这个新节点添加到当前节点的 children 哈希表中。

这样，这段代码的目的是在 Trie 数据结构中确保每个字符都有对应的节点，如果没有就创建一个新节点。这个逻辑保证了 Trie 中的字符连接的完整性。