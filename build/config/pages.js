/* eslint-disable */
const pages = [
  {
    name: 'home',
    template: 'home/home.html',
    entry: 'home/home.js',
    title: '首页'
  },
  {
  	name: 'about',
  	template: 'about/about.html',
    entry: 'about/about.js',
    title: '关于我们'
  },
  {
    name: 'login',
    template: 'user/login/login.html',
    entry: 'user/login/login.js',
    title: '登录'
  },
  {
    name: 'register',
    template: 'user/register/register.html',
    entry: 'user/register/register.js',
    title: '注册'
  }
]

module.exports = pages;
