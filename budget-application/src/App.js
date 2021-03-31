import React from 'react';
import './App.css';
import {withRouter} from 'react-router-dom'
import Nav from './Components/Nav/Nav'
import routes from './routes'

function App(props) {
  return (
    <div>
      {props.location.pathname === '/' || props.location.pathname === '/register' ? null : <Nav/>}
      {routes}
    </div>
  );
}

export default withRouter(App);
