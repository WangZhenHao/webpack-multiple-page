import DEFAULTS from './default';

export default class TouchSlider {
  selector: string;
  _set: any;

  constructor(selector, config) {
    this._mergeOptions(selector, config);
  }

  _mergeOptions(selector, params) {
    this.selector = selector;
    this._set = {};

    Object.assign(this._set, DEFAULTS, params);
  }
}
