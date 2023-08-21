/**
 * @description development|开发环境
 * @param getBaseCfg |使用基础配置
 * @param {Object} merge |将多个 webpack 配置文件合并成一个
 */

const getBaseCfg = require('./webpack.base');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(getBaseCfg(true), {
	devtool: 'source-map',
	// resolve: {
	// 	alias: {
	// 		// 别名优先级高于 npm / 模块优先级，这样设置后使 webpack 优先命中源码文件，而不是模块的产物文件
	// 		'@mutongxiao/editor-components': path.resolve(
	// 			__dirname,
	// 			'../../editor-components/src'
	// 		)
	// 	}
	// },
	devServer: {
		port: 8297,
		compress: false, //|压缩
		hot: true, //|热更新
		historyApiFallback: true, //| 解决404的问题
		static: {
			directory: path.join(__dirname, '../public')
		},
		proxy: {
			'/api': {
				target: 'https://api.github.com'
			}
		}
	}
});
