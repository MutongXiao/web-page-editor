//  为了引入如 app.module.less等非常规js文件资源, 如图片 css等， 使用模块时不报错误提示，还需配置 TS的全局模块申明。
declare module '*.module.less';
declare module '*.less';
declare module '*.module.scss';
declare module '*.scss';
declare module '*.svg';
declare module '*.png';
declare module '*.gif';
declare module '*.webp';
declare module '*.jpg';
declare module '*.css';
