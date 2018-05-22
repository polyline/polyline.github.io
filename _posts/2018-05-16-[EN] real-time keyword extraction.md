---
layout: articles_default
title:  "[EN] real-time keyword extraction -imcomplete-"
categories: cs
---

---
## Going to do!
---

1. 複習之前那篇論文，然後跟現在讀的這篇結合，看如何應用在live streaming
2. 現在的state-of-the-art是找出最大的subgraph，並且在其中持續刪除最低分的（the lowerest degree），可能存在改進空間的是，關於sliding window設定的問題，還有文章太短(comment)的問題
	1. 文本太短，使用sliding window很困難
	2. 

Problems of meeting scripts
1. multi-party
2. short

Problems of live streaming 
1. need to have enough comments data
2. comments could be imcomplete

把目的再強化一點，這樣可以解決什麼問題

---
## Preview
---

In this work, I would like to collect all related papers of this topic. Try to clarify the most popular methods in this areas. Also, I would also point out some specific features in this work. For examples, multi-party's utterances would imply diffenct styles.

To briefly introduce my research, I want to analyze comments of a live video, and try to find out some keywords or key concepts in a particular interval. For example, from *t=0* to *t=3*, showing a set of keywords, and the next interval *t=3* to *t=6*, showing another set of keywords. All of keywords are extracted from comments.

In order to do that, let's think some related work. First of all, keyword extraction is neccessary, however, most of research of keyword extraction are focus on long and formal articles(ex. news, wiki-document). In this task, we get to focus on `short` and `informal` documents, but we can still learn some techniques from those, maybe it could be also used in short documents. On the other hand, there are few researches about short and informal documents such as `Tweet`, `Meeting Script`, `Comments` may be helpful.

Besides, real-time is also an important task here. To recap, our input is a sequence of sets of comments in a particular interval. In the live streaming, topics of intervals are suppposed to be `continuously changing`, that is, it's less possible to change topics suddenly between two neighboring intervals. Moreover, information in `previous intervals still could be useful` in current interval. 

To sum up, we can list:

1. keyword extraction toward short-documents
2. algorithm that can preserve information in past rounds and discard unused information
3. process multi-party comments
4. unsupervised method(since it's difficult to get labeled output)

And in live streaming, there are some profound features:

1. comments could be high-repetitive
2. information are incompelete*\*1*
3. order is important, comments are with time-stamp
4. compared to keyword extraction from meeting scripts, comments are without imcomplete words, filler words(ex. uh..), interruption.


*\*1.* Comments in a live streaming could be diaglogue between audience and the host, while we can only analyze comments from audience. That's also why we only want to extract keywords instead of summary. Our goal is to give a quick knowledge of the topic in the live streaming to new audience.


---
## Review Keyword Extraction Method
---

1. TF/IDF
2. TextRank
3. RAKE(Rapid Automatic Keyword Extraction)
4. 

---
## Read Papers
---

1. Real-Time Keyword Extraction from Conversations(Polykarpos et al. 2017 EACL)
	- k-core decomposition(Batagelj and Zaveršnik 2011)
	- centrality + tightly knitted structure(Tixier et al. 2016a)
	- CoreRank(CR)
2. 
3.
4.


---
## Real-Time Keyword Extraction from Conversations(Polykarpos et al. 2017 EACL)
---

1. preprocessing
2. each word represented as a vertex
3. word co-occurence network, in fixed sliding window size, if two word co-occur, then build a edge between two nodes
4. weighted, undirect graph
5. k-core decomposition
	- counting k-core
	- counting CoreRank
	- get optimistic subgraph
	- counting degree
	- delete the vertex of the lowest degree in the subgraph
6. Keyword Qaulity Function
	Since we  want to extract the best substructure of the graph, we define a quality function as criteria for choosing. We take two factors into accout, CoreRank and how many steps to be a fully connected graph, which imply the graph being highly knitted.
7. Time Complexity
	- counting k-cores: O(V+Elog(V))
	- counting CR: O(V)
8. Evaluation
	Compare with 5 baseline: random, frequency, RAKE, weighted degree centrality, PageRank.
	In this paper, they used two scenario to evaluate. The first one is the cosine similarity of commulative one-hot word vector between extracted keyword set and the provided extractive summary. The second one is to concatenate all extracted keywords as a summary and use two methods, ROUGE-1, WMD, to compare the similarity with abstractive summary.
9. Discussion and related papers
	- Lin et al. 2009
		- ?
	- Habibi and Popescu-Belis 2003
		- LDA and submodularity to select keywords covering as much topics as possible
	- Meladianos et al. 2015, *Degeneracy-Based Real-Time Sub-Event Detection in Twitter Stream*
		- ?
10. Some Pre-setting or assumption in this paper
	- word-embedding - 300-dimensional vectors learned from a 100B-word corpus(Google news)
	- assume that at most on topic could be discussed in each interval


*PS.*
*1. We have to calculate time complexity to gaurantee that the performance meets real-time requirement*
*2. Being with high degree means be more central, and being with high CR means being tightly knitted*




---
## Related Work
---


