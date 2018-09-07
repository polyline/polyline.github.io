---
layout: article_work
title:  "YFR-利用留言，即時找出直播中的主題"
excerpt_separator: <!--more-->
categories: cs
---

---
## 介紹
---

在日本交換留學的這一年，我們必須完成一個研究，也就是`YFR Research`，雖然沒有限制說應該怎麼做，像是一定要有成品，或者要寫成一篇論文之類的

我所加入的lab是`Okumura-Takamura NLP Lab`，`NLP`的中文是自然語言處理，而我訂的主題是`利用留言，即時找出直播中的主題`

乍看之下很簡單的一句話，其實有很多個困難存在，而這也算是我第一次做研究

<!--more-->

---
## 研究簡介
---

如上述所言，我的研究主題是對留言進行分析，也就是對短文本做主題模型或者關鍵字提取

所以這個任務主要會牽扯到兩件事情：

1. 短文本(short text)
2. 帶有時間訊息的資料(data with timestamp)

另外，對於留言(comments)這種型態的資料，具有跟一般的長文本資料，或者短文本(ex. Tweet)不同的性質

1. 非常短(extremely short)
2. 語法結構不嚴謹(without strict syntax structure)
3. 用語較為通俗(casual form)
4. 線型結構(thread-structure)
5. 與主題無關的留言(comments not related to the topic)

接下來，我想要更詳細的說明我的研究

我想要處理的資料型態是`帶時間資訊的留言`，所以最直接的應用是直播影片的留言

如此一來，能夠讓直播主(host)能夠即時掌握留言區的主題

也或者是，在一個討論串中，例如：歷時兩天的討論串

關於這個討論串的主題的變化、走向

那我想要的結果是，給定一個區間的留言，我能判斷出這個區間的主題或關鍵字是什麼

找主題的話，那麼第一個想到就是套用主題模型(Topic Model)

找關鍵字的話，就得考慮一些關鍵字(Keyword Extraction)的方法

---
### Topic Model
---

說到使用LDA主題模型，我們發現LDA Topic Model並不適合使用於短文本

因為在Gibbs Sampling時，我們一開始隨機賦予每個字一個主題，然後不斷取樣直到收斂

在LDA中，我們假設每個文件都有一個主題分布，然後每個字都有一個主題

所以，我們最後取樣出來的結果應該是會符合這個主題分布的

但是，在短文本中，文章過短(假設只有50個字)，那我們取樣出來的分布就很難符合主題分布

我們說，在這個過程中喪失了`word co-occurence`的關係

因此，就有人想出了`mixture of unigrams`的方法

假設全部的文章都是同一個主題分布，而每個文章只有一個主題(對照LDA是每個字有一個主題)

這樣的假設克服了短文本稀疏性的問題(text sparsity)，因為是所有corpus裡面的字來完成這個主題分布

但這樣的假設卻不太符合實際，就算是短文本(ex. Tweet)，文章中也可能有多種主題

所以在較長的文本中`mixture of unigrams`的表現會比較差

而`Biterm Topic Model`則巧妙的同時解決這兩件問題

首先讓我們先定義什麼是`Biterm`，也就是文章中單詞兩兩的組合，舉例來說

	Tokyo Tech in Tokyo

在這裡，我們就有$C_{2}^{4}$種組合(ex. Tokyo Tech, Tech in, Tech Tokyo, ...)，而它們構成了`Biterm Set`

*註：在這邊應該要先去掉stop words*

再來，我們模擬一個`Biterm`的生成過程，整個corpus只有一個主題分布，每次生成一個Biterm時，從主題分布中取一個主題

然後對這個主題的詞項分布取兩個字$W_{i}, W_{j}$

這麼一來，一個短文本中，還是可能有多種不同主題，而且同時保留了詞跟詞之間的`co-occurence`的關係

但在這邊我們同時有了另一個假設，我們假設一個文本的主題分布，會等於`Biterm`的主題分布





---
## 心路歷程
---

`Finished`

