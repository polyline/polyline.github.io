---
layout: article_post
title:  "[讀]Gibbs Sampling"
categories: math probability
excerpt_separator: <!--more-->
---

---
## 介紹
---

首先，在整理這篇關於`Gibbs Smapling`，中文叫做`吉普斯採樣`的過程中，我參考了許多資料

我得到最多幫助的莫過於`LDA 數學八卦`，以及徐亦達教授的`機器學習`的課程

這兩個資料只要Google一下都能找到，用大約一天的時間看完會很有幫助的

我認為要弄懂`Gibbs Sampling`之前，要先依序搞懂以下的概念

1. 什麼是sampling? 為什麼要sampling?
2. 一般的分布(ex. Gaussian Distribution)如何做sampling
3. MCMC方法
4. M-H Algorithm
5. Gibbs Samping

---
## Samping 
---

---
## 一般容易採樣的分布
---

如果是一般簡單的分布，我們能夠透過對`Uniform Distribution(均勻分布)`的變換生成出來

在`Gaussian Distribution`的例子：

$$ 取隨機變量U_{1}, U_{2} \sim Uniform[0,1] \\ $$

$$ Z_{0} = \sqrt{-2 \ln{U_{1}}} \cos (2 \pi U_{2}) \\ $$

$$ Z_{1} = \sqrt{-2 \ln{U_{1}}} \sin (2 \pi U_{2}) $$

$$ 則Z_{0}, Z_{1} 服從於正態分布 $$

上面的例子是有名的`Box-Muller Transform`，而其他的分布像是Beta分布、Dirichlet分布、指數分布、Gamma分布等等

也都能用類似的變換方法得到sample

---
## MCMC
---

目前對於MCMC的理解，有兩處不太懂

這個算法理論上是基於`馬克夫鏈`收斂的性質，也就是想達到一個平穩分布$\pi$使得$\pi P = \pi$

我們一開始假設有一個轉移矩陣$Q$，但是並沒有達到`細緻平穩收斂`

$$p(x^{\star})q(x^{\star} \rightarrow x) \neq p(x)q(x \rightarrow x^{\star})$$

所以，我們改造轉移矩陣$Q$，把它拆解成兩個步驟: `proposal distribution`和`acceptance distribution`

因為這麼一來，我們可以改寫一下上式

	p為proposal distribution, Alpha為acceptance distribution

$$p(x^{\star})q(x^{\star} \rightarrow x) \alpha(x^{\star} \rightarrow x) = p(x)q(x \rightarrow x^{\star}) \alpha(x \rightarrow x^{\star})$$

要使得上式成立的話，我們可以根據對稱性來取$\alpha$

$$\alpha(x^{\star} \rightarrow x) = p(x)q(x \rightarrow x^{\star}) $$

然後用新定義的${Q}'$改寫

$$p(x^{\star}){q}'(x^{\star} \rightarrow x) = p(x){q}'(x \rightarrow x^{\star})$$

$${q}'(x^{\star} \rightarrow x) = q(x^{\star} \rightarrow x) \alpha(x^{\star} \rightarrow x)$$

我們從均勻分布裡面隨機取一個值，如果小於接收率$\alpha$的話，我們就停留在原本的狀態

反之，則能跳到下一個狀態

這便是目前網路上大致對於`MCMC`算法的解釋

雖然算法大致理解，但對於為何這樣的算法可以成立還是存在蠻多疑惑的

1. 我懂馬克夫鏈最後會收斂，但為什麼可以用在這邊，我們現在的目的是要想辦法採樣一個很難採樣的distribution，所以我是在對這個distribution做轉移？並且假設它已經達到平穩分布？
2. 為什麼用那樣接受率的算法，就能成功採樣出符合目標分布的樣本
3. 我們的轉移矩陣要怎麼取？網路上的資料是說通常會使用平穩分布(normal distribution)，並且要小心均值和方差的選擇

---

*2018/7/19* 再回來看時，大概對MCMC算法更了解了，便可以來回答一下我自己以前的疑惑

---

讓我們再一次好好整理整個MCMC的過程：

1. 原本的p(x)很難採樣，所以我們設計了一個`Markov Process`來採樣

$$p(x_{a})q(x_{b} \mid x_{a}) ?=  p(x_{b})q(x_{a} \mid x_{b})$$

這邊不要再把p當成`distribution`思考，他就只是一個`sample`的機率，我們要假設取樣p的機率符合細緻穩定平衡(detailed balance)

所以加入`接受率`到式子裡面，變成

$$p(x_{a})q(x_{b} \mid x_{a}) \alpha(x_{b} \mid x_{a})=  p(x_{b})q(x_{a} \mid x_{b}) \alpha(x_{a} \mid x_{b})$$

讓我試著解釋一下這個式子的意義，假設我們的$\alpha(x_{b} \mid x_{a})$是`0.4`，代表我們有0.4的機率能夠從$x_{a}$轉到$x_{b}$

而在程式編寫上呢，我們會直接從`0到1的unifrom distribution`抓一個值出來，然後看他有沒有落在0.4以內的範圍裡

有的話轉移成功，我們就把$x_{b}$當作成功的樣本，反之則把現在的樣本$x_{a}$當作樣本

注意，在`MCMC`中每次採樣都不會被浪費掉


---
## M-H Method
---

而`M-H Method`只是將上面的`接受率`稍微修改

$$p(x_{a})q(x_{b} \mid x_{a}) \frac{\alpha(x_{b}\mid x_{a})}{\alpha(x_{a} \mid x_{b})} =  p(x_{b})q(x_{a} \mid x_{b})$$

$$ a = \frac{\alpha(x_{b}\mid x_{a})}{\alpha(x_{a} \mid x_{b})} = \frac{p(x_{b})q(x_{a} \mid x_{b})}{p(x_{a})q(x_{b} \mid x_{a})} $$

所以我們可以把轉移的過程寫成

$$p(x_{a})q(x_{b} \mid x_{a})a(x_{a})q(x_{b} \mid x_{a})$$

我們先從`proposal distribution`$q$中取一個sample，然後計算新的接受率(acceptance ratio)，如果大於等於一的話就接受

反之，則以$a$的機率接受，方法也是跟上面一樣，從`uniform distribution`隨機取一個介於[0, 1]的數字


---
## Summary of M-H Method
---



https://www.quora.com/What-is-an-intuitive-explanation-of-the-Metropolis-Hastings-algorithm

https://stats.stackexchange.com/questions/100121/mcmc-with-metropolis-hastings-algorithm-choosing-proposal

https://en.wikipedia.org/wiki/Metropolis–Hastings_algorithm


