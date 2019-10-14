import TouchSlider from './touchSlider';

// let a = new TouchSlider('.div1');
// let b = new TouchSlider('.div2');

let slider1 = new TouchSlider('#demo', {
  loop: true,
  autoPlay: false,
  speed: 300
});

slider1.on('finish', function (res) {
  console.log('结束', res);
});

slider1.on('start', function (res) {
  console.log('开始：', res);
});

let next = document.querySelector('#next');
let prev = document.querySelector('#prev');

(next as HTMLElement).onclick = function () {
  slider1.next();
};

(prev as HTMLElement).onclick = function () {
  slider1.prev();
};




// setInterval(() => {
//   slider1.next();
// }, 2000)
// slider1.sliderIndex(1)
// let slider2 = new TouchSlider('#demo2', {
//   loop: true,
//   autoPlay: true,
//   speed: 300
// });


// let slider3 = new TouchSlider('#demo3', {
//   loop: true,
//   autoPlay: true,
//   speed: 300
// });

export default {};
