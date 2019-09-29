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
  currentIndex: number;

  private isOutIndex: Boolean = false;
  private isLessIndex: Boolean = false;
  private isTouchEnd: Boolean = false;

  constructor(dom: Dom, options) {
    // this.touchEvent();
    let { swiperWrap, containerWidth, count, pointerLi } = dom;

    Object.assign(this, { swiperWrap, containerWidth, count, pointerLi });
    this._set = options;


    this.touchEvent();

    this.translated(-this.currentNumber() * this.containerWidth);
    this.showPointer(this.index);

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
    if (this._set.loop) {
      if (this.isOutIndex || this.isLessIndex) {
        this.isOutIndex = false;
        this.isLessIndex = false;
        this.swiperWrap.style.transitionDuration = 0 + 'ms';
        this.translated(-this.currentNumber() * this.containerWidth);

        setTimeout(function () {
          // this.swiperWrap.style.transitionDuration = this._set.speed + 'ms';
        }.bind(this), 0);
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

    this.isTouchEnd = true;

    this.end.x = 0;

    this.finished();
    this.autoPlay();
    // this.transitionendHandle();
  }

  private recognitionIndex() {
    if (this._set.loop) {
      if (this.index === this.count) {
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

  private finished() {
    this.recognitionIndex();

    this.swiperWrap.style.transitionDuration = this._set.speed + 'ms';

    this.translated(-this.currentNumber() * this.containerWidth);
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
