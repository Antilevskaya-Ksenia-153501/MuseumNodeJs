import React from 'react';
import {Link} from 'react-router-dom';

export const SignInPage = () => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <h1>Authorization</h1>
       <label>
          Email:
          <input type="text" placeholder="Enter email"/>
        </label>
        <br />
        <label>
          Password:
          <input type="password" placeholder="Enter password"/>
        </label>
        <br />
        <div>
          <button type="submit">Sign in</button>
          <Link to={'/register'}>No account</Link>
          </div>
    </form>
  )
}
