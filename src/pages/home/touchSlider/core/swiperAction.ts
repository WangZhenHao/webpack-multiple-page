

export default class SwiperAction {
  start: object;
  end: object;
  swiperWrap: HTMLElement;

  constructor(dom, options) {
    // this.touchEvent();
    console.log(dom)
    debugger
  }


  private touchEvent() {

    /**
     * 触摸开始
     * 
     */

    /**
     * 获取图片容器的偏移量
     * @param  {string} str 传入字符串
     * @return {number}     返回图片容器的偏移数值
    */
    function getNum(str) {
      var re = /\d+/g;
      return str.match(re);
    }
    // 执行事件
    this.swiperWrap.addEventListener('touchstart', this.tStart.bind(this));
    this.swiperWrap.addEventListener('touchmove', this.tMove.bind(this));
    this.swiperWrap.addEventListener('touchend', this.tEnd.bind(this));
  }

  private tStart(e) {

  }

  private tMove(e) {

  }

  private tEnd(e) {

  }
}