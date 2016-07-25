---
id: displaying-data
title: 展示数据
permalink: docs/displaying-data.html
prev: why-react.html
next: jsx-in-depth.html
---


界面用来干嘛？最普遍的就是用来展示数据。React 很容易展示数据，并且当数据变化后自动保证界面更新。

## 开始

我们看一个非常简单的例子。 
创建 `hello-react.html` 文件，内容如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello React</title>
    <script src="https://fb.me/react-{{site.react_version}}.js"></script>
    <script src="https://fb.me/react-dom-{{site.react_version}}.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <script type="text/babel">

      // ** Your code goes here! **

    </script>
  </body>
</html>
```

For the rest of the documentation, we'll just focus on the JavaScript code and assume it's inserted into a template like the one above. Replace the placeholder comment above with the following JSX:

接下来，你只需要关注 js 代码，用下面的 JSX 替换掉上面的注释：


```javascript
var HelloWorld = React.createClass({
  render: function() {
    return (
      <p>
        Hello, <input type="text" placeholder="Your name here" />!
        It is {this.props.date.toTimeString()}
      </p>
    );
  }
});

setInterval(function() {
  ReactDOM.render(
    <HelloWorld date={new Date()} />,
    document.getElementById('example')
  );
}, 500);
```

## Reactive Updates

在浏览器中打开 `hello-react.html` 然后在输入框输入你的名字。
然后注意到，React 只是在界面中改变了时间，而你在输入框中的内容则一直保持着，
尽管你没有写任何代码来控制这一切，React 帮你搞掂并且如你所愿。

之所以能干得漂亮，是因为 React 几乎不操作 DOM，除非不得已。
**它使用一个快速、内部虚拟的 DOM 来处理变化，并且计算出最高效的 DOM 变化。**

对于组件的输入，命名为 `props` - 即 "properties" 的缩写。
在 JSX 的语法里，通过属性来传递输入。
在组件内，你应该把这些输入看做不可变的，这意味着，**绝不要修改 `this.props` **。


## 组件如函数

React 组件都非常简单，你可以把他们简单的理解成函数，然后带有 `props` 和 `state`(后面会讲) 参数，进行 HTML 渲染。这么一说，组件就容易理解了。


> 注意:
>
> **有个限制**: React 组件只能渲染到一个根节点，如果你想要返回多个节点，那么你必须
给他们包装一个单一根节点

## JSX 语法

我们强烈地认为，比起 "模板" 和 "展现逻辑"，组件是分离关注的正确方式。
另外，展现逻辑通常很复杂，如果用模板语言去表示会变得繁杂。

我们发现这类问题的最佳方案就是从 JS 代码生成 HTML 和 组件树，
这样你就能利用真实的程序语言『表达』能力区构建界面了。


为了更简单，我们增加一个简单的，**可选的** 像 HTML 风格的语法，用来创建
React 节点树。

**JSX 让你使用 HTML 语法来创建 JS 对象.** 在 React 中，
如果用原生 JS 来生成一个链接，你回这么写：

`React.createElement('a', {href: 'https://facebook.github.io/react/'}, 'Hello!')`

用上 JSX 则变成:

`<a href="https://facebook.github.io/react/">Hello!</a>`

We've found this has made building React apps easier and designers tend to prefer the syntax, but everyone has their own workflow, so **JSX is not required to use React.**
我们发现这会让构建 React 应用更容易些，而且设计师们更爱这种语法。
不过并不是每个人都喜欢，所以 **对于 React，JSX 是可选的**。

JSX is very small. To learn more about it, see [JSX in depth](/react/docs/jsx-in-depth.html). Or see the transform in action in [the Babel REPL](https://babeljs.io/repl/).
JSX 非常小，查看 [深入 JSX](/react/docs/jsx-in-depth.html) 
或者 [the Babel REPL](https://babeljs.io/repl/) 学习更多。

JSX 跟 HTML 很像,但并非完全一样，查看 [JSX 坑](/react/docs/jsx-gotchas.html) 了解一些关键的区别。

[Babel 给出多种方式来使用 JSX](http://babeljs.io/docs/setup/), 包括从命令行工具到 Ruby on Rails 集成，选一种最适合你的。

## 不用 JSX 的React

JSX 完全可选。你可以用原生 JS 创建 React 元素，使用 `React.createElement` 方法，
带上 标签名或组件、属性对象和一些可选的子节点参数。

```javascript
var child1 = React.createElement('li', null, 'First Text Content');
var child2 = React.createElement('li', null, 'Second Text Content');
var root = React.createElement('ul', { className: 'my-list' }, child1, child2);
ReactDOM.render(root, document.getElementById('example'));
```

For convenience, you can create short-hand factory functions to create elements from custom components.
为了方便，你可以创建简短的工厂方法，通过自定义组件来创建元素

```javascript
var Factory = React.createFactory(ComponentClass);
...
var root = Factory({ custom: 'prop' });
ReactDOM.render(root, document.getElementById('example'));
```

React 已经内置了一些工厂方法，用来创建一般的 HTML 标签：

```javascript
var root = React.DOM.ul({ className: 'my-list' },
             React.DOM.li(null, 'Text Content')
           );
```
