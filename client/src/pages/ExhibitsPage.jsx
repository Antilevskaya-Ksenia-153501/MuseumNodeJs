import React, { useState, useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Moment from 'react-moment';
import DateTime from '../components/DateTime';  
import { Authorization } from '../components/Authorization';
import { QuoteAPI } from '../components/QuoteAPI';
import { BoredAPI } from '../components/BoredAPI';
import '../styles/exhibits.css';

export const ExhibitsPage = () => {
  const [exhibits, setExhibits] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [sortedExhibits, setSortedExhibits] = useState([]);
  const [sortByDate, setSortByDate] = useState(false);
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

  useEffect(() => {
    if (sortByDate) {
      const sorted = [...exhibits].sort((a, b) => new Date(a.date) - new Date(b.date));
      setSortedExhibits(sorted);
    } else {
      setSortedExhibits([]);
    }
  }, [exhibits, sortByDate]);

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

  const handleSortByDate = () => {
    setSortByDate(prevState => !prevState);
  };

  return (
    <div className="exhibits-container">
      <h2>Exhibit List</h2>
      {loggedInUser && <p className="welcome">Welcome, <b>{loggedInUser.fullName}</b>!</p>}
      <Authorization isAuthenticated={!!loggedInUser} onLogout={handleLogout}/>
      <DateTime />
      {loggedInUser&&<QuoteAPI/>}
      {loggedInUser&&<BoredAPI/>}
      {loggedInUser&&<NavLink to={'/new-exhibit'} className="btn">Add exhibit</NavLink>}
      <button className="btn space" onClick={handleSortByDate}>Sort by Date</button>
      <ul>
      {(sortByDate ? sortedExhibits : exhibits).map((exhibit) => (
        // {exhibits.map((exhibit) => (
          <li key={exhibit._id}>
            <img src={`http://localhost:3002/${exhibit.imgUrl}`}/>
            <p className="title">{exhibit.title}</p>
            <p className="date"><Moment date={exhibit.date} format='D MMM YYYY'/></p>
            <div className="links-container">
              <Link className="link" to={`/exhibit-details/${exhibit._id}`}>Details</Link>
              {loggedInUser&&<Link className="link" to={`/edit-exhibit/${exhibit._id}`}> | Update</Link>}
              {loggedInUser&&<button className="link" onClick={() => handleDeleteExhibit(exhibit._id)}> | Delete</button>}
            </div>
          </li>
        ))}
      </ul>
    </div> 
  );
}