- 思考研究方向
- Couresa - Machine Learning 線上課程
- Couresa - Deep Learning Speciality 線上課程
- NLTK
- Text Rank
- Subjectivity in comments

`studying`

- Speech and Language Processing
- Fundamentals of Probability
- Pytorch
- LDA Topic Model
- Gibbs Sampling

`going to do`

- PRML
- gensim
- Dynamic LDA Topic Model

---
## 資源一籮筐
---

1. [nlp的一些工具包整理](https://tedboy.github.io/nlps/)
2. [nlp 使用wiki+gensim, scrapy文章](http://www.52nlp.cn/tag/gensim)


---
## 研究歷程
---

`stage`

想弄懂`LDA Model`，但實在牽扯到太多數學，我已經參考了所有能參考的英文、中文資料，包含

1. 原始論文
2. [prof. David's speech about Dynamic LDA Topic Models](https://www.youtube.com/watch?v=FkckgwMHP2s)
3. LDA數學八卦
4. 徐亦達教授的MCMC算法影片
5. 無數的博客

我還是抓不太到整個LDA的精髓，所以我想這該歸咎於對於`機率`的不熟悉，同時也許直接從代碼下手能看到我沒看見的東西

`stage`

在這個階段，我想要好好地想一下我的研究的過程、目的到底是什麼

1. 我要做的是關於直播評論的summary，所以第一，我要先有這些數據，所以不妨先去抓一下Youtube跟Facebook的直播數據
2. 其實現在做的topic model跟我原本要做的方法是兩種不同的方法，我原本的方法是從這些評論中抓取關鍵字，然後作為主題，但現在的主題model是把這些字都賦予一個主題，然後利用LDA Topic Model的方法來歸類出一個時段的主要主題

`stage`

現在對於LDA還有哪些疑惑？

1. 所謂的吉普斯採樣跟變分算法，到底是怎麼做到的
2. 不太懂最後LDA給出的算式是怎樣
3. LDA給的likelihood，不太清楚為什麼可以先得到每個主題的count

`stage`

關於LDA的變種，現在覺得最有相關的是

1. DLDA
2. RLDA

---
## 練習使用genism的LDA Model
---

`1~2 day`

這個任務主要讓我了解一下LDA的整個運作過程

對於LDA來說，最直觀的用途應該是拿來分類`長文本`，很幸運的，我們在網路上找到一個[很完整的Tutorial](https://www.machinelearningplus.com/nlp/topic-modeling-gensim-python/)

在這個`tutorial`中，除了能學會如何用LDA之外，我們還能學到一些在`nlp`中常見的工具包的用法

首先，我們來安裝所有會用到的工具包

1. re
2. numpy
3. pandas
4. pprint
5. gensim
6. spacy
7. pyLDAvis
8. matplotlib
9. (optional) logging
10.(optional) warnings

這篇文章提到，影響我們能不能得到好的、有區別性的topic結果，取決於以下這些條件

1. The quality of text processing.
2. The variety of topics the text talks about.
3. The choice of topic modeling algorithm.
4. The number of topics fed to the algorithm.
5. The algorithms tuning parameters.

---

`bug疑難雜症處理`

我們在進行到import `Mallet LDA package`時遇到不知名的問題，我們一直無法成功import package

所以我歸納有幾種可能

1. java沒有安裝好
2. 路徑寫錯誤
3. 路徑上的權限問題

結論是第一種，`java`在官網的解說並沒有寫得很清楚，而且如果使用官網的安裝後

我們在`terminal`上也沒辦法直接用安裝好的新版本

所以會建議直接使用`brew`來[安裝](https://stackoverflow.com/questions/24342886/how-to-install-java-8-on-mac)

然後重新打開`terminal`後就能夠順利執行了

	java -version

	java version "10.0.1" 2018-04-17
	Java(TM) SE Runtime Environment 18.3 (build 10.0.1+10)
	Java HotSpot(TM) 64-Bit Server VM 18.3 (build 10.0.1+10, mixed mode)

---



















