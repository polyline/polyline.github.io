---
layout: articles_default
title:  "webpack筆記"
categories: cs
---

---
## 什麼是webpack，為什麼需要學？
---

一樣的，我們先從維基百科的定義來看

>>Webpack 是一個開源的前端打包工具。Webpack 提供了前端開發缺乏的模組化開發方式，將各種靜態資源視為模組，並從它生成優化過的程式碼

其實維基百科已經用簡短的一句話說明了webpack最重要的兩個功能

1. 改善模組化產生的效能跟管理問題
2. 優化後生成bundle.js

因為現在有太多用javaScript所撰寫的套件

而webpack是一個能統一管理這些套件，並替我們處理掉考慮這些js檔案相依的問題

例如該先import哪個檔案等等

最後直接輸出一個Bundle.js讓我們能夠直接import這個檔案

這是官網提供的webpack流程圖

[!webpack](\res\photo\webpack.jpg)

以下的筆記主要是參考這個[部落格](https://www.jianshu.com/p/42e11515c10f)和[官方文件](https://webpack.js.org/guides/getting-started/)來透過實作練習`webpack`的功能

練習的檔案上傳在我的[github]()

---
## 安裝(install)
---

	npm install --save-dev webpack

我們可以很簡單的透過`npm`來安裝`webpack`

當然，也可以選擇全局安裝

	npm install -g webpack


---
## 配置文件(Configuration)
---

在這之前，可以先參考[入门Webpack，看这篇就够了](https://www.jianshu.com/p/42e11515c10f)或者[webpack-官方文件](https://webpack.js.org/guides/getting-started/)最一開始的部分

我們可以在`terminal`上直接執行`webpack`

例如在官方文檔中的

	npx webpack src/index.js --output dist/bundle.js

`src/index.js`是原始文件，而`dist/bundle.js`是輸出文件的位置

但是這樣在terminal上執行太過麻煩，所以我們可以透過新增一個配置文件`webpack.config.js`來替代

例如：

	const path = require('path');
	module.exports = {
	  entry: './src/index.js',
	  output: {
	    filename: 'bundle.js',
	    path: path.resolve(__dirname, 'dist')
	  }
	};

`entry`表示`入口文件`的位置

`output`表示`輸出文件`的的`名稱`跟`路徑`

之後，我們可以把執行`webpack`這件事情加到`package.json`的腳本中

	{
		  "scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1",
		    "start": "webpack"
		  },
	}

所以當我們執行

	npm run start

就能夠看到執行完`webpack`的結果了

---
## 使用webpack-dev-server（本地端伺服器）
---

`webpack`提供我們一個伺服器，讓我們可以用於開發測試

提供了一些功能，像是當程式碼有變化時，自動刷新等

首先我們必須安裝這個套件：

	npm install --save-dev webpack-dev-server

之後在`webpack.config.js`中加入`webpack-dev-server`的一些選項

	devServer: {
		contentBase: "./public",
		historyApiFallback: true,
		inline: true
	} 

`contentBase`就是我們主頁面的位置

`inline`是文件改變時，會不會自動刷新頁面

`historyApiFallback`是讓所有跳轉指向`index.html`

再來，還要在`package.json`中加上`script`：

	{
		  "scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1",
		    "start": "webpack",
		    "server" "webpack-dev-server --open"
		  },
	}


---
## Source maps
---

但是`webpack`這樣的運作方式可能會有一個問題

開發後，當我們測試中發生錯誤時

因為所有檔案已被`webpack`打包成了`bundle.js`

所以很難找到錯誤點，可讀性不高

這個時候可以透過`Source maps`來解決這個問題

我們要在`配置文件`中新增`devtool`這個屬性

	module.exports = {
		devtool: 'eval-source-map'
		...
	}

我們能夠選擇的`source map`一般來說有四種

1. source-map
2. cheap-module-source-map
3. eval-source-map
4. cheap-module-eval-source-map

其中的差異在這邊不多說，但是由上至下打包速度越快，可讀性越低


---
## 模塊加載器(Loader)
---

`webpack`能透過`loader`來對不同格式的文件做處理

例如將`sass`轉成`css`、`JSX文件`轉成`JS文件`等等

要使用`Loader`，必須在`webpack.config.js`中作配置

我們將會使用`Babel`，所以在`webpack.config.js`中加入：

	module.exports = {
		...,
		module:{
			rules: [
				{
					test:/(\.jsx|\.js)$/,
					use:{
						loader: "bable-loader",
						options: {
							presets:[
								"env", "react"
							]
						}
					},
					exclude: /node_modules/
				}
			]
		}
	}

