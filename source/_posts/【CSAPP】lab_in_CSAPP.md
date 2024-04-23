---
title: 【CSAPP】lab_in_CSAPP
tags: 
	- 计算机组成原理
categories: 复习笔记
---
***本博客为CMU的15-213/15-513 Introduction to Computer Systems (ICS)的配套教材CSAPP（深入理解计算机系统）的lab笔记***
## 开始前的准备
### 下载self-study-handout
在http://csapp.cs.cmu.edu/3e/labs.html，作为非参与课程的自学学生，每个lab都可以下载self-study-handout的tar压缩包，里面包含了所有该lab需要的资源。
### 在Linux中解压handout文件
由于该课程和lab所需环境是Linux，我们需要把下载的tar压缩包解压到Linux中。
以解压第一个lab——datalab为例，在命令行中执行以下命令，将tar压缩包解压到当前目录下：
```shell
$ tar -xvf datalab-handout.tar
```
解压后，会在当前目录下生成一个datalab-handout的文件夹，里面包含了我们所需要的所有东西。

### 关于CentOs换源
#### 问题背景
刚好这天tz过期了，暂时懒得续费，可是直接安装又太慢了，所以想能不能换个源。
结果不知道是不是误操作了，原本的repo被我删了。导致我续费了tz之后，执行yum命令总是显示：
```shell
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
There are no enabled repos.
 Run "yum repolist all" to see the repos you have.
 To enable Red Hat Subscription Management repositories:
     subscription-manager repos --enable <repo>
 To enable custom repositories:
     yum-config-manager --enable <repo>
```
然后执行```yum repolist all```，显示的是所有repo的status都是disabled.
```shell
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
repo id                             repo name                       status
C7.0.1406-base/x86_64               CentOS-7.0.1406 - Base          disabled
C7.0.1406-centosplus/x86_64         CentOS-7.0.1406 - CentOSPlus    disabled
C7.0.1406-extras/x86_64             CentOS-7.0.1406 - Extras        disabled
C7.0.1406-fasttrack/x86_64          CentOS-7.0.1406 - Fasttrack     disabled
C7.0.1406-updates/x86_64            CentOS-7.0.1406 - Updates       disabled
C7.1.1503-base/x86_64               CentOS-7.1.1503 - Base          disabled
C7.1.1503-centosplus/x86_64         CentOS-7.1.1503 - CentOSPlus    disabled
```
很懵逼。
#### 解决方法
首先用`cd /etc/yum.repos.d/`
进入`cd /etc/yum.repos.d/`目录，再执行
`wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo`，把源换成ali的源。

