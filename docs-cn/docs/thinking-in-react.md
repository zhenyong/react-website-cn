---
id: thinking-in-react
title: React 编程思想
permalink: docs/thinking-in-react.html
prev: tutorial.html
next: conferences.html
redirect_from: 'blog/2013/11/05/thinking-in-react.html'
---

作者：Pete Hunt

在我看来，如果用 JS 构建大型、快速 Web apps，那么 React 是首选。
在 FaceBook 和 Instagram 实践过程中，它已经被打磨得非常棒了。

React 有很多优点，其中一个就是 React 能让你在构建过程更好的思考你的应用。
通过本文，我将带你感受，使用 React 构建可搜索的商品数据表格的思维过程。

## 从一个设计模型开始

试想一下，你已经有了一个 JSON API，和一个设计师给的设计模型。
我们的设计师很菜，所以模型图长这样：

![Mockup](/react/img/blog/thinking-in-react-mock.png)

JSON API 返回如下数据:

```
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```

## 第一步：拆分 UI，形成组件层级

首先要做的是在设计图中，把各个组件（子组件）框起来，然后给它们起个名字。
如果你跟设计师一起干活，他们大概已经做了同样的事情，所以跟他们聊聊呗！
他们的 PS 图层命名也许就是 React 组件的最终命名。
 
