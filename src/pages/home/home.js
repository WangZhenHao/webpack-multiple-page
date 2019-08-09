import "./home.scss";
import "@/assets/js/fetch.js";
// import "core-js/modules/es6.promise"


var page = {
  init()  {
  	// document.body.style.background = "red";
  	let str = `<p>This package allows transpiling JavaScript files using&nbsp;
  	<a href="https://github.com/babel/babel" target="_blank" rel="nofollow">Babel</a>&nbsp;and&nbsp;
  	<a href="https://github.com/webpack/webpack" target="_blank" rel="nofollow">webpack</a>
  	</p>`;
    document.body.innerHTML += str;
    console.log(str)
    // this.test();
  },
  // test() {
  // 	let b = {name: 'wzh'}
  // 	let a = new Promise((res, rej) => {
  // 		res({name: 'wzh'})
  // 	})

  // 	// b = Object.assign({age: 123});

  // 	console.log(a, b)


  // 	a.then(res => {
  // 		console.log(res)
  // 	})
  // }
};

page.init();
