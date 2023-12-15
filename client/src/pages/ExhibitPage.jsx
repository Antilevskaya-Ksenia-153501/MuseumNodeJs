import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';

export const ExhibitPage = () => {
  const [exhibit, setExhibit] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchExhibitDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/exhibits/${id}`);
        setExhibit(response.data.exhibit);
      } catch (error) {
        console.error('Error fetching car details:', error.message);
      }
    };

    fetchExhibitDetails();
  }, [id]);

  if (!exhibit) {
    return <p>Loading...</p>;
  }

  return (
    <div >
      <h2>Exhibit Details</h2>
      <div>
      <img src={`http://localhost:3002/${exhibit.imgUrl}`} />
      <p>Title: {exhibit.title}</p>
      <p>Description: {exhibit.description}</p>
      <p>Date: <Moment date={exhibit.date} format='D MMM YYYY'/></p>
      </div>
    </div>
  );
};