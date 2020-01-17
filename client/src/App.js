import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Search, Saved, Home} from './components';


function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Books</a>
        <div className='navbar-nav'>
          <a className='nav-item nav-link' href='/'>Home</a>
          <a className='nav-item nav-link' href='/search'>Search</a>
          <a className='nav-item nav-link' href='/saved'>Saved</a>
        </div>
      </nav>
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
        <Route path='/' render={(props) => {
          return (
            <Home />
          )
        }}/>      
      </Switch>
    </Router>
  );
}

export default App;
