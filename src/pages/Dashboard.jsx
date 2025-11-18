import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import DayCard from '../components/DayCard';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    try {
      const res = await api.get('/plan/get');
      setPlan(res.data.plan);
    } catch (error) {
      alert('Error fetching plan');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  const daysRemaining = plan ? Number(plan.dailyPlan.length) : 0;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Welcome, {user?.name}</h1>

        {/* 🔥 < 20 days → no daily plan, only guidance */}
        {daysRemaining < 20 ? (
          <>
            <p style={{ color: '#d9534f', fontWeight: '600', marginBottom: '18px', fontSize: '18px' }}>
              ⏳ Only {daysRemaining} days left — focus on revision & mocks, not full detailed plans.
            </p>
            <ul>
              <li>✔ Solve 5 DSA questions/day</li>
              <li>✔ Revise CS fundamentals (OOPS / OS / DBMS)</li>
              <li>✔ Practice behavioral interview answers</li>
              <li>✔ Read system design short notes</li>
            </ul>
          </>
        ) : (
          <>
            {/* Normal dashboard when >= 20 days */}
            <div className="dashboard-summary">
              <div className="summary-card">
                <h3>Days Until Interview</h3>
                <p className="summary-value">{daysRemaining}</p>
              </div>
              <div className="summary-card">
                <h3>User Type</h3>
                <p className="summary-value">{user?.userType || 'Not set'}</p>
              </div>
            </div>

            <h2>Your Daily Plan</h2>
            <div className="plan-grid">
              {plan?.dailyPlan.map(dayPlan => (
                <DayCard
                  key={dayPlan.day}
                  day={dayPlan.day}
                  completed={dayPlan.completed}
                  topics={dayPlan.topics}  // 👈 important
                  onClick={() =>
                    alert(`Topics for Day ${dayPlan.day}: ${dayPlan.topics.join(', ')}`)
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
