---
layout: article_post
title:  "node.js+express重點避忌"
categories: cs web
excerpt_separator: <!--more-->
---

---
## 介紹
---

如果你也對以下的問題抱有疑惑，那從這篇文章我們來一步步解開它們吧！

1. 怎麼開始用node.js來建我的網站
2. express是什麼？跟node.js又有什麼關係

<!--more-->

---
## 開始
---

假設你是一個完全不懂的新手，要開始一個專案

我們先為專案想個名稱，並為它創個資料夾，進去後輸入

	npm init

就能開啟一個`node.js`的專案

輸入後，`console`會有一堆問題問你，要你設定一些基本資訊

設定完畢後，我們能看到`package.json`這個檔案中記載了這個專案的所有基本資訊

---
## Hello World!
---

在`node.js`中安裝套件相當容易，我們使用[npm套件管理系統](https://polyline.github.io/cs/web/2018/03/03/npm套件管理系統.html)一行指令就能完成安裝

這邊我們要安裝`express`，所以就輸入

	npm install express --save

這樣就安裝好了！

我們想要做一個會顯示`Hello World!`頁面的網站

	var express = require('express');
	var app = express();
	app.get('/', function (req, res) {
	  res.send('Hello World!');
	});
	app.listen(3000, function () {
	  console.log('Example app listening on port 3000!');
	});

使用`require`就能直接引用套件，當我們送出`/`這個`request`時，回傳只包含字串`Hello World!`的`response`




