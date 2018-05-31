---
layout: article_post
title:  "Naive Bayes Classifier"
categories: cs
excerpt_separator: <!--more-->
---

*2018-5-24*

---
## 介紹
---

這邊是第二次看到Naive Bayes Classifier

第一次是在學Machine Learning的時候，給定已知的數據來預估未知的數據

使用Naive Bayes Classifier有幾個優點，在我們缺少某個資料(missing values)時還是能夠計算出相對應的機率

它有一個假設是，各個feature之間是獨立(independent)，稱為Naive Bayes Assumption

用在確定獨立的feature當然是沒問題，但實驗證明用在可能依賴的features也有不錯的表現

另外，在NLP這邊，我們想把Naive Bayes Classifier運用在Text categorization task of sentiment analysis上

如果給定一個文件，我們能否判斷出它屬於哪個類別

最常見是，判斷一個文件是positive還是negative

<!--more-->

---
## 推導
---

先稍微整理一下整個推導的過程：

1. 我們的目的，給定一個文件d，要求出最有可能的類別c

	![my equation](https://i.imgur.com/fChgb0a.png)

2. 將Bayes Theorem套用在這裡
3. 由於文件的機率P(d)對於不同的類別來說一樣，我們可以視為常數省略

	如此一來，我們可以得出以下式子

	![my equation](https://i.imgur.com/K2IKmg0.png)

	the highest product of Likelihood and Prior is our answer

	但是，對於計算這樣的Likelihood還是有點困難

4. 不失一般性的情況，我們能用a set of festures來表示一個文件d
5. 在這裡再帶入兩個假設：Bag of words和Naive Bayes Assumption
6. 最後，避免overflow的情況，我們用log space來表示，這樣就得到最後的式子了

![my equation](https://i.imgur.com/LbTk6XH.png)

---
## Optimizing for Sentiment Analysis
---

有幾件常被加在NB Text Classification的方法

1. Binary NB

	通常，一個字有沒有出現，會比字出現的次數來得重要，所以我們可以只看字有無出現，也就是0或1

2. Deal with Negation

	在英文中，有時候在否定的狀況，字會是完全相反的意思

	我們看下面這個例子

	didn't like this movie, but I

	如果把字拆開，我們看like會好像是正面的意思，但其實這是否定的句子，所以反而要是負面的意思才對

	這邊我們可以做個處理，將句子改寫成這樣

	didn't NOT\_like NOT\_this NOT\_movie, but I

3. using Sentiment Lexicons

	有時候，我們並沒辦法在每個字都labeled上class，這時可以利用一些sentiment lexicon來補






