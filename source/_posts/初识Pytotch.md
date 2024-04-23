---
title: 初识Pytorch以及其配置安装
tags:
	- AI框架
	- Pytorch
categories: 技术分享
cover: https://img1.imgtp.com/2023/07/21/hhPTvQrN.png
---

# 初识Pytorch以及配置安装
## 什么是pytorch？为什么是pytorch？
>PyTorch 是一种用于构建深度学习模型的功能完备框架，是一种通常用于图像识别和语言处理等应用程序的机器学习。使用 Python 编写，因此对于大多数机器学习开发者而言，学习和使用起来相对简单。PyTorch 的独特之处在于，它完全支持 GPU，并且使用反向模式自动微分技术，因此可以动态修改计算图形。这使其成为快速实验和原型设计的常用选择。

>PyTorch 在 Python 开发者中特别受欢迎，因为它使用 Python 编写，并使用该语言的命令式、运行时定义即时执行模式，在这种模式下，从 Python 调用运算时执行运算。随着 Python 编程语言的广泛采用，一项调查显示，AI 和机器学习任务受到越来越多的关注，并且相关 PyTorch 的采用也随之提升。这使得 PyTorch 对于刚接触深度学习的 Python 开发者来说是一个很好的选择，而且越来越多的深度学习课程基于 PyTorch。从早期版本开始，API 一直保持一致，这意味着代码对于经验丰富的 Python 开发者来说相对容易理解。

## 确定安装的版本
要确定pytorch安装的版本，并且如果是想要使用**GPU**来加速后续的训练，就得先安装符合自己电脑N卡版本的**CUDA**（需要有独立显卡）。
### 什么是CUDA ？
>CUDA是显卡厂商NVIDIA推出的一种通用并行计算平台和编程模型，它可以利用NVIDIA的GPU来加速各种复杂的计算问题，例如深度学习、图形学、物理模拟等12。CUDA不是一种编程语言，也不是一种API，而是一种架构，它提供了一系列的库、编译器、调试器等工具，让开发者可以使用C/C++、Python、Fortran等语言来编写GPU代码3。**CUDA需要配合NVIDIA的显卡和驱动才能运行，不同的显卡和驱动版本支持不同的CUDA版本**。

### 查看N卡信息
首先我们需要确定我们的**N卡驱动是什么型号**。启动Nvidia控制面板，点击左下角的更多信息，可以看到N卡的驱动版本。如下图：
[![查看N卡信息](https://img1.imgtp.com/2023/07/21/1H1O0ch1.png)](https://img1.imgtp.com/2023/07/21/1H1O0ch1.png)

接下来我们到CUDA官网查看这个文档，确定当前驱动版本能安装的CUDA最新版本。我是516.54，对应不高于11.8x的CUDA版本。

[![查看N卡对应CUDA版本](https://img1.imgtp.com/2023/07/21/KNjVVWJC.png)](https://img1.imgtp.com/2023/07/21/KNjVVWJC.png)

于是我们选择对应的11.80版本进行安装。
### 开始安装！
[![安装CUDA](https://img1.imgtp.com/2023/07/21/DlBaQglC.png)](https://img1.imgtp.com/2023/07/21/DlBaQglC.png)
[![安装CUDA中](https://img1.imgtp.com/2023/07/21/1Z53sOes.png)](https://img1.imgtp.com/2023/07/21/1Z53sOes.png)

安装过程中可以顺便去安装一下pytorch，因为这个时候我们已经知道对应的CUDA版本了……
[![安装pytorch](https://img1.imgtp.com/2023/07/21/hhPTvQrN.png)](https://img1.imgtp.com/2023/07/21/hhPTvQrN.png)

我没有安装ancoda，所以就选择用pip安装。

[![安装pytorch](https://img1.imgtp.com/2023/07/21/MZ5A6m8s.png)](https://img1.imgtp.com/2023/07/21/MZ5A6m8s.png)


### 看看安装成功了没有
使用命令行/jupyter notebook/VS打开python项目，都行，import一下torch，没报错就成功啦！

