import { readFileSync } from 'node:fs';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
// 用于生成.d.ts
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';

const pkg = JSON.parse(readFileSync('./package.json'));

export default [
	{
		// 打包入口文件
		input: './src/index.ts',
		// 打包输出产物
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				sourcemap: true
			},
			{
				file: pkg.module,
				format: 'esm',
				sourcemap: true
			}
		],
		plugins: [
			resolve(),
			commonjs(),
			typescript({ tsconfig: './tsconfig.json' }),
			postcss()
		],
		external: ['react', 'antd', '@ant-design/icons']
	},
	{
		// 类型 esm ts 类型打包入口
		input: './dist/esm/types/index.d.ts',
		output: [{ file: './dist/index.d.ts', format: 'esm' }],
		plugins: [dts()],
		external: [/\.(css|less|scss)$/]
	}
];
