import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ActivityFeed.css';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/feed', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        console.log('Activity Feed Response:', response.data);
        if (Array.isArray(response.data)) {
          setActivities(response.data);
        } else {
          console.error('API response is not an array');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activity feed:', error);
        setLoading(false);
      });
  }, []);
  

  if (loading) return <p className="loading">Loading activity feed...</p>;

  return (
    <div className="activity-feed-container">
      <h2>Activity Feed</h2>
      {activities.length > 0 ? (
        <ul>
          {activities.map(activity => (
            <li key={activity.id}>
              <p><strong>{activity.user.name}</strong> {activity.action}: {activity.recipe.title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No activities found</p>
      )}
    </div>
  );
};

export default ActivityFeed;
