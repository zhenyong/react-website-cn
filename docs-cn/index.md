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
      <h3>一个简单组件</h3>
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
      <h3>A Stateful Component</h3>
      <p>
        In addition to taking input data (accessed via `this.props`), a
        component can maintain internal state data (accessed via `this.state`).
        When a component's state data changes, the rendered markup will be
        updated by re-invoking `render()`.
      </p>
      <div id="timerExample"></div>
    </div>
    <div class="example">
      <h3>An Application</h3>
      <p>
        Using `props` and `state`, we can put together a small Todo application.
        This example uses `state` to track the current list of items as well as
        the text that the user has entered. Although event handlers appear to be
        rendered inline, they will be collected and implemented using event
        delegation.
      </p>
      <div id="todoExample"></div>
    </div>
    <div class="example">
      <h3>A Component Using External Plugins</h3>
      <p>
        React is flexible and provides hooks that allow you to interface with
        other libraries and frameworks. This example uses **remarkable**, an
        external Markdown library, to convert the textarea's value in real time.
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
    <a href="docs/getting-started.html" class="button">Get Started</a>
    <a href="downloads.html" class="button">Download React v{{site.react_version}}</a>
  </div>
</section>
