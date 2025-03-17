import { useState, useEffect } from "react";
import { fetchTeamData } from "../api/teamApi";  // Import the function

function Sidebar({ onSelectTeam, grader }) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function loadTeams() {
      const teamList = await fetchTeamData(grader); // ✅ Correct function name
      setTeams(teamList.map(team => team.Team));  // ✅ Extract team names
    }
  
    loadTeams();
  }, [grader]);

  return (
    <div className="sidebar">
      <h2>Grader {grader} - Select a Team</h2>
      <ul>
        {teams.map((team, index) => (
          <li key={index} onClick={() => onSelectTeam(team)}>
            {team}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;





