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
		//处理多级目录
		let catalogue = item.template.split('/');
		catalogue.pop();
		
		htmlWebpackPlugin.push(new HtmlWebpackPlugin({
			filename: path.join(__dirname, '..',`/dist/${catalogue.join('/')}.html`),
			template: resove(item.template),
			title: item.title,
			// entry: name,
			//需要引入的js
            chunks: [name, 'common'],
			minify: {
		        removeComments: false,
		        collapseWhitespace: false,
		        removeAttributeQuotes: false,
		        //压缩html中的js
		        minifyJS: false,
		        //压缩html中的css
		        minifyCSS: false
		    },
		    chunksSortMode: 'dependency'
		}))
	})
	return {
		entry,
		htmlWebpackPlugin
	}
}

function assetsPath(dir) {
	// return path.posix.join('static', dir);
	return path.posix.join('static', dir)
}
// getPageGenerate();
// console.log(assetsPath('css/style.css'))
module.exports = {
	getPageGenerate,
	assetsPath
}
