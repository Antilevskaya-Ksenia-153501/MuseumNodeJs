import React from 'react';
import { Link } from 'react-router-dom';

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
            <li>
              <Link to="/signin">
                <button>Sign in</button>
              </Link>
            </li>

            <li>
              <Link to="/register">
                <button>Sign up</button>
              </Link>
            </li>

          </>
        ) : (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </div>
  );
};