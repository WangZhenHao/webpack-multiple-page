

export default class SwiperAction {
  start: object;
  end: object;
  w: number;
  swiperWrap: HTMLElement;

  constructor(dom, options) {
    // this.touchEvent();
    let { swiperWrap } = dom;
    this.swiperWrap = swiperWrap;

    this.touchEvent();
  }


  private touchEvent() {

    // 执行事件
    this.swiperWrap.addEventListener('touchstart', this.tStart.bind(this));
    this.swiperWrap.addEventListener('touchmove', this.tMove.bind(this));
    this.swiperWrap.addEventListener('touchend', this.tEnd.bind(this));
  }

  private tStart(e) {
    let touch = e.targetTouches[0];
    this.start = { x: touch.pageX };
  }

  private tMove(e) {

  }

  private tEnd(e) {

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
