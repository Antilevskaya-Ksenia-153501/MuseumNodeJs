import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const ExhibitsPage = () => {
  const [exhibits, setExhibits] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
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
    fetchExhibits();
  });

  const handleDeleteExhibit = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/exhibits/delete/${id}`);
      fetchExhibits();
    } catch (error) {
      console.error('Error deleting exhibit:', error.message);
    }
  };

  if (!exhibits.length) {
    <div>Exhibits do not exist.</div>
  }

  return (
    <div>
      <h2>Exhibit List</h2>
      <ul>
        {exhibits.map((exhibit) => (
          <li key={exhibit._id}>
            <img src={`http://localhost:3002/${exhibit.imgUrl}`}/>
            <p>{exhibit.title}</p>
            <p>{exhibit.description}</p>
            <Link to={`/exhibit-details/${exhibit._id}`}>Details</Link>
            <Link to={`/edit-exhibit/${exhibit._id}`}>Update</Link>
            <button onClick={() => handleDeleteExhibit(exhibit._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div> 
  );
}
