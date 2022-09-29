const compileHtml = require('./compilerHtml.js');

class HtmlPlugin {
  constructor() {}

  apply(compiler) {
    const webpack = compiler.webpack;
    const options = compiler.options;
    const re = /\.html$/;

    compiler.hooks.thisCompilation.tap('html-plugin', (compilation) => {
      compilation.hooks.afterProcessAssets.tap('html-plugin', (asssts) => {
        for (let key in asssts) {
          if (re.test(key)) {
            const rawSource = asssts[key];
            let htmlStr = rawSource._value;

            if (htmlStr) {
              htmlStr = compileHtml(htmlStr, options);
              asssts[key] = new webpack.sources.RawSource(htmlStr, false);
            }
          }
        }
      });
    });
  }
}

module.exports = HtmlPlugin;
