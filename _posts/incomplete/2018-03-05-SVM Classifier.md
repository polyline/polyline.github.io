---
layout: article_post
title:  "SVM Classifier"
categories: cs
---

---
## 前言
---

其實在上學期看Couresa上的機器學習課程中，就已經有提到SVM了

不過本人腦袋不太靈光，看過就忘了

現在在看論文時，看到這個似曾相似的詞，腦中卻沒有浮現它的運作原理

於是決定花點時間再重新好好學習它吧！

---
## SVM(Support Machine Vector)基本介紹
---

SVM屬於一種監督式學習(Supervised Learning)，跟

---
## 和Logistic Regression與Neural Network的比較
---

---
## SVM原理
---

1. How does SVM work? 
2. Large Margin Classifier

我們可以把SVM看成簡化版的Logistic Regression

為什麼這樣說呢？首先先從Logistic Regression的cost function說起

![img]({{ site.baseurl }}/res/math/CodeCogsEqn.svg)

而我們最後是要最小化所有的cost總和，所以改寫成這樣

![img]({{ site.baseurl }}/res/math/CodeCogsEqn-2.svg)

而SVM做的，就是將其中計算cost的function，改成一個較簡單的function

從以下的圖來解說，本來是log，是一種漸進的圖形，而SVM改成使用逼近原本圖形的直線

這樣可以達到節省計算資源的目的

所以讓我們來看SVM的公式長怎樣，由於這是一個optimization的式子，因此對於式子前的乘積我們可以省略

最後得出的optimized value應該要相同

![img]({{ site.baseurl }}/res/math/CodeCogsEqn-3.svg)

其中，C代表的是調整weight的參數，cost0跟cost1則是SVM用於逼近的函式

Large Margin Classifier

原理是要從「內積」想，我們從SVM帶出的兩個facts來想

1. p(i) * ||theta|| >= 1   if y(i) = 1
2. p(i) * ||theta|| <= -1. if y(i) = 0
ps. theta^T .* x(i) = p(i) * ||theta||

所以，假設今天我的decision boundary的margin很小

那相對的p(i)就會很小，那要達成上面兩式的要求，只能是||theta||很大

但這樣又會regularization term太大，所以在要求最小值的條件下

SVM就能夠達到Large Margin的效果








---
## 實際運用SVM
---

---
## 來源(References)
---

*Machine Learning Course by Andrew Ng on Couresa: *
