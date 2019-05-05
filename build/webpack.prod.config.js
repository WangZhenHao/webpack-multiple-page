const path = require('path');
const merge = require('webpack-merge');
//将样式文件单独打包输出的文件由配置文件中的output属性指定
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 用于优化或者压缩css资源
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// const ExtractTextPlugin = require("extract-text-webpack-plugin");  

const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = require('./webpack.base.config.js');
const { assetsPath } = require('./utils.js');
const config = require('./config/index.js');

const prodWebpackConfig = merge(common, {
	mode: "production",
	output: {
		filename: assetsPath('js/[name].[chunkhash].js'),
		path: config.build.path,
		publicPath: config.build.publicPath
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options:{
				  	   		publicPath: ''
				  	   	}

					},
					'css-loader'
				]
			}
		]
	},
	plugins: [
        new CleanWebpackPlugin(),
	    new OptimizeCSSPlugin({
	      cssProcessorOptions: { safe: true }
	    }),
	    new MiniCssExtractPlugin({
    　　  filename: assetsPath("css/[name].[chunkhash].css") 
        })
	]
})
console.log(prodWebpackConfig.module.rules);
module.exports = prodWebpackConfig;