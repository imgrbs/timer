import './font.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import App from './App';

import Timer from './store/Timer';
import StreamerView from './pages/StreamerView';

const AppRouter = () => (
    <Router>
        <Switch>
            <Route path="/streamer">
                <StreamerView timer={new Timer({ room: 'streamer' })} />
            </Route>
            <Route path="/">
                <App timer={new Timer()} />
            </Route>
        </Switch>
    </Router>
);

ReactDOM.render(
    <AppRouter />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
