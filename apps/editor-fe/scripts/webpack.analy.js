// 构建速度分析配置，当进行优化构建速度
// 肯定要先知道时间都花费在哪些步骤上了，而 speed-measure-webpack-plugin插件
// 可以帮助我们分析打包耗时

const prodConfig = require('./webpack.prod.js'); // 引入打包配置
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); // 引入webpack打包速度分析插件
const smp = new SpeedMeasurePlugin(); // 实例化分析插件
const { merge } = require('webpack-merge'); // 引入合并webpack配置方法
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // 引入分析打包结果插件

// 使用smp.wrap方法,把生产环境配置传进去,由于后面可能会加分析配置,所以先留出合并空位
module.exports = smp.wrap(
	merge(prodConfig, {
		plugins: [
			new BundleAnalyzerPlugin() // 配置分析打包结果插件
		]
	})
);
