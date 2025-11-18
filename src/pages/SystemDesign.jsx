import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import TopicCard from '../components/TopicCard';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import '../styles/SystemDesign.css';

const SystemDesign = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completedItems, setCompletedItems] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTopics();
    fetchProgress();
  }, []);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await api.get('/system-design/topics');
      setTopics(res.data.topics);
    } catch (error) {
      console.error('Error fetching topics');
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const res = await api.get('/progress/system-design');
      const completed = {};
      res.data.completedItems?.forEach(id => {
        completed[id] = true;
      });
      setCompletedItems(completed);
    } catch (error) {
      console.error('Error fetching progress');
    }
  };

  const toggleComplete = async (topicId) => {
    try {
      const isCompleted = completedItems[topicId];
      await api.post('/progress/mark-item', {
        category: 'systemDesign',
        itemId: topicId,
        completed: !isCompleted,
      });
      
      setCompletedItems(prev => ({
        ...prev,
        [topicId]: !isCompleted
      }));
    } catch (error) {
      console.error('Error updating progress');
    }
  };

  const completionPercentage = Math.round((Object.values(completedItems).filter(Boolean).length / topics.length) * 100) || 0;

  return (
    <>
      <Navbar />
      <div className="system-design-container">
        <div className="sd-header">
          <h1>System Design</h1>
          <div className="progress-bar-container">
            <div className="progress-label">Progress: {completionPercentage}%</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${completionPercentage}%` }}></div>
            </div>
          </div>
        </div>

        {loading ? <div className="loader">Loading...</div> : (
          <>
            {selectedTopic ? (
              <div className="topic-detail">
                <button onClick={() => setSelectedTopic(null)} className="back-button">← Back to Topics</button>
                
                <div className="topic-complete-btn">
                  <label>
                    <input 
                      type="checkbox" 
                      checked={completedItems[selectedTopic.id] || false}
                      onChange={() => toggleComplete(selectedTopic.id)}
                    />
                    Mark as completed
                  </label>
                </div>

                <h2>{selectedTopic.title}</h2>
                
                <section className="detail-section">
                  <h3>Overview</h3>
                  <p>{selectedTopic.overview}</p>
                </section>

                <section className="detail-section">
                  <h3>Key Components</h3>
                  <ul className="components-list">
                    {selectedTopic.components?.map((comp, idx) => (
                      <li key={idx}>{comp}</li>
                    ))}
                  </ul>
                </section>

                <section className="detail-section">
                  <h3>Architecture</h3>
                  <p>{selectedTopic.architecture}</p>
                </section>

                <section className="detail-section">
                  <h3>Pros & Cons</h3>
                  <div className="pros-cons">
                    <div className="pros">
                      <h4>Advantages</h4>
                      <ul>
                        {selectedTopic.prosAndCons?.pros?.map((pro, idx) => (
                          <li key={idx}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="cons">
                      <h4>Disadvantages</h4>
                      <ul>
                        {selectedTopic.prosAndCons?.cons?.map((con, idx) => (
                          <li key={idx}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="detail-section">
                  <h3>Real-World Examples</h3>
                  <p>{selectedTopic.realWorldExamples}</p>
                </section>

                <section className="detail-section">
                  <h3>Interview Tips</h3>
                  <p>{selectedTopic.interviewTips}</p>
                </section>
              </div>
            ) : (
              <div className="topics-grid">
                {topics.map(topic => (
                  <div 
                    key={topic.id} 
                    className={`topic-card-wrapper ${completedItems[topic.id] ? 'completed' : ''}`}
                  >
                    <div 
                      className="topic-card"
                      onClick={() => setSelectedTopic(topic)}
                    >
                      <h3>{topic.title}</h3>
                      <p>{topic.overview}</p>
                    </div>
                    <input 
                      type="checkbox" 
                      className="topic-checkbox"
                      checked={completedItems[topic.id] || false}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleComplete(topic.id);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SystemDesign;