import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserList.css'; 

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
      await axios.post(
        'http://localhost:5000/api/follow',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
     
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isFollowing: true } : user
      ));
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await axios.post(
        'http://localhost:5000/api/unfollow',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isFollowing: false } : user
      ));
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="user-list-container">
      <h2>Users</h2>
      {error && <p className="error-message">{error}</p>}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <p>{user.name}</p>
              {user.isFollowing ? (
                <button onClick={() => handleUnfollow(user.id)}>Unfollow</button>
              ) : (
                <button onClick={() => handleFollow(user.id)}>Follow</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
