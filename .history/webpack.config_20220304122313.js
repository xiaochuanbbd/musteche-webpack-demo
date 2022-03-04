const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		// path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devServer: {
        //静态文件根目录
		contentBase: path.join(__dirname, 'www'),
        // 不压缩
		compress: false,
		port: 8080,
        //虚拟入口文件
		publicPath: '/xuni/'
	}
};
