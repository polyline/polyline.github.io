---
layout: article_post
title:  "[讀]共軛性(conjugacy) -imcomplete- "
categories: cs
---
---
## 前言
---

在繼續研究PRML這本書的Beta Distribution的時候

有個疑問是，為什麼

把Binoninal Distribution當作Likelihood，把Beta Distribution當作Prior

相乘之後就可以得到Posterior Distribution

所以，這篇文章想要再更深入的研究這些問題

---
## 整理疑惑
---

我會在這裡感到疑惑是

1. 不知道為什麼共軛性(conjugacy)的由來
2. 為什麼Gamma函數可以使Bata分布達到歸一化(sum = 1)的效果
3. Beyes' Theorem以往只知道在機率上的應用，在Distribution上也能直接相乘嗎？
4. 關於最後面的推導

{% assign photo=site.data.equation[0] %}


![my equation](https://i.imgur.com/VbuEkLG.png =x10)

conjugate

Beta Distribution - continuous distribution

Gamma Function

Bayes' Theorem

Prior and Posterior Distribution 

Posterior (is proportional to) Likelihood * Prior