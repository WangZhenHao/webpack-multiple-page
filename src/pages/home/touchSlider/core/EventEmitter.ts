interface EventMap {
  [name: string]: [Function, Object][];
}

class EventEmitter {
  events: EventMap;

  constructor() {
    this.events = {};
  }

  on(type: string, fn: Function, context: any = this) {
    if (!this.events[type]) {
      this.events[type] = [];
    }

    this.events[type].push([fn, context]);
    return this;
  }

  trigger(type: string, ...args: any[]) {
    let events = this.events[type];
    if (!events) {
      return;
    }

    let len = events.length;
    for (let i = 0; i < len; i++) {
      let event = events[i];
      let [fn, context] = event;
      if (fn) {
        fn.apply(context, args);
      }
    }

  }
}

export default EventEmitter;
