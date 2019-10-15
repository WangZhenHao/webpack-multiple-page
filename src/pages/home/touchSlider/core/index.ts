import DEFAULTS from './Default';
import { TouchSliderConfig } from '../type';
import InitDom from './InitDom';
import SwiperAction from './SwiperAction';
import EventEmitter from './EventEmitter';

class TouchSlider extends EventEmitter {
  selector: string;
  container: HTMLElement;
  swiperWrap: HTMLElement;
  _set: TouchSliderConfig = DEFAULTS;
  slider: SwiperAction;

  constructor(selector: string, config: Object) {
    super();
    this.mergeOptions(config);
    this.init(selector);
  }

  private mergeOptions(params) {
    Object.assign(this._set, params);
  }

  private init(selector) {
    this.slider = new SwiperAction(new InitDom(selector, this._set), this);
  }

  // refresh() {

  // }

  sliderIndex(sliderIndex) {
    this.slider.index = sliderIndex;
    this.slider.finished();
  }

  next() {
    this.trigger('start', this.slider.index);
    this.slider.index++;
    this.slider.finished();
  }

  prev() {
    this.trigger('start', this.slider.index);
    this.slider.index--;
    this.slider.finished();
  }
  // autoStop() {

  // }

  // autoStart() {

  // }
}

export default TouchSlider;
