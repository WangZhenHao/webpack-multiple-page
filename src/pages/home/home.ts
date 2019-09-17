import { test } from './test'

interface TestInterface {
  currentTime: Date
  setTime(d: Date)
}

class Clock implements TestInterface {
  currentTime: Date

  setTime(d: Date) {
    this.currentTime = d
  }

  constructor() {
    this.setTime(new Date())
    test();
    debugger
  }
}

let a = new Clock()



export default {}
