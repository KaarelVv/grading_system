import { useState, useEffect } from "react";
import { fetchTeamData } from "../api/teamApi"; // Import API function
import Button from "react-bootstrap/Button"; // Import Bootstrap button
import "../../assets/styles/Sidebar.css"; // Make sure you have some styling

function Sidebar({ onSelectTeam, grader }) {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null); // ✅ Track selected team

  useEffect(() => {
    async function loadTeams() {
      const teamList = await fetchTeamData(grader);
      setTeams(teamList.map(team => team.Team)); // Extract team names
    }

    loadTeams();
  }, [grader]);

  const handleTeamClick = (team) => {
    setSelectedTeam(team); // ✅ Set active team
    onSelectTeam(team);
  };

  return (
    <div className="sidebar">
      <h2>Select a Team</h2>
      <div className="team-buttons">
        {teams.map((team, index) => (
          <Button
            key={index}
            variant="outline-primary"
            className={`team-button ${selectedTeam === team ? "active" : ""}`} // ✅ Add active class
            onClick={() => handleTeamClick(team)}
          >
            {team}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;



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
