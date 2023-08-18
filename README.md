# web-page-editor

基于 React 实现的 web 页面编辑器

## 项目初始化

基于 pnpm 的 monorepo 的代码管理

在项目目录执行

---

pnpm init

---

在项目根目录新建 pnpm-workspace.yaml 文件，添加如下内容

---

packages:

- 'packages/\*'

---

## 定义开发规范

### 代码规范检查与修复

- 代码规范，eslint 工具

执行安装: -D：指定为开发依赖 -w：在根目录空间安装依赖

---

pnpm i eslint -D -w

---

初始化 eslint 配置，执行

---

npx eslint --init

---

勾选相应配置项， 由于使用 momorepo. 配置安装可能可能会报错，需要手动安装
例如：

---

pnpm i @typescript-eslint/eslint-plugin @typescript-eslint/parser -D -w

---

### 代码风格格式化 prettier

1. 安装

---

pnpm i prettier -D -w

---

2. 根目录新建配置文件 .prettierrc.json，添加自己的喜好配置

---

{
"printWidth": 80,
"tabWidth": 2,
"useTabs": true,
"singleQuote": true,
"semi": true,
"trailingComma": "none",
"bracketSpacing": true
}

---

3. 由于 eslint 也有代码风格检查，为避免与 eslint 代码风格检查冲突，将 prettier 检查集成至 eslint

安装集成插件

---

pnpm i eslint-config-prettier eslint-plugin-prettier -D -w

---

然后在 eslint 配置文件中的相应字段添加插件配置

---

{
"extends": [
"prettier",
"plugin:prettier/recommended"
],

"plugins": [
"prettier"
],
}

---

在 package.json 添加代码检查脚本命令

---

    "scripts": {
    ...,
    	+ "lint": "eslint --ext .ts,.jsx,.tsx --fix --quiet ./packages",
    },

---

### 代码提交规范

1. 安装 husky 用于拦截 commit 命令

---

pnpm i husky -D -w

---

2. 初始化 husky （前提是项目与仓库已建立关联）

---

npx husky install

---

3, 添加 husky 执行脚本

---

npx husky add .husky/pre-commit "pnpm lint"

---

将构建 husky/pre-commit 文件，并将脚本命令 pnpm lint 添加到其中

4. 添加 lint-staged

TODO: pnpm lint 会对代码进行全量检查，通过 lint-staged 可配置只对修改的代码进行提交检查

5. 添加提交信息规范检查

安装插件

---

pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D -w

---

在根目录新建 .commitlintrc.js 配置文件，添加如下内容指定提交规范集为 @commitlint/config-conventional

---

module.exports = {
extends: ['@commitlint/config-conventional']
};

---

将 commitlint 集成到 husky 中

---

npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"

---

规范集 conventional

---

// 提交的类型：摘要信息
<type> : <subject>

---

常见的提交类型：

- feat：添加新功能
- fix: 修复bug
- chore: 一些不影响功能的修改
- docs: 专指文档的修改
- perf: 性能方面的优化
- refactor: 代码重构
- test: 添加一些测试代码
