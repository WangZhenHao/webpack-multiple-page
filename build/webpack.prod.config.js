const path = require('path');
const merge = require('webpack-merge');
//将样式文件单独打包输出的文件由配置文件中的output属性指定
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 用于优化或者压缩css资源
const OptimizeCSSPlugin  = require('optimize-css-assets-webpack-plugin')
// const ExtractTextPlugin = require("extract-text-webpack-plugin");  

const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = require('./webpack.base.config.js');
const { assetsPath } = require('./utils.js');
const config = require('./config/index.js');

module.exports = merge(common, {
	mode: "production",
	optimization: {
		splitChunks: {
	      chunks: "all",
	      minSize: 30000,
	      minChunks: 1,
	      maxAsyncRequests: 5,
	      maxInitialRequests: 3,
	      automaticNameDelimiter: '~',
	      name: true,
	      cacheGroups: {
	          vendors: {
	              test: /[\\/]node_modules[\\/]/,
	              priority: -10
	          },
	          commons: {
	            name: "commons",
	            chunks: "initial",
	            minChunks: 2
	          }
	      }
	    }
	},
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
		            options: {
		              // you can specify a publicPath here
		              // by default it use publicPath in webpackOptions.output
		              // publicPath: '../'
		            }
		          },
		          "css-loader"
		        ]
		    }
		]
	},
	plugins: [
        new CleanWebpackPlugin(),
	    new MiniCssExtractPlugin({
	      // Options similar to the same options in webpackOptions.output
	      // both options are optional
	      filename: assetsPath("css/[name].css"),
	      chunkFilename: "[id].css"
	    }),
	    new OptimizeCSSPlugin({
	      cssProcessorOptions: { safe: true }
	    }),
	]
})