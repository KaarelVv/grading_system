import { useState, useEffect } from "react";
import { fetchTeamData, updateTeamScore } from "../components/api/teamApi"; // Import API functions

function TeamGrading({ teamName, grader }) {
  const [teamData, setTeamData] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!teamName || !grader) return;

    async function loadTeam() {
      const data = await fetchTeamData(grader);
      const team = data.find(t => t.Team === teamName);
      if (team) {
        setTeamData(team);
        setFormData({
          CategoryA1: team.CategoryA.SubCategory1,
          CategoryA2: team.CategoryA.SubCategory2,
          CategoryA3: team.CategoryA.SubCategory3,
          CategoryB1: team.CategoryB.SubCategory1,
          CategoryB2: team.CategoryB.SubCategory2,
          CategoryB3: team.CategoryB.SubCategory3,
          CategoryC1: team.CategoryC.SubCategory1,
          CategoryC2: team.CategoryC.SubCategory2,
          CategoryC3: team.CategoryC.SubCategory3
        });
      }
    }

    loadTeam();
  }, [teamName, grader]);

  const handleSubmit = async () => {
    const result = await updateTeamScore(grader, teamName, formData);
    alert(result);
  };

  return (
    <div>
      <h1>{teamName} (Grader {grader})</h1>
      {teamData ? (
        <div>
          <p>Update scores for this team:</p>

          <h2>Category A</h2>
          <input type="number" value={formData.CategoryA1} onChange={(e) => setFormData({ ...formData, CategoryA1: e.target.value })} />
          <input type="number" value={formData.CategoryA2} onChange={(e) => setFormData({ ...formData, CategoryA2: e.target.value })} />
          <input type="number" value={formData.CategoryA3} onChange={(e) => setFormData({ ...formData, CategoryA3: e.target.value })} />

          <h2>Category B</h2>
          <input type="number" value={formData.CategoryB1} onChange={(e) => setFormData({ ...formData, CategoryB1: e.target.value })} />
          <input type="number" value={formData.CategoryB2} onChange={(e) => setFormData({ ...formData, CategoryB2: e.target.value })} />
          <input type="number" value={formData.CategoryB3} onChange={(e) => setFormData({ ...formData, CategoryB3: e.target.value })} />

          <h2>Category C</h2>
          <input type="number" value={formData.CategoryC1} onChange={(e) => setFormData({ ...formData, CategoryC1: e.target.value })} />
          <input type="number" value={formData.CategoryC2} onChange={(e) => setFormData({ ...formData, CategoryC2: e.target.value })} />
          <input type="number" value={formData.CategoryC3} onChange={(e) => setFormData({ ...formData, CategoryC3: e.target.value })} />

          <button onClick={handleSubmit}>Update Scores</button>
        </div>
      ) : (
        <p>Loading team data...</p>
      )}
    </div>
  );
}

export default TeamGrading;
