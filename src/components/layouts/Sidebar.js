import React, { useState } from 'react';
import './sidebar.css';

const Sidebar = ({ teams, activeTeam, onTeamSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`teams-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="teams-header">
        <div className="teams-indicator"></div>
      </div>
      <div className="teams-list">
        {teams.map((team, index) => (
          <div 
            key={index} 
            className={`team-item ${activeTeam === team.id ? 'active' : ''}`}
            onClick={() => onTeamSelect(team.id)}
          >
            {team.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;


