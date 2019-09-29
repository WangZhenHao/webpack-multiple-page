import DEFAULTS from './default';
import { TouchSliderConfig } from '../type';
import InitDom from './initDom';
import swiperAction from './swiperAction';

export default class TouchSlider {
  selector: string;
  container: HTMLElement;
  swiperWrap: HTMLElement;
  _set: TouchSliderConfig = DEFAULTS;
  slider: any;

  constructor(selector: string, config: Object) {
    this._mergeOptions(config);
    this.init(selector);
  }

  private _mergeOptions(params) {
    Object.assign(this._set, params);
  }

  private init(selector) {
    this.slider = new swiperAction(new InitDom(selector, this._set), this._set);
  }

  sliderIndex(sliderIndex) {
    this.slider.index = sliderIndex;
    this.slider.finished();
  }

  // autoStop() {

  // }

  // autoStart() {

  // }
}
