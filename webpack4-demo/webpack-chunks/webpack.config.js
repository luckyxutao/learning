const path = require('path');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: {
        pageA : './src/pageA.js',
        pageB : './src/pageB.js',
        pageC : './src/pageC.js',
    }, // 把 React 相关模块的放到一个单独的动态链接库
	output: {
		path: path.resolve(__dirname, 'dist'), // 输出的文件都放到 dist 目录下
		filename: '[name].bundle.js', //输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称
    },
    optimization:{
        splitChunks:{
            cacheGroups : {
                commons : {
                    chunks : 'initial',
                    minChunks : 2,
                    minSize : 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                }
            }
        }
    },
    module : {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [[
                            "env",
                            {
                              "modules": false
                            }
                          ], 'stage-0', 'react'],
                        plugins: ['transform-decorators-legacy']
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules'),
            },
        ]
    },
    devtool:'source-map',
	plugins: [
        new HtmlWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename : 'pageA.html',
            chunks: ['initial'],
			minify: {
				removeAttributeQuotes: true
			},
			hash: true,
		}),
        new DllReferencePlugin({
            manifest:require('./dist/react.manifest.json')
        })
	],
};
