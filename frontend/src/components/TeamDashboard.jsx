import React, { useState } from 'react';
import AllPlayers from "./players/AllPlayers";
// import Request from "./teams/Request";
const Card = ({ title, children }) => {
  return (
    <div className="cards">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
};



const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('dashboard');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'requests':
        return <p>request content</p>;
        case 'dashboard':
        return <p>dashboard content</p>;
        case 'messages':
        return <p>messages content</p>;
      case 'stats':
        return <p>Stats Content</p>;
      case 'players':
        return <AllPlayers />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      
      <div className="dashboard-left">
        <Card>
          <div
            className={`dashboard-option ${
              selectedOption === 'dashboard' ? 'selected' : ''
            }`}
            onClick={() => handleOptionClick('dashboard')}
          >
            Dashboard
          </div>
          <div
            className={`dashboard-option ${
              selectedOption === 'requests' ? 'selected' : ''
            }`}
            onClick={() => handleOptionClick('requests')}
          >
            Requests
          </div>
          <div
            className={`dashboard-option ${
              selectedOption === 'messages' ? 'selected' : ''
            }`}
            onClick={() => handleOptionClick('messages')}
          >
            Messages
          </div>
          <div
            className={`dashboard-option ${
              selectedOption === 'stats' ? 'selected' : ''
            }`}
            onClick={() => handleOptionClick('stats')}
          >
            Stats
          </div>
          <div
            className={`dashboard-option ${
              selectedOption === 'players' ? 'selected' : ''
            }`}
            onClick={() => handleOptionClick('players')}
          >
            Players
          </div>
        </Card>
      </div>
      <div className="dashboard-right h-25">
        <Card>{renderContent()}</Card>
      </div>
    </div>
  );
  
};

export default Dashboard;
