---
layout: page
title: 用于构建用户交互界面的 JavaScript 库
id: home
---

<section class="light home-section">
  <div class="marketing-row">
    <div class="marketing-col">
      <h3>声明式</h3>
      <p>React 让你轻松地创建交互界面。只需对应各种状态设计轻量的视图，当数据改变时，React 就能够有效地更新渲染对应的组件。</p>
      <p>声明式的视图让你的代码更可控，并且容易调试。</p>
    </div>
    <div class="marketing-col">
      <h3>组件式</h3>
      <p>构建封装组件，每个组件管理自己的状态，然后组合各个组件从而构建复杂的界面。</p>
      <p>组件的逻辑代码使用 Javascript 而不是模板，
      所以你可以方便地在应用中传递丰富的数据，同时也把状态跟 DOM 分离</p>
    </div>
    <div class="marketing-col">
      <h3>一次学习, 在哪写都行</h3>
      <p>我们没有假定你得先掌握什么别的技术，所以你可以使用 React 开发新功能，而不用碰旧的代码</p>
      <p>React 还可以用 Node 在服务端渲染，还能用 <a href="https://facebook.github.io/react-native/">React Native</a> 搞手机开发。</p>
    </div>
  </div>
</section>
<hr class="home-divider" />
<section class="home-section">
  <div id="examples">
    <div class="example">
      <h3>简单组件</h3>
      <p>
        React 的组件实现了一个 `render()` 方法，接收数据参数，返回展示的内容。
        这个例子使用类似 XML 的一种语法，叫做 JSX。传送给组件的数据可以在 `render()`
        方法里通过 `this.props` 访问。
      </p>
      <p>
        <strong>JSX 不是必须的，没了它 React 也能玩。</strong> 点击 "Compiled JS" 
        看下 JSX 代码编译后的原生 JS 代码长什么样
      </p>
      <div id="helloExample"></div>
    </div>
    <div class="example">
      <h3>有状态的组件</h3>
      <p>
        除了能拿到传入的数据 （通过访问 `this.props`），
        组件还能维护内部的状态数据（通过访问 `this.state`）。
        当一个组件的状态数据发生变化，会再次调用 `render()` 方法，
        更新展示的内容。
      </p>
      <div id="timerExample"></div>
    </div>
    <div class="example">
      <h3>应用程序</h3>
      <p>
        结合使用 `props` 和 `state` 创建一个小的 TODO 应用。
        这个例子使用 `state` 来跟踪最新的列表项，以及用户最近输入的文字。
        虽然事件处理器看上去是内嵌在渲染内容里，不过这些事件会被收集起来，然后通过事件代理实现。
      </p>
      <div id="todoExample"></div>
    </div>
    <div class="example">
      <h3>组件使用第三方库</h3>
      <p>
        React 提供灵活的钩子让你集成第三方库或者框架。这个例子使用 **remarkable**，
        一个第三方 Markdown 库，用来实时转换 textarea 的内容。
      </p>
      <div id="markdownExample"></div>
    </div>
  </div>
  <script src="/react/js/remarkable.min.js"></script>
  <script src="/react/js/examples/hello.js"></script>
  <script src="/react/js/examples/timer.js"></script>
  <script src="/react/js/examples/todo.js"></script>
  <script src="/react/js/examples/markdown.js"></script>
</section>
<hr class="home-divider" />
<section class="home-bottom-section">
  <div class="buttons-unit">
    <a href="docs/getting-started.html" class="button">入门起步</a>
    <a href="downloads.html" class="button">下载 React v{{site.react_version}}</a>
  </div>
</section>
