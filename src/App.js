import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';

import { observer } from 'mobx-react'

function isCreator(permission) {
  return permission === 'creator'
}

const App = ({ timer }) => {
  const { time, permission, room } = timer

  // useEffect(() => {
    // const permission = localStorage.getItem('permission')
    // if (permission) {
      // timer.setPermission(permission)
    // }
  // })

  return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <p className='mt-5'>
              You are <u>"{permission}"</u> of {room} room.
            </p>
            <h1>{`${time.format('HH:mm:ss')}`}</h1>
            {
              isCreator(permission) && (
                <React.Fragment>
                  <div className="mt-5 d-flex justify-content-center align-items-center">
                    <input
                      min='0'
                      max='23'
                      onChange={e => timer.setHour(+e.target.value)}
                      value={time.hour()}
                      type='number'
                      className='form-control'
                    />:
                    <input
                      min='0'
                      max='59'
                      onChange={e => timer.setMinute(+e.target.value)}
                      value={time.minute()}
                      type='number'
                      className='form-control'
                    />:
                    <input
                      min='0'
                      max='59'
                      onChange={e => timer.setSecond(+e.target.value)}
                      value={time.second()}
                      type='number'
                      className='form-control'
                    />
                  </div>
                  <div className="mt-5 d-flex justify-content-between">
                    <button className='btn btn-success' onClick={() => timer.startTimer()}>Start</button>
                    <button className='btn btn-danger' onClick={() => timer.stopTimer()}>Stop</button>
                    <button className='btn btn-warning' onClick={() => timer.reset()}>Reset</button>
                  </div>
                </React.Fragment>
              )
            }
          </div>
        </div>
      </div>
    )
};

export default observer(App);