### 关于make的错误
在着手做datalab前，首先看这个lab的readme，然后尝试跑一遍给出的示例。然后在跑make的时候，出现了这样的错误：
```shell
gcc -O -Wall -m32 -lm -o btest bits.c btest.c decl.c tests.c
In file included from /usr/include/features.h:399:0,
                 from /usr/include/stdio.h:27,
                 from btest.c:16:
/usr/include/gnu/stubs.h:7:27: fatal error: gnu/stubs-32.h: No such file or directory
 # include <gnu/stubs-32.h>
                           ^
compilation terminated.
In file included from /usr/include/features.h:399:0,
                 from /usr/include/stdio.h:27,
                 from decl.c:1:
/usr/include/gnu/stubs.h:7:27: fatal error: gnu/stubs-32.h: No such file or directory
 # include <gnu/stubs-32.h>
                           ^
compilation terminated.
In file included from /usr/include/features.h:399:0,
                 from /usr/include/limits.h:26,
                 from /usr/lib/gcc/x86_64-redhat-linux/4.8.5/include/limits.h:168,
                 from /usr/lib/gcc/x86_64-redhat-linux/4.8.5/include/syslimits.h:7,
                 from /usr/lib/gcc/x86_64-redhat-linux/4.8.5/include/limits.h:34,
                 from tests.c:3:
/usr/include/gnu/stubs.h:7:27: fatal error: gnu/stubs-32.h: No such file or directory
 # include <gnu/stubs-32.h>
                           ^
compilation terminated.
make: *** [btest] Error 1

```
#### 解决方法
然后我在`stackoverflow`上搜索关于这个问题的帖子，很快就发现了这样的回答(节选)：
>You're missing the 32 bit libc dev package:
>
>On Ubuntu it's called libc6-dev-i386 - do sudo apt-get install libc6-dev-i386. See below for extra instructions for Ubuntu 12.04.
>
>On Red Hat distros, the package name is glibc-devel.i686 (Thanks to David Gardner's comment).
>
>On CentOS 5.8, the package name is glibc-devel.i386 (Thanks to JimKleck's comment).
>
>On CentOS 6 / 7, the package name is glibc-devel.i686.

我的系统是CentOs7,于是我按照他给解决方法的安装了一下开发包:
```shell
$ sudo yum install glibc-devel.i686
```
然后再跑make，又遇到了这样的报错：
```shell
gcc -O -Wall -m32 -lm -o btest bits.c btest.c decl.c tests.c
/usr/bin/ld: skipping incompatible /usr/lib/gcc/x86_64-redhat-linux/4.8.5/libgcc_s.so when searching for -lgcc_s
/usr/bin/ld: cannot find -lgcc_s
collect2: error: ld returned 1 exit status
make: *** [btest] Error 1
```
ok,这次我直接去问newbing了。他给出的回答也很对口：
>您遇到的编译错误是因为您在64位的系统上使用-m32选项来编译32位的程序，但是链接器找不到对应的32位的库文件，而只能找到64位的库文件，所以它跳过了不兼容的库文件，并报告无法找到-lgcc_s这个库文件12。您应该检查您的系统是否安装了32位的开发库，比如glibc-devel.i686和libgcc.i6863。您可以使用以下命令来安装这些库文件：

```shell
$ sudo yum install glibc-devel.i686 libgcc.i686
```
原来是我还少了一个libgcc.i686的包，同样安装好之后，make就可以成功运行啦！
```shell
gcc -O -Wall -m32 -lm -o btest bits.c btest.c decl.c tests.c
gcc -O -Wall -m32 -o fshow fshow.c
gcc -O -Wall -m32 -o ishow ishow.c
```

## datalab
### bitxor
使用~和&实现异或
```c
/* 
 * bitXor - x^y using only ~ and & 
 *   Example: bitXor(4, 5) = 1
 *   Legal ops: ~ &
 *   Max ops: 14
 *   Rating: 1
 */
int bitXor(int x, int y) {
  return ~(~(x&~y)&~(~x&y));
}
```
原理解释：
```shell
x^y = (x&~y)|(~x&y)
```
### tmin
```c
/* 
 * tmin - return minimum two's complement integer 
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 4
 *   Rating: 1
 */
int tmin(void) {
  return 1<<31;
}
```
知识背景补充：
在32位系统中，
01111111 11111111 11111111 11111111 即表示 2147483647

负数时最高位为1,负数的补码为对应的原码部分取反加1,故有：

-1 即 `10000000 00000000 00000000 00000001`
取反后为 `11111111 11111111 11111111 11111110 再加1得补码为 11111111 11111111 11111111 11111111`;

-2 即 `10000000 00000000 00000000 00000010`
取反后为 11111111 11111111 11111111 11111101 再加1得补码为 `11111111 11111111 11111111 11111110`;


依次类推...

-2147483647 即 11111111 11111111 11111111 11111111 
取反后为 10000000 00000000 00000000 00000000 再加1得补码为 `10000000 00000000 00000000 00000001`；

-2147483648 的补码即 `10000000 00000000 00000000 00000000`
(别想为什么找不出原码是多少了，正是因为原码表示不出来才有补码来表示的)

所以综上，32位系统补码的范围： `10000000 00000000 00000000 00000000 ~ 01111111 11111111 11111111 11111111`

所以32位下二进制补码最小值是`1000 …… …… …… …… 0000`，十六进制表示即`0x8000`,也就是 `1<<31`。

### tmax
```c
/*
 * isTmax - returns 1 if x is the maximum, two's complement number,
 *     and 0 otherwise 
 *   Legal ops: ! ~ & ^ | +
 *   Max ops: 10
 *   Rating: 1
 */
 int isTmax(int x) {
  return !((~(x+1)^x)|(!(x+1)));
}
```

原理解释：同上，可知最大值为`0111 …… …… …… …… 1111`，十六进制表示即`0x7fff`。
可以发现`0x7fff`+1再取反也就是`0x7fff`本身。所以我们可以通过判断`~(x+1)^x`是否为0来判断`x`是否为最大值。
但是这样会有一个问题，就是`0xffffffff`也会被判断为最大值，所以我们需要再加一个判断条件，即`!(x+1)`，这样就可以判断出`x`是否为最大值了。


#### 出现的小问题
```shell
$ make btest
gcc -O -Wall -m32 -lm -o btest bits.c btest.c decl.c tests.c
bits.c: In function ‘isTmax’:
bits.c:168:18: warning: suggest parentheses around arithmetic in operand of ‘|’ [-Wparentheses]
   return !(~(x+1)^x|!(x+1));
```

>这个警告的原因是，编译器认为你的表达式中的|运算符可能会造成优先级的混淆。|运算符的优先级低于+、~和^运算符，但是高于!运算符。因此，你的表达式相当于!(~((x+1)^x)|(!(x+1)))，而不是你可能想要的!((~(x+1))^x|!(x+1))。为了避免这个警告，你可以在|运算符的两边加上括号，明确表达你的意图，例如!((~(x+1)^x)|(!(x+1)))。

### allOddBits
```c
/* 
 * allOddBits - return 1 if all odd-numbered bits in word set to 1
 *   where bits are numbered from 0 (least significant) to 31 (most significant)
 *   Examples allOddBits(0xFFFFFFFD) = 0, allOddBits(0xAAAAAAAA) = 1
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 12
 *   Rating: 2
 */
int allOddBits(int x) {
  int a = 0xaa;
  int b = a | (a<<8);
  int c = b | (b<<16);
  return !((x&c)^c);
}
```
原理解释：
```shell
0xaaaaaaaa = 10101010101010101010101010101010
```
### negate
```c
/* 
 * negate - return -x 
 *   Example: negate(1) = -1.
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 5
 *   Rating: 2
 */
int negate(int x) {
  return ~x+1;
}
```
原理解释：
```shell
-x = ~x+1
```
### isAsciiDigit
```c
/* 
 * isAsciiDigit - return 1 if 0x30 <= x <= 0x39 (ASCII codes for characters '0' to '9')
 *   Example: isAsciiDigit(0x35) = 1.
 *            isAsciiDigit(0x3a) = 0.
 *            isAsciiDigit(0x05) = 0.
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 15
 *   Rating: 3
 */
int isAsciiDigit(int x) {
  int diff1 = x + (~0x30+1);
  int diff2 = 0x39 + (~x+1);
  return !(diff1>>31)&!(diff2>>31);
}
```
原理解释：
```shell
0x30 = 00110000
0x39 = 00111001
判断一个 ASCII 码字符是否为数字字符 '0' 到 '9'，函数的实现使用了位运算，其中 lowerBound 和 upperBound 分别表示数字字符的最小和最大 ASCII 码值，diff1 和 diff2 分别表示字符与最小值和最大值的差值，isGreaterEqualLowerBound 和 isLessEqualUpperBound 分别表示字符是否大于等于最小值和小于等于最大值（算术右移31位，左侧补符号位，判断结果是1还是0）。最后，函数返回值为两个判断条件的逻辑与运算结果。
```
### conditional
```c
/* 
 * conditional - same as x ? y : z 
 *   Example: conditional(2,4,5) = 4
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 16
 *   Rating: 3
 */
int conditional(int x, int y, int z) {
  int a = !!x;
  int b = ~a+1;
  return (a&y)|(b&z);
}
```
原理解释：
```shell
x?y:z = (x&y)|(~x&z)
```
### isLessOrEqual
```c
/* 
 * isLessOrEqual - if x <= y  then return 1, else return 0 
 *   Example: isLessOrEqual(4,5) = 1.
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 24
 *   Rating: 3
 */
int isLessOrEqual(int x, int y) {
  int signx = (x >> 31) & 1; // 获取 x 的符号位，如果 x 为负数则 signx 为 1，否则为 0
  int signy = (y >> 31) & 1; // 获取 y 的符号位，如果 y 为负数则 signy 为 1，否则为 0
  int flag1 = signx & (!signy); // 如果 x 为负数且 y 不为负数，则返回 1，否则为 0
  int e = signx ^ signy; // 如果 x 和 y 的符号位不同，则 e 为 1，否则为 0
  int flag2 = ((!e) & ((x + ~y) >> 31) & 1); // 如果 x 和 y 的符号位相同且 x - y 的值为负数，则返回 0，否则为 1
  return flag1 | flag2; // 如果 x <= y，则返回 1，否则返回 0
}
```
原理解释：
```shell
x<=y = (x-y)<=0
需要考虑溢出问题，所以需要判断x和y的符号位是否相同，如果相同，再判断x-y的符号位是否为负数。而且在判断x-y的时候，用的是(x+~y)>>31，而不是(x+~y+1)。
```


### logicalNeg

```c
/* 
 * logicalNeg - implement the ! operator, using all of 
 *              the legal operators except !
 *   Examples: logicalNeg(3) = 0, logicalNeg(0) = 1
 *   Legal ops: ~ & ^ | + << >>
 *   Max ops: 12
 *   Rating: 4 
 */
int logicalNeg(int x) {
  int a = x|(~x+1);
  int b = a>>31;
  return b+1;
}
```
原理解释：
```shell
!x = x==0
```
### howManyBits
```c
/* 
 * howManyBits - return the minimum number of bits required to represent x in
 *               two's complement
 *   Examples: howManyBits(12) = 5
 *             howManyBits(298) = 10
 *             howManyBits(-5) = 4
 *             howManyBits(0)  = 1
 *             howManyBits(-1) = 1
 *             howManyBits(0x80000000) = 32
 *  Legal ops: ! ~ & ^ | + << >>
 *  Max ops: 90
 *  Rating: 4
 */
int howManyBits(int x) {
  int flag = x >> 31;
  x = ((~flag) & x) | (flag & (~x));
  int bit_16 = (!!(x >> 16)) << 4; 
  x = x >> bit_16;
  int bit_8 = !!(x>>8)<<3;
  x = x >> bit_8;
  int bit_4 = !!(x >> 4) << 2;
  x = x >> bit_4;
  int bit_2 = !!(x >> 2) << 1;
  x = x >> bit_2;
  int bit_1 = !!(x >> 1);
  x = x >> bit_1;
  int bit_0 = x;
  return bit_16+bit_8+bit_4+bit_2+bit_1+bit_0+1;
}
```
原理解释：

首先，我们用右移 31 位的操作来得到 x 的符号位，我们用 flag 来存储这个结果，flag 是 0 或者 -1。
然后，我们用按位非操作来得到 flag 的取反，也就是 ~flag，这个结果是 -1 或者 0。
接下来，我们用按位与操作来把 x 和 ~flag 做运算，也就是 (~flag) & x，这个结果是 x 或者 0。这是因为，如果 x 是正数，那么 flag 是 0，~flag 是 -1，也就是全是 1 的二进制，所以 (~flag) & x 就相当于 x & -1，也就是 x。如果 x 是负数，那么 flag 是 -1，~flag 是 0，也就是全是 0 的二进制，所以 (~flag) & x 就相当于 x & 0，也就是 0。
然后，我们用按位非操作来得到 x 的取反，也就是 ~x，这个结果是 -x - 1。这是因为，按位非操作的规则是，把每一位都翻转，所以 ~x 就相当于 x 的补码，也就是 -x - 1。
接下来，我们用按位与操作来把 flag 和 ~x 做运算，也就是 flag & (~x)，这个结果是 0 或者 -x - 1。这是因为，如果 x 是正数，那么 flag 是 0，所以 flag & (~x) 就相当于 0 & (~x)，也就是 0。如果 x 是负数，那么 flag 是 -1，也就是全是 1 的二进制，所以 flag & (~x) 就相当于 -1 & (~x)，也就是 ~x。
最后，我们用按位或操作来把 (~flag) & x 和 flag & (~x) 做运算，也就是 ((~flag) & x) | (flag & (~x))，这个结果是 x 或者 -x。这是因为，如果 x 是正数，那么 (~flag) & x 是 x，flag & (~x) 是 0，所以 ((~flag) & x) | (flag & (~x)) 就相当于 x | 0，也就是 x。如果 x 是负数，那么 (~flag) & x 是 0，flag & (~x) 是 -x - 1，所以 ((~flag) & x) | (flag & (~x)) 就相当于 0 | (-x - 1)，也就是 -x - 1。但是，我们要注意，-x - 1 其实就是 x 的绝对值，因为 -x - 1 的补码就是 x。所以，这个写法也可以得到 x 的绝对值。


第二步，我们计算用二进制表示 x 需要多少位。我们可以用一个技巧，就是用二分搜索的方法来找到 x 中最高位是 1 的位置。我们可以把 x 分成两半，看看它的高 16 位是否有 1，如果有，就说明我们需要至少 16 位来表示 x，如果没有，就说明我们只需要低 16 位就够了。我们可以用逻辑非操作来判断 x 的高 16 位是否有 1，因为逻辑非操作的规则是，如果输入是 0，就得到 1，如果输入不是 0，就得到 0。所以，如果我们把 x 右移 16 位，然后用逻辑非操作，就可以得到一个 0 或者 1 的结果，表示 x 的高 16 位是否有 1。然后，我们再用左移 4 位的操作，就可以得到一个 0 或者 16 的结果，表示我们需要的最少位数。我们用 b16 来存储这个结果，然后再把 x 右移 b16 位，就相当于把 x 的高 16 位去掉了，只留下了低 16 位。接下来，我们重复这个过程，把 x 分成两半，看看它的高 8 位是否有 1，如果有，就说明我们需要再加 8 位，如果没有，就说明我们不需要再加。我们用 b8 来存储这个结果，然后再把 x 右移 b8 位，就相当于把 x 的高 8 位去掉了，只留下了低 8 位。我们继续这个过程，分别用 b4, b2, b1, b0 来存储 x 的高 4 位，高 2 位，高 1 位，和最低位是否有 1 的结果，然后分别把 x 右移相应的位数，直到 x 变成 0。最后，我们把 b16, b8, b4, b2, b1, b0 都加起来，就得到了 x 的二进制表示需要的位数。但是，这还不够，因为我们还要考虑符号位，无论 x 是正数还是负数，我们都需要用一位来表示它的符号，所以我们还要再加 1，才能得到最终的结果。
### floatScale2
```c
/* 
 * floatScale2 - Return bit-level equivalent of expression 2*f for
 *   floating point argument f.
 *   Both the argument and result are passed as unsigned int's, but
 *   they are to be interpreted as the bit-level representations of
 *   single-precision floating point values.
 *   When argument is NaN, return argument
 *   Legal ops: Any integer/unsigned operations incl. ||, &&. also if, while
 *   Max ops: 30
 *   Rating: 4
 */
 implement_1:
unsigned floatScale2(unsigned uf) {
  int a = uf&0x7f800000;
  int b = uf&0x7fffffff;
  if(a==0x7f800000) return uf;
  if(a==0) return (b<<1)|(uf&0x80000000);
  return uf+0x800000;
}
 implement_2:
unsigned floatScale2(unsigned uf) {
  unsigned s = (uf >> 31) & 0x1;
    unsigned exp = (uf >> 23) & 0xFF;
    unsigned frac = (uf & 0x7FFFFF);
    //NaN
    if(exp == 0xFF) 
        return uf;
    //
    else if(exp == 0){
        frac <<= 1;
        return (s << 31) | (exp << 23) | frac;
    }
    //else
    exp++;
    return (s << 31) | (exp << 23) | frac;

}

```
#### 原理解释：

需要用到浮点数IEEE-754规则的知识，按下不表，只说说实现上的小细节。

实现2更贴近IEEE-754的具体结构，1+8+23。他把各个组成部分分离出来分别进行判断和处理。实现1则是用相对来说比较复杂的掩码来进行判断和处理。

实现1非常简洁，常数0x800000的二进制是 0000 0000 1000 0000 0000 0000 0000 0000 0000，也就是只有第 9 位是 1，其他位都是 0。这样，+ 运算的结果就是把 uf 的**指数部分加一**，然后把符号位、指数部分和尾数部分重新组合成一个新的浮点数，然后返回这个结果。

### floatFloat2Int
```c
/* 
 * floatFloat2Int - Return bit-level equivalent of expression (int) f
 *   for floating point argument f.
 *   Argument is passed as unsigned int, but
 *   it is to be interpreted as the bit-level representation of a
 *   single-precision floating point value.
 *   Anything out of range (including NaN and infinity) should return
 *   0x80000000u.
 *   Legal ops: Any integer/unsigned operations incl. ||, &&. Also if, while 
 *   Max ops: 30 
 *   Rating: 4
 */
int floatFloat2Int(unsigned uf) {
  unsigned s = (uf >> 31) & 0x1;
    unsigned exp = (uf >> 23) & 0xFF;
    unsigned frac = (uf & 0x7FFFFF);
    int E = exp - 127;
    frac = frac | (1 << 23);
    if(E < 0) return 0;
    else if(E >= 31) return 0x1 << 31;
    else{
        if(E<23) {
            frac>>=(23 - E);
        }else{
            frac <<= (E - 23);
        }
    }
    if (s)
        return ~frac + 1;
    return frac;
}
```
#### 原理解释：

### floatPower2
```c
/* 
 * floatPower2 - Return bit-level equivalent of the expression 2.0^x
 *   (2.0 raised to the power x) for any 32-bit integer x.
 *
 *   The unsigned value that is returned should have the identical bit
 *   representation as the single-precision floating-point number 2.0^x.
 *   If the result is too small to be represented as a denorm, return
 *   0. If too large, return +INF.
 * 
 *   Legal ops: Any integer/unsigned operations incl. ||, &&. Also if, while 
 *   Max ops: 30 
 *   Rating: 4
 */
unsigned floatPower2(int x) {
  int a = x+127;
  if(a<=0) return 0;
  if(a>=255) return 0x7f800000;
  return a<<23;
}
```

### 最终结果
```shell
$ make clean
$ make btest
$ ./btest
Score   Rating  Errors  Function
 1      1       0       bitXor
 1      1       0       tmin
 1      1       0       isTmax
 2      2       0       allOddBits
 2      2       0       negate
 3      3       0       isAsciiDigit
 3      3       0       conditional
 3      3       0       isLessOrEqual
 4      4       0       logicalNeg
 4      4       0       howManyBits
 4      4       0       floatScale2
 4      4       0       floatFloat2Int
 4      4       0       floatPower2
Total points: 36/36
```
## bomblab

### 前言

### phase_1
字符串
### phase_2
等比数列
### phase_3
条件判断跳转对应数对
### phase_4
二分查找+条件判断

#### func4
func4是一个二分查找算法，它的功能是在一个有序的数组中，查找一个给定的值，并返回它在数组中的索引位置。如果没有找到这个值，就返回一个负数，表示它应该插入的位置。它的参数是：

- 第一个参数是要查找的值，存放在%edi寄存器中。
- 第二个参数是查找范围的下界，存放在%esi寄存器中。
- 第三个参数是查找范围的上界，存放在%edx寄存器中。

它的返回值是查找结果，存放在%eax寄存器中。

func4的逻辑是这样的：

- 首先，它将查找范围的上界和下界相减，得到一个差值，存放在%eax寄存器中。
- 然后，它将这个差值右移31位，得到一个符号位，存放在%ecx寄存器中。
- 接着，它将这个符号位和差值相加，再右移一位，得到一个平均值，存放在%eax寄存器中。
- 然后，它将这个平均值和查找范围的下界相加，得到一个中间值，存放在%ecx寄存器中。
- 接着，它将这个中间值和要查找的值进行比较，如果相等，就返回中间值作为索引位置；如果不等，就根据比较结果缩小查找范围，并递归调用func4函数。
- 最后，在递归返回时，它将返回值左移一位，并加一，得到最终的返回值。

我希望这能帮助你理解func4的功能和逻辑。如果你还有其他问题，欢迎继续提问。😊

### phase_5

### phase_6

### secret_phase

树
结构体
对齐
十六进制
保留位
：0x6030f0 <n1>:  0x00000024      0x00000000      0x00603110      0x00000000 0x603100 <n1+16>:       0x00603130      0x00000000      0x00000000      0x00000000 以上是同一个节点，分析一下这个节点的构成

这个节点是一个树形结构的节点，它由四个32位整数组成，分别表示节点的值，左子节点的地址，右子节点的地址和保留位。这个节点的地址是0x6030f0，它的值是24，左子节点的地址是0x603110，右子节点的地址是0x603130，保留位为0。这个节点占用32个字节，所以它需要两行来显示，第一行显示前16个字节，第二行显示后16个字节。第二行的地址是第一行的地址加上16个字节，所以是0x603100。你可以把这个节点看作一个结构体，例如：

```c
struct node {
  int value;
  struct node *left;
  struct node *right;
  int reserved;
};
```
在目录下创建一个txt文件，把拆除的炸弹密码都放进去。一次性读档还原进度。
```shell
$ ./bomb solved.txt
```

## cachelab
相关资料：
### part a
#### 问题分析
##### 定义构造cache和cache_line的结构
##### 实现时间戳和LRU算法
##### 实现cache的具体运作逻辑
##### 指令解析
- getopt.h
### part b
相关资料：https://zhuanlan.zhihu.com/p/484657229
#### 转置过程中的矩阵A、矩阵B和cache的关系
cache(s=5,E=1,b=5),E=1说明映射方法是直接映射。

s=5，可知一共有32组，每行有2^5=32个字节，可以存储8个int

#### blocking 的原理
充分利用cache加载的内容，减少miss的次数，提高效率。
#### 对角线问题
A与B对角线上的块在缓存中对应的位置是相同的，而它们在转置过程中位置不变，所以复制过程中会发生相互冲突。

以A的一个对角线块p，B与p相应的对角线块q为例，复制前， p 在缓存中。 复制时，q会驱逐p。 下一个开始复制 p 又被重新加载进入缓存驱逐 q，这样就会多产生两次miss。

所以我们为了避免这种情况，可以尝试将最后一层循环展开，利用变量先存储已经访问的目标，再进行复制。
#### valgrind
valfrind是一个用来检测内存错误的工具，它可以检测出内存泄漏、使用未初始化的内存、访问已经释放的内存等错误。它的原理是在程序运行时，将程序的所有内存访问映射到一个虚拟内存中，然后通过检测虚拟内存的访问情况来检测内存错误。
