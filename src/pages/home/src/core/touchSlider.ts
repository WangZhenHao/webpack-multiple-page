import { ElementMove } from '../types';

class TouchSlider extends ElementMove {
  private element: HTMLElement;
  private dragging: Boolean;
  private boxX: number;
  private boxY: number;

  posY: number;
  posX: number;

  constructor(className) {
    super(className);
    this.element = document.querySelector(className);
    this.addMouseEvent();
  }


  addMouseEvent() {
    this.element.onmousedown = this.down.bind(this);
    this.element.onmousemove = this.move.bind(this);
    this.element.onmouseup = this.up.bind(this);
  }

  down(e) {
    this.dragging = true;

    this.boxX = this.element.offsetLeft;
    this.boxY = this.element.offsetTop;

    this.posX = e.pageX - this.boxX;
    this.posY = e.pageY - this.boxY;
  }

  move(e) {
    if (this.dragging) {
      let x = e.pageX - this.posX;
      let y = e.pageY - this.posY;

      this.element.style.left = x + 'px';
      this.element.style.top = y + 'px';
    }

  }

  up(e) {
    this.dragging = false;
  }

}


export default TouchSlider;
