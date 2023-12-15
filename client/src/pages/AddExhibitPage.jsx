import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AddExhibitPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('description', description);
      data.append('date', date);
      data.append('image', image);

      const response = await axios.post('http://localhost:3002/api/exhibits/create', data);
      
      console.log(response.data);
      toast.success(response.data.message);
      setTitle('');
      setDescription('');
      setDate('');
      setImage('');
      navigate('/');
      } catch (error) {
        toast.error(error.response.data.message);
        navigate('/new-exhibit');
        console.log(error);
      }
    };

    const handleCancel = () => {
      setTitle('');
      setDescription('');
      setDate('');
      setImage('');
    };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <h1>Create exhibit</h1>
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
            Date:
            <input type="date" placeholder="Select a date" 
            value={date} onChange={e => setDate(e.target.value)}/>
        </label>
        <br />
        <label>
            Attach image:
            <input type="file"
            onChange={e => setImage(e.target.files[0])}/>
        </label>
        <br /> 
        <div>
           {image && (
              <img src={URL.createObjectURL(image)} alt={image.name} />
            )}
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>Add</button>
           <button type="submit" onClick={handleCancel}>Cancel</button>
        </div>  
    </form>
  )
}
