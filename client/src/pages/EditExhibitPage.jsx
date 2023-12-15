import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const EditExhibitPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchExhibit = useCallback(async () => {
    const { data } = await axios.get(`http://localhost:3002/api/exhibits/${id}`);
    setTitle(data.title);
    setDescription(data.description);
    setDate(data.date);
    setOldImage(data.imgUrl);
  }, [id])

  const handleSubmit = async () => {
    try {
      const updateData = new FormData();
      updateData.append('title', title);
      updateData.append('description', description);
      updateData.append('date', date);
      updateData.append('id', id);
      updateData.append('image', newImage);

      const response = await axios.put(`http://localhost:3002/api/exhibits/update/${id}`, updateData);
      
      console.log(response.data);
      setTitle('');
      setDescription('');
      setDate('');
      setNewImage('');
      setOldImage('');
      navigate('/exhibits')
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
      setNewImage('');
      setOldImage('');
    };

    useEffect(() => {
      fetchExhibit()
  }, [fetchExhibit])

  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <h1>Update exhibit</h1>
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
            onChange={e => {
              setNewImage(e.target.files[0]) 
              setOldImage('')
              }}/>
        </label>
        <br /> 
        <div>
            {oldImage && (
              <img src={`http://localhost:3002/${oldImage}`} />
            )}
           {newImage && (
              <img src={URL.createObjectURL(newImage)} />
            )}
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>Update</button>
          <button type="submit" onClick={handleCancel}>Cancel</button>
        </div>  
    </form>
  )
}
