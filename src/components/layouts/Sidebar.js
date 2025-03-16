import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ teams, activeTeam, onTeamSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`teams-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="teams-list">
        {teams.map((team) => (
          <div 
            key={team.id} 
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
