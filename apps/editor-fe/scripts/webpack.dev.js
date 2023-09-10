/**
 * @description development|开发环境
 * @param getBaseCfg |使用基础配置
 * @param {Object} merge |将多个 webpack 配置文件合并成一个
 */

const getBaseCfg = require('./webpack.base');
const { merge } = require('webpack-merge');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(getBaseCfg(true), {
	devtool: 'eval-cheap-module-source-map',
	resolve: {
		alias: {
			// 别名优先级高于 npm / 模块优先级，这样设置后使 webpack 优先命中源码文件，而不是模块的产物文件
			// 这里设置的是编译层面的别名解析，对于在IDE层面的语法解析，还要在 tsconfig.json，添加 baseUrl 和 paths，
			'@mutongxiao/editor-components': path.resolve(
				__dirname,
				'../../editor-components/src'
			)
		}
	},
	// 局部热更新
	plugins: [new ReactRefreshWebpackPlugin()],
	devServer: {
		port: 8297,
		compress: false, // gzip压缩,开发环境不开启,提升热更新速度
		hot: true, // 开启热更新
		historyApiFallback: true, // 解决history路由404问题
		static: {
			directory: path.join(__dirname, '../public') //托管静态资源public文件夹
		},
		proxy: {
			// api代理
			'/api': {
				target: 'http://localhost:3001'
			}
		}
	}
});
