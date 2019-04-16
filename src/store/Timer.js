import { extendObservable } from 'mobx';

class Timer {
  constructor() {
    extendObservable(this, {
        count: 0,
        room: '',
        timer: new Date()
    });
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}

export default Timer;