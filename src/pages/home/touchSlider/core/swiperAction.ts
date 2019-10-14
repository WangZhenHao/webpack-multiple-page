import { getTransformX } from '../utils/utils';
import { TouchSliderConfig } from '../type';
import Swiper from './index'

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
  start: Start = { x: 0 };
  end: Start = { x: 0 };
  swiperLeft: number;
  swiperWrap: HTMLElement;
  containerWidth: number;
  _set: TouchSliderConfig;
  index: number = 0;
  count: number;
  pointerLi: HTMLCollection;
  timer: any;
  currentIndex: number;
  swiper: Swiper;

  private isOutIndex: Boolean = false;
  private isLessIndex: Boolean = false;
  private isTouchEnd: Boolean = false;
  private isAnimated: Boolean = false;

  constructor(dom: Dom, swiper) {
    // this.touchEvent();
    this.swiper = swiper;
    let { swiperWrap, containerWidth, count, pointerLi } = dom;

    Object.assign(this, { swiperWrap, containerWidth, count, pointerLi });
    this._set = this.swiper._set;



    this.touchEvent();

    this.translated(-this.currentNumber() * this.containerWidth);
    this.showPointer(this.index);

    this.autoPlay();
  }


  private touchEvent() {

    // 执行事件
    this.swiperWrap.addEventListener('touchstart', this.eventHandle.bind(this));
    this.swiperWrap.addEventListener('touchmove', this.eventHandle.bind(this));
    this.swiperWrap.addEventListener('touchend', this.eventHandle.bind(this));
    // this.swiperWrap.addEventListener('transitionend', this.transitionendHandle.bind(this))
  }

  private eventHandle(e) {

    if (this.isAnimated) return;
    switch (e.type) {
      case 'touchstart': {
        this.tStart(e);
        break;
      }
      case 'touchmove': {
        this.tMove(e);
        break;
      }
      case 'touchend': {
        this.tEnd();
        break;
      }
      default: {
        break;
      }
    }

  }

  private transitionendHandle() {
    this.swiper.trigger('finish', this.index)
    this.autoPlay();

    this.isAnimated = false;
    if (this._set.loop) {
      if (this.isOutIndex || this.isLessIndex) {
        this.isOutIndex = false;
        this.isLessIndex = false;
        setTimeout(() => {
          this.swiperWrap.style.transitionDuration = 0 + 'ms';
          this.translated(-this.currentNumber() * this.containerWidth);
        }, 0);
      }

    }

  }

  private autoPlay() {
    if (this.count === 1) {
      return;
    }

    if (this._set.autoPlay) {
      this.clearAutoPlay();
      this.timer = setInterval(function () {
        this.swiper.trigger('start', this.index);
        this.index++;
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
    this.swiper.trigger('start', this.index)
    let touch = e.targetTouches[0];
    this.start = { x: touch.pageX };
    this.swiperLeft = getTransformX(this.swiperWrap.style.transform);
  }

  private tMove(e) {
    let touch = e.targetTouches[0];
    let move = (touch.pageX - this.start.x) * 0.8;

    e.preventDefault();
    this.clearAutoPlay();
    // move = move > 375 ? 375 : move;




    this.end = { x: Math.round(move) };
    this.swiperWrap.style.transitionDuration = 0 + 'ms';
    this.translated(-this.swiperLeft + this.end.x);
  }

  private tEnd() {
    if (this.end.x < -this._set.slider_dis) {
      this.index++;
    } else if (this.end.x > this._set.slider_dis) {
      this.index--;
    }

    this.isTouchEnd = true;
    this.isAnimated = true;
    this.end.x = 0;

    this.finished();

    // this.transitionendHandle();
  }

  private recognitionIndex() {
    if (this._set.loop) {
      if (this.index >= this.count) {
        this.isOutIndex = true;
        this.index = 0;
      } else if (this.index < 0) {
        this.index = this.count - 1;
        this.isLessIndex = true;
      }
    } else {
      if (this.index < 0) {
        this.index = 0;
      } else if (this.index > this.count - 1) {
        this.index = this.isTouchEnd ? this.index - 1 : 0;
        this.isTouchEnd = false;

      }
    }

  }

  private currentNumber() {
    let num = this.index;

    if (this.isOutIndex) {
      return this.count + 1;
    }

    if (this.isLessIndex) {
      return 0;
    }

    if (this._set.loop) {
      num++;
    }

    return num;
  }

  finished() {

    this.clearAutoPlay();

    this.recognitionIndex();

    this.swiperWrap.style.transitionDuration = this._set.speed + 'ms';

    this.translated(-this.currentNumber() * this.containerWidth);
    this.showPointer(this.index);

    setTimeout(() => {
      this.transitionendHandle();
    }, this._set.speed);
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

}
