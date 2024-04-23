---
title: SHAP
tags: 
	- 可解释性
categories: 技术分享
cover: https://tse4-mm.cn.bing.net/th/id/OIP-C.pSAq6o4eZA7tE1HD1lqHhwHaED?pid=ImgDet&rs=1
---
# SHAP（Shapley Additive exPlanation）
一种模型事后解释方法，可以对复杂机器学习模型进行解释。
起源：合作博弈论，一个简单的例子是ABC三个人测量叶片面积，分配酬劳。这个例子中的体现是边际贡献加权平均的方法来规划酬劳的分配。

SHAP的核心是计算每个特征变量的shapley value
Shapley Additive exPlanation，代表对每个样本中的每一个特征变量都计算出SV，而且SV是可加的，目的是解释每个特征变量是如何影响模型的预测值的。
## SHAP三个重要性质：
- 局部保真性local accuracy
- 缺失性missingness
- 连续性consistency
## SHAP最大的优势
反映出每一个样本的特征的影响力，并且表现出贡献的正负性
## SHAP的两个不足
- 计算量庞大，计算非常耗时
- 有可能会造成误导，这是由于
> 特征值的shapley值**不是从模型训练中删除特征后的预测值之差**。而是**给定当前的一组特征值，特征值对于实际预测值和平均预测值之差的贡献**就是估计的shapley值。一个样本中各个特征的SHAP值加上基线值等于该样本的预测值。

针对这两种问题，有了SHAP的一些变体。其中TreeSHAP专门适用于基于树的机器学习模型，比如决策树，随机森林和GBDT。很快而且很精确。

## SHAP可视化的一些图类型
- 力图
- 总体特征图
- 部份依赖图（PDP）
- 热图
- 交互分析图


## 参考文献
- https://www.bilibili.com/video/BV1DG4y1b7V5/?spm_id_from=333.337.search-card.all.click&vd_source=847221b55474b08239f9c09c5099e6ac
- https://github.com/shap/shap