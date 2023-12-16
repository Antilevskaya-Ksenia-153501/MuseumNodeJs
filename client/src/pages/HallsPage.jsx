import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/btn.css';
import '../styles/halls.css';

export const HallsPage = () => {
  const [halls, setHalls] = useState([]);
  const [filteredHalls, setFilteredHalls] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchArea, setSearchArea] = useState('');
  const navigate = useNavigate();

  const fetchHalls = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/halls/getHalls');
      setHalls(response.data.halls);
      setFilteredHalls(response.data.halls);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  const handleSearch = () => {
    const filtered = halls.filter((hall) =>
      String(hall.area).toLowerCase() == (searchArea.toLowerCase())
    );
    if (filtered.length === 0) {
      window.alert('No halls found with the given area.');
    }
    else{
      setFilteredHalls(filtered);
    }
  };

  const handleBack = () => {
    setSearchArea('');
    setFilteredHalls(halls);
  };

  if (!filteredHalls.length) {
    return <div>Halls do not exist.</div>;
  }

  return (
    <div className="halls-container">
      <h2>Halls List</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by area"
          value={searchArea}
          onChange={(e) => setSearchArea(e.target.value)}
        />
        <button className="btn space" onClick={handleSearch}>
          Search
        </button>
        <button className="btn space" onClick={handleBack}>
          Back
        </button>
      </div>
      <ul>
        {filteredHalls.map((hall) => (
          <li key={hall.id}>
            <img src={`http://localhost:3002/${hall.imgUrl}`} alt={hall.title} />
            <p className="title">{hall.title}</p>
            <p>{hall.description}</p>
            <p>
              <b>Area:</b> {hall.area}
            </p>
          </li>
        ))}
      </ul>
      <Link className="btn space" to={'/create-hall'}>
        Create
      </Link>
    </div>
  );
};