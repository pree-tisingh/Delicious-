import { useState, useEffect } from 'react';
import axios from 'axios';

const FollowButton = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkIfFollowing = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/follow/check/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error('Error checking follow status:', error);
      }
    };

    checkIfFollowing();
  }, [userId]);

  const handleFollow = async () => {
    try {
      await axios.post(`http://localhost:5000/api/follow`, { userId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/unfollow`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { userId }
      });
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <button onClick={isFollowing ? handleUnfollow : handleFollow}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
