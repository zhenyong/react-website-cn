---
id: tutorial
title: 教程
permalink: docs/tutorial.html
prev: getting-started.html
next: thinking-in-react.html
---

我们来一个简单又实用的评论框，然后可以放在你的博客，就像 Disqus, 
 LiveFyre 或者 Facebook 评论那样，不过是一个基础版咯。

需求就是:

* 显示所有评论的列表
* 提交评论的表单
* 提供自定义后台服务（都准备好，填坑就行） 

还有一些很酷的功能:

* **乐观地评论:**  评论在提交后立刻展现在列表中，对于评论是否成功地保存到服务器，我们很乐观，这样体验起来会爽一点。
* **实时更新:** 其他用户的评论实时出现在评论界面
* **支持 Markdown 格式:** 用户能用 markdown 语法来写评论

### 想直接上代码？

[都在 GitHub 上](https://github.com/reactjs/react-tutorial)

### 启动一个服务器

这个教程需要一个服务器，提供纯 API 服务，用来获取和保存数据。
为了方便，我们写好了一个简单够用的服务器，提供几种脚本语言版本。
**你可以 [查看源码](https://github.com/reactjs/react-tutorial/) 或者 
[下载 zip 包](https://github.com/reactjs/react-tutorial/archive/master.zip)
**


简单起见，服务器使用一个 `JSON` 文件作为数据库。
这样方便我们模拟一个真实 API 服务，当然啦，生产环境不能这么干。
一旦 [启动这个服务器](https://github.com/reactjs/react-tutorial/#to-use)，
它就能支持 API 服务和静态页面访问。

### 开始咯

教程会很简单滴。刚才说的服务器包，里面有一个 `public/index.html` HTML 文件，我们先用它干活，
用你喜欢的编辑器打开它，长这样:

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>React Tutorial</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/{{site.react_version}}/react.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/{{site.react_version}}/react-dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/remarkable/1.6.2/remarkable.min.js"></script>
  </head>
  <body>
    <div id="content"></div>
    <script type="text/babel" src="scripts/example.js"></script>
    <script type="text/babel">
      // To get started with this tutorial running your own code, simply remove
      // the script tag loading scripts/example.js and start writing code here.
    </script>
  </body>
</html>
```

接下来的教程里，我们会在这个 script 标签内写代码。
我们木有什么高级实时刷新工具，所以你得保存代码后手动刷新浏览器。
启动服务器后，在浏览器打开 `http://localhost:3000`。
如果你啥都没改的话，看到的就是我们最终想要完成的产品，现在就删除前一个 `<script ...example.js>` 标签，然后开始敲代码。

> 注意:
>
> 我们引入了 jQuery，只是为了简化 ajax 调用，**不是** React 必要的

### 第一个组件

React 玩的就是模块化、可组合的组件。而我们的例子会采用下面这样的组件结构：

```
- CommentBox
  - CommentList
    - Comment
  - CommentForm
```

先弄 `CommentBox` 组件，就是个简单的 `<div>`

```javascript
// tutorial1.js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
```

原生的 HTML 标签名字以小写字幕开头，而自定义的 React 类名以大写字母开头。

#### JSX 语法

首先注意到的就是 JavaScript 里边有像 XML 那样的代码。
我们有一个简单的预编译器，可以把把这种语法糖转换成普通的 JavaScript 代码。


```javascript
// tutorial1-raw.js
var CommentBox = React.createClass({displayName: 'CommentBox',
  render: function() {
    return (
      React.createElement('div', {className: "commentBox"},
        "Hello, world! I am a CommentBox."
      )
    );
  }
});
ReactDOM.render(
  React.createElement(CommentBox, null),
  document.getElementById('content')
);
```

Its use is optional but we've found JSX syntax easier to use than plain JavaScript.
Read more on the [JSX Syntax article](/react/docs/jsx-in-depth.html).
不一定要用 JSX，但是用它比起用普通的 JavaScript 要简单一点。
参考 [JSX 语法](/react/docs/jsx-in-depth.html) 了解更多。

#### 接下来干嘛咧

我们给 `React.createClass()` 方法传入一个对象，包含一些方法，从而创建一个 React 组件。
这些方法里，`render` 是最重要的，它返回一棵 React 组件树。

这里的 `<div>` 标签并不是真正的 DOM 节点；他们表示 React 的 `div` 组件实例。
你可以把它理解为标记或者数据，React 知道怎么处理它。
React 是**安全的**。我们不生成 HTML 字符串，所以默认 XSS 安全没问题。

不一定要返回基本的 HTML，
你可以返回一颗组建树，这些组件可以是你（或者别人）创建的。
这使得 React **组件化**: 一个前端可维护性的原则

`ReactDOM.render()` 实例化根组件, 启动框架。 
第二个参数是一个原生 DOM 元素，React 会把这些标记注入到这个元素里。

`ReactDOM` 模块暴露了一些 DOM 特定的方法。
而 `React` 在不同平台上都有 React 团队分享的核心工具 (例如, [React Native](http://facebook.github.io/react-native/)).

`ReactDOM.render` 放在 script 最下面执行，这点很重要，
因为 `ReactDOM.render` 必须在组合的组件定义完之后才能调用。

## Composing components

创建 `CommentList` 和 `CommentForm` 的骨架，同样是一个简单的 `div` 啥的。
把这两个组件添加到你的文件，保持原来的 `CommentBox` 定义和 `ReactDOM.render` 调用。

```javascript
// tutorial2.js
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        Hello, world! I am a CommentList.
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});
```

接着，修改 `CommentBox` 组件，在里边使用这些新组件

```javascript{6-8}
// tutorial3.js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});
```

注意到我们如何把组件和 HTML 标签弄一起的。
HTML 组件是常规的 React 组件，和你定义的组件差不多，有一点不同：
JSX 编译器会自动把 HTML 标签替换为 `React.createElement(标签名)` 表达式，其它不变。
这是为了全局命名空间被污染。

### 使用 props

接着创建 `Comment` 组件，它依赖于父组件的数据。
数据从父组件传入后，可以在子组件上像『属性』一样使用，这些『属性』通过 `this.props` 访问。
通过 props，我们在 `Comment` 组件可以读取从 `CommentList` 传入的数据，
然后渲染一些标记。


```javascript
// tutorial4.js
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});
```

通过用大括号括号包住 JSX 中的 JS 表达式（作为属性或孩子），你可以把文本或 React 组件放到组件树中。
把属性名作为 `this.props` 的 key 则可访问对应的属性值，通过 `this.props.children` 则可访问任意内嵌元素

### 组件属性

我们已经定义好 `Comment` 组件，将来只需给它传入作者名称和评论内容，
这也就让我们重用一个组件代码，构建不同的评论。
现在就在 `CommentList` 内添加一些评论：

```javascript{6-7}
// tutorial5.js
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="Pete Hunt">This is one comment</Comment>
        <Comment author="Jordan Walke">This is *another* comment</Comment>
      </div>
    );
  }
});
```

注意到，我们通过父组件 `CommentList` 传送一些数据到子组件 `Comment`。 
例如, 传递 *Pete Hunt* (通过属性) 和 *This is one comment* (通过类似 XML 节点) 给第一个 `Comment`。 
正如之前所说， `Comment` 组件将通过 `this.props.author` 和 `this.props.children` 访问这些『属性』。

### 增加 Markdown

Markdown 一种格式化内联文本的简单方式。 
例如，用星号包住文本让它变得强调突出。

使用第三方库 **remarkable**，能把 Markdown 文本转化为纯 HTML 代码。
我们已经在页面中引入了这个库，所以只管用就行。
那么我们就把评论内容按照 Markdown 语法格式化，然后输出：

```javascript{4,10}
// tutorial6.js
var Comment = React.createClass({
  render: function() {
    var md = new Remarkable();
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {md.render(this.props.children.toString())}
      </div>
    );
  }
});
```

这里也就是调用一下 remarkable 库。
All we're doing here is calling the remarkable library. 

我们显示调用 `toString()`，
把 React 包裹的文本 `this.props.children` 转化为原生字符串，
这样 remarkable 才能正确处理。

但是，这里有个问题！显示在浏览器的评论长这样： "`<p>`This is `<em>`another`</em>` comment`</p>`"。 
可是我们想让这些标签渲染成 HTML。

其实这是因为 React 为了保护你，避免 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。 
有一种方式可以搞掂，不过框架会警告提醒你慎用:

```javascript{3-7,15}
// tutorial7.js
var Comment = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});
```

这是个神奇的 API，故意让你难以插入原生 HTML，
不过为了 remarkable，我们可以好好利用这个后门。

**记住:** 使用了这个功能后，你的安全性就得看 remarkable 了。

### 挂上数据模型

目前我们已经是在代码里直接插入评论，换一种方式，让我们渲染一堆 JSON 数据到评论列表里。
最终这堆数据会来自服务器，不过现在先直接写在代码里呗：

```javascript
// tutorial8.js
var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];
```

我们得把这份数据通过模块化的方式塞到 `CommentList` 里，
修改 `CommentBox` 和 `ReactDOM.render()` 调用，通过 props 传递数据到 `CommentList`：


```javascript{7,15}
// tutorial9.js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);
```

现在 `CommentList` 就能使用这份数据, 我们动态的渲染这些评论吧:

```javascript{4-10,13}
// tutorial10.js
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
```

就酱紫!

### 从后台获取数据

我们把写死的数据替换为后台获取的动态数据吧，
我们会把 data 属性移除，用一个 url 替换，用来获取数据。

```javascript{3}
// tutorial11.js
ReactDOM.render(
  <CommentBox url="/api/comments" />,
  document.getElementById('content')
);
```

这个组件跟前面的组件有点不同，因为它必须得重新渲染。
这个组件开始啥数据都没，等到请求从后台返回后才有数据，这时候组件就得渲染一些新的评论。

提醒: 到这一步代码还不能跑

### Reactive state

目前为止，基于自己的 props，每个组件已经渲染了一次，`props` 是不可变的：
他们从父级传入，并且被父级所『拥有』。
为了实现交互，我们给组件引入可变的 **state**，`this.state` 是组件私有的，
可以通过调用 `this.setState()` 来改变，
当 state 更新之后，组件就会重新渲染。


`render()` 是一个可以使用 `this.props` 和 `this.state` 的方法。
框架会保证 UI 与输入总是一致的。

当后台获取数据时，我们将改变已有的评论数据。
我们给 `CommentBox` 增加一个评论数据数组，作为它的 state

```javascript{3-5,10}
// tutorial12.js
var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});
```

`getInitialState()` 在组件生命周期间只执行一次，用来设置组件的初始 state

#### 更新 state

当组件首次创建时，我们要从后台获取一些 JSON 数据，然后更新 state 以反映最新的数据。
我们打算用 jQuery 向之前启动的服务器发出异步请求，获取我们所需的数据。
数据已经在你启动的服务器里了（基于 `comments.json` 文件），
所以，一旦获取成功，`this.state.data` 就会长这样：

```json
[
  {"id": "1", "author": "Pete Hunt", "text": "This is one comment"},
  {"id": "2", "author": "Jordan Walke", "text": "This is *another* comment"}
]
```

```javascript{6-18}
// tutorial13.js
var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});
```

这里的 `componentDidMount` 方法在组件第一次渲染完之后，React 会自动调用它。
调用 `this.setState()` 则是动态更新的关键。
我们用服务器获取的新数据替换老的评论数组，界面自己就会自动的更新。
正因为这种响应特性，只需一丁点改变就能实现实时更新。
我们这里使用方便的轮询，你也可以很容易替换成 WebSockets 或者其它技术。

```javascript{3,15,20-21,35}
// tutorial14.js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);

```

这一步做的事情，就是把 AJAX 调用放到一个单独方法里，然后当组件第一次加载后，每两秒调用一次这个方法。
试着在浏览器运行，然后修改 `comments.json` 文件（在跟目录下），两秒内就能在界面看到你的改变了。

### 添加评论


现在就得创建表单了。
我们的 `CommentForm` 组件得知道用户的名字和他们的评论内容，
然后发送一个请求后台保存这个评论。

```javascript{5-9}
// tutorial15.js
var CommentForm = React.createClass({
  render: function() {
    return (
      <form className="commentForm">
        <input type="text" placeholder="Your name" />
        <input type="text" placeholder="Say something..." />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
```

#### 受控组件

在传统的 DOM 环境里，`input` 元素被选染的，并且浏览器负责管理它的状态（它渲染的值）的。
结果就是，DOM 的状态跟组件的状态不一致，视图的状态跟组件的不一样呀，这当然不是我们想要的。
在 React 里，组件的状态，跟视图的状态，应该一直保持一致，而不仅仅在初始化的时候。
因此，我们使用 `this.state` 来保存用户的输入。
我们定义初始 `state` 有两个成员 `author` 和 `text`，初始化为空字符串。
在我们的 `<input>` 元素里，设置 `value` 属性，反映组件的 `state`，然后给它关联
`onChange` 事件处理器。
这类被设置了 `value` 的 `<input>` 元素，我们称之为受控组件。
查看文章 [表单](/react/docs/forms.html#controlled-components) 了解更多关于受控组件的知识。

```javascript{3-11,15-26}
// tutorial16.js
var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  render: function() {
    return (
      <form className="commentForm">
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
```

#### 事件

React 注册事件处理器时，使用驼峰风格来命名事件。
我们给两个 `input` 元素注册了 `onChange` 事件处理器。
现在，当用户在 `<input>` 输入内容，关联的 `onChange` 回调方法就会执行，
接着，组件的 `state` 就会被修改。
随后，`input` 元素的渲染值会被更新以反映当前组件的 `state`。


（读者可能觉得很意外，事件处理器怎么就按照预期的执行了呢，毕竟这些方法引用没有明确的绑定到 `this` 上。
其实，`React.createClass(...)` 会 [自动绑定](/react/docs/interactivity-and-dynamic-uis.html#under-the-hood-autobinding-and-event-delegation)
每个方法到它的实例, 避免手动绑定.）

#### 提交表单

我们来实现表单的交互，当用户提交表单时，我们应该清空表单，然后提交一个请求到后台，
然后刷新评论列表。
首先，监听表单的 submit 事件然后清空表单：

```javascript{12-21,24}
// tutorial17.js
var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    // TODO: send request to the server
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
```

我们给表单关联了 `onSubmit` 处理器，当合法提交时清空表单字段。

在事件处理器调用 `preventDefault()` 用来禁止浏览器默认的表单提交。

#### 回调方法作为属性

当用户提交一个评论时，，我们需要刷新评论列表然后包含这个新的评论。
我们觉得在 `CommentBox` 里面实现这个逻辑比较靠谱，因为 `CommentBox` 拥有这些 state，
而这些 state 就代表着评论列表呀。

我们得把数据从子组件传回给父组件，为了实现这事，
我们在父组件的 `render` 方法里给子组件传入一个回调（`handleCommentSubmit`），
把这个回调绑定到子组件的 `onCommentSubmit` 事件。
每当事件触发，这个回调就会被调用了：

```javascript{16-18,31}
// tutorial18.js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    // TODO: submit to the server and refresh the list
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
```

现在 `CommentBox` 通过 `onCommentSubmit` 属性就能让 `CommentForm` 使用回调了。
当用户提交表单时，`CommentForm` 可以调用回调。

```javascript{19}
// tutorial19.js
var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
```

现在回调也弄好了，我们要做的就是提交到服务器，然后刷新列表:

```javascript{17-28}
// tutorial20.js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
```

### 优化: 乐观地更新

我们的应用功能已经完成了，但是感觉有点不爽，因为要等待保存的请求完成之后，评论才能出现在列表中。
其实我们可以非常愉快乐观地，不管后台保存成功没，直接把评论添加到列表中，让体验更快。

```javascript{17-23,33}
// tutorial21.js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    // 乐观地给新评论设置一个 id，以后也会被服务器生成的 id 替换。
    // 在生产环境中，最好别用 Date.now() 来生成 id，得用更强壮靠谱的方式。
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
```

### 不错哟!

你刚通过几个简单的步骤就构建了一个评论框。
学习更多关于 [为啥要用 React](/react/docs/why-react.html)，
或者入坑 [API 指南](/react/docs/top-level-api.html) 开始撸码！祝你好运！
