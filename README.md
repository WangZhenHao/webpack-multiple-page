# webpack5多页面脚手架

[移步webpack5多页面脚手架](https://github.com/WangZhenHao/webpack-multiple-page/tree/webpack5)

[移步webpack4多页面脚手架](https://github.com/WangZhenHao/webpack-multiple-page/tree/webpack4)

[移步webpack3多页面脚手架](https://github.com/WangZhenHao/webpack-multiple-page/tree/webpack3)

## 适用于多个静态页面的显示, 如官网   

### [源码地址: https://github.com/WangZhenHao/webpack-multiple-page](https://github.com/WangZhenHao/webpack-multiple-page)

示例：
![demo](https://github.com/WangZhenHao/webpack-multiple-page/raw/master/static/img/demo.jpg)

#### 1.2.0 添加自定义插件，配合html-webpack-plugin插件使用：添加{%  %}分界符号 build\plugin\my-html-plugin\index.js

```
1：使用分界符合 {%  %} 就可以做简单的语法，引入知道路径的语法`@layoutPath`是在webpack.resolve配置
{% include @layoutPath/nav.html %}

2：也可以访问配置信息webpack的配置
{% webpackConfig.output  %} {% webpackConfig.output.publicPath  %}

3: 可以注入自定义的变量
new HtmlPlugin({
    userSetting: {
       name: 'wzh',
    },
})

html模板中使用：{% userSetting.name %}

```


#### 1.1.0 新增自动创建文件功能
```
添加新增文件的配置文件  build/bin/new.js

在build/config/pages.js里面添加对应的配置即可
```

### 目录结构

```
│─build                                 多页面配置文件
│     ├─config                          可以改变的配置 
│     │ ├─pages.js                      需要打包的页面名称
│     │ └─ index.js                      web server配置
│     │ 
│     ├─webpack.base.config.js 
│     ├─webpack.dev.config.js
│     └─webpack.prod.config.js
│      
│     
│─src                                      // src 文件夹
│    ├─pages                               // 页面文件夹
│    │  ├─about
│    │  │      about.html
│    │  │      about.js
│    │  │      about.scss
│    │  │
│    │  │ 
│    │  │
│    │  └─home
│    │          home.html
│    │          home.js
│    │          home.scss
│    │
│    └─assets                          // 公共文件夹
│          └─ layout                   // 复用html     
│                 nav.html             // 公共头文件 
│                 mate.html            //公共mate文件
│                 footer.html          // 公共footer文件
│
│
│
│
│
│─static                               //静态文件文件夹
│    ├─js
│    ├─css
│    └─img                             (img)最好使用这个名称为文件夹
│
│  .babelrc                           // babel的配置文件
│  .gitignore
│  package.json
│  README.md

```



### 构建步骤
``` bash
# 安装依赖
npm install

# 开发的时候在本地启动, 并开始热加载
npm run dev

# production的发布时打包
npm run build
```

### qq讨论群: 475870039
