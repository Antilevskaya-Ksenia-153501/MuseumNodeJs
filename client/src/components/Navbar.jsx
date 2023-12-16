import React from 'react';
import {Link, NavLink} from 'react-router-dom';

export const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
            <li><NavLink to={'/'} href='/'>About-us</NavLink></li>
            <li><NavLink to={'/'} href='/'>Home</NavLink></li>
            <li><NavLink to={'/exhibits'} href='/'>Exhibits</NavLink></li>
            <li><NavLink to={'/halls'} href='/'>Halls</NavLink></li>
            <li><NavLink to={'/vacancies'} href='/'>Vacancies</NavLink></li>
        </ul>
      </nav>

      {/* <div>
        <Link to={'/register'}>Sign up</Link>
        <Link to={'/signin'}>Sign in</Link>
      </div> */}
  </div>
  )
}
