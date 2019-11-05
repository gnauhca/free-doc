const path = require('path');

module.exports = function () {
  return {
    setup: './setup.js',
    defaultPath: '/components/button',
    components: [
      {
        title: '组件',
        path: '/components',
        children: [
          {
            title: 'Button 按钮',
            path: '/button',
            component: './src/button/button.md',
          },
          {
            title: 'Progress 进度条',
            path: '/progress',
            component: '@/src/progress/progress.md', // or path start with config file
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
    customWebpackConfig(config) {
      config.resolve.alias['test-components'] = path.join(__dirname, 'src');
      return config;
    }
  }
}