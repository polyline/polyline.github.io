---
layout: article_post
title:  "[讀]Probability Distribution"
categories: cs
---

---
## 前言
---

接續著我們前一篇求Maximum Likelihood的文章繼續，接下來我們要來看幾個常見的Distribution

為了好好學習好，讓我們回到大二的機率課本：*FUNDAMENTALS OF PROBABILITY WITH STOCHASTIC PROCESSES*

裡面的第四章節到第九章節，從Random Variable開始講解，然後從Discrete Distribution到Continuous Distribution

同時也提到一些常用的Distribution，像是Possion Distribution等等

我們預計花一個禮拜的時間好好複習一下這邊

---
## Going to Read
---

#### Chapter 4
- 4.1 Random Variables
- 4.2 Distribution Functions
- 4.3 Discrete Random Variables
- 4.4 Expectation of Discrete Random Variables

*Finished*

#### Chapter 5
- 5.1 Bernoulli and Binomial Random Variables
- 5.2 Possion Random Variables

---
## Random Variables
---

*First Day*

我們首先來理解一下Random Variable的定義：

>The values of such quantities depend on random actions, and they usually change from one experiment to another

也就是在每一次的實驗中，得到的結果都會不同時，我們稱它為Random Variable

在完整的數學定義中：

	Let S be the sample space of an experiment. A real-valued function X : S → R is called a random variable of the experiment if, for each interval I ⊆ R , {s: X(s) ∈ I} is an event.

讓我們來看一個例子，假設我們今天骰三次骰子，求骰到人頭面的次數有多少

骰子的各種結果組合就是我們的S，而人頭面的次數就是我們的R

我們可以說，S是包含Random Variable所有可能的集合，而X是一個S → R的Function，將S用一個實數來表示

---

從原本的Random Variable中，也能產生新的Random Variable，在以下的條件下

1. 假設有兩個Random Variable, X和Y，在同個定義域S，並且對應到值域R，那麼`X+Y`, `X-Y`, `aX+bY`, `XY`, `X/Y, Y!=0`也都是Random Variables
2. 對於實數對應到實數的function來說，與Random Variable X的composition也還是S → R，所以還是Random Variable，例如`sin X`, `cos X2`, `eX`, `X3 − 2X`

所以我們看**Example4.5 Disk的範例**就可以很清楚，一開始Random Variable是直徑D，改成求面積也還是一樣符合Random Variable的定義

---
## Distribution Functions
---

>Definition: If X is a random variable, then the function F defined on (−∞, +∞) by F(t) = P(X ≤ t) is called the distribution function of X

我們只需要求出`P(X ≤ t)`，就可以求出其他所有的機率：P(X = a), P(X < a), P(X ≤ a), P(X > b), P(X ≥ b), P(b ≤ X ≤ a), P(b < X ≤ a), P(b ≤ X < a), and P(b < X < a)

以下是一些關於`F`的性質

1. F is nondecreasing
2. lim(t →∞) F(t) = 1
3. lim(t→−∞) F(t) = 0
4. F is right continuous

利用這些性質，我們就可以求出上面那些其他區間的機率

---

根據`Remark 4.1`，我們也可以反推回來，如果一個function F，滿足以上四個條件，那麼一定存在一個Random Variable X over S，使得X的Distribution Function是F

---
## Discrete Random Variables
---

Random Variable的集合，可以是Countable, finitely countable, uncountable. 如果是countable或者finitely countable的話，我們稱之為`Discrete Random Variables`

>Definition: The probability mass function p of a random variable X whose set of possible values is {x1 , x2 , x3 , . . . } is a function from R to R that satisfies the following properties

	a. p(x) = 0 if x !∈ {x1,x2,x3,...}.
	b. p(xi) = P(X = xi) and hence p(xi) ≥ 0 (i = 1,2,3,...).
	c. ∑p(xi) = 1

所以，如果存在一個countable的set{x1, x2, x3, ...}，並且滿足p: R→R，使得p(xi) >= 0(i=1,2,3,...)，並且P(xi) = 0，如果xi !∈{x1,x2,x3, ...}，且∑p(xi)= 1，則我們可以稱p是`probability mass function`。

