import 'bootstrap/dist/css/bootstrap.min.css';
import ReactGA from 'react-ga';

import React from 'react';
import styled from 'styled-components';

import { observer } from 'mobx-react'

const Layout = styled.div`
  background-color: green;

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
  font-family: 'Segment7Standard', monospace; 
`

function initializeReactGA() {
    ReactGA.initialize('UA-138505291-1');
    ReactGA.pageview('/');
}

class StreamerView extends React.Component {
    componentDidMount() {
        initializeReactGA()

        this.props.timer.joinRoom()

    }

    render() {
        const { time } = this.props.timer

        return (
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mt-5-custom">
                            <div className='mb-3 text-white'>
                                <h1>This stream will shutdown in</h1>
                            </div>
                            <Time className='text-white'>
                                <Number>{`${time.format('HH')}`}</Number>
                                :
                                <Number>{`${time.format('mm')}`}</Number>
                                :
                                <Number>{`${time.format('ss')}`}</Number>
                            </Time>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default observer(StreamerView);
