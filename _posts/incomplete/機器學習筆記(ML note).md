---
layout: article_post
title:  "機器學習筆記"
categories: cs
---
*incomplete*

---
## 前言
---

機器學習(Machine Learning)是最近非常夯的一個詞，而清大資工也在最近將機器學習納入選修課程了，可知他的重要性

而機器學習能應用的範圍據我所知，不僅僅能用於資工相關領域

相反的，幾乎各種領域都能運用這個技術，包括醫學、財經、商業、工業等等

這篇文章將會持續更新，我會將我過去及未來所學相關的機器學習筆記全部消化過

以我自己的語言作成的筆記，分享給大家

因為我並非專業，算是自己自學的，所以內容也許有錯誤或有說得不夠精準的地方

這邊主要的內容來自於Andrew Ng教授在Coursera上所開的課程

其中有一個專業向度為[深度學習向度](https://www.coursera.org/specializations/deep-learning)

裡面包含了五堂課分別為：

1. Neural Network and Deep Learning
2. Improving Deep Neural Networks: Hyperparameters tuning , Regularization, and Optimization
3. Stucturing Machine Learning Project
4. Convlutional Neural Network
5. Sequnce Models

在下一小節的目錄，會簡單列出小標，代表我覺得重要的小概念

看到小標心裡應該要能浮現相關的概念跟算式

能不能清楚的向別人解說這個概念

請不吝來信指正我的錯誤: **a5560648@gmail.com**

---
## 目錄
---

1. Neural Network and Deep Learning
	a. logistic regression
	b. gradient descent
	c. vectorization
	(d. numpy)
	e. neural network
	f. activation function
	g. gradient descent for nerual network
	h. backpropagation
	i. random initialization
	j. forward-propagation and backward-propagation
	k. parameters vs. Hyperparameters
2. Improving Deep Neural Networks: Hyperparameters tuning , Regularization, and Optimization
	a. bias/variance
	b. train/dev/test dataset
	c. regularization
	d. dropout regularization, (keep-probability)
	e. L2 Regularization
	f. data augmentation
	(f-2. Comparision of different regularization methods: ..., early-stopping)
	g. normalizing inputs
	h. weight initialization for deep learning neural network (Xaiver Initialization or He Initialization)
	i. Gradient Checking
	j. mini-batch vs. batch vs. stochastic
	（j-2. batch-size, power of 2)
	（j-3. what's epoch）
	k. exponentially weighted averages
	(k-1. increasing or decreasing ß will causes what kind of effect) - ß值越大，就會越平滑，並且越偏向右邊，因為看的歷史更多
	l. bias correction in exponentially weighted averages
	m. gradient descent with monentum
	(m-1. how does it work? - to redcue the oscillation in gradient descent. By looking back the history(kind of average))
	n. RMS prop
	(n-1. how does it work? ) - intend to make the smoother part to move fast, steaper part to move slower
	o. Adam optimization algorithm(combining the advantage of RMS prop and monetum)
	p. learning rate decay(There are various ways to do so)
	q. appropriate searching scale for hyperparameters(for examples, learning rate alpha in log scale)
	r. panda vs. caviar
	s. normalize activations in a network(how to apply normalization in a neural network)
	t. the batch norm step happens between z and a(for each layer we have gama and beta), and we can eliminate b, since we have already had beta.（works fine with RMS prpo, Adam ..）
	u. Covariate shift, (the batch norm eliminate the effect of the previous layer change, and make the neural netowrk more stable)(have a slight regularization effect)
	v. Batch Norm at test time(since we don't have batch in test time, i.e. only one test example, so we could use expontentially weighted average to estimate µ and ∂) 
	)
	w. sofmax(sofmax activation function) -> need to take a vector as input and out a vector which represents prob
	(w-1. first, apply activation function, like e^(x), and then normalize it as output)
	x. sofmax regression generalizes logistic regression to C classes
	y. tensorflow(plz get to know some basic produres we will use in TensorFlow)
	z. 
