const compileHtml = require('./compilerHtml.js')

class HtmlPlugin {
    constructor() {

    }

    apply (compiler) {
        const webpack = compiler.webpack;
        const re = /\.html$/

        compiler.hooks.thisCompilation.tap('html-plugin', (compilation) => {
            compilation.hooks.afterProcessAssets.tap('html-plugin', (asssts) => {
                for(let key in asssts) {
                    if(re.test(key)) {
                        const rawSource = asssts[key];
                        console.log(rawSource, key)
                        if(rawSource._value) {
                            
                        }
                    }
                }
            })
        })
    }
}

module.exports = HtmlPlugin;