import day from 'dayjs'
import { extendObservable } from 'mobx';

import firebase, { db, insert } from '../tools/firebase'

function generateRoom() {
  return new Date().valueOf() % 1000000;
}

class Timer {
  constructor() {
    extendObservable(this, {
        message: '',
        user: {
          id: 'none',
          name: 'guest',
        },
        permission: 'creator',
        room: 'default',
        time: day().set('hour', 0).set('minute', 3).set('second', 0),
        backup: day().set('hour', 0).set('minute', 3).set('second', 0),
        interval: null,
    });
  }

  setRoom(room) {
    this.room = room
  }

  setTime(time) {
    this.time = time
  }

  setMessage(message) {
    this.message = message
  }

  createRoom() {
    this.room = generateRoom();
    this.updateTime()
    this.setPermission('creator')
  }

  joinRoom() {
    if (this.room !== 'default') {
      const self = this
      this.stopTimer()
      this.setPermission('visitor')
      db.ref(`rooms/${this.room}`).on('value', function(snapshot) {
        if (snapshot.val()) {
          self.setTime(day(snapshot.val().time))
        } else {
          self.setMessage('Room Not Found.')
        }
      })
    }
  }

  setPermission(permission) {
    this.permission = permission;
  }

  setBackup() {
    this.backup = this.time
    this.updateTime()
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

  updateTime() {
    insert(`rooms/${this.room}`, { time: this.time.toISOString() })
  }

  startTimer() {
    if (this.interval === null) {
      this.interval = setInterval(() => {
        this.time = this.time.subtract(1, 'second')
        if (this.room !== 'default') {
          this.updateTime()
        }
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
    this.updateTime()
  }
}

export default Timer;