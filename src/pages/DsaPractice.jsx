import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import ProblemCard from '../components/ProblemCard';
import Pagination from '../components/Pagination';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import '../styles/DsaPractice.css';

const DsaPractice = () => {
  const [problems, setProblems] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [completedItems, setCompletedItems] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    fetchProblems();
    fetchProgress();
  }, [page, selectedTopic, difficulty]);

  const fetchTopics = async () => {
    try {
      const res = await api.get('/dsa/topics');
      setTopics(res.data.topics);
    } catch (error) {
      console.error('Error fetching topics');
    }
  };

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const res = await api.get('/dsa/problems', {
        params: { page, limit: 10, topic: selectedTopic, difficulty },
      });
      setProblems(res.data.problems);
      setTotal(res.data.total);
    } catch (error) {
      console.error('Error fetching problems');
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const res = await api.get('/progress/dsa');
      const completed = {};
      res.data.completedItems?.forEach(id => {
        completed[id] = true;
      });
      setCompletedItems(completed);
    } catch (error) {
      console.error('Error fetching progress');
    }
  };

  const toggleComplete = async (problemId) => {
    try {
      const isCompleted = completedItems[problemId];
      await api.post('/progress/mark-item', {
        category: 'dsa',
        itemId: problemId,
        completed: !isCompleted,
      });
      
      setCompletedItems(prev => ({
        ...prev,
        [problemId]: !isCompleted
      }));
    } catch (error) {
      console.error('Error updating progress');
    }
  };

  const completionPercentage = Math.round((Object.values(completedItems).filter(Boolean).length / total) * 100) || 0;

  return (
    <>
      <Navbar />
      <div className="dsa-container">
        <div className="dsa-header">
          <h1>DSA Problems</h1>
          <div className="progress-bar-container">
            <div className="progress-label">Progress: {completionPercentage}%</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${completionPercentage}%` }}></div>
            </div>
          </div>
        </div>

        <div className="filters">
          <select value={selectedTopic} onChange={(e) => { setSelectedTopic(e.target.value); setPage(1); }}>
            <option value="">All Topics</option>
            {topics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
          <select value={difficulty} onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}>
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {loading ? <div className="loader">Loading...</div> : (
          <>
            <div className="problems-grid">
              {problems.map(problem => (
                <div 
                  key={problem.id} 
                  className={`problem-wrapper ${completedItems[problem.id] ? 'completed' : ''}`}
                >
                  <ProblemCard problem={problem} />
                  <div className="problem-checkbox-container">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={completedItems[problem.id] || false}
                        onChange={() => toggleComplete(problem.id)}
                      />
                      <span>Solved</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <Pagination page={page} onPageChange={setPage} hasMore={page * 10 < total} />
          </>
        )}
      </div>
    </>
  );
};

export default DsaPractice;