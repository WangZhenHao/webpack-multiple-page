import { TouchSliderConfig } from '../type'

export default class InitDom {
  container: HTMLElement;
  swiperWrap: HTMLElement;
  swiperLi: HTMLCollection;
  count: number;
  pointerWrap: any = null;
  pointerLi: any = null;
  _set: TouchSliderConfig;

  constructor(selector, config) {
    this._set = config;
    this.container = document.querySelector(selector);
    //图片容器元素
    this.swiperWrap = this.container.children[0] as HTMLElement;
    //li元素数组;
    this.swiperLi = this.swiperWrap.children;
    //li个数;
    this.count = this.swiperLi.length;

    this.createTouchSliderCss();
    this.createPoniter();
    this.createSwiperStyle();
    // return {
    //   swiperLi: this.swiperLi,
    //   count: this.count,
    //   pointerWrap: this.pointerWrap,
    //   pointerLi：this.pointerLi
    // }
  }

  private createSwiperStyle() {
    let num = this.count,
      containerWidth = this.container.offsetWidth;

    if (this._set.loop) {
      num += 2;
    }

    this.swiperWrap.style.width = num * containerWidth + 'px';

    for (var i = 0; i < num; i++) {
      (this.swiperLi[i] as HTMLElement).style.width = containerWidth + 'px';
    }
  }

  private createTouchSliderCss() {
    let cssStr = `.swiper-container { 
      width: 100%; 
      height: 400px; 
      overflow: hidden;
      position: relative;
    }
    .swiper-container > .swiper-wrap {
      position: absolute;
      left: 0;
      top: 0;
      transition: transform 0ms linear;
    }
    .swiper-container > .swiper-wrap > li { 
      float: left; 
    }
    .swiper-container > .swiper-wrap > li > a {
        display: block;
        background-size: 100% 100%;
    }
    .swiper-container > .swiper-wrap > li,
    .swiper-container > .swiper-wrap,
    .swiper-container > .swiper-wrap > li > a {
      width: 100%; 
      height: 100%; 
    }
    .swiper-container > .swiper-circle {
      position: absolute;
      left: 50%;
      bottom: 10px;
      transform: translateX(-50%);
    }
    .swiper-container > .swiper-circle > li {
        float: left;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #e4e4e4;
        margin: 0 5px;
    }
    .swiper-container > .swiper-circle > li.active {
        background: red;
    }`;

    let style = document.createElement('style');
    style.innerHTML = cssStr;
    style.setAttribute('touch-slider', 'text/touch-slider');

    document.head.append(style);
  }

  private createPoniter(): void {

    if (this._set.pointer) {
      this.pointerWrap = this.createPoniterLi(this.count);
      //指示器元素li对象
      this.pointerLi = this.pointerWrap.children;
    }
  }

  private createPoniterLi(count: number): HTMLElement {
    let ul = document.createElement('ul'),
      str = '';

    ul.className = 'swiper-circle'
    for (var i = 0; i < count; i++) {
      str += '<li data-index="' + i + '"></li>';
    }

    ul.innerHTML = str;
    this.container.appendChild(ul);

    return ul;
  }
}