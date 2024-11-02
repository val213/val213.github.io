---
title: NUS-CV summer school
tags: 
	- CV
categories: 技术分享
cover: https://img1.imgtp.com/2023/08/08/n8BEWwBv.jpg
---
## Digital ../image/image Processing (Basics)
### What is Digital ../image/image Processing?
The sequence of ../image/image processing to computer vision can be broken up into low-level, mid-level and high-level processes.

| Level| Input  | Output  |Example|
| :--------   | :-----:  |:-----:  |:-----:  |
| low-level   | ../image/image |../image/image |Noise removal,../image/image sharpening|
| mid-level  |   ../image/image   | Attributes|Object recognition,Segmentation|
| high-level |    Attributes   |Understanding|Scene understanding, Autonomous navigation|

### Examples of DIP
- ../image/image Enhancement & Noise removal
- cameras/automated toll systems 
- Law Enforcement
- Printed Circuit Board (PCB) inspection 
- Industrial Inspection
- Geographic Information Systems 
- edge detecion ../image/image(Take slice from MRI scan )
- Hubble’s ../image/images useless ../image/image processing techniques were used to fix this
- HCL:Try to make human computer interfaces more natural – Face recognition – Gesture recognition Does anyone remember the user interface from “Minority Report”? These tasks can be extremely difficult

### Goal of ../image/image Processing
../image/image Processing quality assessment is largely subjective process
Typical mechanism: come up with a mathematical model/algorithm/process that makes the ../image/image appear desirable to the human observer




### Optical Illusions

### Key Stages of Digital ../image/image Processing
1. ../image/image Acquisition
2. ../image/image Enhancement
3. ../image/image Restoration
4. ../image/image Compression
5. Morphological Processing
6. ../image/image Segmentation
7. Object Recognition
8. Representation & Description

#### ../image/image Restoration
1 pixel needs 8bits for restoration

#### ../image/image Resolution
##### Intensity Level Resolution
##### Resolution: How Much Is Enough?


#### Histogram Processing
x axis: bins
y axis: values of the bins

#### Histogram equalization

#### ../image/image Filtering

##### Fundamentals of ../image/image Filtering

#### ../image/image Domain Transforms



#### Smoothing Filters
##### Gaussian Filters
##### Box Filters
Linear spatial filter 
Average value of the neighborhood of the current pixel.
Also known as averaging filters or lowpass filters
##### Median Filter
Median filter
particularly effective in the presence of impulse noise (salt and pepper noise)

Max/Min filter : replace the input value with the maximum/minimum in its neighborhood

#### Sharpening Filters
##### Unsharp Masking & Highboost Filtering 

##### ../image/image Sharpening using Laplacian

#### Edge Detection
##### Gradient of ../image/image

The simplest approximation of a first-order derivative that satisfy all the conditions are 
 gx=f(x+1,y)-f(x,y) 
 gy=f(x,y+1)-f(x,y) 
##### Sobel’s Edge Detection


### Summary
- Applications of Digital ../image/image Processing
- Key stages in Digital ../image/image Processing
- Digital ../image/image Formation & Representation
- ../image/image transformations & operations
- Histogram processing
- ../image/image Filtering Basics
- Edge detections

## ML
- Traditional Programming: Data + Rules = Answers
- Machine Learning: ANswers + Data = Rules






### Features and Classifier Algorithms
#### Feature
- Edges
- Color
- Shape
- Texture
- Histogram of Oriented Gradients (HOG)
- Local Binary Pattern (LBP)
- Wavelets
- FFT

#### classifier
- Bayes’ classifier
- Support Vector Machine (SVM)
- Artificial Neural Network (ANN)
- k-nearest neighbor (kNN)
- Decision Tree
- Adaboost
- Bayesian Network


##### k-Nearest Neighbor (kNN) Algorithm
- What is kNN Algorithm?
- How does kNN work?
- What are similarity measures?
- What is feature scaling?
- How to choose the k-value?
- kNN for classification – Python code

###### What is kNN Algorithm?
This is the most simplest, easy to understand Classifier.

kNN is a supervised, non-parametric and lazy learning algorithm:

- **Supervised** – need labeled training data

- **Non-parametric** – no assumption made on the data distribution

- **Lazy learning** – no need for training the data, hence no model generated

Key idea : find the k-most similar datapoints from the dataset.

kNN can be used for Classification and Regression tasks


###### How does KNN work?
- Step 1: Determine k = number of nearest neighbors
- Step 2: Calculate distance between new data and all - the training data
- Step 3: Sort the distance and determine the nearest neighbors based on the k minimum distances
- Step 4: Determine the class value of these k-nearest neighbors
- Step 5: Use simple majority of the class of nearest neighbors as the predicted class of the new data


###### Feature Scaling

- Standardization: $𝑥′=((𝑥 −𝜇))/𝜎$

- Normalization: $𝑥^′=(𝑥 −min⁡(𝑥))/(max⁡(𝑥)−min⁡(𝑥) )$

###### How to choose the k-value?
- No structured method to find k-value: use trial-and-error
- Smaller k-value – sensitive to noisy data
- Larger k-value – makes computationally expensive
-Rule of thumb is k = sqrt(N), N – number of training data
- Try to keep k-value as odd in order to avoid tie between two classes


###### Pros and Cons of k-NN

Pros:
- Algorithm is simple and easy to implement
- No training is required – new data can be added at any time.

Cons:
- Complexity: memory and computation time is higher
- Does not work well with large datasets
- Does not work well with high dimension


##### Local Binary Pattern (LBP)

![Alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image.png)


##### Histogram of Oriented Gradient (HoG)
- HoG features focus on structure or the shape of an - object
- HoG is based on Gradient and direction of edges in ../image/image
- Gradient and directions are calculated for localized blocks
- HOG would generate a Histogram for each of the localized blocks
- The histograms are created using the gradients and orientations of the pixel values – ‘Histogram of Oriented Gradients’



#### Performance Metrics for Classifiers
- Accuracy = (TP+TN)/(TP+FP+FN+TN)
- Precision = TP/(TP+FP)
- Recall = TP/(TP+FN)
- F1 Score = 2*(Recall * Precision) / (Recall + Precision)
- Support = number of occurrences of each class in original y value from the dataset


##### k-fold Cross Validation
![Alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-1.png)
##### Leave-one-out Cross Validation
![Alt text](https://github.com/val213/val213.github.io/blob/hexo_source/source/_posts/../image/image-2.png)

#### summary
Classification means assigning class label to input pattern.
Choosing features is an art!
Given the right features, many classifiers work equally well.
Some classifiers require long learning time
Evaluating a classifier on a test set is an important part of determining its performance. 
