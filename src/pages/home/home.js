import '@/assets/js/common.js'
import '@/assets/css/common.scss'
import '@/assets/css/animate.css'
import './home.scss'
console.log(Tools)
var page =  {
	init() {
	   console.log('页面初始化');
	   this.test();
	},
	test() {
	   let prefix = (function() {
	   	  
		  let elementStyle = document.createElement('div').style;
		  let transformName = {
		    standard: 'animationDuration',
		  	webkit: 'webkitAnimationDuration',
		    Moz: 'MozAnimationDuration',
		    O: 'OAnimationDuration',
		    ms: 'msAnimationDuration',
		  }

		  for(let key in transformName) {
		  	if(elementStyle[transformName[key]] !== undefined) {
		  		return key;
		  	}
		  }

		  return false;

		})();

		function prefixStyle(style) {
            

			if(prefix === false) {
				return false;
			}

			if(prefix === 'standard') {
				return style;
			}
			// alert(prefix + style.charAt(0).toUpperCase() + style.substr(1))
			return prefix + style.charAt(0).toUpperCase() + style.substr(1)
		}
		// for()
	}
}

page.init();
