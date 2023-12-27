/*
 * @Author: songxiaolin songxiaolin@aixuexi.com
 * @Date: 2023-03-23 11:57:00
 * @LastEditors: songxiaolin songxiaolin@aixuexi.com
 * @LastEditTime: 2023-07-17 11:40:45
 * @FilePath: /jzx-correct-mobile/rollup.config.ts
 * @Description:
 */
// @ts-nocheck
import path from 'path'
// A Rollup plugin which locates modules using the Node resolution algorithm, for using third party modules in node_modules
import nodeResolve from '@rollup/plugin-node-resolve'
//A Rollup plugin to convert CommonJS modules to ES6, so they can be included in a Rollup bundle
import commonjs from '@rollup/plugin-commonjs'
// 编译ts
import typescript from '@rollup/plugin-typescript'
// 处理路径别名和后缀缩写
import alias from '@rollup/plugin-alias'
// 处理媒体资源
import url from '@rollup/plugin-url'
// babel
import babel from '@rollup/plugin-babel'
// 用于将 JSON 文件作为模块导入到 Rollup 打包的项目中。它可以将 JSON 文件转换为 ES6 模块格式，并将其包含在打包后的文件中。
import json from '@rollup/plugin-json'

import multiEntry from '@rollup/plugin-multi-entry'
// 压缩js
import terser from '@rollup/plugin-terser'
// A Rollup plugin which replaces targeted strings in files while bundling.
import replace from '@rollup/plugin-replace'

import pkg from './package.json'

// resolve公共方法
const resolve = (p) => path.resolve(__dirname, p)

const env = process.env.NODE_ENV

// 输出配置
const outputConfigs = {
  'esm-bundler': {
    file: resolve(`dist/${pkg.filename}.esm-bundler.js`),
    format: `es`,
  },
  cjs: {
    file: resolve(`dist/${pkg.filename}.cjs.js`),
    format: `cjs`,
  },
}

const defaultFormats = ['esm-bundler', 'cjs']
const packageConfigs = []

function createConfig(format, plugins = []) {
  const isGlobalBuild = /global/.test(format)

  // 不需要参与bundle的第三方包
  // externalize all direct deps
  function resolveExternal() {
    if (isGlobalBuild) return []

    return [
      ...Object.keys(pkg.devDependencies || {}),
      ...Object.keys(pkg.dependencies || {}),
    ]
  }

  const customResolver = nodeResolve({
    extensions: ['.ts', '.js', '.json'],
  })

  return {
    input: 'src/index.ts',
    external: resolveExternal(),
    plugins: [
      multiEntry(),
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'types',
      }),
      url({
        fileName: '[dirname][hash][extname]',
        // 超过limit的文件会被copy，否则转成base64
        limit: 4 * 1024, // 4kb，
      }),
      alias({
        // @ts-ignore
        customResolver,
        entries: {
          '@': path.resolve(__dirname, 'src'),
        },
      }),
      json(),
      babel({
        presets: ['@babel/preset-env'],
        exclude: 'node_modules/**',
        extensions: ['.js'],
      }),
      terser({
        module: /^esm/.test(format),
        compress: {
          ecma: 2015,
          pure_getters: true,
          drop_console: env === 'development' ? false : true,
        },
        safari10: true,
      }),
      replace({
        __VERSION__: pkg.version,
      }),
      ...plugins,
    ],
    output: {
      ...outputConfigs[format],
      name: 'PenPlayer',
    },
  }
}

defaultFormats.forEach((format) => {
  packageConfigs.push(createConfig(format))
})

module.exports = packageConfigs
