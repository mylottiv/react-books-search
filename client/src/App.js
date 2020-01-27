import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Search, Saved, Home, NavBar} from './components';


function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='/search' render={(props) => {
          return (
            <Search />
          )
        }}/>
        <Route path='/saved' render={(props) => {
          return (
            <Saved />
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
