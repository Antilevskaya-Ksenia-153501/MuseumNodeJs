import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const HallsPage = () => {
  const [halls, setHalls] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const fetchHalls = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/halls/getHalls');
      setHalls(response.data.halls);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchHalls();
  });

  if (!halls.length) {
    <div>Halls do not exist.</div>
  }

  return (
    <div>
      <h2>Halls List</h2>
      <ul>
        {halls.map((hall) => (
          <li>
            <img src={`http://localhost:3002/${hall.imgUrl}`}/>
            <p>{hall.title}</p>
            <p>{hall.description}</p>
            <p>{hall.area}</p>
          </li>
        ))}
      </ul>
      <Link to={'/create-hall'}>Create</Link>
    </div> 
  );
}