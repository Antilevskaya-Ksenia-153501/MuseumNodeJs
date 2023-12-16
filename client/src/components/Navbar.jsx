import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import '../styles/header.css';

export const Navbar = () => {
  return (
    <div className="header">
    <div className="header-row">
        <nav className="header-nav">
          <ul>
              <li><NavLink to={'/exhibits'} href='/'>Exhibits</NavLink></li>
              <li><NavLink to={'/halls'} href='/'>Halls</NavLink></li>
              <li><NavLink to={'/vacancies'} href='/'>Vacancies</NavLink></li>
          </ul>
        </nav>
    </div>
  </div>
  )
}
