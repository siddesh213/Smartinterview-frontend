import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import '../styles/InterviewDate.css';

const InterviewDate = () => {
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/user/set-interview-date', { interviewDate: date });
      setUser(res.data.user);
      await api.post('/plan/generate', { interviewDate: date });
      navigate('/dashboard');
    } catch (error) {
      alert('Error setting interview date');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="interview-date-container">
      <form onSubmit={handleSubmit}>
        <h2>When is your interview?</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          min={new Date().toISOString().split('T')[0]}
        />
        <button type="submit" disabled={loading}>{loading ? 'Setting...' : 'Continue'}</button>
      </form>
    </div>
  );
};

export default InterviewDate;
