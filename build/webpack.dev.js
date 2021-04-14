const {
  merge
} = require('webpack-merge');
const webpack = require('webpack');


const common = require('./webpack.common.js');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true';
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = merge(common, {
  entry: {
    app: [
      './src/index.js',
      hotMiddlewareScript,
    ]
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 8080,
    hot: true,
    inline: true, //打包后加入一个websocket客户端
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new ParallelUglifyPlugin({
    //   cacheDir: '.cache/',
    //   uglifyJS: {
    //     output: {
    //       comments: false
    //     },
    //     compress: {
    //       warnings: false
    //     }
    //   }
    // }),
  ]
})