3. Stucturing Machine Learning Project
4. Convolutional Neural Network
	a. edge detection(vertical edge detection, horizontal edge detection)
	(a-1. using a filter to do convolution)
	b. Use DL(back-prop) to learn filter's parameters and do convolution
	c. padding, why?(1. don't want image shrink, 2. use the corner pixel more)
	(c-1. valid convolution(no padding), nxn * fxf -> n-f+1)
	(c-2. same convolution, pad so that the output size is the same as the input size)
	d. strided convolution(why?)
	e. convolution over volumn(just similar process of 2D image, however, we can apply many different kinds of filters and combine them together to get multilayers output.)
	f. One layer of Convolutional neural network, how does the parameters look like in Convolution Neural Network
	(f-1. notation of )
	g.

	week-1-ex: https://hub.coursera-notebooks.org/user/cfcnolvswxoldpqunmvrbt/notebooks/week1/Convolution%20model%20-%20Step%20by%20Step%20-%20v2.ipynb

5. Sequnce Models

---
## 什麼是機器學習？跟深度學習又有什麼差異？
---

---
## 常常聽到人家說「調參數」，是什麼意思呢？
---

---
## 訓練集(training set)、(developing set)、測試集(testing set)怎麼分？
---

1. training set, developing set, testing set的意義
2. 一個資料集(dataset)，如何切分
3. 實際例子以及在python上如何操作

---
## bias-variance tradeoff
---

1. overfitting及underfitting
2. high-variance及high-bias
3. tradeoff
4. 從error觀察model有可能存在問題

overfitting顧名思義，是這個model訓練過頭了，雖然在training set得到的error很低

但是在developing set的error卻很高

換句話說，就是你的model因為訓練過頭，變成只適用於你給的training data，換成沒看過的data，預測失敗的比率就很高

underfitting則跟overfitting相反，在training set的時候error就很高了

代表你的model訓練不夠，所以沒辦法正確的預測結果，通常underfitting的情況下

training set error跟developing set error兩者都會很高

再來我們談high-variance跟high-bias

high-variance基本上可以視作overfitting，過度fit data，所以畫出來的decision boundary會是一條很複雜的曲線

當看到新的data，預測錯誤的機率高

high-bias則是可以視作underfitting，因為訓練不夠或者有錯誤，導致連在training set的data都預測不準

所以簡單來說：

overfitting|high-variance|過度訓練|train set error低|dev set error高
underfitting|high-bias|訓練不夠|train set error高|dev set error高

而回歸這個部分的標題: bias-variance tradeoff，為什麼說tradeoff呢？

因為其實bias跟variance應該是看作為一種「傾向」，當我們往high-bias那一方走時，同時variance就越來越低

從以下的例子來看：

|A|B|C|
Train set error|1%|15%|15%|
Dev set error|11%|16%|30%|
Base error: ~0

這這裡很重要的一個觀念是Base Error，也就是在最好的model下、或者人直接觀察的情況下的error有多少

比如說判別一個圖片中的人，我們用人眼觀察幾乎能百分之百辨認出來，所以Base error就趨近於零

但是若是像辨別一個句子主不主觀，每個人做出來的結果可能就有差，而也有無法辨別出來的人，這是後Base Error就不等於零

而假設今天Base Error等於5%好了，那我們做出來一個model雖然他的error等於6%，但這樣的結果卻是極好的了

換句話說，我們在觀察model的error時，應該考量Base Error來分辨Model的好壞


回到這裡，A的traing set error是1%，相對於Base Error也算是相當好的結果，而dev set error卻很高

所以我們說A是high-variance

B則是training set error跟dev set error都很高，所以B較有可能是high-bias

最後C也是traing set error跟dev set error都很高，但dev set error又比train set error高出許多

這時候不只是訓練不夠，而是訓練錯誤、訓練錯方向，所以導致high-bias&high-variance


---
## Regularization
---



---
## 來源(Reference)
---

*Coursera*
- Machine Learning: 
- Deeping Learning Specialization: https://www.coursera.org/specializations/deep-learning

*Github*
- Kulbear/deep-learning-course: https://github.com/Kulbear/deep-learning-coursera/blob/master/Neural%20Networks%20and%20Deep%20Learning/Deep%20Neural%20Network%20-%20Application.ipynb
- shenweichemn: https://github.com/shenweichen/Coursera

*Userful Blog*






