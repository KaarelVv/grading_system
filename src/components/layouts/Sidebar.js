import { useState, useEffect } from "react";
import { fetchTeamData } from "../api/teamApi";
import LoadingSpinner from "../../UI/LoadingSpinner";
import "../../assets/styles/Sidebar.css";

function Sidebar({ onSelectTeam, grader }) {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTeams() {
      setLoading(true);
      setError(""); // Reset error message
      try {
        const teamList = await fetchTeamData(grader);
        if (!teamList.length) {
          setError("Ühtegi tiimi ei leitud.");
        }
        setTeams(teamList.map(team => team.Team));
      } catch (err) {
        setError("Viga tiimide laadimisel.");
      }
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
      ) : error ? (
        <p className="error-message">{error}</p>
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
