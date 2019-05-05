const path = require('path');

module.exports = {
	dev: {
		port: 3000,
		autoOpenBrower: true,
		host: 'localhost',
		overlay: { warnings: false, errors: true }
	},
	build: {
		path: path.resolve(__dirname, '../../','./dist'),
		publicPath: './'
	}
}