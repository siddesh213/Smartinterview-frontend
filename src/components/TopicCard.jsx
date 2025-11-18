import React from 'react';
import '../styles/TopicCard.css';

const TopicCard = ({ topic, onClick }) => {
  return (
    <div className="topic-card" onClick={onClick}>
      <h3>{topic.title}</h3>
      <p>{topic.content}</p>
    </div>
  );
};

export default TopicCard;
