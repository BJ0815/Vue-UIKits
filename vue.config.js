module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'dev/main.js',
      // 模板来源
      template: 'dev/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      title: 'Develop Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },
};
