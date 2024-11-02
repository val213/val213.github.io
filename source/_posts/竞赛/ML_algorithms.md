---
title: Machine_Learning_Algorithms
tags: 
	- machine learning
categories: 技术分享
cover: https://tse4-mm.cn.bing.net/th/id/OIP-C.4pNQCQhPAnx0MAAC-MOBPQHaEK?pid=ImgDet&rs=1
---

# 规划求解
## 启发式算法
### 遗传算法
### 模拟退火
### 蚁群算法

# 机器学习分类
## 基于树的算法
### 决策树
决策树是一种树形结构的模型，可以用来进行分类或回归问题。它的基本思想是，根据一些特征和划分准则，将数据集分成不同的子集，直到达到某种停止条件。决策树的优点是易于理解和解释，可以处理离散或连续的特征，可以处理缺失值和异常值等。**决策树的缺点是容易过拟合，对噪声敏感，可能不稳定等。**

**Gini(基尼系数)**
>*Gini*
>
>There are many ways to split the samples, we use the >GINI method in this tutorial.
>
>The Gini method uses this formula:
>
>$Gini = 1 - (x/n)^2 - (y/n)^2$
>
>Where $x$ is the number of positive answers("GO"), $n$ is the number of samples, and $y$ is the number of negative answers ("NO"), which gives us this calculation:
>
>$1 - (7 / 13)^2 - (6 / 13)^2 = 0.497$
>
>***——W3Cschool***
#### 决策树代码示例
##### 决策树分类
```python
#决策树
from sklearn import tree
X = [[0, 0], [1, 1]]
Y = [0, 1]
clf = tree.DecisionTreeClassifier()
clf = clf.fit(X, Y)
#预测样本类别
print(clf.predict([[2., 2.]]))
#预测每个类的概率，这个概率是叶中相同类的训练样本的分数:
print(clf.predict_proba([[2., 2.]]))
```
输出为：
```python
array([1])
array([[0., 1.]])
```
决策树相对于其他分类算法，一大优点就是执行过程可以可视化，可解释性强，下面以鸢尾花数据集为例展示决策树分类算法执行过程的可视化
```python
#导入鸢尾花的数据集
from sklearn.datasets import load_iris
from sklearn import tree
iris = load_iris()
```
```python
#决策树分类
clf = tree.DecisionTreeClassifier()
clf = clf.fit(iris.data,iris.target)
```
```python
import graphviz
#决策树执行过程导出为pdf文件
#以下是在整个 iris 数据集上训练的上述树的 graphviz 导出示例; 其结果被保存在 iris.pdf 中:
dot_data = tree.export_graphviz(clf, out_file=None)
graph = graphviz.Source(dot_data)
graph.render("iris")
```
[![决策树分类过程1](https://img1.imgtp.com/2023/08/09/FZWuNmAR.png)](https://img1.imgtp.com/2023/08/09/FZWuNmAR.png)
```python 
#决策树执行过程美化并内联输出
#export_graphviz 还支持各种美化，包括通过他们的类着色节点（或回归值），如果需要，还能使用显式变量和类名。Jupyter notebook也可以自动内联式渲染这些绘制节点
dot_data = tree.export_graphviz(clf, out_file=None,
                      feature_names=iris.feature_names,  
                      class_names=iris.target_names,  
                      filled=True, rounded=True,  
                      special_characters=True)  
graph = graphviz.Source(dot_data)  
graph
```

[![决策树分类过程2](https://img1.imgtp.com/2023/08/09/WZwBc3iM.png)](https://img1.imgtp.com/2023/08/09/WZwBc3iM.png)


##### 决策树回归

###### 单值输出
```python
#决策树回归
from sklearn import tree
X = [[0, 0], [2, 2]]
y = [0.5, 2.5]
clf = tree.DecisionTreeRegressor()
clf = clf.fit(X, y)
clf.predict([[1, 1]])
```
输出结果为：
```python
array([0.5])
```
###### 多值输出（以双值输出——也就是二维——为例）
当输出值之间没有关联时，一个很简单的处理该类型的方法是建立一个n独立模型，即每个模型对应一个输出，然后使用这些模型来独立地预测n个输出中的每一个。

然而，由于可能与相同输入相关的输出值本身是相关的，所以通常更好的方法是构建能够同时预测所有n个输出的单个模型。

```python
import matplotlib.pyplot as plt
import numpy as np

from sklearn.tree import DecisionTreeRegressor

# Create a random dataset
rng = np.random.RandomState(1)
X = np.sort(200 * rng.rand(100, 1) - 100, axis=0)
y = np.array([np.pi * np.sin(X).ravel(), np.pi * np.cos(X).ravel()]).T
y[::5, :] += 0.5 - rng.rand(20, 2)

# Fit regression model
regr_1 = DecisionTreeRegressor(max_depth=2)
regr_2 = DecisionTreeRegressor(max_depth=5)
regr_3 = DecisionTreeRegressor(max_depth=8)
regr_1.fit(X, y)
regr_2.fit(X, y)
regr_3.fit(X, y)

# Predict
X_test = np.arange(-100.0, 100.0, 0.01)[:, np.newaxis]
y_1 = regr_1.predict(X_test)
y_2 = regr_2.predict(X_test)
y_3 = regr_3.predict(X_test)

# Plot the results
plt.figure()
s = 25
plt.scatter(y[:, 0], y[:, 1], c="navy", s=s, edgecolor="black", label="data")
plt.scatter(
    y_1[:, 0],
    y_1[:, 1],
    c="cornflowerblue",
    s=s,
    edgecolor="black",
    label="max_depth=2",
)
plt.scatter(y_2[:, 0], y_2[:, 1], c="red", s=s, edgecolor="black", label="max_depth=5")
plt.scatter(
    y_3[:, 0], y_3[:, 1], c="orange", s=s, edgecolor="black", label="max_depth=8"
)
plt.xlim([-6, 6])
plt.ylim([-6, 6])
plt.xlabel("target 1")
plt.ylabel("target 2")
plt.title("Multi-output Decision Tree Regression")
plt.legend(loc="best")
plt.show()
```

[![多输出](https://img1.imgtp.com/2023/08/09/yHqy8bUL.png)](https://img1.imgtp.com/2023/08/09/yHqy8bUL.png)
#### CART（Classification And Regression Tree分类与回归树）
CART是分类与回归树（Classification and Regression Tree）的缩写。它是一种特殊的决策树算法，用于解决分类和回归问题。CART树在决策树算法中非常常见，它通过将输入空间划分为不同的区域来构建一棵树，每个区域对应于一个决策树的节点。该算法通过在每个节点处选择一个特征和一个阈值，将数据集分成两个子集，然后递归地在子集上重复这个过程，直到达到停止条件（例如，节点中的样本数量小于某个阈值或树的深度达到某个最大值）。

它的特点是使用**二分法**来划分特征空间，生成二叉树结构。它还可以通过**剪枝**来避免过拟合，提高泛化能力。CART对于分类问题，使用**基尼系数**作为特征选择的标准；对于回归问题，使用**平方误差**作为特征选择的标准。CART可以处理离散或连续的特征，**也可以处理缺失值**。

在分类问题中，每个叶子节点代表一个类别，样本将被分配到相应的叶子节点。在回归问题中，每个叶子节点代表一个数值，预测结果是叶子节点中样本的平均值（对于平均回归树）或其他统计量。

CART树具有易于解释和可视化的优点，能够处理数值和类别特征，以及处理缺失数据。它在许多实际应用中都表现出色，但也需要适当的参数调整来避免过拟合等问题。

#### 随机森林

### GBDT(梯度提升)
### XGBoost
#### 什么是XGBoost？
**XGBoost**是**Exterme Gradient Boosting（极限梯度提升）**的缩写，它是**基于决策树的集成机器学习算法**，它以梯度提升（Gradient Boost）为框架。XGBoost是由由GBDT发展而来，同样是利用加法模型与前向分步算法实现学习的优化过程，但与GBDT是有区别的。主要区别包括以下几点：

- 目标函数：XGBoost的损失函数添加了正则化项，使用正则用以控制模型的复杂度，正则项里包含了树的叶子节点个数、每个叶子节点权重（叶结点的socre值）的平方和。
优化方法：GBDT在优化时只使用了一阶导数信息，XGBoost在优化时使用了一、二介导数信息。
- 缺失值处理：XBGoost对缺失值进行了处理，通过学习模型自动选择最优的缺失值默认切分方向。
- 防止过拟合: XGBoost除了增加了正则项来防止过拟合,还支持行列采样的方式来防止过拟合。
- 结果：它可以在最短时间内用更少的计算资源得到更好的结果。

>XGBoost被大量运用于竞赛中，比如Kaggle竞赛，在Kaggle2015年公布的29个获胜者中有17个使用了XGBoost，同样在KDDCup2015的竞赛中XGBoost也被大量使用

## Logistic Regression(逻辑回归)（梯度下降）
逻辑回归虽然叫做回归，但是其主要解决分类问题。可用于二分类，也可以用于多分类问题。
由于**线性回归（梯度下降）**其预测值为连续变量，其预测值在整个实数域中。
而对于预测变量y为离散值时候，可以用**逻辑回归算法（Logistic Regression）**
逻辑回归的本质是将线性回归进行一个**sigmoid变换**，该模型的输出变量范围始终在 0 和 1 之间。逻辑回归输出的是概率值，线性回归输出的是连续值.

### 逻辑回归和线性回归的异同比较:
>- 线性回归和逻辑回归都是广义线性回归模型的特例。他们俩是兄弟关系，都是广义线性回归的亲儿子
>- 线性回归只能用于回归问题，逻辑回归用于分类问题（二分类、多分类）
>- 线性回归无 link-function 或不起作用，逻辑回归的 link-function 是对数几率函数(Link-function是广义线性模型中的概念,可以将非线性的关系转换为线性的关系，从而可以使用线性模型来拟合数据),例如不同的概率分布有不同的连接函数，例如：
>>- 正态分布的连接函数是恒等函数（identity function），即 $y = a + bx + c$。
>>- 泊松分布的连接函数是对数函数（log function），即 $log(y) = a + bx + c$。
>>- 二项分布的连接函数是逻辑函数（logit function），即 $log(y / (1 - y)) = a + bx + c$。
>- 线性回归使用最小二乘法作为参数估计方法，逻辑回归使用极大似然法作为参数估计方法
>-线性回归 通常使用均方误差（Mean Squared Error）等损失函数来衡量预测值与实际值之间的差异。
>-逻辑回归 使用对数损失（Log Loss）或交叉熵损失（Cross-Entropy Loss）来衡量预测概率与实际标签之间的差异。


### 逻辑回归代码示例
```python
#逻辑回归
import numpy
from sklearn import linear_model

#Reshaped for Logistic function.
X = numpy.array([3.78, 2.44, 2.09, 0.14, 1.72, 1.65, 4.92, 4.37, 4.96, 4.52, 3.69, 5.88]).reshape(-1,1)
y = numpy.array([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1])

logr = linear_model.LogisticRegression()
logr.fit(X,y)

#predict if tumor is cancerous where the size is 3.46mm:
predicted = logr.predict(numpy.array([3.46]).reshape(-1,1))
print(predicted)
```
#### 代码解析
##### 关于`logr`
在你提供的代码中，`logr` 是一个变量，它被赋值为 `linear_model.LogisticRegression()`，这表示它是一个逻辑回归模型的实例。

具体来说，`logr` 是一个对象，它属于 `LogisticRegression` 类的一个实例，该类来自 `sklearn.linear_model` 模块，用于进行逻辑回归。通过创建这个对象，你可以调用该对象的方法（例如 `.fit()` 和 `.predict()`）来拟合模型和进行预测。

在你的代码中，`logr` 是一个已经训练好的逻辑回归模型，可以用于对新的数据进行预测，如下所示：

```python
predicted = logr.predict(numpy.array([3.46]).reshape(-1,1))
```

这里，`logr.predict()` 方法使用训练好的逻辑回归模型 `logr` 对输入数据进行预测，并将预测结果存储在变量 `predicted` 中。

##### 关于`reshap()`
`reshape(-1, 1)` 是用于改变 NumPy 数组形状的方法之一。在这个上下文中，它的作用是将一维数组转换为二维列向量。具体解释如下：
`reshape(-1, 1)`：这里的 `-1` 表示根据数组的长度和其他维度的大小来自动计算这个维度的长度。而 `1` 表示新的数组应该有一列。
例如，如果有一个一维数组 `arr`，其内容如下：
```python
arr = numpy.array([3.78, 2.44, 2.09, 0.14, 1.72, 1.65, 4.92, 4.37, 4.96, 4.52, 3.69, 5.88])
```
通过应用 `reshape(-1, 1)`，你会得到一个二维数组，其中每个元素成为一个单独的行，如下所示：
```python
reshaped_arr = arr.reshape(-1, 1)
```
`reshaped_arr` 的内容将会是：
```
array([[3.78],
       [2.44],
       [2.09],
       [0.14],
       [1.72],
       [1.65],
       [4.92],
       [4.37],
       [4.96],
       [4.52],
       [3.69],
       [5.88]])
```

这种变换在机器学习中经常使用，因为许多算法（例如逻辑回归）期望输入特征是一个二维矩阵，其中每个样本是一行，而每个特征是一列。在这个示例中，`reshape(-1, 1)` 将一维数组转换为了列向量，以便能够输入给逻辑回归模型进行训练和预测。
## SVM支持向量机
