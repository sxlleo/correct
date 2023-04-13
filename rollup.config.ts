import path from 'path'
// A Rollup plugin which locates modules using the Node resolution algorithm, for using third party modules in node_modules
import nodeResolve from '@rollup/plugin-node-resolve';
//A Rollup plugin to convert CommonJS modules to ES6, so they can be included in a Rollup bundle
import commonjs from '@rollup/plugin-commonjs';
// 编译ts
import typescript from'@rollup/plugin-typescript';
// 处理路径别名和后缀缩写
import alias from'@rollup/plugin-alias'
// 处理媒体资源
import url from'@rollup/plugin-url'
// babel
import babel from'@rollup/plugin-babel';
// 用于将 JSON 文件作为模块导入到 Rollup 打包的项目中。它可以将 JSON 文件转换为 ES6 模块格式，并将其包含在打包后的文件中。
import json from'@rollup/plugin-json';

import multiEntry from '@rollup/plugin-multi-entry'

import pkg from './package.json';

// resolve公共方法
const resolve = p => path.resolve(__dirname, p)

// 
const customResolver = nodeResolve({
  extensions: ['.ts', '.js', '.json']
});

// externalize all direct deps
function resolveExternal(){
	return [
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.devDependencies || {})
	]
}

// 插件
const plugins = [
	multiEntry(),
	nodeResolve(), 
	commonjs(), 
	json(),
	typescript({
		tsconfig: './tsconfig.json',
		declaration: true,
		declarationDir: 'types',
	}),
	url({
		fileName: '[dirname][hash][extname]',
		// 超过limit的文件会被copy，否则转成base64
		limit: 4 * 1024 // 4kb，
	}),
	alias({
		// @ts-ignore
		customResolver,
		entries: {
			'@': path.resolve(__dirname, 'src')
		}
	}),
	babel({
		presets: ['@babel/preset-env'],
		exclude: 'node_modules/**',
		extensions: ['.js', '.ts']
	}),
]

// 输出配置
const outputConfigs = {
  'esm-bundler': {
    file: resolve(`dist/${pkg.filename}.esm-bundler.js`),
    format: `es`
  },
  cjs: {
    file: resolve(`dist/${pkg.filename}.cjs.js`),
    format: `cjs`
  },
}

module.exports = [
	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/index.ts',
		external: resolveExternal(),
		output: Object.values(outputConfigs),
		plugins
	}
]