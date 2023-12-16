import React, { useState, useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import DateTime from '../components/DateTime';  
import { Authorization } from '../components/Authorization';
import { QuoteAPI } from '../components/QuoteAPI';
import { BoredAPI } from '../components/BoredAPI';

export const ExhibitsPage = () => {
  const [exhibits, setExhibits] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  const fetchExhibits = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/exhibits/getExhibits');
      setExhibits(response.data.exhibits);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));
    if (token) {
      axios.get('http://localhost:3002/api/auth/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setLoggedInUser(response.data.user);
      })
      .catch(error => {
        console.error('Token verification error:', error.message, token);
      });
    }
      fetchExhibits();
  }, [loggedInUser]);

  const handleDeleteExhibit = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/exhibits/delete/${id}`);
      // fetchExhibits();
    } catch (error) {
      console.error('Error deleting exhibit:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser('');
    window.location.reload();
  };

  // if (!exhibits.length) {
  //   return <div>Exhibits do not exist.</div>;
  // }

  return (
    <div>
      <h2>Exhibit List</h2>
      {loggedInUser && <p>Welcome, {loggedInUser.fullName}!</p>}
      <Authorization isAuthenticated={!!loggedInUser} onLogout={handleLogout} />
      <DateTime />
      {loggedInUser&&<QuoteAPI/>}
      {loggedInUser&&<BoredAPI/>}
      {loggedInUser&&<NavLink to={'/new-exhibit'} href='/'>Add exhibit</NavLink>}
      <ul>
        {exhibits.map((exhibit) => (
          <li key={exhibit._id}>
            <img src={`http://localhost:3002/${exhibit.imgUrl}`}/>
            <p>{exhibit.title}</p>
            <p>{exhibit.description}</p>
            <Link to={`/exhibit-details/${exhibit._id}`}>Details</Link>
            {loggedInUser&&<Link to={`/edit-exhibit/${exhibit._id}`}>Update</Link>}
            {loggedInUser&&<button onClick={() => handleDeleteExhibit(exhibit._id)}>Delete</button>}
          </li>
        ))}
      </ul>
    </div> 
  );
}
