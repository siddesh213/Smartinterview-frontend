import React from "react";
import "../styles/DayCard.css";

const DayCard = ({ day, completed, topics = [], onClick }) => {
  // Identify DSA vs System Design
  const dsaTopic = topics.find(t => !t.toLowerCase().includes("design"));
  const systemTopic = topics.find(t => t.toLowerCase().includes("design"));

  return (
    <div className={`day-card ${completed ? "completed" : ""}`} onClick={onClick}>
      <div className="day-number">Day {day}</div>

      {/* DSA topic */}
      {dsaTopic && (
        <div className="topic-line">
          <span className="emoji">📌</span>
          <span className="topic">{dsaTopic}</span>
        </div>
      )}

      {/* System Design topic */}
      {systemTopic && (
        <div className="topic-line">
          <span className="emoji">⚙️</span>
          <span className="topic">{systemTopic}</span>
        </div>
      )}

      <div className="day-status">{completed ? "Completed" : ""}</div>
    </div>
  );
};

export default DayCard;
