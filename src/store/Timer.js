import day from 'dayjs'
import { extendObservable } from 'mobx';

import { db, insert } from '../tools/firebase'

class Timer {
  constructor(params) {
    const init = {
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
  }

    if (params) {
      init.room = params.room
    }

    extendObservable(this, init);
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

  generateRoom() {
    const timestamp = new Date().valueOf()
    const SIX_CHAR = 1000000
    this.room =  timestamp % SIX_CHAR
  }

  createRoom() {
    if (this.room === 'default' || this.room === '') {
      this.generateRoom()
    }
    this.updateTime()
    this.setPermission('creator')
  }

  joinRoom() {
    if (this.room !== 'default' && this.room !== '') {
      const self = this
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
    if (this.room !== '') {
      insert(`rooms/${this.room}`, { time: this.time.toISOString() })
    }
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