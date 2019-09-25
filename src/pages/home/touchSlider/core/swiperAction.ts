import { getTransformX } from '../utils/utils';
import { TouchSliderConfig } from '../type';
interface Start {
  x: number;
  // y: number;
}

interface Dom {
  swiperWrap: HTMLElement;
  containerWidth: number;
  count: number;
  pointerLi: HTMLCollection;
}

export default class SwiperAction {
  start: Start;
  end: Start;
  swiperLeft: number;
  swiperWrap: HTMLElement;
  containerWidth: number;
  _set: TouchSliderConfig;
  index: number = 0;
  count: number;
  pointerLi: HTMLCollection;
  timer: any;

  constructor(dom: Dom, options) {
    // this.touchEvent();
    let { swiperWrap, containerWidth, count, pointerLi } = dom;

    Object.assign(this, { swiperWrap, containerWidth, count, pointerLi });
    console.log(this);
    this._set = options;

    this.touchEvent();
    this.finished();
    this.autoPlay();
  }


  private touchEvent() {

    // 执行事件
    this.swiperWrap.addEventListener('touchstart', this.tStart.bind(this));
    this.swiperWrap.addEventListener('touchmove', this.tMove.bind(this));
    this.swiperWrap.addEventListener('touchend', this.tEnd.bind(this));
    this.swiperWrap.addEventListener('transitionend', this.transitionendHandle.bind(this))
  }

  private transitionendHandle() {
    console.log(this)
  }

  private autoPlay() {
    if (this._set.autoPlay) {
      this.clearAutoPlay();
      this.timer = setInterval(function () {
        this.index++;
        console.log(this.index)
        this.finished();
      }.bind(this), this._set.interval);
    }
  }

  private clearAutoPlay() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private tStart(e) {
    let touch = e.targetTouches[0];
    this.start = { x: touch.pageX };
    this.swiperLeft = getTransformX(this.swiperWrap.style.transform);
  }

  private tMove(e) {
    let touch = e.targetTouches[0];
    e.preventDefault();
    this.clearAutoPlay();
    this.end = { x: (touch.pageX - this.start.x) * 0.7 };
    this.swiperWrap.style.transitionDuration = 0 + 'ms';
    this.translated(-this.swiperLeft + this.end.x);
  }

  private tEnd(e) {
    if (this.end.x < -this._set.slider_dis) {
      this.index++;
    } else if (this.end.x > this._set.slider_dis) {
      this.index--;
    }

    this.end.x = 0;

    this.finished();
    this.autoPlay();
  }

  private finished() {
    this.swiperWrap.style.transitionDuration = this._set.speed + 'ms';

    if (this.index < 0) {
      this.index = 0;
    } else if (this.index > this.count - 1) {
      this.index = 0;
    }

    this.translated(-this.index * this.containerWidth);
    this.showPointer(this.index);
  }

  private showPointer(index) {
    for (let i = 0, len = this.pointerLi.length; i < len; i++) {
      this.pointerLi[i].className = '';
    }

    this.pointerLi[index].className = 'active';
  }

  translated(left: number) {
    this.swiperWrap.style.transform = `translate3d(${left}px, 0, 0)`;
  }

  getCurrentPosition(): object {
    let matrix = window.getComputedStyle(this.swiperWrap, null);
    let x;
    let y;

    return {
      x,
      y
    };
  }
}
