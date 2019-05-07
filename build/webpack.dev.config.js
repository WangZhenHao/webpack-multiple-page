const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const common = require('./webpack.base.config.js');
const webpack = require('webpack');
const path = require('path');
const { getPageGenerate } = require('./utils.js');
const pagesGenerate = getPageGenerate();
const portfinder = require('portfinder');
const config = require('./config/index.js');

const devWebpackConfig = merge(common, {
	mode: 'development',
	devServer: {
		// contentBase: path.join(__dirname, '..', './dist/'),
		contentBase: false,
		historyApiFallback: false,
		hot: true,
		quiet: true,
		// 出现错误时，在浏览器中显示全屏覆盖层
		overlay: {
			warnings: false, errors: true
		},
		host: config.dev.host,
		port: config.dev.port,
		open: config.dev.autoOpenBrower,
		openPage: config.dev.openPage
	},
	module: {
		rules: [
		    {
		        test: /\.(c|sc)ss$/,
		        use: [
		          'style-loader',
		          'css-loader',
		          "sass-loader"
		        ]

		    },
		]
	},
	plugins: [
	  ...pagesGenerate.htmlWebpackPlugin,
	  //启用热替换模块(Hot Module Replacement)，也被称为 HMR。
	  new webpack.HotModuleReplacementPlugin()
	]
})

module.exports = new Promise((reslove, reject) => {
	portfinder.basePort = config.dev.port;
	portfinder.getPort((err, port) => {
		if(err) {

		} else {
			devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
		        compilationSuccessInfo: {
		          messages: [`您的应用运行在成功: http://localhost:${config.dev.port}${config.dev.openPage}`],
		        }
		    }))
		}


		reslove(devWebpackConfig);
	})
})
