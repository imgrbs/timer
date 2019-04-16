import day from 'dayjs'
import { extendObservable } from 'mobx';

class Timer {
  constructor() {
    extendObservable(this, {
        permission: 'creator',
        room: 'default',
        time: day().set('hour', 0).set('minute', 3).set('second', 0),
        backup: day().set('hour', 0).set('minute', 3).set('second', 0),
        interval: null,
    });
  }

  setPermission(permission) {
    this.permission = permission;
  }

  setBackup() {
    this.backup = this.time
  }

  setHour(hour = 0) {
    this.time = this.time.set('hour', hour)
    this.setBackup()
  }


  setMinute(minute = 0) {
    this.time = this.time.set('minute', minute)
    this.setBackup()
  }

  setSecond(second = 0) {
    this.time = this.time.set('second', second)
    this.setBackup()
  }

  startTimer() {
    if (this.interval === null) {
      this.interval = setInterval(() => {
        this.time = this.time.subtract(1, 'second')
        if (this.time.format('HH:mm:ss') === '00:00:00') {
          this.stopTimer()
        }
      }, 1000);
    }
  }

  stopTimer() {
    clearInterval(this.interval)
    this.interval = null
  }

  reset() {
    this.time = this.backup
  }
}

export default Timer;