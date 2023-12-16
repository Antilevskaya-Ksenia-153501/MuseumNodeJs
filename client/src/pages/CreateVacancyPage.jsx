import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/btn.css';

export const CreateVacancyPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('description', description);
      data.append('salary', salary);

      const response = await axios.post('http://localhost:3002/api/vacancies/create', {title, description, salary});
      
      console.log(response.data);
      toast.success(response.data.message);
      setTitle('');
      setDescription('');
      setSalary('');
      navigate('/vacancies');
      } catch (error) {
        toast.error(error.response.data.message);
        navigate('/create-vacancy');
        console.log(error);
      }
    };

    const handleCancel = () => {
      setTitle('');
      setDescription('');
      setSalary('');
    };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <h1>Create vacancy</h1>
        <label>
            Title:
            <input type="text" placeholder="Enter title"
            value={title} onChange={e => setTitle(e.target.value)}/>
        </label>
        <br />
        <label>
            Description:
            <textarea placeholder="Enter description"
            value={description} onChange={e => setDescription(e.target.value)}/>
        </label>
        <br />
        <label>
            Salary:
            <input type="number" min="1" step="1" placeholder="Enter a salary" 
            value={salary} onChange={e => setSalary(e.target.value)}/>
        </label>
        <br />
        <div>
          <button className="btn space" type="submit" onClick={handleSubmit}>Add</button>
          <button className="btn space" type="submit" onClick={handleCancel}>Cancel</button>
        </div>  
    </form>
  )
}
