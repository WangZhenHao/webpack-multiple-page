const pages = require('./config/pages.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');  

function resove(dir) {
	return path.join(__dirname, '..', './src/pages', dir);
}

//获取入口的js和获取需要添加指定的文件名
function getPageGenerate() {
	let entry = {},
	 	htmlWebpackPlugin = [];

	pages.forEach((item, index) => {
		let name = item.name;
		entry[name] = resove(item.entry);
		console.log(path.join(__dirname, '..',`/dist/${name}.html`))
		htmlWebpackPlugin.push(new HtmlWebpackPlugin({
			filename: path.join(__dirname, '..',`/dist/${name}.html`),
			template: resove(item.template),
			title: item.title,
			minify: {
		        removeComments: false,
		        collapseWhitespace: false,
		        removeAttributeQuotes: false,
		        //压缩html中的js
		        minifyJS: false,
		        //压缩html中的css
		        minifyCSS: false
		    }
		}))
	})
	return {
		entry,
		htmlWebpackPlugin
	}
}

function assetsPath(dir) {
	return path.posix.join('static', dir)
}
// getPageGenerate();
// console.log(assetsPath('css/style.css'))
module.exports = {
	getPageGenerate,
	assetsPath
}
