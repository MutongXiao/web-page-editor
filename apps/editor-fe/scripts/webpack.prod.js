/**
 * @description productions
 */
const getBaseCfg = require('./webpack.base');
const { merge } = require('webpack-merge');
const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 可以通过 purgecss-webpack-plugin 插件打包的时候移除未使用到的css样式
// 这个插件是和 mini-css-extract-plugin 插件配合使用的
// 但是purgecss-webpack-plugin插件不是全能的,由于项目业务代码的复杂,插件不能百分百识别哪些样式用到了,
// 哪些没用到, 所以请不要寄希望于它能够百分百完美解决你的问题, 这个是不现实的。
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
// 还需要 glob-all 来选择要检测哪些文件里面的类名和 id 还有标签名称
const globAll = require('glob-all');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

// 优化， 压缩， 分治。
module.exports = merge(getBaseCfg(false), {
	/**
	 * @description 优化方案配置
	 * @param minimizer |压缩方案配置
	 * @param TerserPlugin |压缩JS
	 * @param CssMinimizerPlugin |压缩css
	 * @param splitChunks |代码切片 (https://webpack.docschina.org/plugins/split-chunks-plugin)
	 */
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: true, // 并行压缩
				terserOptions: {
					compress: {
						pure_funcs: ['console.log', 'console.warn']
					}
				}
			}),
			new CssMinimizerPlugin({
				parallel: true
			})
		],
		splitChunks: {
			// 缓存配置
			chunks: 'async',
			minSize: 40000,
			minChunks: 1,
			cacheGroups: {
				// 提取node_modules代码
				vendors: {
					test: /node_modules/, // 只匹配node_modules里面的模块
					name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
					minChunks: 1, // 只要使用一次就提取出来
					chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
					minSize: 1024, // 提取代码体积大于1024就提取出来
					priority: 1 // 提取优先级为1
				},
				// 提取页面公共代码
				commons: {
					name: 'commons', // 提取文件命名为commons
					minChunks: 2, // 只要使用两次就提取出来
					chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
					minSize: 1024 // 提取代码体积大于1024就提取出来
				}
			}
		}
	},
	plugins: [
		// nginx可以配置gzip: on来开启压缩,但是只在nginx层面开启,会在每次请求资源时都对资源进行压缩,压缩文件会需要时间和占用服务器cpu资源，更好的方式是前端在打包的时候直接生成gzip资源,服务器接收到请求,可以直接把对应压缩好的gzip文件返回给浏览器,节省时间和cpu
		new CompressionPlugin({
			test: /.(js|css)$/, // 只生成css,js压缩文件
			filename: '[path][base].gz', // 文件命名
			algorithm: 'gzip', // 压缩格式,默认是gzip
			threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
			minRatio: 0.8 // 压缩率,默认值是 0.8
		}),
		// 一般 public/ 文件夹都会放一些静态资源，可以直接根据绝对路径引入，比如 图片,css,js 文件等，不需要 webpack 进行解析，只需要打包的时候把 public 下内容复制到构建出口文件夹中
		// 开发环境已经在 devServer 中配置了 static 托管了 public 文件夹，在开发环境使用绝对路径可以访问到 public 下的文件
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, '../public'), // 复制public下文件
					to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
					filter: (source) => {
						return !source.includes('index.html'); // 忽略index.html
					}
				}
			]
		}),
		// 打包时添加抽离 css 插件
		new MiniCssExtractPlugin({
			// [content hash] - chunk hash - hash : 内容变了，我才有消除缓存的意义和价值。
			filename: 'static/css/[name].[contenthash:8].css'
		}),
		// 清理无用css
		new PurgeCSSPlugin({
			// 检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
			// 只打包这些文件中用到的样式
			paths: globAll.sync([
				`${path.join(__dirname, '../src')}/**/*.tsx`,
				path.join(__dirname, '../public/index.html')
			]),
			safelist: {
				standard: [/^ant-/] // 过滤以ant-开头的类名，哪怕没用到也不删除
			}
		})
	]
});
