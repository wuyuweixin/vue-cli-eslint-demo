const {resolve} = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const pages = require('./web/src/pages');

module.exports = {
  pages,
  productionSourceMap: false,
  configureWebpack: () => {
    return {
      plugins: [
        //public copy
        new CopyPlugin([{
          from: resolve(__dirname, 'web/public'),
          to: resolve(__dirname, 'dist/static'),
          toType: 'dir',
          ignore: ['*.scss', '*.html']
        }]),
      ]
    };
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve(__dirname, 'web/src'));
    Object.keys(pages).forEach(key => {
      // remove prefetch plugin
      config.plugins.delete(`prefetch-${key}`);
      // remove preload plugin
      config.plugins.delete(`preload-${key}`);
    });
  },
  css: {
    loaderOptions: {
      // 给 less-loader 传递参数
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    port: 8000,
    disableHostCheck: true,
  }
};
