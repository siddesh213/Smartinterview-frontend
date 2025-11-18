import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Pagination from '../components/Pagination';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import '../styles/Dbms.css';

const Dbms = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completedItems, setCompletedItems] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchQuestions();
    fetchProgress();
  }, [page]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/dbms/questions', {
        params: { page, limit: 10 },
      });
      setQuestions(res.data.questions);
      setTotal(res.data.total);
    } catch (error) {
      console.error('Error fetching questions');
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const res = await api.get('/progress/dbms');
      const completed = {};
      res.data.completedItems?.forEach(id => {
        completed[id] = true;
      });
      setCompletedItems(completed);
    } catch (error) {
      console.error('Error fetching progress');
    }
  };

  const toggleComplete = async (questionId) => {
    try {
      const isCompleted = completedItems[questionId];
      await api.post('/progress/mark-item', {
        category: 'dbms',
        itemId: questionId,
        completed: !isCompleted,
      });
      
      setCompletedItems(prev => ({
        ...prev,
        [questionId]: !isCompleted
      }));
    } catch (error) {
      console.error('Error updating progress');
    }
  };

  const completionPercentage = Math.round((Object.values(completedItems).filter(Boolean).length / total) * 100);

  return (
    <>
      <Navbar />
      <div className="dbms-container">
        <div className="dbms-header">
          <h1>DBMS Questions</h1>
          <div className="progress-bar-container">
            <div className="progress-label">Progress: {completionPercentage}%</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${completionPercentage}%` }}></div>
            </div>
          </div>
        </div>

        {loading ? <div className="loader">Loading...</div> : (
          <>
            <div className="questions-list">
              {questions.map(q => (
                <div 
                  key={q.id} 
                  className={`question-item ${completedItems[q.id] ? 'completed' : ''}`}
                >
                  <div className="question-checkbox">
                    <input 
                      type="checkbox" 
                      checked={completedItems[q.id] || false}
                      onChange={() => toggleComplete(q.id)}
                    />
                  </div>
                  <div className="question-content">
                    <h3>{q.question}</h3>
                    <p>{q.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            <Pagination 
              page={page} 
              onPageChange={setPage} 
              hasMore={page * 10 < total} 
            />
          </>
        )}
      </div>
    </>
  );
};

export default Dbms;