var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = [
  {
    name: 'server',
    entry: __dirname + '/app/server/index.js',
    target: 'node',
    output: {
      filename: 'index.js',
      path: __dirname + '/build/server'
    },
    externals: nodeModules
  },
  {
    name: 'app',
    entry: __dirname + '/app/index.js',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    output: {
      filename: 'app.js',
      path: __dirname + '/build/app'
    },
    plugins: [HTMLWebpackPluginConfig]
  }
];
