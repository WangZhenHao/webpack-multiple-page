const fs = require('fs');
const TARGET = /\{\%\s?.*?\%\}/g;
const includeRe = /(\{\%\s+)(include)\s([^\/]+)(\S+)(\s+\%\})/;
const paramsRe = /(\{\%\s+)(\S+)(\s+\%\})/;

function comiplerHtml(text, prapms) {
  let str = text;
  // const alias = prapms.resolve.alias;

  const path = prapms.output.publicPath;
  prapms.output.publicPath = resolve(path);

  const json = {
    webpackConfig: prapms,
  };

  str = _comiplerHtml(str, json);

  return str;
}
function resolve(path) {
  const re = /(\S+)\/$/g;

  if (re.test(path)) {
    path = RegExp.$1;
  }

  return path;
}

function _comiplerHtml(text, webapckParmas) {
  var arr = text.match(TARGET) || [];
  var syntax = [];

  for (let i = 0; i < arr.length; i++) {
    let express = '';
    if (includeRe.test(arr[i])) {
      express = compiperInclude([RegExp.$3, RegExp.$4], webapckParmas);
    } else if (paramsRe.test(arr[i])) {
      express = compilerParmas([RegExp.$2], webapckParmas);
    }

    syntax.push({
      text: arr[i],
      express: express,
    });
  }

  for (var i = 0; i < syntax.length; i++) {
    text = text.replace(syntax[i].text, syntax[i].express);
  }
  // console.log(str)
  return text;
}

function compilerParmas(matchArr, webapckParmas) {
  const str = matchArr[0];
  const keyArr = str.split('.');

  let value = webapckParmas[keyArr.shift()];

  if (value) {
    for (var i = 0; i < keyArr.length; i++) {
      value = value[keyArr[i]];

      if (value === undefined) {
        break;
      }
    }
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  } else {
    return value !== undefined ? value : '';
  }
  //   return value !== undefined ? value : '';
}

function compiperInclude(matchArr, webapckParmas) {
  let text = '';
  const alias = webapckParmas.webpackConfig.resolve.alias;
  const alia = alias[matchArr[0]];

  if (alia) {
    const filePath = alia + matchArr[1];
    text = fs.readFileSync(filePath, 'utf8');
  }

  text = _comiplerHtml(text, webapckParmas);

  return text;
}

module.exports = comiplerHtml;
