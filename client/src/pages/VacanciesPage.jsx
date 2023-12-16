import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/btn.css';
import '../styles/vacancies.css';

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
    <div vacancies-container>
      <h2>Vacancies List</h2>
      <ul>
        {vacancies.map((vacancy) => (
          <li>
            <p className="title">{vacancy.title}</p>
            <p>{vacancy.description}</p>
            <p><b>Salary:</b>{vacancy.salary}$</p>
          </li>
        ))}
      </ul>
      <Link className="btn space" to={'/create-vacancy'}>Create</Link>
    </div> 
  );
}