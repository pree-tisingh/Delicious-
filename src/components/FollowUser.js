import { useState, useEffect } from 'react';
import axios from 'axios';

const FollowUser = () => {
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    // Fetch users that can be followed
    axios.get('/api/users') // Assuming you have an endpoint that provides all users
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));

    // Fetch the users the current user is following
    axios.get('/api/following', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => setFollowing(response.data))
      .catch(error => console.error('Error fetching following list:', error));
  }, []);

  const followUser = async (userId) => {
    try {
      await axios.post(
        '/api/follow/follow',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setFollowing([...following, userId]);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const unfollowUser = async (userId) => {
    try {
      await axios.post(
        '/api/follow/unfollow',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setFollowing(following.filter(id => id !== userId));
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <div>
      <h2>Follow Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            {following.includes(user.id) ? (
              <button onClick={() => unfollowUser(user.id)}>Unfollow</button>
            ) : (
              <button onClick={() => followUser(user.id)}>Follow</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowUser;
