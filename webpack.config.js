const path = require('path');
const webpack = require('webpack');
const json = require('./file.json');

const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};


/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

// const TerserPlugin = require('terser-webpack-plugin');




// module.exports = {
//   mode: 'development',

//   entry: {
//     n: './src.js'
//   },

//   plugins: [new webpack.ProgressPlugin()],

//   module: {
//     rules: [{
//       test: /\.(js|jsx|json)$/,
//       include: [],
//       loader: 'json-loader'
//     }, {
//       test: /.css$/,

//       use: [{
//         loader: "style-loader"
//       }, {
//         loader: "css-loader",

//         options: {
//           sourceMap: true
//         }
//       }]
//     }]
//   },

//   optimization: {
//     minimizer: [new TerserPlugin()],

//     splitChunks: {
//       cacheGroups: {
//         vendors: {
//           priority: -10,
//           test: /[\\/]node_modules[\\/]/
//         }
//       },

//       chunks: 'async',
//       minChunks: 1,
//       minSize: 30000,
//       name: false
//     }
//   }
// }