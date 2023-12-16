import React, { useState, useEffect } from 'react';
import '../styles/api.css';

export const BoredAPI = () => {
  const [activity, setActivity] = useState({ content: ''});

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch('https://www.boredapi.com/api/activity');
        const activityData = await response.json();

        if (activityData && activityData.activity) {
          setActivity({ content: activityData.activity} );
        } else {
          console.error('Invalid activity data');
        }
      } catch (error) {
        console.error('Error fetching activity:', error.message);
      }
    };

    fetchActivity();
  }, []); 

  return (
    <div>
      <div>
      <p class="quote">Here is random activity: <strong>{activity.content}</strong></p>
      </div>
    </div>
  );
};