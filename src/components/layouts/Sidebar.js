import { useState, useEffect } from "react";
import { fetchTeamData } from "../api/teamApi";
import LoadingSpinner from "../../UI/LoadingSpinner";
import "../../assets/styles/Sidebar.css";

function Sidebar({ onSelectTeam, grader }) {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeams() {
      setLoading(true);
      const teamList = await fetchTeamData(grader);
      setTeams(teamList.map(team => team.Team));
      setLoading(false);
    }

    loadTeams();
  }, [grader]);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    onSelectTeam(team);
  };

  return (
    <div className="sidebar">
      <h2>Võistlejad</h2>
      {loading ? (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="team-buttons">
          {teams.map((team, index) => (
            <button
              key={index}
              className={`team-button ${selectedTeam === team ? "active" : ""}`}
              onClick={() => handleTeamClick(team)}
            >
              {team}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
