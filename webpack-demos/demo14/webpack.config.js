var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var webpack = require('webpack');
console.log(process.env.DEBUG)
var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});
module.exports = {
    entry: {
        bundle1: './main1.jsx',
        bundle2: './main2.jsx',
        vendor: ['jquery']
    },
    output: {
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader?modules'
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    externals: {
      // require('data') is external and available
      //  on the global var data
      'data': 'datJSON'//相当于注册了个全局变量
    },
    plugins: [
        devFlagPlugin,
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
        new webpack.ProvidePlugin({//提供了别命，不需要在用jquery的文件中require('jquery')
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
        })
    ]
};

//CommonsChunkPlugin将公共依赖提取成一个单独文件,都依赖react