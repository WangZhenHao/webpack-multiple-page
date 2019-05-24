const path = require('path');

module.exports = {
	dev: {
		port: 3000,
		autoOpenBrower: false,
		host: '0.0.0.0',
		overlay: { warnings: false, errors: true },
		openPage: 'home.html'
	},
	build: {
		path: path.resolve(__dirname, '../../','./dist'),
		//如果是目录大于二级,必须设置'/'
		publicPath: './'
	}
}