import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Search, Saved, Home, NavBar} from './components';


function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='/search' render={(props) => {
          console.log('route props', props);
          return (
            <Search initialQuery={(props.location.pathname !== props.match.path) ? props.location.pathname.replace(props.match.path + '/', '') : ''} {...props}/>
          )
        }}/>
        <Route path='/saved' render={(props) => {
          return (
            <Saved initialQuery={props.location.pathname.replace(props.match.path + '/', '')} {...props}/>
          )
        }}/>
        <Route path='/home' render={(props) => {
          return (
            <Home />
          )
        }}/>
        <Route path='/' render={(props) => {
          return (
            <Redirect to='/home' />
          )
        }}/>      
      </Switch>
    </Router>
  );
}

export default App;
