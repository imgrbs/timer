import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import styled from 'styled-components';

import { observer } from 'mobx-react'

const Layout = styled.div`
  min-height: 100vh;
`

const Time = styled.h1`
  font-size: 4em;
  @media (min-width: 768px) {
    font-size: 7em;
  }
  @media (min-width: 1400px) {
    font-size: 15em;
  }
`

function isCreator(permission) {
  return permission === 'creator'
}

const App = ({ timer }) => {
  const { time, permission, room } = timer

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <p className='mt-5'>
              You are <u>"{permission}"</u> of {room} room.
            </p>
            <Time>{`${time.format('HH:mm:ss')}`}</Time>
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
                    <button className='btn btn-warning' onClick={() => timer.stopTimer()}>Pause</button>
                    <button className='btn btn-danger' onClick={() => timer.reset()}>Reset</button>
                  </div>
                </React.Fragment>
              )
            }
          </div>
        </div>
      </div>
      <div className="fixed-bottom w-100">
        <div className="row">
          <div className="col-12 col-lg-4 offset-lg-4">
            <input value={room} onChange={e => timer.setRoom(e.target.value)} className='form-control' type="text" placeholder='Input Room Code...' />
          </div>
          <div className="col-12 col-lg-2 offset-lg-4">
            <button onClick={() => timer.createRoom()} className='btn btn-light w-100'>Create Room</button>
          </div>
          <div className="col-12 col-lg-2">
            <button onClick={() => timer.joinRoom()} className='btn btn-success w-100'>Join Room</button>
          </div>
        </div>
      </div>
    </Layout>
    )
};

export default observer(App);
