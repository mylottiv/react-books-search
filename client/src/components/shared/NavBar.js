import React from 'react';
import {Link, NavLink} from 'react-router-dom';

function NavBar() {
    return (      
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="#">Books</Link>
      <div className='navbar-nav'>
        <NavLink className='nav-item nav-link' activeClassName='active' to='/home'>Home</NavLink>
        <NavLink className='nav-item nav-link' activeClassName='active' to='/search'>Search</NavLink>
        <NavLink className='nav-item nav-link' activeClassName='active' to='/saved'>Saved</NavLink>
      </div>
    </nav>
    )
}

export default NavBar;