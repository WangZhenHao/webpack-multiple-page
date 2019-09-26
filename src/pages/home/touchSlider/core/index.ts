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

  _mergeOptions(params) {
    Object.assign(this._set, params);
  }

  init(selector) {
    let domParams = new InitDom(selector, this._set);
    this.slider = new swiperAction(domParams, this._set);
  }


}
