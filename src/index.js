import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Mainpage from './components/Mainpage';
import io from "socket.io-client"
import {
    BrowserRouter as Router,
    Route,
}
    from "react-router-dom";


const socket = io('http://localhost:4000/');

ReactDOM.render((
    <Router>
        <Route path="//" render={() => <Mainpage socket={socket} />} />
        <Route path="/room/:id" render={(props) => <Mainpage socket={socket} room={props.match.params.id} />} />
    </Router>)
    , document.getElementById('root'));
