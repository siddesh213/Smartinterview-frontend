import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import '../styles/UserType.css';

const UserType = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSelectType = async (type) => {
    setLoading(true);
    try {
      const res = await api.post('/user/set-type', { userType: type });
      setUser(res.data.user);
      navigate('/interview-date');
    } catch (error) {
      alert('Error setting user type');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-type-container">
      <h2>What's your profile?</h2>
      <div className="type-options">
        <button onClick={() => handleSelectType('student')} disabled={loading} className="type-btn student">
          Student
        </button>
        <button onClick={() => handleSelectType('professional')} disabled={loading} className="type-btn professional">
          Experienced Professional
        </button>
      </div>
    </div>
  );
};

export default UserType;
