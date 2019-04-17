import 'bootstrap/dist/css/bootstrap.min.css';
import ReactGA from 'react-ga';

import React from 'react';
import styled from 'styled-components';

import Play from 'react-icons/lib/md/play-circle-filled'
import Pause from 'react-icons/lib/md/pause-circle-filled'
import Reset from 'react-icons/lib/md/cached'

import { observer } from 'mobx-react'

const Layout = styled.div`
  min-height: 100vh;
  .d-flex.btn {
    font-size: 1.25em;
    min-width: 90px;
  }
  svg {
    font-size: 2.25em;
  }
  @media (min-width: 768px){
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 576px) {
    .mt-5-custom {
      margin-top: 3rem!important;
    } 
  }
`

const Bold = styled.h3`
  display: inline;
`

const Time = styled.h1`
  display: inline;
  font-weight: normal; 
  
  font-size: 4em;
  @media (min-width: 768px) {
    font-size: 7em;
  }
  @media (min-width: 1400px) {
    font-size: 15em;
  }
`

const Number = styled.span`
  font-family: 'Segment7Standard'; 
`

function initializeReactGA() {
  ReactGA.initialize('UA-123791717-1');
  ReactGA.pageview('/');
}

function isCreator(permission) {
  return permission === 'creator'
}

const App = ({ timer }) => {
  const { time, permission, room } = timer
  initializeReactGA()
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mt-5-custom">
            <div className='mb-3'>
              You are a <Bold>"<u>{permission}</u>"</Bold> of <Bold>{room}</Bold> room.
            </div>
            <Time>
              <Number>{`${time.format('HH')}`}</Number>
              :
              <Number>{`${time.format('mm')}`}</Number>
              :
              <Number>{`${time.format('ss')}`}</Number>
            </Time>
            {
              isCreator(permission) && (
                <React.Fragment>
                  <div className="row">
                    <div className="col-12 mt-4 mb-4 d-flex justify-content-center align-items-center">
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
                    <div className="col-12 col-md-6 offset-md-3 d-flex justify-content-around">
                      <button className='d-flex flex-column align-items-center btn btn-success' onClick={() => timer.startTimer()}>
                        <Play />
                        Start
                      </button>
                      <button className='d-flex flex-column align-items-center btn btn-warning' onClick={() => timer.stopTimer()}>
                        <Pause />
                        Pause
                      </button>
                      <button className='d-flex flex-column align-items-center btn btn-danger' onClick={() => timer.reset()}>
                        <Reset />
                        Reset
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              )
            }
          </div>
        </div>
      </div>
      <div className="fixed-bottom w-100 p-3 bg-light">
        <div className="row">
          <div className="mt-2 col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <input value={room} onChange={e => timer.setRoom(e.target.value)} className='form-control' type="text" placeholder='Input Room Code...' />
          </div>
          <div className="mt-2 col-12 col-md-3 offset-md-3 col-lg-2 offset-lg-4">
            <button onClick={() => timer.createRoom()} className='btn btn-outline-primary w-100'>Create Room</button>
          </div>
          <div className="mt-2 col-12 col-md-3  col-lg-2">
            <button onClick={() => timer.joinRoom()} className='btn btn-success w-100'>Join Room</button>
          </div>
        </div>
      </div>
    </Layout>
    )
};

export default observer(App);
