## free-doc 组件文档生成工具

### 安装

```shell
npm i free-doc -g
```

### 使用

```
free-doc serve

free-doc build
```

### 配置文件 doc.config.js

具体参考 example
```js
module.exports = function () {
  return {
    setup: './setup.js', // 文档启动时会被引用

    /**
     * 文档配置
     * 第一级会出现在 header，第二级开始为独立的文档页
     */
    components: [
      {
        title: '组件',
        path: '/components',
        defaultPath: '/components/button',
        children: [
          {
            title: 'Button 按钮',
            path: '/button',
            component: './src/button/button.md', // 指定需要解析的 md 文件
          },
          {
            title: 'Progress 进度条',
            path: '/progress',
            component: '@/src/progress/progress.md', // @ 是当前执行目录的别名
          },
        ]
      },
      {
        title: '文档',
        path: '/article',
        defaultPath: '/article/article1',
        children: [
          {
            title: '文档 1',
            path: '/article1',
            component: './article/article1.md',
          },
          {
            title: '文档 2',
            path: '/article2',
            component: './article/article2.md',
          },
        ]
      }
    ],

    /**
     * 自定义 webpack 配置，返回新的 webpack 配置，可以实现高度个性化的需求
     * free-doc 默认已经提供了一些关于文档组件的别名
     * 可以通过自己定义 webpack entry 在自己的文件中引用相关文档组件，将文档集成到站点中来
     * ~docs 文档整合页数组，components 字段第一级会被处理成独立的文档整合页
     * ~doc-config 结构与 doc.config.js 一致，不过 components 每一项文档 component 字段都会被处理成文档页，可以自由实现菜单
     */
    customWebpackConfig(config) {
      // return new config
    }
  }
}
```

### 文档编写


>demo 引用
```
::: demo <demo 路径> [demo标题] [--dev 是否只在开发环境调试]
[demo 描述（可不填）]
::: 
```
>生成文档

为了方便开发维护，对于组件 props，直接采用注释生成文档的方式。参考 [react-docgen](https://github.com/reactjs/react-docgen#readme)

```
::: doc <组件 jsx 文件路径>
::: 
```

### Example
example 提供了比较典型的使用示例，克隆本项目，进入 example 对应项目目录下，使用 free-doc 生成文档即可查看

```shell
cd example/test-components
free-doc serve
# visit http://127.0.0.1:18888
```