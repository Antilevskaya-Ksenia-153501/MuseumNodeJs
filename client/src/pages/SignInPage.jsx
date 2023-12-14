import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3002/api/auth/signin', { email, password });
      localStorage.setItem('token', response.data.token);
      console.log('Set token to local storage');
      console.log(response.data.token);
      
      console.log(response.data);
      toast.success(response.data.message);
      setEmail('');
      setPassword('');
      navigate('/');
      } catch (error) {
        toast.error(error.response.data.message);
        navigate('/signin');
        console.log(error);
      }
    };

  return (
    <form onSubmit={e => e.preventDefault()}>
      <h1>Authorization</h1>
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
          <button type="submit" onClick={handleSubmit}>Sign in</button>
          <Link to={'/register'}>No account</Link>
        </div>
    </form>
  )
}
