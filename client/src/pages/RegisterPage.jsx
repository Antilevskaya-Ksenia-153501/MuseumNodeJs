import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/btn.css';

export const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3002/api/auth/register', { fullName, email, password });
      console.log(response.data);
      setFullName('');
      setEmail('');
      setPassword('');
      navigate('/signin');
    } catch (error) {
      toast.error(error.response.data.message);
      navigate('/register');
      return console.log(error);
    }
  };

  return (
    <form onSubmit={e => e.preventDefault()}>
    <h1>Registration</h1>
      <label>
          Fullname:
          <input type="text" placeholder="Enter fullname"
          value={fullName} onChange={e => setFullName(e.target.value)}/>
      </label>
      <br />
     <label>
        Email:
        <input type="text" placeholder="Enter email"
        value={email} onChange={e => setEmail(e.target.value)}/>
      </label>
      <br />
      <label>
        Password:
        <input type="password" placeholder="Enter password"
        value={password} onChange={e => setPassword(e.target.value)}/>
      </label>
      <br />
      <div>
        <button className="btn space" type="submit" onClick={handleSubmit}>Sign up</button>
        <Link className="btn space" to={'/signin'}>Already registered</Link>
      </div>
  </form>
  )
}
