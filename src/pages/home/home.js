import "./home.scss";
import "@/assets/js/fetch.js";

var page = {
  init()  {
  	// document.body.style.background = "red";
  	let str = `<p>This package allows transpiling JavaScript files using&nbsp;
  	<a href="https://github.com/babel/babel" target="_blank" rel="nofollow">Babel</a>&nbsp;and&nbsp;
  	<a href="https://github.com/webpack/webpack" target="_blank" rel="nofollow">webpack</a>
  	</p>`;
    document.body.innerHTML += str;
  }
};

page.init();
