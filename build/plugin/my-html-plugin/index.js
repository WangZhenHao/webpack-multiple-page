const compileHtml = require('./compilerHtml.js');

class HtmlPlugin {
  constructor(options = {}) {
    this.userSetting = options.userSetting || {};
  }

  apply(compiler) {
    const webpack = compiler.webpack;
    const options = compiler.options;
    const re = /\.html$/;

    // 拿到编译实例之后
    compiler.hooks.thisCompilation.tap('html-plugin', (compilation) => {
      // 所有输出文件已经就绪，再次修改输出的html文件内容
      compilation.hooks.afterProcessAssets.tap('html-plugin', (asssts) => {
        for (let key in asssts) {
          if (re.test(key)) {
            const rawSource = asssts[key];
            let htmlStr = rawSource._value;

            if (htmlStr) {
              htmlStr = compileHtml(htmlStr, {
                webpackConfig: JSON.parse(JSON.stringify(options)),
                userSetting: this.userSetting,
              });
              asssts[key] = new webpack.sources.RawSource(htmlStr, false);
            }
          }
        }
      });
    });
  }
}

module.exports = HtmlPlugin;