安裝`Babel`相關的依類包

	npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react

完成到這裡，代表`webpack`允許我們使用`ES6`以及`JSX`的語法了

`loader`會去尋找在我們指定的目錄下的`jsx`跟`js`檔

並且將他們轉換成瀏覽器所接受的語言

於是，我們可以引進`React.js`的語法了

在這裡，我們是把Babel的配置直接寫在`webpack.config.js`中

但是我們也能加它分離到另一個檔案`.babelrc`

編譯時就會自動讀取了`.babelrc`文件

	//.babelrc
	{
		presets:[
			"env", "react"
		]
	}

---
## CSS相關loader
---

除了轉化JSX語法，我們也能使用loader來達到CSS模塊化的功能

這邊我們使用`css-loader`和`style-loader`

而為了讓`webpack`能找到`css`，所以我們必須在我們的

入口檔案`main.js`裡面引進`css`

	module:{
		rules: [
			{...},
			{
				test: /\.css$/,
				use:[
					{
						loader: "style-loader"
						},
					{
						loader: "css-loader",
						options: {
							modules: true,
							localIdentName: '[name]__[local]--[hash:base64:5]'
						}
					}
				]
			}
		]
	}

之後，我們便可以在js檔案中引進`css模塊`來使用

例如：

	//./main.css
	.root {
		...
	}

	//./main.js
	...
	import main-css from './main.css';
	...
		render(){
			return(
				<div className={main-css.root}>
						Hello!
				</div>
				);
		}
	...

---
## postcss webpack-plugins
---

套件是對整個`webpack`建構過程作用

而`loader`則是處理源文件

常常使用的套件有這些：

1. html-webpack-plugin
2. Hot Module Replacement(HMR)

`html-webpack-plugin`能根據一個html模板來產生對應的`index.html`文件

例如，我們創建一個模板文件在`./app/index.templ.html`

然後必須在`webpack.config.json`中添加相關訊息

	module.export = {
		...,
		output: {
			path: __dirname + "/build", //將webpack編譯後的文件存放在build資料夾中
			filename: "build.js"
		},
		...,
		plugins: [
			new webpack.BannerPlugin('Made by Chen, Tsu Pei'), // BannerPlugin 能在產生的代碼中加上版權宣告文字
			new HtmlWebpackPlugin({
					template: __dirname + "./app/index.templ.html" // 參考用的源html代碼文件
				})
		]
	}

`HMR`則是可以實現`熱加載`的功能，也就是當我們開發實作的更改

能即時在網頁上刷新

要使用`HMR`的話，我們必須做三件事情

1. 在webpack配置文件夾加上HMR插件
2. 在webpack dev server加上hot參數
3. 在JS文件中，調用webpack提供的API

讓我們先來完成前兩件事情

	module.export = {
		...,
		devServer: {
			...,
			hot: true
		},
		plugins: [
			new webpack.BannerPlugin('Made by Chen, Tsu Pei'),
			new HtmlWebpackPlugin({
					template: __dirname + "./app/index.templ.html"
				}),
			new webpack.HotModuleReplacementPlugin() //實現熱插件
		]
	}

關於第三件事情，react模塊可以直接使用Babel更方便的實現熱加載

我們透過一個在`Babel`中叫做`react-transform-hrm`的套件

就可以不用在`react模塊`中載入API而達到熱加載的功能

所以我們要在`.babelrc`中做一些配置

	//.babelrc
	{
		"presets": ["react", "env"],
		"env": {
			"development": {
				"plugins": [
					[
						"react-transform",
						{
							"transforms":[
								{
									"transform": "react-transform-hmr",
									"imports": ["react"],
									"locals": ["module"]
								}
							]
						}
					]
				]
			}
		}
	}

當然，這些套件都要事先透過`npm`安裝好才能使用




---
##
---


---
## 來源(References)
---

1. [入门Webpack，看这篇就够了](https://www.jianshu.com/p/42e11515c10f)
2. [webpack-wiki](https://zh.wikipedia.org/wiki/Webpack)
3. [webpack-官方文件](https://webpack.js.org/guides/getting-started/)
4. [Roy_Huang-新手向-webpack-完全攻略](https://medium.com/@Roy_Huang/新手向-webpack-完全攻略-1-e7981097e6a3)
5. [css modules](https://github.com/css-modules/css-modules)


