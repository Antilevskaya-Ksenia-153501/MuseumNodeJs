import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const VacanciesPage = () => {
  const [vacancies, setVacancies] = useState([]);
  const navigate = useNavigate();

  const fetchVacancies = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/vacancies/getVacancies');
      setVacancies(response.data.vacancies);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchVacancies();
  });

  if (!vacancies.length) {
    <div>Vacancies do not exist.</div>
  }

  return (
    <div>
      <h2>Vacancies List</h2>
      <ul>
        {vacancies.map((vacancy) => (
          <li>
            <p>{vacancy.title}</p>
            <p>{vacancy.description}</p>
            <p>{vacancy.salary}</p>
          </li>
        ))}
      </ul>
      <Link to={'/create-vacancy'}>Create</Link>
    </div> 
  );
}