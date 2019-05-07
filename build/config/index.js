const path = require('path');

module.exports = {
	dev: {
		port: 3000,
		autoOpenBrower: true,
		host: 'localhost',
		overlay: { warnings: false, errors: true },
		openPage: 'home.html'
	},
	build: {
		path: path.resolve(__dirname, '../../','./dist'),
		//如果是目录大于二级,必须设置'/'
		publicPath: '/'
	}
}