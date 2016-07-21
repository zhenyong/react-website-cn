---
id: getting-started
title: 开始入门
permalink: docs/getting-started.html
next: tutorial.html
redirect_from: "docs/index.html"
---

## JSFiddle

用下面 JSFiddle 的 Hello World 例子，简单快速搞起 React

 * **[React JSFiddle](https://jsfiddle.net/reactjs/69z2wepo/)**
 * [React JSFiddle 不用 JSX](https://jsfiddle.net/reactjs/5vjqabv3/)


## 入门安利包

如果你只是刚入门，可以下载入门工具包，里面包含了编译好的，用于浏览器的 React 和 React Dom 库，
还有一些例子帮助你快速入门。


<div class="buttons-unit downloads">
  <a href="/react/downloads/react-{{site.react_version}}.zip" class="button">
    下载入门工具包 {{site.react_version}}
  </a>
</div>

在入门包的根目录创建 `helloworld.html` 文件，内容如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello React!</title>
    <script src="build/react.js"></script>
    <script src="build/react-dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
      );
    </script>
  </body>
</html>
```

在 JavaScript 中，插入跟 XML 类似的代码，这种语法称之为 JSX；
查看 [JSX 语法](/react/docs/jsx-in-depth.html) 了解更多。

为了把它转化为普通的 JavaScript，我们用上 `<script type="text/babel">`，
并且引入 Babel ，在浏览器运行时转换代码，然后在执行。
通过浏览器打开这个 html 文件，你就可以看到 Hello world 啦！

### 分离文件

JSX 代码可以单独放在一个文件，创建 `src/helloworld.js`，内容如下：

```javascript
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
```

然后在 `helloworld.html` 中引用它

```html{10}
<script type="text/babel" src="src/helloworld.js"></script>
```

提醒：某些浏览器可能无法本地加载 js 文件，你就起个静态服务器呗

## 通过 npm 或者 Bower 来玩 React

你可以通过包管理器，像 npm 或者 Bower，来使用 React。
在 [包管理器](/react/docs/package-management.html) 这章可以了解更多。


## 下一步

想学更多的话，可以查看 [教程](/react/docs/tutorial.html) 文档，
以及入门工具包 `examples` 目录下的其他例子。

祝你好运, 欢迎入坑！
