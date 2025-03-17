import { useState, useEffect } from "react";
import { fetchTeamData, updateTeamScore } from "../components/api/teamApi"; // Import API functions
import LoadingSpinner from "./LoadingSpinner"; // Import spinner
import "../assets/styles/TeamGrading.css"; // ✅ Import CSS for layout

function TeamGrading({ teamName, grader }) {
  const [teamData, setTeamData] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teamName || !grader) return;

    async function loadTeam() {
      setLoading(true);
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
      setLoading(false);
    }

    loadTeam();
  }, [teamName, grader]);

  const handleSubmit = async () => {
    const result = await updateTeamScore(grader, teamName, formData);
    alert(result);
  };

  return (
    <div className="team-grading-container">
      <h1>{teamName} </h1>

      {loading ? (
        <LoadingSpinner />
      ) : teamData ? (
        <div>
          <p>Adjust scores using sliders and submit.</p>

          <div className="categories-container">
            {/* Category A */}
            <div className="category-column">
              <h2>Category A</h2>
              {[1, 2, 3].map((num) => (
                <div key={num} className="subcategory">
                  <input
                    type="range"
                    min="0"
                    max="11"
                    value={formData[`CategoryA${num}`]}
                    onChange={(e) => setFormData({ ...formData, [`CategoryA${num}`]: e.target.value })}
                  />
                  <label>Subcategory {num}: {formData[`CategoryA${num}`]}</label>
                </div>
              ))}
            </div>

            {/* Category B */}
            <div className="category-column">
              <h2>Category B</h2>
              {[1, 2, 3].map((num) => (
                <div key={num} className="subcategory">
                  <input
                    type="range"
                    min="0"
                    max="11"
                    value={formData[`CategoryB${num}`]}
                    onChange={(e) => setFormData({ ...formData, [`CategoryB${num}`]: e.target.value })}
                  />
                  <label>Subcategory {num}: {formData[`CategoryB${num}`]}</label>
                </div>
              ))}
            </div>

            {/* Category C */}
            <div className="category-column">
              <h2>Category C</h2>
              {[1, 2, 3].map((num) => (
                <div key={num} className="subcategory">
                  <input
                    type="range"
                    min="0"
                    max="11"
                    value={formData[`CategoryC${num}`]}
                    onChange={(e) => setFormData({ ...formData, [`CategoryC${num}`]: e.target.value })}
                  />
                  <label>Subcategory {num}: {formData[`CategoryC${num}`]}</label>
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleSubmit}>Update Scores</button>
        </div>
      ) : (
        <p>No team data found.</p>
      )}
    </div>
  );
}

export default TeamGrading;
