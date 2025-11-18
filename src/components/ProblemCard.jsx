import React from 'react';
import '../styles/ProblemCard.css';

const ProblemCard = ({ problem }) => {
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'easy';
      case 'Medium': return 'medium';
      case 'Hard': return 'hard';
      default: return '';
    }
  };

  return (
    <div className="problem-card">
      <h3>{problem.title}</h3>
      <p>{problem.description}</p>
      <div className="problem-meta">
        <span className={`difficulty ${getDifficultyColor(problem.difficulty)}`}>
          {problem.difficulty}
        </span>
        <span className="topic">{problem.topic}</span>
      </div>
    </div>
  );
};

export default ProblemCard;
