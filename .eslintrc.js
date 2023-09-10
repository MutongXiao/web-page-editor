const { defineConfig } = require('eslint-define-config');
const path = require('path');

module.exports = defineConfig({
	// 指定此配置为根级配置，eslint 不会继续向上层寻找
	root: true,
	// 将浏览器 API、ES API 和 Node API 看做全局变量，不会被特定的规则(如 no-undef)限制。
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	// 设置自定义全局变量，不会被特定的规则(如 no-undef)限制。
	globals: {
		// 假如我们希望 jquery 的全局变量不被限制，就按照如下方式声明。
		// $: 'readonly',
	},
	// 集成 检查 规则集以及其他 vue / react 相关规则集
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:prettier/recommended'
	],
	// 指定 vue 解析器
	// parser: 'vue-eslint-parser',
	// 指定相关解析器如 针对 vue 的 'vue-eslint-parser'， ts 的 @typescript-eslint/parser
	parser: '@typescript-eslint/parser',
	parserOptions: {
		// 配置 TypeScript 解析器
		parser: '@typescript-eslint/parser',
		// 支持的 ecmaVersion 版本
		ecmaVersion: 'latest',
		// 我们主要使用 esm，设置为 module
		sourceType: 'module',
		// 通过 tsconfig 文件确定解析范围，这里需要绝对路径，否则子模块中 eslint 会出现异常
		project: path.resolve(__dirname, 'tsconfig.eslint.json')
		// TypeScript 解析器也要负责 vue 文件的 <script>
		// extraFileExtensions: ['.vue']
	},
	// eslint也有代码风格检查，初始化时没开启，用集成 prettier 来做代码风格检查
	plugins: ['@typescript-eslint', 'prettier'],
	// 在已有规则及基础上微调修改
	rules: {
		'prettier/prettier': 'error',
		'no-case-declarations': 'off',
		'no-constant-condition': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'no-unused-vars': 'off',
		'no-console': 'warn',
		// 允许使用 ++
		'no-plusplus': 'off',
		// 换行符不作约束
		'linebreak-style': 'off'
	}
});
