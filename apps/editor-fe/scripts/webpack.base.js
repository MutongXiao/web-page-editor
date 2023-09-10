/**
 * @description based config|基础默认配置
 * @param {string} output |核心模块入口文件配置
 * @param {Object} output |核心模块输出文件配置
 * @param {Object} module |核心模块化配置(万物皆可模块化)
 * @param {Object} resolve |解析配置
 * @param {Array} plugins |核心模块辅助插件配置
 * @param clean|clean-webpack-plugin(w4) |删除（清理）构建目录
 */
// 配置说明，参考 https://juejin.cn/post/7243337546826170425
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = (isDev) => ({
	mode: isDev ? 'development' : 'production',
	entry: path.join(__dirname, '../src/index.tsx'),
	output: {
		filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称
		path: path.join(__dirname, '../dist'), // 打包结果输出路径
		clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
		publicPath: '/' // 打包后文件的公共前缀路径
	},

	/**
	 * @description 入口文件限制
	 * @param assetFilter |只给出 js 文件的性能提示
	 * @official https://webpack.docschina.org/configuration/performance/#performance
	 */
	performance: {
		hints: 'warning',
		maxEntrypointSize: 40000000,
		maxAssetSize: 20000000,

		assetFilter: function (assetFilename) {
			return assetFilename.endsWith('.js');
		}
	},
	// webpack5 较于 webpack4，新增了持久化缓存、改进缓存算法等优化，通过配置 webpack 持久化缓存，来缓存生成的 webpack 模块和 chunk，改善下一次打包的构建速度，可提速 90% 左右
	cache: {
		type: 'filesystem' // 使用文件缓存
	},

	/**
	 * @description Loaders|核心模块在打包文件之前-对象资源加载、编译、解析、压缩等
	 * @param babel-loader |用babel来转换ES6文件到ES
	 * @param style-loader |将css添加到DOM的内联样式标签style里
	 * @param css-loader |允许将css文件通过require的方式引入，并返回css代码
	 * @param less-loader|处理less
	 * @param sass-loader|处理sass
	 * @param postcss-loader|用postcss来处理CSS
	 */
	module: {
		rules: [
			/**
			 * @description 匹配.ts, tsx文件
			 * @method loader
			 */
			{
				test: /.(ts|tsx)$/,
				use: [
					// 使用时，需将此 thread-loader 放置在其他 loader 之前。放置在此 loader 之后的 loader 会在一个独立的 worker 池中运行。
					// 由于 thread-loader 不支持抽离css插件 MiniCssExtractPlugin.loader*（后面会讲），所以这里只配置了多进程解析 js
					// 开启多线程也是需要启动时间，大约600ms左右，所以适合规模比较大的项目
					// 'thread-loader',
					{
						// babel 在 webpack 的启动器
						loader: 'babel-loader',
						// 下面babel配置, 也可以单独抽离到根目录 babel.config.js/json文件，babel 会读取到它
						options: {
							// 执行顺序由右往左,由下往上,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
							presets: [
								[
									// 它可以配合 core-js（是一个 JavaScript 标准库，它提供了一组用于填充缺失功能的 Polyfill），
									// 根据目标环境自动确定需要进行的转译和 polyfill 的配置，
									// 将现代的 JavaScript 语法转换为目标环境所支持的较旧的语法。
									'@babel/preset-env',
									{
										// 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
										targets: {
											chrome: '88'
										},
										// 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
										useBuiltIns: 'usage',
										// 指定 corejs 的版本
										corejs: 3
									}
								],
								// 解析 react 的 jsx 转换为 js
								'@babel/preset-react'
								// ts 语法转换为 js 语法的babel 预设插件, 但在 monorepo 中使用，它不解析其他子包源码的 ts
								// 故这里不用这个预设插件解析ts，而是用ts-loader解析ts，在转给 bable 做代码转译
								// '@babel/preset-typescript'
							],
							// 局部热更新
							plugins: [isDev && require.resolve('react-refresh/babel')].filter(
								Boolean
							)
						}
					},
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: {
								noEmit: false // 解析完 ts 文件后输出解析产物，才能交给babel继续转译
							}
						}
					}
				],
				// 缩小 loader 作用范围
				// include: [path.resolve(__dirname, '../src')], 只对项目src文件的ts,tsx进行loader解析
				exclude: /node_modules/ // 不解析该选项配置的模块，优先级更高
			},

			/**
			 * @description css解析
			 * @method postcss-loader
			 */
			{
				oneOf: [
					{
						// 定义一下，使用 xxx.module.（less|css)
						test: /.module.(less|css)$/,
						include: [path.resolve(__dirname, '../src')],
						use: [
							isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
							{
								loader: 'css-loader',
								options: {
									importLoaders: 2,
									// 开启 css modules
									modules: {
										localIdentName: '[path][name]__[local]--[hash:base64:4]'
									}
								}
							},
							'postcss-loader',
							'less-loader'
						]
					},
					{
						test: /.(less)$/,
						use: [
							isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
							'css-loader',
							'postcss-loader',
							'less-loader'
						]
					},
					{
						test: /.(css)$/,
						use: [
							// style-loader 用于将 CSS 样式注入到 HTML 页面中。它接收由 css-loader 转换后的 CSS 样式对象，并将其以内联样式的形式添加到 HTML 页面的 <style> 标签中或通过添加 <link> 标签引入样式文件。
							// MiniCssExtractPlugin 用于抽离 css 为单独的一个 css 文件引入
							// 开发环境我们希望 css 嵌入在 style 标签里面, 方便样式热更新
							// 但打包时我们希望把 css 单独抽离出来，方便配置缓存策略
							isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
							// css-loader 的主要作用是解析 CSS 文件，并处理其中的 @import 和 url() 等语法，以及处理 CSS 模块化、压缩等功能。将 CSS 文件转换为 JavaScript 模块
							'css-loader',
							// 做 css 的预处理，如添加前缀，兼容适配等
							// 配置完成后，需要有一份要兼容浏览器的 .browserslistrc文件清单，
							// 让 postcss - loader 知道要加哪些浏览器的前缀，
							'postcss-loader'
						]
					}
				]
			},

			/**
			 * 对于图片文件，webpack4 使用 file-loader 和 url-loader 来处理的，但 webpack5 不使用这两个 loader 了，
			 * 而是采用自带的 asset-module 来处理
			 * @description assetss|静态资源配置
			 * @param 图片、字体
			 * @param 视频、音频
			 */
			{
				test: /.(png|jpg|jepg|git|svg)$/,
				type: 'assets',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024 // 小于10kb转base64位
					}
				},
				generator: {
					filename: 'static/images/[name].[contenthash:8][ext]' // 文件输出目录和命名
				}
			},
			{
				test: /.(woff2|eot|ttf|otf)$/, // 匹配字体图标文件
				type: 'assets',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024 // 小于10kb转base64位
					}
				},
				generator: {
					filename: 'static/fonts/[name].[contenthash:8][ext]' // 文件输出目录和命名
				}
			},
			{
				test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
				type: 'assets',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024 // 小于10kb转base64位
					}
				},
				generator: {
					filename: 'static/medias/[name].[contenthash:8][ext]'
				}
			}
		]
	},

	/**
	 * @description resolve|解析配置
	 * @param {String} extensions |文件后缀扩展
	 * @param {object} alias |别名配置
	 */
	resolve: {
		// 如果引入模块时不带文件后缀，会到该配置数组里面按照从左到右的顺序依次添加后缀查找文件，
		// 因为 webpack 不支持引入以 .ts, tsx为后缀的文件，所以要在 extensions 中配置，
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
		alias: {
			'@': path.join(__dirname, '../src') // 配置别名，这样 @ 就表示src资源目录
		}
		// 如果用的是 pnpm 就暂时不要配置这个，会有幽灵依赖的问题，访问不到很多模块。
		// modules: [path.resolve(__dirname, '../node_modules')] // 查找第三方模块只在本项目的node_modules中查找
	},

	/**
	 * @description plugins|插件配置
	 * @param DefinePlugin|允许在编译时创建配置的全局对象
	 * @param MiniCssExtractPlugin |提取 CSS 到一个单独的文件中
	 * @param HTMLWebpackPlugin |根据指定的模板生成HTML文件(含打包后注入的JS)|minify(HTML压缩优化)
	 */
	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
			inject: true, // 自动注入静态资源
			minify: {
				minifyCSS: false, // 是否压缩css
				collapseWhitespace: false, // 是否折叠空格
				removeComments: true // 是否移除注释
			},
			favicon: path.resolve(__dirname, '../public/favicon.ico'),
			title: 'mutongxiao 的 Web 页面编辑器',
			staticUrl: isDev ? '//localhost:8297/' : 'https://cdn.example.com/'
		}),
		// 项目要解决 node polyfill，原因是由于在webpack5中移除了nodejs核心模块的polyfill自动引入，
		// 所以需要手动引入
		new NodePolyfillPlugin(),
		// 配置后 webpack 会把环境变量值注入到业务代码里面去，webpack 解析代码匹配到process.env.PRIMARY，
		// 就会设置到对应的值。因为通过 cross-env 设置的环境变量，只在编译时有效，编译后运行代码是读不到的
		new webpack.DefinePlugin({
			'process.env.PRIMARY': JSON.stringify(process.env.PRIMARY)
		})
	]

	// externals：外包拓展，打包时会忽略配置的依赖，会从上下文中寻找对应变量
	// module.noParse：匹配到设置的模块,将不进行依赖解析，适合jquery,boostrap这类不依赖外部模块的包
	// ignorePlugin：可以使用正则忽略一部分文件，常在使用多语言的包时可以把非中文语言包过滤掉
});
