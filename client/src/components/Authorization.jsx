import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

export const Authorization = ({ isAuthenticated, onLogout }) => {
  const handleLogout = () => {
    console.log('Logout clicked');
    onLogout();
  };

  return (
<div>
      <ul>
        {!isAuthenticated ? (
          <>
            <div className='registration'>
              <li>
                <Link to="/signin">
                  <button className="btn space">Sign in</button>
                </Link>
              </li>

              <li>
                <Link to="/register">
                  <button className="btn space">Sign up</button>
                </Link>
              </li>
            </div>

          </>
        ) : (
          <li>
            <button className="btn space" onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </div>
  );
};