不过，你怎么知道把哪些部分独立成组件呢？
其实，这跟你决定是否要创建一个方法或者对象的思路是一样的，
原则就是 [单一职责](https://en.wikipedia.org/wiki/Single_responsibility_principle)，也就是说，理想情况下，一个组件只干一件事情，
如果它最终发展成干很多事情，你就得把它拆分成更小的子组件了。

我们经常给用户展现一份 JSON 结构的数据模型，
然后你会发现，如果你的数据结构设计得很好的话，
你的 UI 界面（也就是你的组件架构）也会一一对应，表现得很好。

这是因为 UI 界面 和 数据模型 都趋向一样的 **信息架构**，
也就意味着，画框框把 UI 界面拆分成组件的过程不是很要紧，
你只要按照数据模型的结构，把界面拆成一块块相对应的组件就行了。

![Component diagram](/react/img/blog/thinking-in-react-components.png)

下面可以看到，我们的简单应用里有五个组件，
其中斜体文字描述了每个组件代表的数据。

  1. **`FilterableProductTable` (橙色):** 包含所有
  2. **`SearchBar` (蓝色):** 接收 所有 *用户输入*
  3. **`ProductTable` (绿色):** 基于 *用户输入* 来显示和过滤 *数据集合* 
  4. **`ProductCategoryRow` (青绿色):** 展示一个 *分类* 名称
  5. **`ProductRow` (红色):** 展示一行 *商品*

看下 `ProductTable`，你会发现表头（包括 "Name" 和 "Price"） 没有独立成组件。
这是个人喜好吧，无论怎么决定都会有争议。
对于这个例子，我就让它成为 `ProductTable` 的一部分，因为 `ProductTable` 负责
*数据集合* 的渲染，而表头也只是这个渲染的一部分。
当然，如果表头变得很复杂（如，增加表头点击排序），
那肯定得把它独立成 `ProductTableHeader`  组件。

我们已经在设计图中区分出各个组件，
接着就给他们列个层级关系，这很简单。
在设计图中，一个组件出现在另一个组件里面，
那层级关系当然就是前者作为后者的孩子。

  * `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
      * `ProductCategoryRow`
      * `ProductRow`

## 第二步：用 React 造一个静态版本

<iframe width="100%" height="600" src="https://jsfiddle.net/reactjs/yun1vgqb/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

我们已经有了组件层级了，接着就是实现你的 app。
最简单的方式就是，先构建一个静态版本，只用数据渲染 UI，没有其他交互。

最好是按照这样的方式去分解开发过程，
因为，创建静态版本需要敲很多代码，但是不需要太多思考，而增加交互逻辑呢，
则需要大量思考，不需要敲太多。接着看你就明白了！


渲染数据模型，构建一个静态版本应用过程中，你创建的组件会复用其他组件，然后使用 *props*
来传递数据。
*props* 是从父组件传递数据到子组件的方式。
如果你熟悉 *state* 原则的话，就 **根本不会用 state** 来构建静态版本。
State 是用来存放可交互的数据，也就是会随着时间而变化的数据。
目前做的是一个静态版本，你当然不需要用 state。


你的开发思路可以自顶向下，或者自底向上，换句话说，
你可以先开发层级关系里比较顶级的组件（例如，`FilterableProductTable`）
或者先开发层级低的组件（`ProductRow`）。
简单的应用，通常自顶向下会比较容易，而大型应用，则自底向上会容易些，测试也好写一点。

走到这一步的最后，你有一个可以渲染数据的可重用的组件库。
这些组件都只有一个 `render()` 方法，毕竟现在做的是一个静态版本。
最顶层的组件 (`FilterableProductTable`) 通过 props 获得你的数据模型。
如果你修改了底层数据模型，然后再次调用 `ReactDOM.render()`，界面就会更新。
你很容易观察到界面是怎么更新的，并且哪里发生变化了，毕竟没啥复杂逻辑。
React 的 **单向数据流** （也叫 *单向绑定*）保证一切都模块化且非常高效。

如果这一步遇到麻烦，参考 [React 文档](/react/docs/)

### 小插曲: props vs state

React 中有两种数据 "模型"： props 和 state。
理解两者的区别很重要，如果你不确定有啥不同，
参考 [React 官方文档](/react/docs/interactivity-and-dynamic-uis.html) 

## 第三步: 确定 UI state，要小而美

想要实现 UI 交互，你需要触发底层数据模型的改变，React 用 **state** 轻松实现。
想要正确的构建应用，首先得思考应用的哪些状态是可变的，如何用最小化可变状态集。
关键原则就是 DRY: *Don't Repeat Yourself*（不要重复自己）. 
找出应用需要的绝对最小化的状态集，然后其它都根据需要计算得到。
例如，你在构建一个 TODO 列表，只需要一个 TODO 项数组，不需要保存一个长度状态，
因为可以通过数组计算得到。

思考我们例子中所有的数据类型，有：

  * 原始商品数据列表
  * 搜索框关键字
  * 复选框是否勾选
  * 过滤后的商品列表

逐个检查，找出哪种数据是 state，对每种数据问三个问题：

  1. 是通过 props 从父组件传过来的？如果是，它很可能不是 state
  2. 随着时间变化，它保持不变？如果是，它很可能不是 state
  3. 能够通过其他 state 或 props 计算出来？如果可以，它不是 state

原始商品数据列表，通过 props 传入，所以它不是 state。
搜索框关键字 和 复选框的值感觉是 state，因为他们会变化，而且也不能通过别的计算得到。
最后，过滤后的商品列表不是 state，因为他可以通过 原始商品数据列表、关键字、复选框计算得到。

最终, 我们的 state 就是:

  * 用户输入的关键字
  * 复选框的值

## 第四步: 确定状态放到哪个组件上

<iframe width="100%" height="600" src="https://jsfiddle.net/reactjs/zafjbw1e/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

好的，我们已经确认了 app 所需的最小状态集。
下一步，需要确认哪个组件来改变状态，或者是 *拥有* 这个状态。

记住： React 的数据在组件层级上是单向传递的。可能没法一下子搞明白哪个组件拥有这个 state。
**这常常是新手遇到棘手的地方**，可以按照下面的步骤来搞明白：

对于 state 的各个数据：

  * 找到所有依赖数据来渲染的组件
  * 找到一个公共拥有者（在层级关系上，一个位于所有依赖这份数据的组件之上的组件）
  * 公共拥有者或者另一个更高层级的组件应该拥有这个状态
  * 如果你不能找到一个合适的组件来拥有这个状态，就创建一个新的组件来存放这个状态，把它放到
  比公共拥有者更高层级的地方就行了

按照这个策略，看看我们的应用：

  * `ProductTable` 需要根据状态数据来过滤商品列表，`SearchBar` 则展示关键字和复选框状态。
  * 公共拥有者就是 `FilterableProductTable`。
  * 把关键字和复选框的值放在 `FilterableProductTable` 在概念上是说的通的。

碉堡了，我们就这么愉快地决定把 state 放在 `FilterableProductTable`。

首先，给 `FilterableProductTable` 添加一个 `getInitialState()` 方法，
返回 `{filterText: '', inStockOnly: false}`，对应整个程序的初始状态。

接着，把 `filterText` 和 `inStockOnly` 传给 `ProductTable` 和 `SearchBar`
作为 prop。

最后，使用这些 props 来过滤 `ProductTable` 中的各行，设置 `SearchBar` 的
表单字段的值。

现在就可以看看你的应用长什么样：修改 `filterText` 为 `"ball"`，然后刷新，
你回看到数据表正确地更新了。

## 第五步: 添加反向数据流

<iframe width="100%" height="600" src="https://jsfiddle.net/reactjs/n47gckhr/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

目前，我们已经构建了一个 app，其中 props 和 state 按照层级单向往下传递，表现完美，
而渲染的结果也是完~美~。

是时候支持另一个方向的数据流：层级比较低的表单组件需要更新层级较高的 `FilterableProductTable` 的状态。

React 的数据流传递明确，让你容易理解程序的运作，
比起传统的双向绑定，确实需要敲多一点点代码。

在当前版本，如果你试着在敲些关键字，或者勾选一下，会发现 React 忽略了你的输入。
确实如此，因为 `input` 的 `value` 属性总是等于 `FilterableProductTable` 传入的 `state`嘛。

我们来思考一下，怎么弄！我们想要确保无论何时，只要用户改变表单，我们就更新
 state 以反映用户的输入。
由于组件应该只更新自己的 state，所以 FilterableProductTable` 将会传递
一个回调给 `SearchBar`，这个回调在 state 需要更新的时候就得触发执行。
我们可以使用 `onChange` 事件来通知触发，接着 `FilterableProductTable` 传入的
回调就会执行，并且调用 `setState()`，于是 app 就会更新了。

尽管听起来很复杂，实际上只要几行代码，也明确地表明了数据在整个应用中的流动。

## 如你所见，就酱

希望在你思考如何使用 React 构建组件和应用的时候，这篇文章能给你一个思路。
也许会让你比以前多敲一点点代码，但是记住，读代码花的时间远比写代码的多，
而且模块化、数据流向明确的代码非常易读。
如果你开始构建大型组件库，你会感谢数据流向的明确性，以及组件的模块化。
而且随着代码不断重用，你的代码行数也会开始减少。