`probability mass function`的`distribution function`很簡單，只是將離散的pmf機率相加即可得到

	x1 <= t < x2
	F(t) = p(X <= t) = p(x1)
	以此能夠類推到
	xn-1 <= t < xn
	F(t) = p(X <= t) = p(x1) + p(x2) + ... + p(xn-1)

---
## Expectation of Discrete Random Variables
---

這個章節算是複習，再加上一些補充的知識

`Expectation`(期望值)，在`pmf`中，只要將每個機率與對應到的x相乘就是答案

	E(X) =   ∑xp(x)
	We say E(x) exists only if this sum converge absolutely

期望值要收斂才會存在

---

`St. Petersburg Paradox`，如果我們說，丟一個硬幣，直到丟到第一次出現正面(head)時，是第k次，那麼可以獲得`2^k`的錢

根據這個敘述得到的期望值會是

	1+1+1+1+... = ∞

課本中提了幾個`期望值發散`的範例，有時間可以回來再看:example 4.19~4.22

---

>Theorem 4.2: Let X be a discrete random variable with set of possible values A and probability mass function p(x), and let g be a real-valued function. Then g(X) is a random variable with

	E[g(X)]  =   ∑ g(x)p(x).

也就是當我們將原本的Random Variable X套進一個`real-valued function` g(x)中，g(X)也還是Random Variable(根據前面的說明)，期望值就可以根據上述的式子得出，詳細的證明可以參考課本。

---

Collary: E(X)是線性的，也就是

	E(∂X+ß) = ∂E(X)+ß

---
## Bernoulli Random Variable And Binomial Random Variables
---
*Second Day*

關於`Bernoulli`，大家應該都相當了解，也就是只有兩種結果的事件，像是擲硬幣只會也正面或反面兩種情況

>They have only two possible outcomes. One outcome is usually called a success, denoted by s. The other outcome is called a failure, denoted by f 

>The sample space of a Bernoulli trial contains two points, s and f . The random variable defined by X(s) = 1 and X(f ) = 0 is called a Bernoulli random variable

	For a Bernoulli random variable X with parameter p, 0 < p < 1, E(X)=p, Var(X)=p(1−p), σX = √p(1−p).

而我們如果重複`Bernoulli Experiment` n次的話，我們就會得到`Binomial Probability Mass Function`

>Definition: The function p(x) given by equation (5.2) is called the binomial probability mass function with parameters (n, p)

這邊的**Example 5.6**還蠻有趣的，如果陪審團中，一個人做對決定的機率是p，那麼三人的陪審團跟一人的陪審員，誰做對決定的機率比較高？

我們可以先看三人陪審團，最後決定的方式是簡單多數決，所以就是至少兩個人做對決定時，我們記做`P(X >= 2)`

	P(X >= 2) = P(X = 2) + P(X = 3) = 3p^2 * (1-p) + p^3 = -2p^3 + 3p^2

假設三人陪審團做對決定的機率較高

	-2p^3 + 3p^2 > p
	=> -2p^2 + 3p > 1
	=> 2(1-p)(p-1/2) > 0

所以，當`p>1/2`時，三人陪審團做對決定機率較大，反之，單人陪審員做對決定機率較大

	If X is a binomial random variable with parameters n and p, then E(X)=np, Var(X)=np(1−p), σX = √np(1−p).

---
## Poisson Random Variables
---

Poisson Random Variable是將Binominal Random Variable展開後，如果`n趨近於無限大`，所推論出來的式子

所有可能的P(X = xi)相加(i=0,1,2,...,n)也會等於，證明`Probability of Poisson Random Variable`是`pmf`

>Definition A discrete random variable X with possible values 0, 1, 2, 3, . . . is called Poisson with parameter λ, λ > 0, if

	P(X=i)= (e^-λ * λ^i) / i! , i=0,1,2,3,....

而Poisson也能當作Binomial一種approximation，在`p<0.1`, `np<=10`的情況下可以有很好的表現

Poisson的Expectation跟Variance都是λ，推論請參考課本

	If X is a Poisson random variable with parameter λ, then E(X) = Var(X) = λ, σX = √λ.





